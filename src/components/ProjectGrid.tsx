import React, { useState, useMemo } from 'react';
import type { Project, FilterCategory } from '../types/project';
import { ArrowUpRight, CheckCircle2, Sparkles, Filter } from 'lucide-react';

interface ProjectGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');

  const filterTabs: FilterCategory[] = [
    'ALL',
    'WEBSITES',
    'WEB APPS',
    'MOBILE APPS',
    'SAAS',
    'DASHBOARDS',
    '3D',
    'EXPERIMENTS',
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projects;
    return projects.filter((p) => p.filterTags.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <section id="work" className="py-24 bg-[#080B12] relative border-t border-slate-800/80">
      <div className="container-vortex">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/50 text-xs font-mono text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO DIRECTORY</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            SELECTED WORK
          </h2>
          <p className="text-slate-300 font-body text-base sm:text-lg">
            A collection of digital products, interfaces and experiences.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md max-w-full">
            <div className="hidden sm:flex items-center gap-1.5 pl-3 pr-2 text-xs font-mono text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span>FILTER:</span>
            </div>
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  data-cursor="FILTER"
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-card flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300"
            >
              <div>
                {/* Visual Preview Frame */}
                <div
                  onClick={() => onSelectProject(project)}
                  className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer border-b border-slate-800/80"
                  data-cursor="OPEN"
                >
                  <img
                    src={project.featuredImage}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Top Type Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={
                        project.type === 'EXPERIMENTAL CONCEPT' ? 'badge-concept' : 'badge-sample'
                      }
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {project.type}
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-slate-300 backdrop-blur-sm">
                    {project.year}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-blue-600 text-white font-mono text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-lg">
                      <span>VIEW PROJECT</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-[11px] font-mono font-semibold tracking-wider text-blue-400 uppercase mb-1">
                      {project.category}
                    </div>
                    <h3
                      onClick={() => onSelectProject(project)}
                      className="font-display font-bold text-xl text-white group-hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      {project.name}
                    </h3>
                  </div>

                  <p className="text-slate-400 font-body text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="badge-tech text-[11px]">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="badge-tech text-[11px] text-slate-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-6 pt-0 border-t border-slate-800/40 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  {project.status}
                </span>
                <button
                  onClick={() => onSelectProject(project)}
                  data-cursor="CASE STUDY"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-0.5 transition-all"
                >
                  <span>Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
