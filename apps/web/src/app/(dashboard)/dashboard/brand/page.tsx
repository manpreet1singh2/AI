'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Upload, Plus, Check, Trash2, Copy, Sparkles } from 'lucide-react'

const PRESET_FONTS = ['Inter', 'Syne', 'Playfair Display', 'Montserrat', 'DM Sans', 'Space Grotesk']
const PRESET_TONES = ['Professional', 'Casual & Fun', 'Luxury & Premium', 'Gen-Z & Trendy', 'Educational', 'Motivational', 'Storytelling']

const SAMPLE_COLORS = [
  { label: 'Primary', hex: '#6366f1', name: 'Aura Violet' },
  { label: 'Secondary', hex: '#8b5cf6', name: 'Purple' },
  { label: 'Accent', hex: '#06b6d4', name: 'Cyan' },
  { label: 'Background', hex: '#0a0a0f', name: 'Dark Navy' },
]

const BRAND_TEMPLATES = [
  { name: 'Luxury Minimalist', emoji: '✨', desc: 'Clean lines, premium feel, dark tones', active: true },
  { name: 'Bold & Energetic', emoji: '⚡', desc: 'High contrast, bright accents, dynamic', active: false },
  { name: 'Professional Blue', emoji: '💼', desc: 'Corporate, trustworthy, LinkedIn-ready', active: false },
  { name: 'Warm & Creative', emoji: '🎨', desc: 'Warm gradients, artistic, engaging', active: false },
]

export default function BrandKitPage() {
  const [selectedFont, setSelectedFont] = useState('Syne')
  const [selectedTone, setSelectedTone] = useState('Luxury & Premium')
  const [colors, setColors] = useState(SAMPLE_COLORS)
  const [brandName, setBrandName] = useState('')
  const [tagline, setTagline] = useState('')

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Brand Kit</h1>
          <p className="text-white/40 text-sm mt-0.5">
            Define your brand identity — Aura AI uses it to make every post feel on-brand
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-aura-gradient text-white text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all">
          <Sparkles className="w-4 h-4" />
          AI Generate Brand Kit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Brand Config */}
        <div className="lg:col-span-2 space-y-5">
          {/* Brand Identity */}
          <div className="glass-card p-6 space-y-5">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-aura-400" />
              Brand Identity
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Brand / Creator Name</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={e => setBrandName(e.target.value)}
                  placeholder="e.g. FitWithSarah"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-aura-500/40 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  placeholder="e.g. Transform your body & mind"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-aura-500/40 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="glass-card p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Brand Colors</h3>
              <button className="flex items-center gap-1.5 text-xs text-aura-400 hover:text-aura-300 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Color
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {colors.map((color) => (
                <div key={color.label} className="space-y-2">
                  <div
                    className="w-full h-16 rounded-xl border border-white/10 cursor-pointer hover:scale-105 transition-transform shadow-lg"
                    style={{ background: color.hex }}
                  />
                  <div className="text-center">
                    <div className="text-xs font-medium text-white">{color.label}</div>
                    <div className="text-[10px] text-white/40 font-mono">{color.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="glass-card p-6 space-y-5">
            <h3 className="font-semibold text-white">Typography</h3>
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Primary Font</label>
              <div className="flex flex-wrap gap-2">
                {PRESET_FONTS.map(f => (
                  <button
                    key={f}
                    onClick={() => setSelectedFont(f)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedFont === f
                        ? 'bg-aura-500/30 border border-aura-500/50 text-aura-300'
                        : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
                    }`}
                    style={{ fontFamily: f }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Brand Voice */}
          <div className="glass-card p-6 space-y-5">
            <h3 className="font-semibold text-white">Brand Voice & Tone</h3>
            <div className="flex flex-wrap gap-2">
              {PRESET_TONES.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTone(t)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedTone === t
                      ? 'bg-purple-500/30 border border-purple-500/50 text-purple-300'
                      : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Additional Brand Notes</label>
              <textarea
                placeholder="e.g. Never use slang. Always end with a question. Reference luxury brands like Rolex, Ferrari."
                rows={3}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-aura-500/40 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right panel — Logo + Templates */}
        <div className="space-y-5">
          {/* Logo Upload */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-white text-sm">Logo & Assets</h3>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center gap-3 hover:border-aura-500/30 transition-colors cursor-pointer group">
              <Upload className="w-8 h-8 text-white/20 group-hover:text-aura-400 transition-colors" />
              <div className="text-center">
                <div className="text-sm text-white/50 group-hover:text-white/70 transition-colors">Drop your logo here</div>
                <div className="text-xs text-white/30 mt-1">PNG, SVG · up to 10MB</div>
              </div>
            </div>
          </div>

          {/* Brand Templates */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-white text-sm">Style Templates</h3>
            <div className="space-y-2">
              {BRAND_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.name}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    tmpl.active
                      ? 'bg-aura-500/15 border-aura-500/30'
                      : 'bg-white/3 border-white/8 hover:bg-white/8'
                  }`}
                >
                  <span className="text-xl">{tmpl.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${tmpl.active ? 'text-white' : 'text-white/60'}`}>{tmpl.name}</div>
                    <div className="text-[10px] text-white/30 truncate">{tmpl.desc}</div>
                  </div>
                  {tmpl.active && <Check className="w-4 h-4 text-aura-400 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Save */}
          <button className="w-full py-3 rounded-xl bg-aura-gradient text-white font-bold shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300">
            Save Brand Kit
          </button>
        </div>
      </div>
    </div>
  )
}
