import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { PROJECTS } from '../data/projects';
import { SEO } from '../components/SEO';
import { buildBreadcrumbSchema } from '../config/seo';
import type { Project } from '../types/api';
import { ArrowUpRight, Search, CheckCircle2, Filter } from 'lucide-react';

export const WorkPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getProjects({ status: 'PUBLISHED' })
      .then((res) => {
        if (res.projects && res.projects.length > 0) {
          setProjects(res.projects);
        } else {
          // fallback to static typed dataset
          setProjects(
            PROJECTS.map((p) => ({
              id: p.id,
              slug: p.slug,
              title: p.name,
              category: p.category,
              filter_tags: p.filterTags,
              short_description: p.description,
              type: p.type,
              year: p.year,
              status: 'PUBLISHED',
              featured: 1,
              featured_image: p.featuredImage,
              technologies: p.technologies,
              metrics: [],
              color_palette: [],
              typography: [],
              screens: [],
              display_order: 0,
            }))
          );
        }
      })
      .catch(() => {
        setProjects(
          PROJECTS.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.name,
            category: p.category,
            filter_tags: p.filterTags,
            short_description: p.description,
            type: p.type,
            year: p.year,
            status: 'PUBLISHED',
            featured: 1,
            featured_image: p.featuredImage,
            technologies: p.technologies,
            metrics: [],
            color_palette: [],
            typography: [],
            screens: [],
            display_order: 0,
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const filterTabs = ['ALL', 'WEBSITES', 'SAAS', 'MOBILE', 'AUTOMATION'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === 'ALL' ||
        project.category?.toUpperCase() === activeFilter ||
        project.filter_tags?.includes(activeFilter);
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.category && project.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [projects, activeFilter, searchQuery]);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Selected Work', path: '/work' },
  ]);

  return (
    <div className="pt-32 pb-24 bg-[#F8FAFC] font-body">
      <SEO
        title="Selected Digital Work & Product Case Studies — WORKVORTEX"
        description="Explore the complete WORKVORTEX portfolio featuring luxury e-commerce, agile project management platforms, fintech dashboards, and mobile companion apps."
        canonical="/work"
        schema={[breadcrumbSchema]}
      />

      <div className="container-vortex space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
            <span>PORTFOLIO DIRECTORY</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight">
            SELECTED WORK
          </h1>
          <p className="text-slate-600 font-body text-base sm:text-lg leading-relaxed">
            A comprehensive catalog of digital products, interfaces, web applications, and interactive platforms engineered by WORKVORTEX.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="hidden lg:flex items-center gap-1.5 pl-2 pr-2 text-xs font-mono text-slate-500 font-semibold">
              <Filter className="w-3.5 h-3.5" />
              <span>FILTER:</span>
            </div>
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects by name, category, or technology"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-body text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-mono text-xs">
            Loading case studies...
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group card-vortex p-0 overflow-hidden flex flex-col justify-between hover:border-blue-300 transition-all duration-300"
              >
                <div>
                  <Link
                    to={`/work/${project.slug}`}
                    aria-label={`Open full case study for ${project.title}`}
                    className="block relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200"
                  >
                    <img
                      src={project.featured_image || '/assets/projects/velora.jpg'}
                      alt={`${project.title} - case study screenshot`}
                      width="600"
                      height="375"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="badge-sample text-[10px]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{project.type || 'CLIENT PROJECT'}</span>
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-white/95 border border-slate-200 text-[10px] font-mono text-slate-700 font-semibold shadow-xs">
                      {project.year || '2026'}
                    </div>
                  </Link>

                  <div className="p-6 space-y-3">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-blue-600 uppercase block">
                      {project.category}
                    </span>
                    <h2 className="font-display font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                      <Link to={`/work/${project.slug}`} className="block">
                        {project.title}
                      </Link>
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {project.short_description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span key={tech} className="badge-tech text-[11px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    {project.status}
                  </span>
                  <Link
                    to={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
            <h3 className="font-display font-bold text-lg text-slate-900">No matching projects found</h3>
            <p className="text-slate-500 text-sm">Try searching with a different term or clear the filter.</p>
            <button
              onClick={() => {
                setActiveFilter('ALL');
                setSearchQuery('');
              }}
              className="btn-secondary text-xs py-2 px-4 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
