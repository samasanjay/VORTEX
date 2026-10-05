import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Lead, LeadNote, LeadActivity } from '../types/api';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Globe,
  Flame,
  CheckCircle2,
  Sparkles,
  Send,
  Copy,
  RefreshCw,
  Plus
} from 'lucide-react';

export const LeadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [activity, setActivity] = useState<LeadActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [requalifying, setRequalifying] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchLeadDetail = () => {
    if (!id) return;
    setLoading(true);
    api
      .getLeadById(id)
      .then((res) => {
        setLead(res.lead);
        setNotes(res.notes);
        setActivity(res.activity);
      })
      .catch((err) => {
        console.error('Error loading lead detail:', err);
        alert(`Failed to load lead: ${err.message}`);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeadDetail();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!lead) return;
    try {
      await api.updateLead(lead.id, { status: newStatus as any });
      setLead({ ...lead, status: newStatus as any });
      fetchLeadDetail();
    } catch (err: any) {
      alert(`Update status error: ${err.message}`);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead || !newNote.trim()) return;

    setSubmittingNote(true);
    try {
      await api.addLeadNote(lead.id, newNote.trim());
      setNewNote('');
      fetchLeadDetail();
    } catch (err: any) {
      alert(`Add note error: ${err.message}`);
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleRequalify = async () => {
    if (!lead) return;
    setRequalifying(true);
    try {
      await api.requalifyLead(lead.id);
      fetchLeadDetail();
    } catch (err: any) {
      alert(`Re-qualification error: ${err.message}`);
    } finally {
      setRequalifying(false);
    }
  };

  const handleCopyOutreach = () => {
    if (!lead?.ai_outreach_draft) return;
    navigator.clipboard.writeText(lead.ai_outreach_draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-36 bg-slate-800 rounded animate-pulse" />
        <div className="h-96 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-16 space-y-4">
        <p className="text-slate-400 font-mono text-sm">Lead not found or has been deleted.</p>
        <Link to="/admin/leads" className="text-blue-400 font-mono text-xs hover:underline">
          ← Back to Leads CRM
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/leads"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display font-bold text-2xl text-white tracking-tight">
                {lead.name}
              </h1>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                  lead.quality === 'HOT'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : lead.quality === 'WARM'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {lead.quality === 'HOT' && <Flame className="w-3.5 h-3.5 text-rose-400" />}
                <span>{lead.quality}</span>
                <span>•</span>
                <span>{lead.score}/100</span>
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Inquiry ID: <span className="text-slate-300">{lead.id}</span> • Submitted:{' '}
              {new Date(lead.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="text-xs font-mono text-slate-400 font-semibold">CRM Stage:</span>
          <select
            value={lead.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono font-bold text-blue-400 focus:outline-none focus:border-blue-500"
          >
            <option value="NEW">NEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="QUALIFIED">QUALIFIED</option>
            <option value="PROPOSAL">PROPOSAL</option>
            <option value="NEGOTIATION">NEGOTIATION</option>
            <option value="WON">WON</option>
            <option value="LOST">LOST</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Client Details & Requirements */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Client Profile Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Prospect Profile & Contact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-slate-500">Email Address</span>
                <a
                  href={`mailto:${lead.email}`}
                  className="text-blue-400 hover:underline flex items-center gap-1.5 font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{lead.email}</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500">Phone / WhatsApp</span>
                <div className="text-slate-200 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lead.phone || 'Not provided'}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500">Organization / Company</span>
                <div className="text-slate-200 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lead.company || 'Not provided'}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500">Website URL</span>
                <div className="text-slate-200 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  {lead.website ? (
                    <a
                      href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline truncate max-w-[180px]"
                    >
                      {lead.website}
                    </a>
                  ) : (
                    <span>Not provided</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Requested Focus</span>
                <span className="text-slate-200 font-bold">{lead.project_type}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Budget Target</span>
                <span className="text-slate-200 font-bold">{lead.budget_range}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Timeline</span>
                <span className="text-slate-200 font-bold">{lead.timeline}</span>
              </div>
            </div>
          </div>

          {/* Client Project Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Submitted Requirements & Message
            </h2>
            <p className="text-sm text-slate-200 font-body leading-relaxed whitespace-pre-wrap bg-slate-950 p-4 rounded-lg border border-slate-800">
              {lead.message}
            </p>
            {lead.additional_info && (
              <div className="space-y-1 mt-3">
                <span className="text-xs font-mono text-slate-500">Additional Specifications:</span>
                <p className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {lead.additional_info}
                </p>
              </div>
            )}
          </div>

          {/* Internal CRM Notes Thread */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Team Internal Notes
            </h2>

            {/* Note form */}
            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                rows={3}
                required
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log internal meeting notes, client call highlights, proposal status..."
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={submittingNote || !newNote.trim()}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </form>

            {/* Notes List */}
            <div className="space-y-3 pt-2">
              {notes.length === 0 ? (
                <p className="text-xs font-mono text-slate-500 text-center py-4">
                  No internal notes recorded yet.
                </p>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="font-semibold text-blue-400">{note.author_name}</span>
                      <span className="text-slate-500">
                        {new Date(note.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 font-body leading-relaxed">{note.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Qualification Dossier & Outreach Generator */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI Strategic Dossier */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h2 className="font-display font-bold text-sm text-white">
                  AI Qualification Dossier
                </h2>
              </div>
              <button
                onClick={handleRequalify}
                disabled={requalifying}
                className="text-[11px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${requalifying ? 'animate-spin' : ''}`} />
                <span>Re-score</span>
              </button>
            </div>

            {/* Summary */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                Executive Synthesis
              </span>
              <p className="text-xs text-slate-300 font-body leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                {lead.ai_summary || 'No AI summary generated.'}
              </p>
            </div>

            {/* Pricing & Service Recommendation */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Recommended Service</span>
                <div className="text-xs font-bold text-slate-200">{lead.ai_recommended_service || lead.project_type}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Estimated Budget Tier</span>
                <div className="text-xs font-bold text-emerald-400">
                  {lead.ai_pricing_inr || '₹10,000 – ₹18,000'}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  {lead.ai_pricing_usd || '$120 – $220'}
                </div>
              </div>
            </div>

            {/* Identified Pain Points */}
            {lead.ai_pain_points && lead.ai_pain_points.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                  Detected Client Pain Points
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {lead.ai_pain_points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2 rounded border border-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Generated Client Outreach Email Draft */}
          {lead.ai_outreach_draft && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 font-bold uppercase">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>Personalized Outreach Draft</span>
                </div>
                <button
                  onClick={handleCopyOutreach}
                  className="text-[11px] font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy Draft'}</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={8}
                value={lead.ai_outreach_draft}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 leading-relaxed focus:outline-none"
              />

              <div className="flex items-center justify-between pt-1">
                <a
                  href={`mailto:${lead.email}?subject=${encodeURIComponent(
                    `[WORKVORTEX] Proposal for ${lead.project_type}`
                  )}&body=${encodeURIComponent(lead.ai_outreach_draft)}`}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-mono flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open in Mail Client</span>
                </a>
              </div>
            </div>
          )}

          {/* Lead Activity Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Activity History & Audit
            </h2>
            <div className="space-y-3 text-xs">
              {activity.map((act) => (
                <div key={act.id} className="pb-2 border-b border-slate-800/60 last:border-0 last:pb-0 space-y-0.5">
                  <div className="flex items-center justify-between text-[10.5px] font-mono">
                    <span className="font-bold text-blue-400">{act.action}</span>
                    <span className="text-slate-500">
                      {new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11.5px]">{act.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
