import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useEffect, useRef } from 'react'

import px from '../assets/5/px.jpg';
import nx from '../assets/5/nx.jpg';
import py from '../assets/5/py.jpg';
import ny from '../assets/5/ny.jpg';
import pz from '../assets/5/pz.jpg';
import nz from '../assets/5/nz.jpg';

const Sac=()=>{
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const scene = new THREE.Scene()
        const cubeTextureLoader = new THREE.CubeTextureLoader()
        const environmentMapTexture = cubeTextureLoader.load([
            px,
            nx,
            py,
            ny,
            pz,
            nz
        ])
        scene.background = environmentMapTexture
        scene.environment = environmentMapTexture
        const ambientLight = new THREE.AmbientLight(
            0xffffff,
            0.5
        )
        scene.add(ambientLight)
        const light = new THREE.PointLight(
            0xffffff,
            0.5
        )
        light.position.set(2, 3, 4)
        scene.add(light)
        const getSizes = () => {
            const parent = canvas.parentElement;
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
        )

        camera.position.set(0, 0, 2)

        scene.add(camera)
        const controls = new OrbitControls(
            camera,
            canvas
        )

        controls.enableDamping = true
        controls.minPolarAngle = Math.PI / 2
        controls.maxPolarAngle = Math.PI / 2
        controls.enablePan = false
        controls.enableZoom = false
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        })
        renderer.setSize(
            sizes.width,
            sizes.height
        )

        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        )
        const handleResize = () => {
            const newSizes = getSizes();
            sizes.width = newSizes.width;
            sizes.height = newSizes.height;
            camera.aspect =
                sizes.width / sizes.height
            camera.updateProjectionMatrix()
            renderer.setSize(
                sizes.width,
                sizes.height
            )

            renderer.setPixelRatio(
                Math.min(window.devicePixelRatio, 2)
            )
        }

        window.addEventListener(
            'resize',
            handleResize
        )
        const clock = new THREE.Clock()
        let animationFrameId: number
        const tick = () => {
            const elapsedTime =
                clock.getElapsedTime()
            controls.update()
            renderer.render(
                scene,
                camera
            )

            animationFrameId =
                window.requestAnimationFrame(tick)
        }

        tick()
        return () => {
            window.removeEventListener(
                'resize',
                handleResize
            )
            window.cancelAnimationFrame(
                animationFrameId
            )
            controls.dispose()
            renderer.dispose()
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose()
                    if (Array.isArray(object.material)) {
                        object.material.forEach(
                            material => material.dispose()
                        )
                    } else {
                        object.material.dispose()
                    }
                }
            })
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="webgl block w-full h-full outline-none"
        />
    )
}

export default Sac