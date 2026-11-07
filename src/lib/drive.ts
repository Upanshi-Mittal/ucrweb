const API_KEY: string = import.meta.env.VITE_DRIVE_API_KEY ?? "";
const CACHE_TTL = 10 * 60 * 1000;
const MAX_FOLDERS_SEARCHED = 200;
const FOLDER_MIME = "application/vnd.google-apps.folder";
const SHORTCUT_MIME = "application/vnd.google-apps.shortcut";
const API_BASE = "https://www.googleapis.com/drive/v3/files";

const QUOTA_REASONS = [
  "dailyLimitExceeded",
  "rateLimitExceeded",
  "userRateLimitExceeded",
  "RATE_LIMIT_EXCEEDED",
];
const KEY_REASONS = [
  "keyInvalid",
  "keyExpired",
  "ipRefererBlocked",
  "accessNotConfigured",
  "API_KEY_INVALID",
  "API_KEY_HTTP_REFERRER_BLOCKED",
  "API_KEY_SERVICE_BLOCKED",
  "SERVICE_DISABLED",
];

export type Crumb = { id: string; name: string };

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  imageMediaMetadata?: { width?: number; height?: number; rotation?: number };
  videoMediaMetadata?: { width?: number; height?: number };
};

type DriveListing = DriveFile & {
  shortcutDetails?: { targetId?: string; targetMimeType?: string };
};

export type FolderContents = { folders: DriveFile[]; files: DriveFile[] };

export type DriveErrorKind =
  | "no-key"
  | "invalid-link"
  | "not-in-gallery"
  | "quota"
  | "key"
  | "access"
  | "other";

export class DriveError extends Error {
  kind: DriveErrorKind;
  constructor(kind: DriveErrorKind, message: string = kind) {
    super(message);
    this.kind = kind;
  }
}

const driveEnabled = () => API_KEY.length > 0;
const isValidId = (id: string) => /^[-\w]+$/.test(id);

export const thumbUrl = (id: string, width: number) =>
  `https://lh3.googleusercontent.com/d/${encodeURIComponent(id)}=w${width}`;
export const downloadUrl = (id: string) =>
  `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}`;
export const driveFolderUrl = (id: string) =>
  `https://drive.google.com/drive/folders/${encodeURIComponent(id)}`;
export const videoPreviewUrl = (id: string) =>
  `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    if (Date.now() - at < CACHE_TTL) return data;
    sessionStorage.removeItem(key);
    return null;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // Caching is optional.
  }
}

function classifyError(status: number, detail: unknown): DriveErrorKind {
  const error = (detail as {
    error?: { errors?: { reason?: string }[]; details?: { reason?: string }[] };
  })?.error;
  const reasons = [...(error?.errors ?? []), ...(error?.details ?? [])].map((e) => e.reason ?? "");

  if (status === 429 || reasons.some((r) => QUOTA_REASONS.includes(r))) return "quota";
  if (reasons.some((r) => KEY_REASONS.includes(r))) return "key";
  if (status === 403 || status === 404) return "access";
  return "other";
}

async function driveRequest<T>(url: string, params: URLSearchParams, signal?: AbortSignal): Promise<T> {
  params.set("key", API_KEY);
  params.set("supportsAllDrives", "true");

  const res = await fetch(`${url}?${params}`, { signal });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new DriveError(classifyError(res.status, detail), `Drive API error ${res.status}`);
  }
  return res.json();
}

// Only folders inside a configured event can be shown, so search down from the
// events. Drive doesn't reveal a folder's parents to an API key. This also gives
// real names for the breadcrumbs, and listFolder already leaves out hidden folders.
export async function resolveTrail(
  folderId: string,
  roots: Crumb[],
  signal?: AbortSignal
): Promise<Crumb[]> {
  if (!isValidId(folderId)) throw new DriveError("invalid-link");

  const root = roots.find((r) => r.id === folderId);
  if (root) return [root];
  if (!driveEnabled()) throw new DriveError("no-key");

  const queue: Crumb[][] = roots.map((r) => [r]);
  const seen = new Set(roots.map((r) => r.id));

  for (let i = 0; i < queue.length && i < MAX_FOLDERS_SEARCHED; i++) {
    const trail = queue[i];
    let contents: FolderContents;
    try {
      contents = await listFolder(trail[trail.length - 1].id, signal);
    } catch (err) {
      // One unreadable folder shouldn't hide the rest of the gallery.
      if (err instanceof DriveError && err.kind === "access") continue;
      throw err;
    }

    for (const folder of contents.folders) {
      const next = [...trail, { id: folder.id, name: folder.name }];
      if (folder.id === folderId) return next;
      if (!seen.has(folder.id)) {
        seen.add(folder.id);
        queue.push(next);
      }
    }
  }

  throw new DriveError("not-in-gallery");
}

// Shortcuts are listed as their target so linked albums and photos still show.
function resolveShortcut(item: DriveListing): DriveFile {
  const { targetId, targetMimeType } = item.shortcutDetails ?? {};
  if (item.mimeType === SHORTCUT_MIME && targetId && targetMimeType) {
    return { id: targetId, name: item.name, mimeType: targetMimeType };
  }
  return item;
}

export async function listFolder(folderId: string, signal?: AbortSignal): Promise<FolderContents> {
  if (!driveEnabled()) throw new DriveError("no-key");
  // The ID comes from the URL and goes into a Drive query.
  if (!isValidId(folderId)) throw new DriveError("invalid-link");

  const cacheKey = `drive:${folderId}`;
  const cached = readCache<FolderContents>(cacheKey);
  if (cached) return cached;

  const items: DriveFile[] = [];
  let pageToken = "";

  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      fields:
        "nextPageToken,files(id,name,mimeType,shortcutDetails(targetId,targetMimeType),imageMediaMetadata(width,height,rotation),videoMediaMetadata(width,height))",
      orderBy: "folder,name_natural",
      pageSize: "1000",
      includeItemsFromAllDrives: "true",
    });
    if (pageToken) params.set("pageToken", pageToken);

    const page = await driveRequest<{ files?: DriveListing[]; nextPageToken?: string }>(
      API_BASE,
      params,
      signal
    );
    items.push(...(page.files ?? []).map(resolveShortcut));
    pageToken = page.nextPageToken ?? "";
  } while (pageToken);

  // Folders starting with "_" stay hidden. Files are exempt because
  // cameras produce names like _MG_1234.jpg.
  const data: FolderContents = {
    folders: items.filter((f) => f.mimeType === FOLDER_MIME && !f.name.startsWith("_")),
    files: items.filter(
      (f) => f.mimeType.startsWith("image/") || f.mimeType.startsWith("video/")
    ),
  };

  writeCache(cacheKey, data);
  return data;
}
