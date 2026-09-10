import React from 'react';
import { ShieldCheck, Compass, Terminal, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'Aesthetic Restraint',
      description: 'Intentional minimalism, deliberate typography, and high-contrast editorial hierarchy over decoration.',
      icon: <Sparkles className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Technical Integrity',
      description: 'Zero fluff or exaggerated metrics. Honest architecture with modern TypeScript, Next.js, and WebGL.',
      icon: <Terminal className="w-5 h-5 text-indigo-600" />,
    },
    {
      title: 'Spatial & 3D Fluency',
      description: 'Pushing interfaces beyond flat 2D planes into volumetric depth, realtime shaders, and GPU acceleration.',
      icon: <Compass className="w-5 h-5 text-cyan-600" />,
    },
    {
      title: 'Performance Obsessed',
      description: 'Fluid 60–120 FPS animations, sub-second LCP load times, and accessible keyboard-first navigation.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <section id="about" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="container-vortex">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Mission Statement */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              <span>STUDIO PHILOSOPHY</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
              WE BUILD DIGITAL EXPERIENCES.
            </h2>

            <div className="space-y-4 text-slate-600 font-body text-base sm:text-lg leading-relaxed">
              <p>
                <strong className="text-slate-900">WORKVORTEX</strong> explores the intersection of design, technology and digital product development.
              </p>
              <p className="text-slate-600 text-sm sm:text-base">
                We design and develop modern interfaces, web experiences, applications and experimental digital products with an unyielding commitment to craftsmanship, performance, and honest presentation.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs font-mono text-slate-500 border-t border-slate-200">
              <div>
                <span className="block text-slate-900 font-bold text-base">2026</span>
                <span>Active Studio Cycle</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="block text-slate-900 font-bold text-base">Global</span>
                <span>Distributed Digital Lab</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Studio Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] space-y-3 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm inline-block">
                  {p.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
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
