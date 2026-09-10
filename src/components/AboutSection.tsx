import React from 'react';
import { ShieldCheck, Compass, Terminal, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'Aesthetic Restraint',
      description: 'Intentional minimalism, deliberate typography, and high-contrast editorial hierarchy over decoration.',
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
    },
    {
      title: 'Technical Integrity',
      description: 'Zero fluff or exaggerated metrics. Honest architecture with modern TypeScript, Next.js, and WebGL.',
      icon: <Terminal className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: 'Spatial & 3D Fluency',
      description: 'Pushing interfaces beyond flat 2D planes into volumetric depth, realtime shaders, and GPU acceleration.',
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: 'Performance Obsessed',
      description: 'Fluid 60–120 FPS animations, sub-second LCP load times, and accessible keyboard-first navigation.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#05070D] border-t border-slate-800 relative">
      <div className="container-vortex">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Mission Statement */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span>STUDIO PHILOSOPHY</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              WE BUILD DIGITAL EXPERIENCES.
            </h2>

            <div className="space-y-4 text-slate-300 font-body text-base sm:text-lg leading-relaxed">
              <p>
                <strong className="text-white">WORKVORTEX</strong> explores the intersection of design, technology and digital product development.
              </p>
              <p className="text-slate-400 text-sm sm:text-base">
                We design and develop modern interfaces, web experiences, applications and experimental digital products with an unyielding commitment to craftsmanship, performance, and honest presentation.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs font-mono text-slate-400 border-t border-slate-800">
              <div>
                <span className="block text-white font-bold text-base">2026</span>
                <span>Active Studio Studio Cycle</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="block text-white font-bold text-base">Global</span>
                <span>Distributed Digital Lab</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Studio Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl border border-slate-800 bg-[#0A0E1A] space-y-3 hover:border-slate-700 transition-all"
              >
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 inline-block">
                  {p.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-body leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
