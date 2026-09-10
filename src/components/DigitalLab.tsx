import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Sliders, Box, Radio } from 'lucide-react';

export const DigitalLab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [particleDensity, setParticleDensity] = useState<'high' | 'medium'>('high');

  const wireframeRef = useRef(wireframe);
  const speedRef = useRef(rotationSpeed);
  wireframeRef.current = wireframe;
  speedRef.current = rotationSpeed;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Digital Geodesic Icosahedron Sphere
    const sphereGeom = new THREE.IcosahedronGeometry(1.8, 4);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0a1128,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: false,
    });
    const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
    group.add(sphereMesh);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(sphereGeom, wireMat);
    wireMesh.scale.set(1.02, 1.02, 1.02);
    group.add(wireMesh);

    // 2. Surrounding Orbital Nodes
    const nodeCount = 18;
    const nodeGroup = new THREE.Group();
    group.add(nodeGroup);

    const smallGeom = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const smallMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6 });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(smallGeom, smallMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const r = 2.7;
      node.position.set(Math.cos(angle) * r, (Math.sin(angle * 3) * 0.6), Math.sin(angle) * r);
      nodeGroup.add(node);
    }

    // 3. Volumetric Particle Dust
    const dustCount = particleDensity === 'high' ? 400 : 200;
    const dustGeom = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 10;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeom, dustMat);
    scene.add(dust);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambLight);

    const pLight1 = new THREE.PointLight(0x06b6d4, 4, 30);
    pLight1.position.set(4, 4, 4);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight(0x8b5cf6, 3, 30);
    pLight2.position.set(-4, -4, 2);
    scene.add(pLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMove);

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
    let animId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const speed = speedRef.current;
      wireMesh.visible = wireframeRef.current;

      group.rotation.y += delta * 0.4 * speed + mouseX * 0.01;
      group.rotation.x += delta * 0.2 * speed + mouseY * 0.01;

      nodeGroup.rotation.y = -elapsed * 0.3 * speed;
      nodeGroup.rotation.z = Math.sin(elapsed * 0.5) * 0.2;

      dust.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
    };
    renderLoop();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [particleDensity]);

  return (
    <section id="lab" className="py-24 bg-[#05070D] border-t border-slate-800 relative overflow-hidden bg-lab-gradient">
      <div className="container-vortex relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/50 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE 3D LAB</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            DIGITAL LAB
          </h2>
          <p className="text-slate-300 font-body text-base sm:text-lg">
            Experiments beyond the interface. Exploring spatial geometry, real-time shaders, and reactive 3D computing environments.
          </p>
        </div>

        {/* 3D Lab Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* WebGL Canvas & Live Parameters */}
          <div className="lg:col-span-8 relative rounded-3xl border border-slate-800 bg-[#070A14] overflow-hidden shadow-2xl">
            {/* Top HUD Bar */}
            <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="badge-concept">
                  EXPERIMENTAL CONCEPT
                </span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
                  EXPERIMENT 04-X: TOPOLOGICAL VORTEX SPHERE
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>GPU SHADER: LIVE</span>
              </div>
            </div>

            {/* Three.js Canvas Container */}
            <div
              ref={mountRef}
              className="relative w-full h-[400px] sm:h-[480px] cursor-grab active:cursor-grabbing"
              data-cursor="ROTATE 3D"
              aria-label="Interactive 3D Digital Lab Sphere"
            />

            {/* Bottom Interactive Parameter Bar */}
            <div className="p-4 sm:p-6 bg-slate-900/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>LIVE PARAMETERS:</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Wireframe Toggle */}
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                    wireframe
                      ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  <Box className="w-3 h-3" />
                  <span>Wireframe {wireframe ? 'ON' : 'OFF'}</span>
                </button>

                {/* Speed Slider */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>Speed:</span>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.5"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                    className="w-20 accent-cyan-400 cursor-pointer"
                  />
                  <span className="text-cyan-400 w-6">{rotationSpeed}x</span>
                </div>

                {/* Density */}
                <button
                  onClick={() => setParticleDensity(particleDensity === 'high' ? 'medium' : 'high')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
                >
                  Particles: {particleDensity.toUpperCase()}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Lab Experiments Index */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>EXP-01</span>
                <span className="text-cyan-400">THREE.JS / SHADERS</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">Topological Mesh Deformer</h4>
              <p className="text-xs text-slate-300 font-body leading-relaxed">
                Real-time GPU vertex displacement evaluating dynamic mathematical vortex algorithms.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>EXP-02</span>
                <span className="text-purple-400">WEB AUDIO API</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">Volumetric Acoustic Refraction</h4>
              <p className="text-xs text-slate-300 font-body leading-relaxed">
                Frequency spectrum mapping that displaces 3D glass geometry based on acoustic amplitude.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>EXP-03</span>
                <span className="text-blue-400">SPATIAL UI</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">Spatial Depth Matrix</h4>
              <p className="text-xs text-slate-300 font-body leading-relaxed">
                Multi-layer z-index physics simulated in WebGL for next-generation spatial computing interfaces.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
