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
      case 'Globe': return <Globe className="w-5 h-5 text-blue-400" />;
      case 'Code': return <Code className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      case 'Box': return <Box className="w-5 h-5 text-purple-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-sky-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'Database': return <Database className="w-5 h-5 text-amber-400" />;
      case 'Server': return <Server className="w-5 h-5 text-rose-400" />;
      case 'Radio': return <Radio className="w-5 h-5 text-violet-400" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-teal-400" />;
      default: return <Cpu className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section className="py-24 bg-[#060910] border-t border-slate-800 relative">
      <div className="container-vortex">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/50 text-xs font-mono text-blue-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>ENGINEERING FOUNDATION</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            BUILT WITH MODERN TECHNOLOGY
          </h2>
          <p className="text-slate-300 font-body text-base sm:text-lg">
            High-performance web stacks, type-safe data modeling, and GPU accelerated 3D graphics.
          </p>
        </div>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="p-6 rounded-2xl border border-slate-800 bg-[#0B0F1C] hover:border-blue-500/40 transition-all duration-300 space-y-4 flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    {getIcon(tech.iconName)}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {tech.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white">
                  {tech.name}
                </h3>

                <p className="text-xs text-slate-400 font-body leading-relaxed">
                  {tech.description}
                </p>
              </div>

              {/* Project tags */}
              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 block mb-1.5">
                  Featured In:
                </span>
                <div className="flex flex-wrap gap-1">
                  {tech.featuredIn.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-300"
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
