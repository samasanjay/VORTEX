import React from 'react';
import { ArrowDown, Sparkles, Layers, Cpu, Compass } from 'lucide-react';
import { Hero3D } from './Hero3D';

interface HeroProps {
  onExploreWork: () => void;
  onViewExperiments: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onViewExperiments }) => {
  return (
    <section className="relative min-h-[92vh] pt-28 sm:pt-36 pb-20 flex items-center overflow-hidden bg-radial-gradient">
      {/* Background Animated Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      
      {/* Atmospheric Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="container-vortex relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Small Studio Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono tracking-widest text-slate-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="font-semibold text-blue-400">WORKVORTEX</span>
              <span className="text-slate-600">/</span>
              <span>DIGITAL STUDIO</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tight leading-[1.02] text-white">
              DIGITAL<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                EXPERIENCES
              </span><br />
              BUILT DIFFERENT.
            </h1>

            {/* Supporting Line */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-body leading-relaxed">
              A collection of interfaces, products and digital experiences designed and developed by{' '}
              <strong className="text-white font-semibold">WORKVORTEX</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                onClick={onExploreWork}
                data-cursor="EXPLORE"
                className="btn-primary py-3.5 px-7 font-mono text-sm tracking-wider flex items-center gap-2 group"
              >
                <span>EXPLORE THE WORK</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#lab"
                onClick={onViewExperiments}
                data-cursor="3D LAB"
                className="btn-secondary py-3.5 px-7 font-mono text-sm tracking-wider flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>VIEW EXPERIMENTS</span>
              </a>
            </div>

            {/* Studio Capabilities Micro-badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400">
                <Layers className="w-4 h-4 text-blue-400 shrink-0" />
                <span>UI/UX & Product Design</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400">
                <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Modern Web & Mobile</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 col-span-2 sm:col-span-1">
                <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Interactive 3D Systems</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Centerpiece */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative">
              {/* Subtle background glow ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/10 to-cyan-500/20 rounded-3xl blur-3xl -z-10" />
              <div className="relative rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-sm overflow-hidden p-2 shadow-2xl">
                <Hero3D />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-2 pointer-events-none">
                  <span>ORBIT: REAL-TIME WEBGL</span>
                  <span>FPS: 60 (ACCELERATED)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
