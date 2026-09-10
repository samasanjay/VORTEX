import React from 'react';
import { Smartphone, CheckCircle2 } from 'lucide-react';

export const DeviceShowcase: React.FC = () => {

  const devices = [
    {
      id: 'fittrack',
      name: 'FITTRACK MOBILE',
      category: 'Native iOS & Android',
      description: 'Concentric biometric telemetry rings and sleep stage tracking running at 120 FPS.',
      image: '/assets/projects/fittrack.jpg',
      badge: 'SAMPLE PROJECT',
      stats: '120 FPS Physics / Reanimated 3',
      transform: 'rotateY(-12deg) rotateX(4deg)',
    },
    {
      id: 'velora',
      name: 'VELORA LUXURY MOBILE',
      category: 'Responsive E-Commerce',
      description: 'Fluid editorial capsule browsing and frictionless slide-up bag drawer.',
      image: '/assets/projects/velora.jpg',
      badge: 'SAMPLE PROJECT',
      stats: '0.8s LCP / Next.js Edge',
      transform: 'rotateY(0deg) scale(1.05)',
    },
    {
      id: 'taskflow',
      name: 'TASKFLOW POCKET HUD',
      category: 'Agile Companion',
      description: 'Instant sprint triage, real-time comment mentions, and biometric unlock.',
      image: '/assets/projects/taskflow.jpg',
      badge: 'SAMPLE PROJECT',
      stats: 'Optimistic State Sync',
      transform: 'rotateY(12deg) rotateX(4deg)',
    },
  ];

  return (
    <section className="py-24 bg-[#05080E] border-t border-slate-800 relative overflow-hidden">
      <div className="container-vortex">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/50 text-xs font-mono text-blue-400">
            <Smartphone className="w-3.5 h-3.5" />
            <span>RESPONSIVE EXCELLENCE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            DESIGNED FOR EVERY SCREEN
          </h2>
          <p className="text-slate-300 font-body text-base sm:text-lg">
            Every digital experience adapts flawlessly across ultra-wide desktop monitors, laptops, tablets, and mobile smartphones.
          </p>
        </div>

        {/* 3D Floating Phone Mockups Grid */}
        <div className="device-perspective-wrap grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {devices.map((dev) => (
            <div
              key={dev.id}
              className="phone-mockup-frame group rounded-3xl bg-[#090D18] border border-slate-800/90 p-6 flex flex-col justify-between"
              style={{ transform: dev.transform }}
              data-cursor="MOBILE"
            >
              {/* Phone Device Frame */}
              <div className="relative rounded-[2.5rem] bg-black border-4 border-slate-700/80 p-2 shadow-2xl overflow-hidden mb-6 aspect-[9/16] flex flex-col">
                {/* Dynamic Island Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-between px-3 border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                </div>

                {/* Screen Content */}
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-950">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Info Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-blue-400 uppercase font-semibold">
                    {dev.category}
                  </span>
                  <span className="badge-sample text-[10px]">
                    <CheckCircle2 className="w-3 h-3" />
                    {dev.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-blue-300 transition-colors">
                  {dev.name}
                </h3>

                <p className="text-xs text-slate-300 font-body leading-relaxed">
                  {dev.description}
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Engine:</span>
                  <span className="text-cyan-400 font-semibold">{dev.stats}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
