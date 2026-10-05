import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Save, Key, CheckCircle2, Loader2 } from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form values
  const [studioName, setStudioName] = useState('WORKVORTEX');
  const [studioEmail, setStudioEmail] = useState('workvortex01@gmail.com');
  const [studioTagline, setStudioTagline] = useState('Build. Automate. Scale.');
  const [openaiKey, setOpenaiKey] = useState('');
  const [notifyEmail, setNotifyEmail] = useState('true');
  const [enableAI, setEnableAI] = useState('true');

  useEffect(() => {
    api
      .getSettings()
      .then((res) => {
        res.settings.forEach((s: any) => {
          if (s.key === 'studio_name') setStudioName(s.value);
          if (s.key === 'studio_email') setStudioEmail(s.value);
          if (s.key === 'studio_tagline') setStudioTagline(s.value);
          if (s.key === 'enable_ai_lead_qualification') setEnableAI(s.value);
          if (s.key === 'notify_email_on_new_lead') setNotifyEmail(s.value);
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const updates: Record<string, string> = {
        studio_name: studioName,
        studio_email: studioEmail,
        studio_tagline: studioTagline,
        enable_ai_lead_qualification: enableAI,
        notify_email_on_new_lead: notifyEmail,
      };

      if (openaiKey.trim()) {
        updates.openai_api_key = openaiKey.trim();
      }

      await api.updateSettings(updates);
      setSavedSuccess(true);
      setOpenaiKey('');
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(`Error saving settings: ${err.message}`);
    } finally {
      setSaving(false);
    }
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
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Studio Platform Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Global operational settings, server-side AI keys, and communication triggers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings Saved!</span>
            </span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Brand Profile */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
            Studio Brand Identity
          </h2>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Studio Name</label>
            <input
              type="text"
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Primary Email</label>
            <input
              type="email"
              value={studioEmail}
              onChange={(e) => setStudioEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Tagline</label>
            <input
              type="text"
              value={studioTagline}
              onChange={(e) => setStudioTagline(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
            />
          </div>
        </div>

        {/* AI & Communication Settings */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-blue-400" />
              <span>Server-Side OpenAI Key</span>
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                OpenAI API Key (Stored securely on backend)
              </label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-proj-••••••••••••••••••••••••"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              />
              <p className="text-[10.5px] font-mono text-slate-400 mt-1.5 leading-relaxed">
                Leave blank to keep existing key. If not configured or if quota is exceeded, the server automatically uses the high-precision semantic heuristic scoring engine.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Automated Triggers
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  Automatic AI Lead Qualification
                </span>
                <span className="text-[11px] text-slate-400">
                  Instantly compute lead score, pricing tier & proposal draft upon inquiry.
                </span>
              </div>
              <input
                type="checkbox"
                checked={enableAI === 'true'}
                onChange={(e) => setEnableAI(e.target.checked ? 'true' : 'false')}
                className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  Email Alerts on New Lead
                </span>
                <span className="text-[11px] text-slate-400">
                  Transmit notification dossier to {studioEmail}.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifyEmail === 'true'}
                onChange={(e) => setNotifyEmail(e.target.checked ? 'true' : 'false')}
                className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
