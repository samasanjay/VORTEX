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
    <section className="py-24 bg-[#F8FAFC] border-t border-slate-200/80 relative">
      <div className="container-vortex">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono text-purple-700 tracking-widest uppercase mb-2 flex items-center gap-2 font-semibold">
              <Sparkles className="w-4 h-4 text-purple-600" />
              LABORATORY EXPLORATIONS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-900">
              CREATIVE EXPERIMENTS
            </h2>
          </div>
          <p className="text-slate-600 font-body text-sm sm:text-base max-w-md mt-4 md:mt-0">
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
              className="group rounded-3xl border border-slate-200 bg-white overflow-hidden hover:border-purple-300 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-md hover:shadow-xl"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200">
                  <img
                    src={exp.featuredImage}
                    alt={exp.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="badge-concept bg-white/95 border border-purple-300 text-purple-800 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-mono text-purple-700 uppercase font-bold block">
                    {exp.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-slate-900 group-hover:text-purple-700 transition-colors">
                    {exp.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 font-medium">
                  {exp.status}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-purple-700 group-hover:translate-x-1 transition-transform">
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
