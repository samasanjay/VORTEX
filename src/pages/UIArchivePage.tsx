import React, { useState, useMemo } from 'react';
import { UI_ARCHIVE_ITEMS } from '../data/projects';
import { SEO } from '../components/SEO';
import { buildBreadcrumbSchema, buildCollectionSchema, SITE_URL } from '../config/seo';
import type { UIArchiveItem } from '../types/project';
import { Layers, ArrowUpRight, X, Filter } from 'lucide-react';

export const UIArchivePage: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<UIArchiveItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Security & Auth', 'Navigation System', 'Fintech Interface', 'Spatial & Audio', 'Biometric Telemetry', 'Real Estate UX', 'Developer Tools'];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') return UI_ARCHIVE_ITEMS;
    return UI_ARCHIVE_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'UI Archive', path: '/ui-archive' },
  ]);

  const collectionSchema = buildCollectionSchema(
    'Interface Component Vault & UI Experiments',
    'A curated vault of granular UI components, authentication modals, ergonomic navigation patterns, telemetry HUDs, and interactive widgets engineered by WORKVORTEX.',
    `${SITE_URL}/ui-archive`,
    UI_ARCHIVE_ITEMS.map((item) => ({
      name: item.title,
      url: `/ui-archive`,
      image: item.image,
      description: item.description,
    }))
  );

  return (
    <div className="pt-32 pb-24 bg-[#F8FAFC]">
      <SEO
        title="Interface Component Vault & UI Experiments — WORKVORTEX"
        description="Explore the WORKVORTEX UI archive: a curated library of granular interface widgets, biometric telemetry HUDs, authentication workflows, and spatial design patterns."
        canonical="/ui-archive"
        schema={[breadcrumbSchema, collectionSchema]}
      />

      <div className="container-vortex space-y-12">
        {/* Header */}
        <header className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono text-indigo-700 font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>INTERFACE LAB ARCHIVE</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight">
            INTERFACE ARCHIVE
          </h1>
          <p className="text-slate-600 font-body text-base sm:text-lg leading-relaxed">
            A curated vault of granular UI components, authentication modals, ergonomic navigation patterns, telemetry HUDs, and interactive widgets.
          </p>
        </header>

        {/* Category Filters */}
        <nav aria-label="UI Archive Categories" className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="hidden sm:flex items-center gap-1.5 pl-2 pr-2 text-xs font-mono text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>CATEGORY:</span>
          </div>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>

        {/* Masonry / Grid */}
        <section aria-label="UI Components Grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedStudy(item)}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 border-b border-slate-200">
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.category} interface design experiment`}
                    width="400"
                    height="300"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="badge-sample text-[10px] py-1 px-2.5 bg-white/95 border border-indigo-200 text-indigo-700 shadow-xs">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <span className="text-[11px] font-mono uppercase font-bold text-indigo-600 block">
                    {item.category}
                  </span>
                  <h2 className="font-display font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-600 font-body line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center text-xs font-mono font-medium text-indigo-600 gap-1">
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </section>
      </div>

      {/* Detail Modal */}
      {selectedStudy && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedStudy(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="modal-content max-w-2xl p-6 sm:p-8 space-y-6 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="badge-sample">{selectedStudy.badge}</span>
                <span className="text-xs font-mono text-slate-500 font-medium">// {selectedStudy.category}</span>
              </div>
              <button
                onClick={() => setSelectedStudy(null)}
                aria-label="Close modal"
                className="p-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md">
              <img
                src={selectedStudy.image}
                alt={`${selectedStudy.title} detailed modal view`}
                width="800"
                height="600"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-3">
              <h3 id="modal-title" className="font-display font-bold text-2xl text-slate-900">
                {selectedStudy.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {selectedStudy.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2">
              {selectedStudy.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono text-indigo-700 font-semibold"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
