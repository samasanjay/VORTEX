import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Service, ServiceProcessStep } from '../types/api';
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';

export const ServiceEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id && id !== 'new';
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    slug: '',
    short_description: '',
    full_description: '',
    icon_name: 'Globe',
    starting_price_inr: '₹7,000 – ₹12,000',
    starting_price_usd: '$85 – $145',
    timeline: '1–2 Weeks',
    features: ['High-speed React architecture', 'SEO Schema compliance'],
    deliverables: ['Production code repository', 'Figma design tokens'],
    process_steps: [
      { step: '01', title: 'Discovery & Wireframing', desc: 'Architecture mapping' },
      { step: '02', title: 'UI Design & Tokens', desc: 'High-fidelity design' },
      { step: '03', title: 'Implementation', desc: 'Typed TypeScript build' },
      { step: '04', title: 'Edge Deployment', desc: 'Cross-browser QA' },
    ],
    faqs: [],
    cta_heading: 'Ready to build with WORKVORTEX?',
    cta_subtext: 'Get an estimated proposal and timeline within 24 hours.',
    is_published: 1,
    display_order: 1,
  });

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const [deliverableInput, setDeliverableInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api
        .getService(id)
        .then((res) => setFormData(res.service))
        .catch((err) => alert(`Error loading service: ${err.message}`))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      if (isEditing) {
        await api.updateService(id, formData);
      } else {
        await api.createService(formData);
      }
      setSavedSuccess(true);
      setTimeout(() => navigate('/admin/services'), 1000);
    } catch (err: any) {
      alert(`Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), featureInput.trim()],
    }));
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddDeliverable = () => {
    if (!deliverableInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      deliverables: [...(prev.deliverables || []), deliverableInput.trim()],
    }));
    setDeliverableInput('');
  };

  const handleRemoveDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: (prev.deliverables || []).filter((_, i) => i !== index),
    }));
  };

  const handleProcessChange = (index: number, field: keyof ServiceProcessStep, val: string) => {
    const updated = [...(formData.process_steps || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, process_steps: updated }));
  };

  const handleAddProcess = () => {
    setFormData((prev) => ({
      ...prev,
      process_steps: [
        ...(prev.process_steps || []),
        { step: `0${(prev.process_steps?.length || 0) + 1}`, title: 'New Phase', desc: 'Phase description' },
      ],
    }));
  };

  const handleRemoveProcess = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      process_steps: (prev.process_steps || []).filter((_, i) => i !== index),
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
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/services"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-display font-bold text-2xl text-white tracking-tight">
              {isEditing ? `Edit Service: ${formData.name}` : 'Create New Service'}
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Set deliverables, pricing, and process steps.
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
            <span>{isEditing ? 'Save Changes' : 'Publish Service'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Details */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Service Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Custom Website Development"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. website-development"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Price (INR)</label>
                <input
                  type="text"
                  value={formData.starting_price_inr}
                  onChange={(e) => setFormData({ ...formData, starting_price_inr: e.target.value })}
                  placeholder="₹7,000 – ₹12,000"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Price (USD)</label>
                <input
                  type="text"
                  value={formData.starting_price_usd}
                  onChange={(e) => setFormData({ ...formData, starting_price_usd: e.target.value })}
                  placeholder="$85 – $145"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Timeline</label>
                <input
                  type="text"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="1–2 Weeks"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Short Description *</label>
              <textarea
                rows={2}
                required
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="High-level summary for cards..."
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Full Service Description</label>
              <textarea
                rows={4}
                value={formData.full_description}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                placeholder="In-depth explanation of methodology and impact..."
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Delivery Process Steps
              </h2>
              <button
                type="button"
                onClick={handleAddProcess}
                className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.process_steps?.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={step.step}
                      onChange={(e) => handleProcessChange(idx, 'step', e.target.value)}
                      placeholder="01"
                      className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-blue-400"
                    />
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleProcessChange(idx, 'title', e.target.value)}
                      placeholder="Phase Title"
                      className="flex-1 px-3 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProcess(idx)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={step.desc}
                    onChange={(e) => handleProcessChange(idx, 'desc', e.target.value)}
                    placeholder="Short description of what occurs in this step..."
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-slate-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Deliverables, Features, Publishing */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Status & Visibility
            </h2>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Publication</label>
              <select
                value={formData.is_published ? 1 : 0}
                onChange={(e) => setFormData({ ...formData, is_published: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white"
              >
                <option value={1}>LIVE (Publicly Visible)</option>
                <option value={0}>DRAFT (Hidden)</option>
              </select>
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Deliverables
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={deliverableInput}
                onChange={(e) => setDeliverableInput(e.target.value)}
                placeholder="e.g. Figma UI Kit"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDeliverable();
                  }
                }}
                className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs font-mono cursor-pointer"
              >
                Add
              </button>
            </div>

            <ul className="space-y-1.5 pt-1">
              {formData.deliverables?.map((del, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300"
                >
                  <span>{del}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Features */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Key Features
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="e.g. Sub-second Core Web Vitals"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs font-mono cursor-pointer"
              >
                Add
              </button>
            </div>

            <ul className="space-y-1.5 pt-1">
              {formData.features?.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300"
                >
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
};
