import React from 'react';
import { ArrowDown, Layers, Cpu, Compass, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreWork: () => void;
  onViewExperiments: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork }) => {
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 md:pb-28 overflow-hidden bg-radial-gradient border-b border-slate-200/80">
      {/* Background Animated Subtle Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      
      <div className="container-vortex relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Small Studio Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="font-bold text-blue-600">WORKVORTEX</span>
              <span className="text-slate-300">/</span>
              <span className="font-medium text-slate-600">DIGITAL STUDIO</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] tracking-tight leading-[1.05] text-slate-900">
              DIGITAL<br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EXPERIENCES
              </span><br />
              BUILT DIFFERENT.
            </h1>

            {/* Supporting Line */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-body leading-relaxed">
              A curated collection of modern interfaces, digital products, software platforms, and mobile applications designed and engineered by <strong className="text-slate-900 font-semibold">WORKVORTEX</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#work"
                onClick={onExploreWork}
                className="btn-primary py-3 px-6 text-sm font-medium flex items-center gap-2 shadow-sm"
              >
                <span>Explore The Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#screens"
                className="btn-secondary py-3 px-6 text-sm font-medium flex items-center gap-2"
              >
                <span>Mobile Showcase</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Studio Capabilities Micro-badges */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium">UI/UX & Product Design</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Cpu className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="font-medium">Modern Web & Mobile</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600 col-span-2 sm:col-span-1">
                <Compass className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-medium">Design Systems & Specs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Mockup Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative space-y-4">
              
              {/* Primary Browser Card (Velora Preview) */}
              <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Browser bar */}
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 font-medium">
                    workvortex.studio/showcase
                  </div>
                  <span className="badge-sample text-[10px] py-0.5 px-2">
                    SAMPLE
                  </span>
                </div>

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src="/assets/projects/velora.jpg"
                    alt="WORKVORTEX Showcase preview"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Caption Bar */}
                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900">VELORA LUXURY E-COMMERCE</h4>
                    <span className="text-xs text-slate-500">Next.js • TypeScript • Tailwind CSS</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-blue-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Ready
                  </span>
                </div>
              </div>

              {/* Secondary Floating Mini Card (Taskflow preview overlay) */}
              <div className="hidden sm:flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-lg absolute -bottom-6 -left-6 z-20 max-w-xs animate-float">
                <img
                  src="/assets/projects/taskflow.jpg"
                  alt="Taskflow widget preview"
                  className="w-12 h-12 rounded-lg object-cover border border-slate-100"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">TASKFLOW PLATFORM</div>
                  <div className="text-[11px] text-slate-500">Agile sprint kanban cockpit</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
