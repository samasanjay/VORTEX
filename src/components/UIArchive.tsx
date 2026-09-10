import React, { useState } from 'react';
import { UI_ARCHIVE_ITEMS } from '../data/projects';
import type { UIArchiveItem } from '../types/project';
import { Layers, ArrowUpRight, X } from 'lucide-react';

export const UIArchive: React.FC = () => {
  const [selectedStudy, setSelectedStudy] = useState<UIArchiveItem | null>(null);

  return (
    <section id="archive" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="container-vortex">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono text-indigo-700 tracking-widest uppercase mb-2 flex items-center gap-2 font-semibold">
              <Layers className="w-4 h-4 text-indigo-600" />
              MICRO-INTERACTIONS & COMPONENTS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-900">
              INTERFACE ARCHIVE
            </h2>
          </div>
          <p className="text-slate-600 font-body text-sm sm:text-base max-w-md mt-4 md:mt-0">
            A granular catalog of UI modules, ergonomic navigation patterns, and telemetry widgets created across design sprints.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {UI_ARCHIVE_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedStudy(item)}
              data-cursor="STUDY"
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* Visual Thumbnail Frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 border-b border-slate-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="badge-sample text-[10px] py-1 px-2.5 bg-white/95 border border-blue-200 text-blue-700 shadow-sm">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <span className="text-[11px] font-mono uppercase font-bold text-indigo-600 block">
                    {item.category}
                  </span>
                  <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-body line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Tags & Action */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal for UI Study */}
      {selectedStudy && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedStudy(null)}
          role="dialog"
          aria-modal="true"
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
                className="p-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md">
              <img
                src={selectedStudy.image}
                alt={selectedStudy.title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-bold text-2xl text-slate-900">
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
    </section>
  );
};
