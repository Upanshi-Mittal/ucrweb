import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigationType, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Download,
    ExternalLink,
    Folder,
    ImageOff,
    Maximize2,
    Play,
    X,
} from 'lucide-react';
import Footer from '../components/Footer';
import { events } from '../data/events';
import {
    DriveError,
    downloadUrl,
    driveFolderUrl,
    listFolder,
    resolveTrail,
    thumbUrl,
    videoPreviewUrl,
} from '../lib/drive';
import type { Crumb, DriveFile, FolderContents } from '../lib/drive';

type LoadState =
    | { status: 'loading' }
    | { status: 'ready'; trail: Crumb[]; data: FolderContents }
    | { status: 'error'; message: string };

const eventRoots: Crumb[] = events.map((event) => ({ id: event.folderId, name: event.name }));

const cardClass =
    'group rounded-2xl border-2 border-black transition-all duration-300 overflow-hidden relative hover:-translate-y-1 hover:shadow-[6px_6px_0_#facc15] shadow-[6px_6px_0_black] bg-[#fffdf7]';

const lightboxButtonClass =
    'w-10 h-10 rounded-xl border-2 border-black bg-white text-black flex items-center justify-center transition-colors duration-200 hover:bg-yellow-400';

const folderLink = (id: string) => `/gallery?f=${encodeURIComponent(id)}`;

const isVideo = (file: DriveFile) => file.mimeType.startsWith('video/');

function aspectRatio(file: DriveFile) {
    const meta = file.imageMediaMetadata ?? file.videoMediaMetadata;
    if (!meta?.width || !meta?.height) return '4 / 3';
    const rotation = file.imageMediaMetadata?.rotation;
    const rotated = rotation === 1 || rotation === 3;
    return rotated ? `${meta.height} / ${meta.width}` : `${meta.width} / ${meta.height}`;
}

function errorMessage(err: unknown) {
    if (err instanceof DriveError) {
        switch (err.kind) {
            case 'no-key':
                return 'The on-site gallery is not switched on yet.';
            case 'invalid-link':
                return "This gallery link isn't valid.";
            case 'not-in-gallery':
                return "This folder isn't part of the μCR gallery.";
            case 'quota':
                return 'The gallery is busy right now. Please try again in a little while.';
            case 'key':
                return "The gallery can't connect to Google Drive right now. If you run this site, check the API key and its allowed websites.";
            case 'access':
                return 'These photos could not be loaded. The folder may have been moved or may no longer be shared publicly.';
        }
    }
    return 'Could not load photos. Check your connection and try again.';
}

function useGalleryScroll(ready: boolean) {
    const { key, search } = useLocation();
    const navigationType = useNavigationType();
    // A fresh page load always has the key "default", so the address keeps pages apart.
    const storageKey = `gallery-scroll:${key}:${search}`;

    useEffect(() => {
        const save = () => {
            try {
                sessionStorage.setItem(storageKey, String(window.scrollY));
            } catch {
                // Remembering the position is optional.
            }
        };
        window.addEventListener('scroll', save, { passive: true });
        return () => window.removeEventListener('scroll', save);
    }, [storageKey]);

    useEffect(() => {
        if (navigationType !== 'POP') {
            window.scrollTo(0, 0);
        }
    }, [navigationType, storageKey]);

    useEffect(() => {
        if (!ready || navigationType !== 'POP') return;
        try {
            const saved = sessionStorage.getItem(storageKey);
            if (saved) window.scrollTo(0, Number(saved));
        } catch {
            // Remembering the position is optional.
        }
    }, [ready, navigationType, storageKey]);
}

type DriveImageProps = {
    id: string;
    width: number;
    alt: string;
    className: string;
    lazy?: boolean;
};

function DriveImage({ id, width, alt, className, lazy = true }: DriveImageProps) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className={`${className} min-h-24 min-w-40 p-4 bg-neutral-100 text-neutral-600 flex flex-col items-center justify-center gap-2 text-sm text-center`}>
                <ImageOff className="w-6 h-6" />
                <span>Image unavailable</span>
            </div>
        );
    }

    return (
        <img
            src={thumbUrl(id, width)}
            referrerPolicy="no-referrer"
            alt={alt}
            loading={lazy ? 'lazy' : 'eager'}
            decoding="async"
            onError={() => setFailed(true)}
            className={className}
        />
    );
}

function DriveButton({ folderId }: { folderId: string }) {
    return (
        <a
            href={driveFolderUrl(folderId)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-black bg-white font-medium transition-all duration-300 shadow-[4px_4px_0_black] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#facc15]"
        >
            <span>Open in Google Drive</span>
            <ExternalLink className="w-4 h-4" />
        </a>
    );
}

function Notice({ message }: { message: string }) {
    return (
        <div className="max-w-xl mx-auto rounded-2xl border-2 border-black bg-[#fffdf7] shadow-[6px_6px_0_black] p-8 text-center">
            <p className="text-lg">{message}</p>
        </div>
    );
}

function EventGrid() {
    useGalleryScroll(true);

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-6 mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black">μCR Event Gallery</h1>
                    <p className="text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed text-neutral-700">
                        Capturing the intensity, late-night bench sessions, and tournament triumphs of μCR. Select an album to explore and download high-resolution captures.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.folderId}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.6 }}
                            className={cardClass}
                        >
                            <Link to={folderLink(event.folderId)} className="block">
                                <div className="aspect-[3/2] overflow-hidden border-b-2 border-black">
                                    <DriveImage
                                        id={event.coverId}
                                        width={800}
                                        alt={event.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-bold">{event.name}</h2>
                                    <p className="text-sm font-medium text-blue-500 mt-1">{event.meta}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Breadcrumbs({ trail }: { trail: Crumb[] }) {
    return (
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-medium mb-6">
            <Link to="/gallery" className="underline underline-offset-4 hover:text-yellow-600">
                All events
            </Link>
            {trail.map((step, index) => (
                <span key={step.id} className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    {index === trail.length - 1 ? (
                        <span className="font-bold" aria-current="page">{step.name}</span>
                    ) : (
                        <Link
                            to={folderLink(step.id)}
                            className="underline underline-offset-4 hover:text-yellow-600"
                        >
                            {step.name}
                        </Link>
                    )}
                </span>
            ))}
        </nav>
    );
}

function AlbumCard({ folder }: { folder: DriveFile }) {
    return (
        <div className={cardClass}>
            <Link to={folderLink(folder.id)} className="flex items-center gap-4 p-5">
                <span className="w-12 h-12 shrink-0 rounded-xl border-2 border-black bg-yellow-400 flex items-center justify-center">
                    <Folder className="w-6 h-6" />
                </span>
                <span className="font-bold leading-snug break-words min-w-0">{folder.name}</span>
            </Link>
        </div>
    );
}

type PhotoTileProps = {
    file: DriveFile;
    index: number;
    onOpen: (index: number) => void;
};

const PhotoTile = memo(function PhotoTile({ file, index, onOpen }: PhotoTileProps) {
    return (
        <figure
            className={`${cardClass} mb-6 break-inside-avoid`}
            style={{ aspectRatio: aspectRatio(file) }}
        >
            <button
                type="button"
                onClick={() => onOpen(index)}
                aria-label={`Open ${file.name}`}
                className="absolute inset-0 w-full h-full cursor-pointer"
            >
                <DriveImage
                    id={file.id}
                    width={600}
                    alt={file.name}
                    className="w-full h-full object-cover"
                />
            </button>

            {isVideo(file) && (
                <span className="absolute top-3 left-3 w-9 h-9 rounded-full border-2 border-black bg-yellow-400 flex items-center justify-center pointer-events-none">
                    <Play className="w-4 h-4" />
                </span>
            )}

            {/* Always visible on touch screens, which have no hover to reveal them. */}
            <div className="absolute bottom-3 right-3 flex gap-2 transition-opacity duration-200 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-within:opacity-100">
                <button
                    type="button"
                    onClick={() => onOpen(index)}
                    aria-label={`Preview ${file.name}`}
                    className={`${lightboxButtonClass} [@media(hover:none)]:hidden`}
                >
                    <Maximize2 className="w-4 h-4" />
                </button>
                <a
                    href={downloadUrl(file.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download ${file.name}`}
                    className={lightboxButtonClass}
                >
                    <Download className="w-4 h-4" />
                </a>
            </div>
        </figure>
    );
});

type LightboxProps = {
    files: DriveFile[];
    index: number;
    onChange: (index: number) => void;
    onClose: () => void;
};

function Lightbox({ files, index, onChange, onClose }: LightboxProps) {
    const file = files[index];
    const dialogRef = useRef<HTMLDivElement>(null);
    const previous = () => onChange((index - 1 + files.length) % files.length);
    const next = () => onChange((index + 1) % files.length);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onChange((index - 1 + files.length) % files.length);
            if (e.key === 'ArrowRight') onChange((index + 1) % files.length);
            if (e.key === 'Tab' && dialogRef.current) {
                // Keep keyboard focus inside the viewer.
                const focusable = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button, iframe');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                const active = document.activeElement;
                if (e.shiftKey && (active === first || active === dialogRef.current)) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && active === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [index, files.length, onChange, onClose]);

    useEffect(() => {
        const opener = document.activeElement as HTMLElement | null;
        dialogRef.current?.focus();
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
            opener?.focus?.({ preventScroll: true });
        };
    }, []);

    return (
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={file.name}
            tabIndex={-1}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center px-4 sm:px-20 pt-20 pb-16 outline-none"
        >
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
                <span className="px-3 py-1 rounded-lg border-2 border-black bg-yellow-400 text-black text-sm font-bold">
                    {String(index + 1).padStart(2, '0')} / {files.length}
                </span>
                <div className="flex gap-2">
                    <a
                        href={downloadUrl(file.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Download original"
                        className={lightboxButtonClass}
                    >
                        <Download className="w-5 h-5" />
                    </a>
                    <button type="button" onClick={onClose} aria-label="Close" className={lightboxButtonClass}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <button
                type="button"
                onClick={previous}
                aria-label="Previous photo"
                className={`${lightboxButtonClass} absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10`}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {isVideo(file) ? (
                <iframe
                    key={file.id}
                    src={videoPreviewUrl(file.id)}
                    title={file.name}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="w-full h-full max-w-5xl rounded-xl border-2 border-black bg-black"
                />
            ) : (
                <DriveImage
                    key={file.id}
                    id={file.id}
                    width={1600}
                    alt={file.name}
                    lazy={false}
                    className="max-w-full max-h-full object-contain rounded-xl border-2 border-black"
                />
            )}

            <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className={`${lightboxButtonClass} absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10`}
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <p className="absolute bottom-4 left-4 right-4 text-center text-sm text-white truncate">
                {file.name}
            </p>
        </div>
    );
}

function FolderView({ folderId }: { folderId: string }) {
    const [state, setState] = useState<LoadState>({ status: 'loading' });
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const closeLightbox = useCallback(() => setOpenIndex(null), []);

    useGalleryScroll(state.status !== 'loading');

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        (async () => {
            try {
                const trail = await resolveTrail(folderId, eventRoots, signal);
                const data = await listFolder(folderId, signal);
                if (!signal.aborted) setState({ status: 'ready', trail, data });
            } catch (err) {
                if (!signal.aborted) setState({ status: 'error', message: errorMessage(err) });
            }
        })();

        return () => controller.abort();
    }, [folderId]);

    // The URL can hold anything, so only name and link to folders known to be ours.
    const eventRoot = eventRoots.find((root) => root.id === folderId);
    const trail = state.status === 'ready' ? state.trail : eventRoot ? [eventRoot] : [];
    const title = trail.length ? trail[trail.length - 1].name : 'Gallery';

    return (
        <section className="pt-16 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs trail={trail} />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold break-words min-w-0">{title}</h1>
                    {trail.length > 0 && <DriveButton folderId={folderId} />}
                </div>

                {state.status === 'loading' && <p className="text-lg text-center py-16">Loading photos…</p>}

                {state.status === 'error' && <Notice message={state.message} />}

                {state.status === 'ready' && !state.data.folders.length && !state.data.files.length && (
                    <Notice message="This folder is empty." />
                )}

                {state.status === 'ready' && state.data.folders.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Albums</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {state.data.folders.map((folder) => (
                                <AlbumCard key={folder.id} folder={folder} />
                            ))}
                        </div>
                    </div>
                )}

                {state.status === 'ready' && state.data.files.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Photos ({state.data.files.length})</h2>
                        <div className="columns-[260px] gap-6">
                            {state.data.files.map((file, index) => (
                                <PhotoTile key={file.id} file={file} index={index} onOpen={setOpenIndex} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {state.status === 'ready' && openIndex !== null && (
                <Lightbox
                    files={state.data.files}
                    index={openIndex}
                    onChange={setOpenIndex}
                    onClose={closeLightbox}
                />
            )}
        </section>
    );
}

function Gallery() {
    const [params] = useSearchParams();
    const folderId = params.get('f');

    return (
        <div className="pt-16">
            {folderId ? <FolderView key={folderId} folderId={folderId} /> : <EventGrid />}
            <Footer />
        </div>
    );
}

export default Gallery;
