import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Sparkles } from 'lucide-react';

import px from '../assets/5/px.webp';
import nx from '../assets/5/nx.webp';
import py from '../assets/5/py.webp';
import ny from '../assets/5/ny.webp';
import pz from '../assets/5/pz.webp';
import nz from '../assets/5/nz.webp';

import orientationImg from '../assets/orientation.webp';
import clawclashImg from '../assets/clawclash.webp';
import coreteam from '../assets/coreteam.webp';
import ucrlife from '../assets/ucrlife.webp';
import hardware from '../assets/hardware.webp';
import software from '../assets/software.webp';
import robosoccer from '../assets/robosoccer.webp'
import rcplane from '../assets/rcplane.webp'
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
        if (Math.hypot(dx, dy) > 4) {
            isDraggingRef.current = true;
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        // Reset dragging flag; a click without movement should navigate
        isDraggingRef.current = false;
    };

    // Existing handlers unchanged
    const handleCardClick = (link: string) => {
        console.log('Card clicked, navigating to', link);
        if (isDraggingRef.current) return; // Prevent navigation if user was orbiting
        navigate(link);
    };

    // 4 clusters spaced at 90 degrees around the 360 room (0, PI/2, PI, 3*PI/2)
    // Cards have well-spaced angle offsets (-0.24 and +0.24 radians) to prevent clustering/overlapping
    const clusters: EventCluster[] = useMemo(() => [
        {
            id: 'workshops',
            title: 'Events & Workshops',
            subtitle: '50+ Past Events • Hands-on Robotics & Firmware',
            baseAngle: 0, // Front view (default)
            cards: [
                {
                    id: 'orientation26',
                    title: 'Orientation ’26 & Hands-On Robotics',
                    tag: 'Introductory Event',
                    tagColor: 'bg-yellow-400 text-black',
                    subtitle: 'Annual club orientation, live bot showcase & hands on where 1st learn about hub and its activity.',
                    image: orientationImg,
                    dateOrMeta: '11-13 Sept • LT3 & TV Room',
                    link: '/gallery',
                    angleOffset: -0.25,
                    yOffset: -0.7,
                },
                {
                    id: 'clawclash',
                    title: 'Clawclash',
                    tag: 'Flagship Event . LIVE',
                    tagColor: 'bg-red-500 text-white',
                    subtitle: 'Pick and Place bots competitions with crazy twist',
                    image: clawclashImg,
                    dateOrMeta: '2026 event • Arena Battle',
                    link: '/projects',
                    angleOffset: 0.25,
                    yOffset: -0.7,
                },
            ],
        },
        {
            id: 'flagship',
            title: 'Flagship Projects',
            subtitle: '25+ Prototypes • Custom Circuit & Firmware Designs',
            baseAngle: Math.PI / 2, 
            cards: [
                {
                    id: 'robosoccer',
                    title: 'RoboSoccer Striker',
                    tag: 'Autonomous',
                    tagColor: 'bg-blue-500 text-white',
                    subtitle: 'High-speed competitive omni-drive robots with pneumatic kicker systems',
                    image: robosoccer,
                    dateOrMeta: 'NRF24L01+ • Omni-Wheel',
                    link: '/projects',
                    angleOffset: -0.25,
                    yOffset: -0.7,
                },
                {
                    id: 'RC Plane',
                    title: 'Autonomous RC Plane',
                    tag: 'Flight Control & Aerodynamics',
                    tagColor: 'bg-sky-400 text-black',
                    subtitle: 'Fixed-wing RC aircraft with servo-based control, flight stabilization and autonomous navigation',
                    image: rcplane,
                    dateOrMeta: 'RC Aircraft • Autonomous Flight',
                    link: '/projects',
                    angleOffset: 0.25,
                    yOffset: -0.7,
                }
            ],
        },
        {
            id: 'domains',
            title: 'Explore Engineering Domains',
            subtitle: 'Software • Electronics • Embedded • Mechanical',
            baseAngle: Math.PI,
            cards: [
                {
                    id: 'software',
                    title: 'Software & Intelligent Systems',
                    tag: 'Code the Intelligence',
                    tagColor: 'bg-blue-500 text-white',
                    subtitle: 'Robotics software, computer vision, AI/ML and autonomous system development',
                    image: software,
                    dateOrMeta: 'Software • AI • Computer Vision',
                    link: '/domains',
                    angleOffset: -0.25,
                    yOffset: -0.7,
                },
                {
                    id: 'hardware',
                    title: 'Embedded & Hardware Systems',
                    tag: 'Engineer the Machine',
                    tagColor: 'bg-orange-500 text-white',
                    subtitle: 'Microcontrollers, electronics, sensors, motor control and real-world hardware integration',
                    image: hardware,
                    dateOrMeta: 'Electronics • Embedded • Control',
                    link: '/domains',
                    angleOffset: 0.25,
                    yOffset: -0.7,
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
                    title: 'Meet the Minds Behind μCR',
                    tag: 'The People Behind the Builds',
                    tagColor: 'bg-purple-600 text-white',
                    subtitle: 'Meet the mentors, leaders and passionate builders driving μCR forward across technical, embedded and management domains.',
                    image: coreteam,
                    dateOrMeta: 'Advisors & Core Team • 2026-27',
                    link: '/team',
                    angleOffset: -0.25,
                    yOffset: -0.7,
                },
                {
                    id: 'lifeatmucr',
                    title: 'Life at μCR',
                    tag: 'More Than Robotics',
                    tagColor: 'bg-teal-600 text-white',
                    subtitle: 'The people, teamwork, chaos and unforgettable experiences behind every build.',
                    image: ucrlife,
                    dateOrMeta: 'People • Projects • Memories',
                    link: '/gallery',
                    angleOffset: 0.25,
                    yOffset: -0.7,
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
        controls.dampingFactor = 0.08;
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
            // Header 3D position (raised up to give full visibility to title and subtitle)
            const hAngle = cluster.baseAngle;
            const hPos = new THREE.Vector3(
                RADIUS * Math.sin(hAngle),
                2.35, // Clear vertical elevation above cards
                -RADIUS * Math.cos(hAngle)
            );
            headerPositions.push({
                idx: clusterIdx,
                pos: hPos,
            });

            // Card 3D positions (placed in lower view so they never hide the header text)
            cluster.cards.forEach((card) => {
                const cAngle = cluster.baseAngle + card.angleOffset;
                const cPos = new THREE.Vector3(
                    RADIUS * Math.sin(cAngle),
                    card.yOffset ?? -0.7,
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

        // Smooth positional updater without CSS transitions fighting the 60fps render loop
        const updatePosition = (el: HTMLElement | null, pos: THREE.Vector3, isHeader = false) => {
            if (!el) return;

            // Vector from camera to target point
            toPoint.subVectors(pos, camera.position).normalize();
            camera.getWorldDirection(camForward);

            const dot = camForward.dot(toPoint);

            // Smooth angular fade threshold to avoid sudden popping/spawning from anywhere
            const minDot = 0.26;
            const maxDot = 0.54;

            if (dot < minDot) {
                el.style.opacity = '0';
                el.style.pointerEvents = 'none';
                el.style.visibility = 'hidden';
                return;
            }

            // Smooth cubic fade between minDot and maxDot
            const t = Math.min(Math.max((dot - minDot) / (maxDot - minDot), 0), 1);
            const smoothOpacity = t * t * (3 - 2 * t);

            const projected = pos.clone().project(camera);
            const x = (projected.x * 0.5 + 0.5) * sizes.width;
            const y = (-projected.y * 0.5 + 0.5) * sizes.height;

            el.style.visibility = 'visible';
            el.style.opacity = smoothOpacity.toFixed(3);
            el.style.pointerEvents = smoothOpacity > 0.65 ? 'auto' : 'none';

            // Natural scale factor that gently blooms when coming into field of view
            const scale = (0.92 + 0.08 * smoothOpacity).toFixed(3);
            el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale})`;
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
            onPointerUp={handlePointerUp}
            className="relative w-full h-full select-none overflow-hidden cursor-grab active:cursor-grabbing"
        >
            {/* Three.js WebGL Canvas */}
            <canvas
                ref={canvasRef}
                className="webgl block w-full h-full outline-none"
            />

            {/* 3D Floating Billboards / Event Clusters */}
            <div className="absolute inset-0 overflow-hidden z-20">
                {clusters.map((cluster, clusterIdx) => (
                    <div key={cluster.id}>
                        {/* Cluster Category Title */}
                        <div
                            ref={(el) => {
                                clusterHeaderRefs.current[clusterIdx] = el;
                            }}
                            className="absolute top-0 left-0 text-center will-change-transform select-none pointer-events-none"
                            style={{ opacity: 0 }}
                        >
                            <div className="flex items-center justify-center gap-2 mb-1.5">
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border-2 border-black bg-yellow-400 text-black shadow-[3px_3px_0_black]">
                                    <Sparkles className="w-3.5 h-3.5 text-black" />
                                    <span>μCR Spotlight</span>
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                                {cluster.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-white/95 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mt-1 max-w-lg mx-auto">
                                {cluster.subtitle}
                            </p>
                        </div>

                        {cluster.cards.map((card) => (
                            <div
                                key={card.id}
                                ref={(el) => {
                                    if (el) cardElementRefs.current.set(card.id, el);
                                    else cardElementRefs.current.delete(card.id);
                                }}
                                onClick={() => handleCardClick(card.link)}
                                className="group absolute top-0 left-0 w-[240px] sm:w-[270px] md:w-[285px] bg-[#fffdf7] text-black rounded-2xl overflow-hidden border-2 border-black shadow-[6px_6px_0_black] hover:shadow-[6px_6px_0_#facc15] hover:-translate-y-1.5 will-change-transform cursor-pointer pointer-events-auto select-none transition-shadow duration-200"
                                style={{ opacity: 0 }}
                            >
                                {/* Thumbnail Image */}
                                <div className="relative h-28 sm:h-32 w-full overflow-hidden border-b-2 border-black bg-neutral-900">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        draggable={false}
                                    />
                                    {/* Tag Badge */}
                                    <span
                                        className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border-2 border-black shadow-[2px_2px_0_black] ${card.tagColor}`}
                                    >
                                        {card.tag}
                                    </span>
                                </div>

                                {/* Content Details */}
                                <div className="p-3.5 sm:p-4 flex flex-col justify-between space-y-2">
                                    {card.dateOrMeta && (
                                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-600">
                                            <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                            <span>{card.dateOrMeta}</span>
                                        </div>
                                    )}
                                    <h3 className="text-sm sm:text-base font-bold text-black leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {card.title}
                                    </h3>
                                    <p className="text-xs text-neutral-700 leading-relaxed line-clamp-3">
                                        {card.subtitle}
                                    </p>

                                    {/* Action link */}
                                    {/*<div className="pt-2 border-t-2 border-black/10 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800 transition-colors">
                                        <span>Explore Details</span>
                                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>*/}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sac;