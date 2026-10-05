import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { FAQ } from '../types/api';
import { Plus, Trash2 } from 'lucide-react';

export const FAQManager: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('General');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchFaqs = () => {
    setLoading(true);
    api
      .getFAQs()
      .then((res) => setFaqs(res.faqs))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;
    setSubmitting(true);

    try {
      await api.createFAQ({
        category,
        question: question.trim(),
        answer: answer.trim(),
        display_order: faqs.length + 1,
      });
      setQuestion('');
      setAnswer('');
      fetchFaqs();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this FAQ entry?')) return;
    try {
      await api.deleteFAQ(id);
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
          Frequently Asked Questions (FAQ) CMS
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
          Manage questions and answers displayed on the public website and FAQ page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Create FAQ Form */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 h-fit">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-blue-400" />
            <span>Create New FAQ</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              >
                <option value="General">General</option>
                <option value="Pricing">Pricing & Estimates</option>
                <option value="Technology">Technology & Stack</option>
                <option value="Process">Process & Workflow</option>
                <option value="Support">Retainers & Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Question *</label>
              <input
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. Do you provide full source code ownership?"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Answer *</label>
              <textarea
                rows={4}
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Comprehensive clear answer for prospective clients..."
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-mono transition-colors disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Adding...' : 'Add FAQ'}
            </button>
          </form>
        </div>

        {/* FAQs List */}
        <div className="lg:col-span-7 space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              Loading FAQs...
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs bg-slate-900 border border-slate-800 rounded-xl">
              No FAQs created yet.
            </div>
          ) : (
            faqs.map((f) => (
              <div
                key={f.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2 relative"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold">
                      {f.category}
                    </span>
                    <h3 className="font-semibold text-slate-200 text-sm">{f.question}</h3>
                  </div>
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 font-body leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {f.answer}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
