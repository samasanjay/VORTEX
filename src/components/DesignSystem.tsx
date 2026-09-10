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

export const DesignSystem: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'components'>('colors');
  const [interactiveSwitch, setInteractiveSwitch] = useState<boolean>(true);
  const [interactiveSlider, setInteractiveSlider] = useState<number>(75);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section id="system" className="py-24 bg-[#080B14] border-t border-slate-800 relative">
      <div className="container-vortex">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              SYSTEMATIC ARCHITECTURE
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
              DESIGN LANGUAGE
            </h2>
          </div>
          <p className="text-slate-400 font-body text-sm sm:text-base max-w-md mt-4 md:mt-0">
            A cohesive design framework engineered for mathematical consistency, high visual contrast, and scalable digital design tokens.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setActiveTab('colors')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'colors'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>01. Color Palette</span>
            </button>
            <button
              onClick={() => setActiveTab('typography')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'typography'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>02. Typography Scale</span>
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === 'components'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>03. Live Components</span>
            </button>
          </div>
        </div>

        {/* 1. Color Palette Explorer */}
        {activeTab === 'colors' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLOR_TOKENS.map((c) => (
              <div
                key={c.name}
                className="p-6 rounded-2xl border border-slate-800 bg-[#0C111E] space-y-4 hover:border-slate-700 transition-all"
              >
                <div
                  className="w-full h-24 rounded-xl border border-white/10 shadow-inner flex items-end justify-end p-3"
                  style={{ backgroundColor: c.hex }}
                >
                  <button
                    onClick={() => copyToClipboard(c.hex)}
                    className="p-2 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors"
                    title="Copy HEX"
                  >
                    {copiedHex === c.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">{c.name}</h3>
                  <span className="text-xs font-mono text-blue-400 block mb-1">{c.role}</span>
                  <div className="text-xs font-mono text-slate-400">{c.hex} • {c.hsl}</div>
                  <p className="text-xs text-slate-400 mt-2 font-body">{c.usage}</p>
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
                className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#0C111E] space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-blue-950/60 border border-blue-800 text-[11px] font-mono text-blue-400">
                      {t.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{t.name}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {t.family} // {t.size} // {t.weight}
                  </span>
                </div>
                <div
                  className="text-white tracking-tight pt-2"
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
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0C111E] space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-blue-400 uppercase">Tokens / 01</span>
                <h3 className="font-display font-bold text-lg text-white">Interactive Buttons</h3>
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
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0C111E] space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-blue-400 uppercase">Tokens / 02</span>
                <h3 className="font-display font-bold text-lg text-white">Form & Toggle States</h3>
              </div>
              <div className="space-y-5">
                {/* Switch */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono text-slate-300">GPU Acceleration Mode</span>
                  <button
                    onClick={() => setInteractiveSwitch(!interactiveSwitch)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${
                      interactiveSwitch ? 'bg-blue-600' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        interactiveSwitch ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Slider */}
                <div className="space-y-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>Mesh Density:</span>
                    <span className="text-cyan-400 font-bold">{interactiveSlider}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={interactiveSlider}
                    onChange={(e) => setInteractiveSlider(parseInt(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Component 3: Telemetry HUD Card */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0C111E] space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-blue-400 uppercase">Tokens / 03</span>
                <h3 className="font-display font-bold text-lg text-white">Telemetry Metric HUD</h3>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">ENGINE LATENCY</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div className="font-mono font-bold text-3xl text-white">12.4 <span className="text-sm font-normal text-slate-400">ms</span></div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[88%]" />
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};
