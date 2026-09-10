import React, { useState } from 'react';
import { COLOR_TOKENS, TYPE_TOKENS } from '../data/designTokens';
import {
  Palette,
  Type,
  LayoutGrid,
  Check,
  Copy,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const DesignSystemPage: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'components'>('colors');
  const [interactiveSwitch, setInteractiveSwitch] = useState<boolean>(true);
  const [interactiveSlider, setInteractiveSlider] = useState<number>(80);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="container-vortex space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DESIGN LANGUAGE & FOUNDATIONS</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight">
            DESIGN SYSTEM
          </h1>
          <p className="text-slate-600 font-body text-base sm:text-lg leading-relaxed">
            The mathematical foundation, atomic design tokens, typography scales, and UI interaction primitives governing WORKVORTEX products.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-fit">
          <button
            onClick={() => setActiveTab('colors')}
            className={`px-5 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'colors'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>01. Color Palette</span>
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`px-5 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'typography'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>02. Typography Scale</span>
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`px-5 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'components'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>03. Live Components</span>
          </button>
        </div>

        {/* 1. Color Palette Explorer */}
        {activeTab === 'colors' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLOR_TOKENS.map((c) => (
              <div
                key={c.name}
                className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 hover:border-blue-300 shadow-sm hover:shadow-md transition-all"
              >
                <div
                  className="w-full h-24 rounded-xl border border-slate-200 shadow-inner flex items-end justify-end p-3"
                  style={{ backgroundColor: c.hex }}
                >
                  <button
                    onClick={() => copyToClipboard(c.hex)}
                    className="p-2 rounded-lg bg-white/90 shadow-md text-slate-800 hover:bg-white transition-colors"
                    title="Copy HEX"
                  >
                    {copiedHex === c.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">{c.name}</h3>
                  <span className="text-xs font-mono text-blue-600 block mb-1 font-semibold">{c.role}</span>
                  <div className="text-xs font-mono text-slate-500 font-medium">{c.hex} • {c.hsl}</div>
                  <p className="text-xs text-slate-600 mt-2 font-body">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Typography Scale */}
        {activeTab === 'typography' && (
          <div className="space-y-6">
            {TYPE_TOKENS.map((t) => (
              <div
                key={t.tag}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-[11px] font-mono text-blue-700 font-bold">
                      {t.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-medium">{t.name}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {t.family} // {t.size} // {t.weight}
                  </span>
                </div>
                <div
                  className="text-slate-900 tracking-tight pt-2"
                  style={{
                    fontFamily: t.family.includes('Syne')
                      ? 'var(--font-display)'
                      : t.family.includes('Mono')
                      ? 'var(--font-mono)'
                      : 'var(--font-body)',
                    fontSize: t.tag.includes('Display') ? '2rem' : t.tag.includes('Heading') ? '1.5rem' : '1rem',
                  }}
                >
                  {t.sample}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Live Interactive UI Components */}
        {activeTab === 'components' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Component 1: Action Controls & Buttons */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-mono text-blue-600 uppercase font-bold">Tokens / 01</span>
                <h3 className="font-display font-bold text-lg text-slate-900">Interactive Buttons</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <button className="btn-primary w-full justify-center">
                    <span>PRIMARY ACTION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <button className="btn-secondary w-full justify-center">
                    <span>SECONDARY ACTION</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  <span className="badge-sample">SAMPLE BADGE</span>
                  <span className="badge-concept">CONCEPT BADGE</span>
                </div>
              </div>
            </div>

            {/* Component 2: Micro-Switches & Sliders */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-mono text-blue-600 uppercase font-bold">Tokens / 02</span>
                <h3 className="font-display font-bold text-lg text-slate-900">Form & Toggle States</h3>
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-mono text-slate-700 font-semibold">GPU Acceleration Mode</span>
                  <button
                    onClick={() => setInteractiveSwitch(!interactiveSwitch)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${
                      interactiveSwitch ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
                        interactiveSwitch ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="space-y-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between text-xs font-mono text-slate-700 font-medium">
                    <span>Mesh Density:</span>
                    <span className="text-blue-700 font-bold">{interactiveSlider}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={interactiveSlider}
                    onChange={(e) => setInteractiveSlider(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Component 3: Telemetry HUD Card */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-xs font-mono text-blue-600 uppercase font-bold">Tokens / 03</span>
                <h3 className="font-display font-bold text-lg text-slate-900">Telemetry Metric HUD</h3>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">ENGINE LATENCY</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="font-mono font-bold text-3xl text-slate-900">12.4 <span className="text-sm font-normal text-slate-500">ms</span></div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-full w-[88%]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
