import React from 'react';
import { TECH_STACK } from '../data/projects';
import {
  Globe,
  Code,
  ShieldCheck,
  Box,
  Palette,
  Smartphone,
  Database,
  Server,
  Radio,
  GitBranch,
  Cpu
} from 'lucide-react';

export const TechStack: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe': return <Globe className="w-5 h-5 text-blue-600" />;
      case 'Code': return <Code className="w-5 h-5 text-cyan-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case 'Box': return <Box className="w-5 h-5 text-purple-600" />;
      case 'Palette': return <Palette className="w-5 h-5 text-sky-600" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-emerald-600" />;
      case 'Database': return <Database className="w-5 h-5 text-amber-600" />;
      case 'Server': return <Server className="w-5 h-5 text-rose-600" />;
      case 'Radio': return <Radio className="w-5 h-5 text-violet-600" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-teal-600" />;
      default: return <Cpu className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section className="py-24 bg-white border-t border-slate-200 relative">
      <div className="container-vortex">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>ENGINEERING FOUNDATION</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight">
            BUILT WITH MODERN TECHNOLOGY
          </h2>
          <p className="text-slate-600 font-body text-base sm:text-lg">
            High-performance web stacks, type-safe data modeling, and GPU accelerated 3D graphics.
          </p>
        </div>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="p-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] hover:border-blue-300 transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                    {getIcon(tech.iconName)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                    {tech.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-slate-900">
                  {tech.name}
                </h3>

                <p className="text-xs text-slate-600 font-body leading-relaxed">
                  {tech.description}
                </p>
              </div>

              {/* Project tags */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[10px] font-mono text-slate-500 font-semibold block mb-1.5">
                  Featured In:
                </span>
                <div className="flex flex-wrap gap-1">
                  {tech.featuredIn.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-blue-700 font-semibold shadow-xs"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
