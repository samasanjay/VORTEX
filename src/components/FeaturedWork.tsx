import React from 'react';
import type { Project } from '../types/project';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface FeaturedWorkProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ projects, onSelectProject }) => {
  const featured = projects.filter((p) => ['velora', 'taskflow', 'finmate'].includes(p.id));

  return (
    <section className="py-24 border-t border-slate-200/80 bg-white">
      <div className="container-vortex">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono text-blue-600 tracking-widest uppercase mb-2 flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              CURATED SELECTION
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-900">
              FEATURED DIGITAL WORK
            </h2>
          </div>
          <p className="text-slate-600 font-body text-sm sm:text-base max-w-md mt-4 md:mt-0">
            Three flagship demonstration platforms designed and architected with high aesthetic and technical standards.
          </p>
        </div>

        {/* Project Vertical Showcase */}
        <div className="space-y-20">
          {featured.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={project.id}
                className="group relative rounded-3xl border border-slate-200 bg-[#F8FAFC] overflow-hidden hover:border-blue-300 transition-all duration-500 shadow-md hover:shadow-xl"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Left / Info Column */}
                  <div className={`lg:col-span-5 p-8 sm:p-12 space-y-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Index Numeral & Badge */}
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-4xl sm:text-5xl text-slate-300 group-hover:text-blue-500/40 transition-colors">
                        {project.featuredNumber}
                      </span>
                      <span className="badge-sample">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        {project.type}
                      </span>
                    </div>

                    {/* Category & Title */}
                    <div>
                      <div className="text-xs font-mono tracking-wider text-blue-600 uppercase font-bold mb-1">
                        {project.category}
                      </div>
                      <h3 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                        {project.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 font-body text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlight Box */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-body leading-relaxed shadow-sm">
                      <strong className="text-slate-900 block font-mono text-[11px] uppercase tracking-wider mb-1">
                        Design & Tech Highlight
                      </strong>
                      {project.highlightSummary}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="badge-tech font-mono text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <button
                        onClick={() => onSelectProject(project)}
                        data-cursor="CASE STUDY"
                        className="btn-primary py-3 px-6 font-mono text-xs tracking-wider flex items-center gap-2 group/btn"
                      >
                        <span>VIEW CASE STUDY</span>
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Right / Visual Preview Column */}
                  <div className={`lg:col-span-7 p-4 sm:p-6 lg:p-8 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div
                      onClick={() => onSelectProject(project)}
                      data-cursor="INSPECT"
                      className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white cursor-pointer group-hover:border-blue-400/50 transition-all duration-500 shadow-md group/img"
                    >
                      {/* Browser Mockup Top Bar */}
                      <div className="px-4 py-2.5 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 tracking-wider font-medium">
                          workvortex.studio/{project.slug}
                        </div>
                        <div className="text-[10px] font-mono text-blue-700 font-bold">
                          2026 RELEASE
                        </div>
                      </div>

                      {/* Mockup Preview Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={project.featuredImage}
                          alt={`${project.name} - ${project.category}`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top group-hover/img:scale-[1.03] transition-transform duration-700"
                        />
                        {/* Interactive overlay on hover */}
                        <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                          <span className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-mono text-xs font-semibold tracking-wider shadow-lg flex items-center gap-2 transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                            <span>EXPLORE FULL CASE STUDY</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
