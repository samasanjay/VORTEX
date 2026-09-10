import React from 'react';
import type { Project } from '../types/project';
import { Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ExperimentsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Experiments: React.FC<ExperimentsProps> = ({ projects, onSelectProject }) => {
  const experimentalProjects = projects.filter((p) => p.type === 'EXPERIMENTAL CONCEPT');

  return (
    <section className="py-24 bg-[#070A12] border-t border-slate-800 relative">
      <div className="container-vortex">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              LABORATORY EXPLORATIONS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
              CREATIVE EXPERIMENTS
            </h2>
          </div>
          <p className="text-slate-400 font-body text-sm sm:text-base max-w-md mt-4 md:mt-0">
            Unconstrained technical and visual explorations testing the boundaries of spatial interfaces, AI node pipelines, and quantum telemetry.
          </p>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experimentalProjects.map((exp) => (
            <div
              key={exp.id}
              onClick={() => onSelectProject(exp)}
              data-cursor="EXPERIMENT"
              className="group rounded-3xl border border-purple-900/40 bg-[#0C101D] overflow-hidden hover:border-purple-500/60 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-slate-800">
                  <img
                    src={exp.featuredImage}
                    alt={exp.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="badge-concept">
                      <CheckCircle2 className="w-3 h-3" />
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-mono text-purple-400 uppercase font-semibold block">
                    {exp.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-purple-300 transition-colors">
                    {exp.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  {exp.status}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
                  <span>Inspect Concept</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
