import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Testimonial } from '../types/api';
import { Plus, Trash2, Star } from 'lucide-react';

export const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [authorCompany, setAuthorCompany] = useState('');
  const [quote, setQuote] = useState('');
  const [rating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const fetchTestimonials = () => {
    setLoading(true);
    api
      .getTestimonials()
      .then((res) => setTestimonials(res.testimonials))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !quote) return;
    setSubmitting(true);

    try {
      await api.createTestimonial({
        author_name: authorName.trim(),
        author_role: authorRole.trim() || 'Executive',
        author_company: authorCompany.trim() || 'Client',
        quote: quote.trim(),
        rating,
        is_featured: 1,
      });
      setAuthorName('');
      setAuthorRole('');
      setAuthorCompany('');
      setQuote('');
      fetchTestimonials();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
          Client Reviews & Testimonials
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
          Manage quotes and endorsements featured on the public homepage and case studies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Create Form */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 h-fit">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-blue-400" />
            <span>Add Client Testimonial</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Author Name *</label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Julian Moreau"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Role / Title</label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="Creative Director"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Company</label>
                <input
                  type="text"
                  value={authorCompany}
                  onChange={(e) => setAuthorCompany(e.target.value)}
                  placeholder="Velora International"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Quote / Review *</label>
              <textarea
                rows={4}
                required
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Client feedback and engineering outcomes..."
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-mono transition-colors disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Adding...' : 'Add Testimonial'}
            </button>
          </form>
        </div>

        {/* Testimonials List */}
        <div className="lg:col-span-7 space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              Loading reviews...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs bg-slate-900 border border-slate-800 rounded-xl">
              No testimonials created yet.
            </div>
          ) : (
            testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 relative group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                      {t.author_name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200 text-sm">{t.author_name}</h3>
                      <p className="text-xs font-mono text-slate-400">
                        {t.author_role} • {t.author_company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors ml-2 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-body italic leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  "{t.quote}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
