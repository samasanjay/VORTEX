import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { FAQ } from '../types/api';
import { SEO } from '../components/SEO';
import { Plus, Minus, ArrowUpRight, Search } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api
      .getFAQs()
      .then((res) => setFaqs(res.faqs))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['ALL', 'General', 'Pricing', 'Technology', 'Process', 'Support'];

  const filtered = faqs.filter((f) => {
    if (selectedCategory !== 'ALL' && f.category !== selectedCategory) return false;
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term);
  });

  return (
    <div className="space-y-0 font-body">
      <SEO
        title="Frequently Asked Questions — WORKVORTEX Digital Studio"
        description="Clear answers regarding pricing, project delivery timelines, source code ownership, technology stacks, and ongoing retainers."
        canonical="/faq"
      />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 bg-radial-gradient border-b border-slate-200/80">
        <div className="container-vortex text-left space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="font-bold text-blue-600">FAQ DIRECTORY</span>
            <span className="text-slate-300">/</span>
            <span>TRANSPARENT ANSWERS</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Everything you need to know about our engagement models, milestones, source code ownership, and engineering practices.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container-vortex max-w-4xl space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions or keywords..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-3 pt-4 text-left">
            {loading ? (
              <div className="text-center py-12 text-slate-500 font-mono text-xs">
                Loading FAQs...
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-500 font-mono text-xs bg-slate-50 rounded-xl border border-slate-200">
                No matching questions found.
              </div>
            ) : (
              filtered.map((f) => (
                <div
                  key={f.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/40 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === f.id ? null : f.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-display font-semibold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{f.question}</span>
                    {expandedFaq === f.id ? (
                      <Minus className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {expandedFaq === f.id && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 font-body">
                      {f.answer}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container-vortex text-center space-y-4 max-w-md mx-auto">
          <h2 className="font-display font-bold text-2xl text-slate-900">
            Have a question not answered here?
          </h2>
          <p className="text-xs text-slate-600">
            Reach out directly and our engineering team will answer your questions within 24 hours.
          </p>
          <Link
            to="/contact"
            className="btn-primary text-xs py-2.5 px-5 inline-flex items-center gap-1.5"
          >
            <span>Ask a Question</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
