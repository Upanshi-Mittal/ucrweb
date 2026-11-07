import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Download,
    ExternalLink,
    Folder,
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
    thumbUrl,
} from '../lib/drive';
import type { DriveFile, FolderContents } from '../lib/drive';

type Crumb = { id: string; name: string };

type LoadState =
    | { status: 'loading' }
    | { status: 'ready'; data: FolderContents }
    | { status: 'error'; message: string };

const cardClass =
    'group rounded-2xl border-2 border-black transition-all duration-300 overflow-hidden relative hover:-translate-y-1 hover:shadow-[6px_6px_0_#facc15] shadow-[6px_6px_0_black] bg-[#fffdf7]';

const lightboxButtonClass =
    'w-10 h-10 rounded-xl border-2 border-black bg-white text-black flex items-center justify-center transition-colors duration-200 hover:bg-yellow-400';

const folderLink = (id: string, name: string) =>
    `/gallery?f=${encodeURIComponent(id)}&t=${encodeURIComponent(name)}`;

const isVideo = (file: DriveFile) => file.mimeType.startsWith('video/');

const videoPreviewUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

function aspectRatio(file: DriveFile) {
    const meta = file.imageMediaMetadata;
    if (!meta?.width || !meta?.height) return '4 / 3';
    const rotated = meta.rotation === 1 || meta.rotation === 3;
    return rotated ? `${meta.height} / ${meta.width}` : `${meta.width} / ${meta.height}`;
}

function errorMessage(err: unknown) {
    if (err instanceof DriveError) {
        if (err.message === 'NO_KEY') {
            return 'The on-site gallery is not switched on yet, but all the photos are on Google Drive.';
        }
        if (err.status === 403 || err.status === 404) {
            return 'These photos could not be loaded. The folder may not be shared publicly.';
        }
    }
    const detail = err instanceof Error ? err.message : 'Unknown error';
    return `Could not load photos (${detail}).`;
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
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-6 mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold">Gallery</h1>
                    <p className="text-xl md:text-2xl max-w-4xl mx-auto">
                        Moments from μCR events and workshops. Pick an event to browse and download its photos.
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
                            <Link
                                to={folderLink(event.folderId, event.name)}
                                state={{ trail: [{ id: event.folderId, name: event.name }] }}
                                className="block"
                            >
                                <div className="aspect-[3/2] overflow-hidden border-b-2 border-black">
                                    <img
                                        src={thumbUrl(event.coverId, 800)}
                                        referrerPolicy="no-referrer"
                                        alt={event.name}
                                        loading="lazy"
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
                            to={folderLink(step.id, step.name)}
                            state={{ trail: trail.slice(0, index + 1) }}
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

function AlbumCard({ folder, trail }: { folder: DriveFile; trail: Crumb[] }) {
    return (
        <div className={cardClass}>
            <Link
                to={folderLink(folder.id, folder.name)}
                state={{ trail: [...trail, { id: folder.id, name: folder.name }] }}
                className="flex items-center gap-4 p-5"
            >
                <span className="w-12 h-12 shrink-0 rounded-xl border-2 border-black bg-yellow-400 flex items-center justify-center">
                    <Folder className="w-6 h-6" />
                </span>
                <span className="font-bold leading-snug break-words min-w-0">{folder.name}</span>
            </Link>
        </div>
    );
}

function PhotoTile({ file, onOpen }: { file: DriveFile; onOpen: () => void }) {
    return (
        <figure
            className={`${cardClass} mb-6 break-inside-avoid`}
            style={{ aspectRatio: aspectRatio(file) }}
        >
            <button
                type="button"
                onClick={onOpen}
                aria-label={`Open ${file.name}`}
                className="absolute inset-0 w-full h-full cursor-pointer"
            >
                <img
                    src={thumbUrl(file.id, 600)}
                    referrerPolicy="no-referrer"
                    alt={file.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </button>

            {isVideo(file) && (
                <span className="absolute top-3 left-3 w-9 h-9 rounded-full border-2 border-black bg-yellow-400 flex items-center justify-center pointer-events-none">
                    <Play className="w-4 h-4" />
                </span>
            )}

            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
                <button
                    type="button"
                    onClick={onOpen}
                    aria-label={`Preview ${file.name}`}
                    className={lightboxButtonClass}
                >
                    <Maximize2 className="w-4 h-4" />
                </button>
                <a
                    href={downloadUrl(file.id)}
                    download={file.name}
                    aria-label={`Download ${file.name}`}
                    className={lightboxButtonClass}
                >
                    <Download className="w-4 h-4" />
                </a>
            </div>
        </figure>
    );
}

type LightboxProps = {
    files: DriveFile[];
    index: number;
    onChange: (index: number) => void;
    onClose: () => void;
};

function Lightbox({ files, index, onChange, onClose }: LightboxProps) {
    const file = files[index];
    const previous = () => onChange((index - 1 + files.length) % files.length);
    const next = () => onChange((index + 1) % files.length);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onChange((index - 1 + files.length) % files.length);
            if (e.key === 'ArrowRight') onChange((index + 1) % files.length);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [index, files.length, onChange, onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={file.name}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center px-4 sm:px-20 pt-20 pb-16"
        >
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
                <span className="px-3 py-1 rounded-lg border-2 border-black bg-yellow-400 text-black text-sm font-bold">
                    {String(index + 1).padStart(2, '0')} / {files.length}
                </span>
                <div className="flex gap-2">
                    <a
                        href={downloadUrl(file.id)}
                        download={file.name}
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
                <img
                    key={file.id}
                    src={thumbUrl(file.id, 1600)}
                    referrerPolicy="no-referrer"
                    alt={file.name}
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

function FolderView({ folderId, title, trail }: { folderId: string; title: string; trail: Crumb[] }) {
    const [state, setState] = useState<LoadState>({ status: 'loading' });
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        let stale = false;
        listFolder(folderId)
            .then((data) => {
                if (!stale) setState({ status: 'ready', data });
            })
            .catch((err: unknown) => {
                if (!stale) setState({ status: 'error', message: errorMessage(err) });
            });
        return () => {
            stale = true;
        };
    }, [folderId]);

    const closeLightbox = () => setOpenIndex(null);

    return (
        <section className="pt-16 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs trail={trail} />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold break-words min-w-0">{title}</h1>
                    <DriveButton folderId={folderId} />
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
                                <AlbumCard key={folder.id} folder={folder} trail={trail} />
                            ))}
                        </div>
                    </div>
                )}

                {state.status === 'ready' && state.data.files.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Photos ({state.data.files.length})</h2>
                        <div className="columns-[260px] gap-6">
                            {state.data.files.map((file, index) => (
                                <PhotoTile key={file.id} file={file} onOpen={() => setOpenIndex(index)} />
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
    const location = useLocation();
    const folderId = params.get('f');

    if (!folderId) {
        return (
            <div className="pt-16">
                <EventGrid />
                <Footer />
            </div>
        );
    }

    const title = params.get('t') || 'Gallery';
    const savedTrail: Crumb[] | undefined = location.state?.trail;
    const trail =
        savedTrail && savedTrail[savedTrail.length - 1]?.id === folderId
            ? savedTrail
            : [{ id: folderId, name: title }];

    return (
        <div className="pt-16">
            <FolderView key={folderId} folderId={folderId} title={title} trail={trail} />
            <Footer />
        </div>
    );
}

export default Gallery;
