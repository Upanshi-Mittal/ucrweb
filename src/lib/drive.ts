const API_KEY: string = import.meta.env.VITE_DRIVE_API_KEY ?? "";
const CACHE_TTL = 10 * 60 * 1000;

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  imageMediaMetadata?: { width?: number; height?: number; rotation?: number };
};

export type FolderContents = { folders: DriveFile[]; files: DriveFile[] };

export class DriveError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export const driveEnabled = () => API_KEY.length > 0;
export const thumbUrl = (id: string, width: number) =>
  `https://lh3.googleusercontent.com/d/${id}=w${width}`;
export const downloadUrl = (id: string) =>
  `https://drive.google.com/uc?export=download&id=${id}`;
export const driveFolderUrl = (id: string) =>
  `https://drive.google.com/drive/folders/${id}`;

function readCache(folderId: string): FolderContents | null {
  try {
    const raw = sessionStorage.getItem(`drive:${folderId}`);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    return Date.now() - at < CACHE_TTL ? data : null;
  } catch {
    return null;
  }
}

function writeCache(folderId: string, data: FolderContents) {
  try {
    sessionStorage.setItem(`drive:${folderId}`, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // Caching is optional.
  }
}

export async function listFolder(folderId: string): Promise<FolderContents> {
  if (!driveEnabled()) throw new DriveError("NO_KEY");
  // The ID comes from the URL and goes into a Drive query.
  if (!/^[-\w]+$/.test(folderId)) throw new DriveError("Invalid folder link", 404);

  const cached = readCache(folderId);
  if (cached) return cached;

  const items: DriveFile[] = [];
  let pageToken = "";

  do {
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "nextPageToken,files(id,name,mimeType,imageMediaMetadata(width,height,rotation))",
      orderBy: "folder,name_natural",
      pageSize: "1000",
      key: API_KEY,
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`);
    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      throw new DriveError(detail?.error?.message || `Drive API error ${res.status}`, res.status);
    }
    const page = await res.json();
    items.push(...(page.files ?? []));
    pageToken = page.nextPageToken ?? "";
  } while (pageToken);

  // Folders starting with "_" stay hidden. Files are exempt because
  // cameras produce names like _MG_1234.jpg.
  const isFolder = (f: DriveFile) => f.mimeType === "application/vnd.google-apps.folder";
  const data: FolderContents = {
    folders: items.filter((f) => isFolder(f) && !f.name.startsWith("_")),
    files: items.filter(
      (f) => f.mimeType.startsWith("image/") || f.mimeType.startsWith("video/")
    ),
  };

  writeCache(folderId, data);
  return data;
}
