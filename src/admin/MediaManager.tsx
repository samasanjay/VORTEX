import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import type { MediaItem } from '../types/api';
import {
  UploadCloud,
  Search,
  Copy,
  Trash2,
  CheckCircle2,
  File,
  Loader2
} from 'lucide-react';

export const MediaManager: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = () => {
    setLoading(true);
    api
      .getMedia()
      .then((res) => setMedia(res.media))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await api.uploadMedia(file);
      fetchMedia();
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete media asset "${name}"?`)) return;
    try {
      await api.deleteMedia(id);
      setMedia((prev) => prev.filter((m) => m.id !== id));
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const filtered = media.filter((m) =>
    m.original_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Media Library & Assets
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Upload and manage project mockups, case study galleries, vector icons, and branding graphics.
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            accept="image/*,video/*"
            className="hidden"
            id="media-upload-input"
          />
          <label
            htmlFor="media-upload-input"
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <UploadCloud className="w-4 h-4" />
            )}
            <span>{uploading ? 'Uploading Asset...' : 'Upload Media Asset'}</span>
          </label>
        </div>
      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media assets by filename..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-12 text-slate-500 font-mono text-xs">
            Loading media assets...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500 font-mono text-xs bg-slate-900 border border-slate-800 rounded-xl">
            No media assets found. Upload images to populate your library.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-colors"
            >
              <div className="aspect-square bg-slate-950 relative overflow-hidden flex items-center justify-center">
                {item.mime_type.startsWith('image/') ? (
                  <img
                    src={item.url}
                    alt={item.original_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <File className="w-8 h-8 text-slate-600" />
                )}
              </div>

              <div className="p-2.5 space-y-1.5">
                <div className="font-mono text-[11px] text-slate-300 truncate" title={item.original_name}>
                  {item.original_name}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{(item.size_bytes / 1024).toFixed(0)} KB</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopyUrl(item.id, item.url)}
                      className="p-1 hover:text-blue-400 transition-colors"
                      title="Copy Public URL"
                    >
                      {copiedId === item.id ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.original_name)}
                      className="p-1 hover:text-rose-400 transition-colors"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
