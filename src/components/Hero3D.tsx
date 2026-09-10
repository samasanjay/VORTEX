import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const vortexGroup = new THREE.Group();
    scene.add(vortexGroup);

    // 1. Core Geometric Torus Knot (Metallic Cobalt/Silver on Light Canvas)
    const knotGeometry = new THREE.TorusKnotGeometry(1.6, 0.45, 128, 32, 2, 3);
    
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.15,
      metalness: 0.85,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    vortexGroup.add(knotMesh);

    // 2. Wireframe Overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireframeMesh = new THREE.Mesh(knotGeometry, wireframeMaterial);
    wireframeMesh.scale.set(1.02, 1.02, 1.02);
    vortexGroup.add(wireframeMesh);

    // 3. Surrounding Floating Particle Field
    const particleCount = 400;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const blueColor = new THREE.Color(0x1d4ed8);
    const violetColor = new THREE.Color(0x7c3aed);
    const cyanColor = new THREE.Color(0x0284c7);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = i % 3 === 0 ? blueColor : i % 3 === 1 ? violetColor : cyanColor;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    vortexGroup.add(particleField);

    // 4. Outer Concentric Orbital Rings
    const ringGeometry = new THREE.RingGeometry(2.8, 2.83, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh1.rotation.x = Math.PI / 3;
    vortexGroup.add(ringMesh1);

    const ringMesh2 = ringMesh1.clone();
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.x = Math.PI / 6;
    (ringMesh2.material as THREE.MeshBasicMaterial).color = new THREE.Color(0x7c3aed);
    vortexGroup.add(ringMesh2);

    // Bright Studio Lights for Light Canvas
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(0x2563eb, 3, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7c3aed, 2.5, 50);
    pointLight2.position.set(-5, -5, 3);
    scene.add(pointLight2);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.6;
      targetY = y * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        knotMesh.rotation.x = elapsedTime * 0.25 + currentY * 0.5;
        knotMesh.rotation.y = elapsedTime * 0.35 + currentX * 0.5;

        wireframeMesh.rotation.x = knotMesh.rotation.x;
        wireframeMesh.rotation.y = knotMesh.rotation.y;

        particleField.rotation.y = -elapsedTime * 0.1 + currentX * 0.2;
        particleField.rotation.x = elapsedTime * 0.05;

        ringMesh1.rotation.z = elapsedTime * 0.15;
        ringMesh2.rotation.z = -elapsedTime * 0.12;

        vortexGroup.position.y = -scrollY * 0.001;
        vortexGroup.rotation.z = scrollY * 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      data-cursor="3D"
      aria-label="Interactive 3D WORKVORTEX centerpiece"
    >
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 text-[11px] font-mono text-slate-700 shadow-sm backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
        <span className="font-semibold">INTERACTIVE 3D CORE</span>
      </div>
    </div>
  );
};
