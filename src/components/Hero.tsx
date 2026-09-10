import React from 'react';
import { ArrowDown, Sparkles, Layers, Cpu, Compass } from 'lucide-react';
import { Hero3D } from './Hero3D';

interface HeroProps {
  onExploreWork: () => void;
  onViewExperiments: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onViewExperiments }) => {
  return (
    <section className="relative min-h-[90vh] pt-24 sm:pt-32 pb-20 flex items-center overflow-hidden bg-radial-gradient">
      {/* Background Animated Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      
      {/* Atmospheric Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />

      <div className="container-vortex relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Small Studio Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-widest text-slate-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="font-bold text-blue-700">WORKVORTEX</span>
              <span className="text-slate-300">/</span>
              <span className="font-semibold">DIGITAL STUDIO</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] tracking-tight leading-[1.02] text-slate-900">
              DIGITAL<br />
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EXPERIENCES
              </span><br />
              BUILT DIFFERENT.
            </h1>

            {/* Supporting Line */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-body leading-relaxed">
              A collection of interfaces, products and digital experiences designed and developed by{' '}
              <strong className="text-slate-900 font-bold">WORKVORTEX</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                onClick={onExploreWork}
                data-cursor="EXPLORE"
                className="btn-primary py-3.5 px-7 font-mono text-sm tracking-wider flex items-center gap-2 group shadow-md"
              >
                <span>EXPLORE THE WORK</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#lab"
                onClick={onViewExperiments}
                data-cursor="3D LAB"
                className="btn-secondary py-3.5 px-7 font-mono text-sm tracking-wider flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>VIEW EXPERIMENTS</span>
              </a>
            </div>

            {/* Studio Capabilities Micro-badges */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5 text-xs font-mono text-slate-600">
                <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium">UI/UX & Product Design</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono text-slate-600">
                <Cpu className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="font-medium">Modern Web & Mobile</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-mono text-slate-600 col-span-2 sm:col-span-1">
                <Compass className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-medium">Interactive 3D Systems</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Centerpiece Frame */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-sky-500/10 rounded-3xl blur-2xl -z-10" />
              <div className="relative rounded-2xl border border-slate-200/90 bg-white/70 backdrop-blur-md overflow-hidden p-2 shadow-xl">
                <Hero3D />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-200/80 pt-2 pointer-events-none">
                  <span>ORBIT: REAL-TIME WEBGL</span>
                  <span className="font-semibold text-blue-600">FPS: 60 (ACCELERATED)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
