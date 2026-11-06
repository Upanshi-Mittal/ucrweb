import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Sparkles } from 'lucide-react';

import px from '../assets/5/px.jpg';
import nx from '../assets/5/nx.jpg';
import py from '../assets/5/py.jpg';
import ny from '../assets/5/ny.jpg';
import pz from '../assets/5/pz.jpg';
import nz from '../assets/5/nz.jpg';

import orientationImg from '../assets/orientation.jpg';

interface EventCardItem {
    id: string;
    title: string;
    tag: string;
    tagColor: string;
    subtitle: string;
    image: string;
    link: string;
    dateOrMeta?: string;
    angleOffset: number; // offset in radians relative to cluster base angle
    yOffset?: number;
}

interface EventCluster {
    id: string;
    title: string;
    subtitle: string;
    baseAngle: number; // azimuth angle around origin (radians)
    cards: EventCardItem[];
}

const Sac = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    // References to DOM elements for 60fps transform updating without React re-renders
    const clusterHeaderRefs = useRef<(HTMLDivElement | null)[]>([]);
    const cardElementRefs = useRef<Map<string, HTMLDivElement>>(new Map());
// Ref to track which cards have already animated
const animatedRefs = useRef<Set<string>>(new Set());

    // Orbit controls reference to allow programmatic rotation with < and > buttons
    const controlsRef = useRef<OrbitControls | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    // Drag detection to avoid accidental navigation while dragging the 360 room
    const isDraggingRef = useRef(false);
    const pointerStartRef = useRef({ x: 0, y: 0 });

    const handlePointerDown = (e: React.PointerEvent) => {
        pointerStartRef.current = { x: e.clientX, y: e.clientY };
        isDraggingRef.current = false;
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        const dx = e.clientX - pointerStartRef.current.x;
        const dy = e.clientY - pointerStartRef.current.y;
        if (Math.hypot(dx, dy) > 6) {
            isDraggingRef.current = true;
        }
    };

    const handleCardClick = (link: string) => {
        if (isDraggingRef.current) return; // Prevent navigation if user was orbiting
        navigate(link);
    };

    // 4 clusters spaced at 90 degrees around the 360 room (0, PI/2, PI, 3*PI/2)
    const clusters: EventCluster[] = useMemo(() => [
        {
            id: 'workshops',
            title: 'Events & Workshops',
            subtitle: '50+ Past Events • Hands-on Robotics & Firmware',
            baseAngle: 0, // Front view (default)
            cards: [
                {
                    id: 'orientation25',
                    title: 'Orientation ’25 & Hands-On Robotics',
                    tag: 'Flagship Event',
                    tagColor: 'bg-violet-100 text-violet-700',
                    subtitle: 'Annual club orientation, live bot showcase & sensor hacking session',
                    image: orientationImg,
                    dateOrMeta: '11-13 Sept • LT3 & TV Room',
                    link: '/gallery',
                    angleOffset: -0.16,
                    yOffset: -0.1,
                },
                {
                    id: 'robomania',
                    title: 'RoboMania Combat League',
                    tag: 'Combat Arena',
                    tagColor: 'bg-rose-100 text-rose-700',
                    subtitle: 'Heavyweight bot clashes, pneumatic flippers & national championships',
                    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
                    dateOrMeta: 'Annual Fest • Arena Battle',
                    link: '/projects',
                    angleOffset: 0.16,
                    yOffset: -0.1,
                },
            ],
        },
        {
            id: 'flagship',
            title: 'Flagship Inventions',
            subtitle: '25+ Prototypes • Custom Circuit & Firmware Designs',
            baseAngle: Math.PI / 2, // 90 degrees right
            cards: [
                {
                    id: 'robosoccer',
                    title: 'RoboSoccer Striker & Goalie Duo',
                    tag: 'Autonomous',
                    tagColor: 'bg-blue-100 text-blue-700',
                    subtitle: 'High-speed competitive omni-drive robots with pneumatic kicker systems',
                    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=600&q=80',
                    dateOrMeta: 'NRF24L01+ • Omni-Wheel',
                    link: '/projects',
                    angleOffset: -0.16,
                    yOffset: -0.1,
                },
                {
                    id: 'gridrunner',
                    title: 'GridRunner PID Maze Racer',
                    tag: 'Speed & Logic',
                    tagColor: 'bg-amber-100 text-amber-700',
                    subtitle: '500Hz discrete PID control loops with high-speed line & maze navigation',
                    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
                    dateOrMeta: '1st Place • Time-Trial Winner',
                    link: '/projects',
                    angleOffset: 0.16,
                    yOffset: -0.1,
                },
            ],
        },
        {
            id: 'exhibitions',
            title: 'Exhibitions & Community',
            subtitle: 'Campus Demonstrations • 200+ Proud Alumni',
            baseAngle: Math.PI, // 180 degrees back
            cards: [
                {
                    id: 'spectra',
                    title: 'Spectra Annual Tech Showcase',
                    tag: 'Exhibition',
                    tagColor: 'bg-emerald-100 text-emerald-700',
                    subtitle: 'Live multi-robot demonstrations, student interactive games & exhibitions',
                    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
                    dateOrMeta: 'Campus Fest • Open Access',
                    link: '/gallery',
                    angleOffset: -0.16,
                    yOffset: -0.1,
                },
                {
                    id: 'pyroguard',
                    title: 'PyroGuard Autonomous Rover',
                    tag: 'Hazard Rescue',
                    tagColor: 'bg-orange-100 text-orange-700',
                    subtitle: 'Hazardous corridor navigation with thermal anomaly detection & suppression',
                    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
                    dateOrMeta: 'Thermal Sensors • Servo Nozzle',
                    link: '/projects',
                    angleOffset: 0.16,
                    yOffset: -0.1,
                },
            ],
        },
        {
            id: 'team',
            title: 'Core Team & Recruitment',
            subtitle: 'Innovation, Mentorship & Technical Leadership',
            baseAngle: (3 * Math.PI) / 2, // 270 degrees left
            cards: [
                {
                    id: 'coreteam',
                    title: 'Meet the Engineering Team',
                    tag: 'Minds Behind μCR',
                    tagColor: 'bg-purple-100 text-purple-700',
                    subtitle: 'Passionate builders across technical, embedded, and management domains',
                    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
                    dateOrMeta: 'Advisors & Heads • 2024-25',
                    link: '/team',
                    angleOffset: -0.16,
                    yOffset: -0.1,
                },
                {
                    id: 'joinus',
                    title: 'Join μCR Robotics Hub',
                    tag: 'Apply Now',
                    tagColor: 'bg-teal-100 text-teal-700',
                    subtitle: 'Ready to build autonomous robots and solve real engineering challenges?',
                    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
                    dateOrMeta: 'Recruitment Open • SAC Bench',
                    link: '/contact',
                    angleOffset: 0.16,
                    yOffset: -0.1,
                },
            ],
        },
    ], []);

    // Rotate camera smoothly to previous / next cluster
    const rotateToNext = (direction: 1 | -1) => {
        const controls = controlsRef.current;
        if (!controls) return;
        const currentAngle = controls.getAzimuthalAngle();
        const step = (Math.PI / 2) * direction;
        // Snap to nearest cluster step
        const targetAngle = Math.round((currentAngle + step) / (Math.PI / 2)) * (Math.PI / 2);

        const startAngle = currentAngle;
        const startTime = performance.now();
        const duration = 500;

        const animateRotate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const angle = startAngle + (targetAngle - startAngle) * ease;

            // Update camera position along circle of radius 2
            const radius = 2;
            if (cameraRef.current) {
                cameraRef.current.position.x = radius * Math.sin(angle);
                cameraRef.current.position.z = radius * Math.cos(angle);
                cameraRef.current.lookAt(0, 0, 0);
            }
            controls.update();

            if (progress < 1) {
                requestAnimationFrame(animateRotate);
            }
        };

        requestAnimationFrame(animateRotate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const scene = new THREE.Scene();
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const environmentMapTexture = cubeTextureLoader.load([
            px,
            nx,
            py,
            ny,
            pz,
            nz
        ]);
        scene.background = environmentMapTexture;
        scene.environment = environmentMapTexture;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const light = new THREE.PointLight(0xffffff, 0.5);
        light.position.set(2, 3, 4);
        scene.add(light);

        const getSizes = () => {
            const parent = container;
            return {
                width: parent && parent.clientWidth > 0 ? parent.clientWidth : window.innerWidth,
                height: parent && parent.clientHeight > 0 ? parent.clientHeight : window.innerHeight
            };
        };

        const sizes = getSizes();
        const camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.1,
            100
        );
        camera.position.set(0, 0, 2);
        scene.add(camera);
        cameraRef.current = camera;

        // OrbitControls listens to container so dragging works everywhere
        const controls = new OrbitControls(camera, container);
        controls.enableDamping = true;
        controls.minPolarAngle = Math.PI / 2;
        controls.maxPolarAngle = Math.PI / 2;
        controls.enablePan = false;
        controls.enableZoom = false;
        controlsRef.current = controls;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const handleResize = () => {
            const newSizes = getSizes();
            sizes.width = newSizes.width;
            sizes.height = newSizes.height;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        // Precompute 3D world positions for headers and cards
        const RADIUS = 8.5; // Radius around origin
        const headerPositions: { idx: number; pos: THREE.Vector3 }[] = [];
        const cardPositions: { id: string; pos: THREE.Vector3 }[] = [];

        clusters.forEach((cluster, clusterIdx) => {
            // Header 3D position
            const hAngle = cluster.baseAngle;
            const hPos = new THREE.Vector3(
                RADIUS * Math.sin(hAngle),
                1.35, // Above the cards
                -RADIUS * Math.cos(hAngle)
            );
            headerPositions.push({
                idx: clusterIdx,
                pos: hPos,
            });

            // Card 3D positions
            cluster.cards.forEach((card) => {
                const cAngle = cluster.baseAngle + card.angleOffset;
                const cPos = new THREE.Vector3(
                    RADIUS * Math.sin(cAngle),
                    card.yOffset ?? -0.1,
                    -RADIUS * Math.cos(cAngle)
                );
                cardPositions.push({
                    id: card.id,
                    pos: cPos,
                });
            });
        });

        // Projection helper
        const camForward = new THREE.Vector3();
        const toPoint = new THREE.Vector3();

        const updatePosition = (el: HTMLElement | null, pos: THREE.Vector3, isHeader = false) => {
            if (!el) return;

            // Vector from camera to target point
            toPoint.subVectors(pos, camera.position).normalize();
            camera.getWorldDirection(camForward);

            const dot = camForward.dot(toPoint);

            // Hide if behind camera
            if (dot < 0.22) {
                el.style.opacity = '0';
                el.style.pointerEvents = 'none';
                el.style.visibility = 'hidden';
                return;
            }

            const projected = pos.clone().project(camera);
            const x = (projected.x * 0.5 + 0.5) * sizes.width;
            const y = (-projected.y * 0.5 + 0.5) * sizes.height;

            el.style.visibility = 'visible';
            // Default visible state
            el.style.opacity = '1';
            el.style.pointerEvents = 'auto';

            if (!isHeader) {
                const id = el.dataset.id;
                if (id && !animatedRefs.current.has(id)) {
                    // Animate from bottom quickly
                    el.style.transition = 'transform 0.12s ease-out, opacity 0.12s ease-out';
                    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1) + window.innerHeight}px, 0) translate(-50%, -50%)`;
                    requestAnimationFrame(() => {
                        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
                    });
                    animatedRefs.current.add(id);
                } else {
                    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
                }
            } else {
                // Headers: direct placement
                el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
            }
        };

        let animationFrameId: number;
        const tick = () => {
            controls.update();

            // Refresh DOM refs if they were updated
            headerPositions.forEach((item) => {
                const el = clusterHeaderRefs.current[item.idx] || null;
                updatePosition(el, item.pos, true);
            });

            cardPositions.forEach((item) => {
                const el = cardElementRefs.current.get(item.id) || null;
                updatePosition(el, item.pos, false);
            });

            renderer.render(scene, camera);
            animationFrameId = window.requestAnimationFrame(tick);
        };

        tick();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.cancelAnimationFrame(animationFrameId);
            controls.dispose();
            renderer.dispose();
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach((mat) => mat.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
        };
    }, [clusters]);

    return (
        <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            className="relative w-full h-full select-none overflow-hidden cursor-grab active:cursor-grabbing"
        >
            {/* Three.js WebGL Canvas */}
            <canvas
                ref={canvasRef}
                className="webgl block w-full h-full outline-none"
            />

            {/* 3D Floating Billboards / Event Clusters */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                {clusters.map((cluster, clusterIdx) => (
                    <div key={cluster.id}>
                        {/* Cluster Category Title */}
                        <div
                            ref={(el) => {
                                clusterHeaderRefs.current[clusterIdx] = el;
                            }}
                            className="absolute top-0 left-0 text-center will-change-transform transition-opacity duration-150 select-none pointer-events-none"
                            style={{ opacity: 0 }}
                        >
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-md">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                    <span>μCR Spotlight</span>
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                                {cluster.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-200/90 font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mt-0.5">
                                {cluster.subtitle}
                            </p>
                        </div>

                        {/* Cards inside this cluster */}
                        {cluster.cards.map((card) => (
                            <div
                                key={card.id}
                                ref={(el) => {
                                    if (el) cardElementRefs.current.set(card.id, el);
                                    else cardElementRefs.current.delete(card.id);
                                }}
                                onClick={() => handleCardClick(card.link)}
                                className="group absolute top-0 left-0 w-[240px] sm:w-[270px] md:w-[290px] bg-white text-gray-900 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-black/10 will-change-transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-violet-500/60 cursor-pointer pointer-events-auto select-none"
                                style={{ opacity: 0 }}
                            >
                                {/* Thumbnail Image */}
                                <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-gray-900">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    {/* Tag Badge */}
                                    <span
                                        className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-md ${card.tagColor}`}
                                    >
                                        {card.tag}
                                    </span>
                                </div>

                                {/* Content Details */}
                                <div className="p-4 sm:p-4.5 flex flex-col justify-between space-y-2">
                                    {card.dateOrMeta && (
                                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                                            <Calendar className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                                            <span>{card.dateOrMeta}</span>
                                        </div>
                                    )}
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug group-hover:text-violet-600 transition-colors line-clamp-2">
                                        {card.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                        {card.subtitle}
                                    </p>

                                    {/* Action link */}
                                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-violet-600 group-hover:text-violet-700">
                                        <span>Explore Details</span>
                                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Quick Tour Navigation Controls (Top Right, matching MIT virtual tour) */}
            <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        rotateToNext(1);
                    }}
                    className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl"
                    aria-label="Rotate Left"
                    title="Previous Section"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        rotateToNext(-1);
                    }}
                    className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl"
                    aria-label="Rotate Right"
                    title="Next Section"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Sac;