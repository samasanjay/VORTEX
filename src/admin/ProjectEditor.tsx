import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Project } from '../types/api';
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';

export const ProjectEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id && id !== 'new';
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    client: '',
    industry: '',
    category: 'WEBSITES',
    filter_tags: ['ALL', 'WEBSITES'],
    short_description: '',
    full_overview: '',
    challenge: '',
    strategy: '',
    solution: '',
    results: '',
    type: 'SAMPLE PROJECT',
    year: '2026',
    status: 'PUBLISHED',
    featured: 0,
    featured_number: '01',
    highlight_summary: '',
    featured_image: '/assets/projects/velora.jpg',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS'],
    metrics: [{ label: 'Load Speed', value: '0.8s' }],
    color_palette: [{ name: 'Core Navy', hex: '#0B132B' }],
    seo_title: '',
    seo_description: '',
    display_order: 1,
  });

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api
        .getProject(id)
        .then((res) => {
          setFormData(res.project);
        })
        .catch((err) => alert(`Error loading project: ${err.message}`))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      if (isEditing) {
        await api.updateProject(id, formData);
      } else {
        await api.createProject(formData);
      }
      setSavedSuccess(true);
      setTimeout(() => navigate('/admin/projects'), 1000);
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      technologies: [...(prev.technologies || []), techInput.trim()],
    }));
    setTechInput('');
  };

  const handleRemoveTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: (prev.technologies || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [...(prev.metrics || []), { label: 'New Metric', value: '100%' }],
    }));
  };

  const handleMetricChange = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...(formData.metrics || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, metrics: updated }));
  };

  const handleRemoveMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: (prev.metrics || []).filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-32 bg-slate-800 rounded animate-pulse" />
        <div className="h-96 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-display font-bold text-2xl text-white tracking-tight">
              {isEditing ? `Edit Case Study: ${formData.title}` : 'Create New Case Study'}
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Define technical narrative, metrics, media, and SEO specs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved! Redirecting...</span>
            </span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Save Changes' : 'Publish Project'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Core Fields */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Core Identification & Scope
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. VELORA LUXURY E-COMMERCE"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. velora"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Client Name</label>
                <input
                  type="text"
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="e.g. Maison Velora Paris"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Industry</label>
                <input
                  type="text"
                  value={formData.industry || ''}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g. Luxury Retail"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="WEBSITES">WEBSITES</option>
                  <option value="SAAS">SAAS</option>
                  <option value="MOBILE">MOBILE</option>
                  <option value="AUTOMATION">AUTOMATION</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Short Description *</label>
              <textarea
                rows={2}
                required
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="One-to-two sentence high-level summary for portfolio grid..."
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Deep Narrative */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Case Study Technical Breakdown
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Full Overview</label>
              <textarea
                rows={3}
                value={formData.full_overview || ''}
                onChange={(e) => setFormData({ ...formData, full_overview: e.target.value })}
                placeholder="Comprehensive background context..."
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">The Challenge</label>
                <textarea
                  rows={3}
                  value={formData.challenge || ''}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="Specific architectural or user friction obstacles..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">The Strategy</label>
                <textarea
                  rows={3}
                  value={formData.strategy || ''}
                  onChange={(e) => setFormData({ ...formData, strategy: e.target.value })}
                  placeholder="Technical roadmap and UX philosophy..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">The Solution</label>
                <textarea
                  rows={3}
                  value={formData.solution || ''}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="Engineered components and state architecture..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">The Results & Impact</label>
                <textarea
                  rows={3}
                  value={formData.results || ''}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  placeholder="Metrics, performance benchmarks, and client outcome..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Performance Metrics Builder */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Performance Metrics & Telemetry
              </h2>
              <button
                type="button"
                onClick={handleAddMetric}
                className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Metric</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.metrics?.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={m.label}
                    onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                    placeholder="Metric Label (e.g. LCP Speed)"
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white"
                  />
                  <input
                    type="text"
                    value={m.value}
                    onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 0.8s)"
                    className="w-32 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono font-bold text-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMetric(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Media, Status, Tech Stack, SEO */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status & Featured Settings */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Publication Settings
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              >
                <option value="PUBLISHED">PUBLISHED (Live)</option>
                <option value="DRAFT">DRAFT (Hidden)</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="text-xs font-mono text-slate-300 cursor-pointer">
                Featured on Homepage
              </label>
              <input
                type="checkbox"
                checked={!!formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked ? 1 : 0 })}
                className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-blue-500"
              />
            </div>

            {formData.featured ? (
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Featured Order Number</label>
                <input
                  type="text"
                  value={formData.featured_number || '01'}
                  onChange={(e) => setFormData({ ...formData, featured_number: e.target.value })}
                  placeholder="e.g. 01"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white"
                />
              </div>
            ) : null}
          </div>

          {/* Featured Image */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Featured Asset
            </h2>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Image URL / Path</label>
              <input
                type="text"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                placeholder="/assets/projects/velora.jpg"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-300"
              />
            </div>
            {formData.featured_image && (
              <img
                src={formData.featured_image}
                alt="Preview"
                className="w-full h-36 rounded-lg object-cover border border-slate-800"
              />
            )}
          </div>

          {/* Technologies Tag Manager */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Technologies & Frameworks
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="e.g. Next.js 15"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono cursor-pointer"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {formData.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(idx)}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Case Study SEO
            </h2>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">SEO Title</label>
              <input
                type="text"
                value={formData.seo_title || ''}
                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                placeholder="Title for search engines"
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={formData.seo_description || ''}
                onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                placeholder="150 character summary for search snippet"
                className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
