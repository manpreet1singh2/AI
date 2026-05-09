'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Image, Video, Mic, Hash, Copy, Download, Sparkles, RefreshCw, Share2 } from 'lucide-react'

const PLATFORMS = ['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'Twitter', 'Facebook']
const TONES = ['Viral', 'Luxury', 'Corporate', 'Emotional', 'Gen-Z', 'Cinematic', 'Storytelling']
const CONTENT_TYPES = ['Post', 'Reel', 'Carousel', 'Story', 'Thread', 'Short', 'Video']

interface GeneratedContent {
  caption: string
  hashtags: string[]
  hook: string
  cta: string
  script?: string
}

export default function ContentStudioPage() {
  const [prompt, setPrompt] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram'])
  const [selectedTone, setSelectedTone] = useState('Viral')
  const [selectedType, setSelectedType] = useState('Reel')
  const [count, setCount] = useState(3)
  const [generating, setGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'video'>('text')
  const [results, setResults] = useState<GeneratedContent[]>([])
  const [selectedResult, setSelectedResult] = useState(0)

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    )
  }

  const generate = async () => {
    if (!prompt.trim()) return
    setGenerating(true)
    setResults([])

    try {
      // Call API
      const res = await fetch('/api/v1/ai/generate/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          platform: selectedPlatforms[0]?.toLowerCase(),
          tone: selectedTone.toLowerCase(),
          contentType: selectedType.toLowerCase(),
          count,
        }),
      })
      const data = await res.json()
      if (data.success) setResults(data.data)
    } catch {
      // Demo fallback
      setResults([
        {
          hook: '🔥 Nobody talks about this fitness secret that 1% of people know',
          caption: `🏋️ Transform your body in 30 days with this ONE morning routine that top athletes swear by.\n\nMost people waste hours in the gym without results. Here's what actually works:\n\n✅ 5AM cold plunge (builds mental toughness)\n✅ 20-min compound movements only\n✅ High-protein breakfast within 30 mins\n✅ No cardio until after weights\n\nSave this post. Your future self will thank you. 💪\n\nWhat's your current morning routine? Drop it below 👇`,
          hashtags: ['fitness', 'morningroutine', 'gym', 'workout', 'fitnessmotivation', 'health', 'bodybuilding', 'gains', 'fitlife', 'transformation', 'muscle', 'strength', 'healthy', 'motivation', 'lifestyle', 'training', 'exercise', 'athlete', 'wellness', 'fitnessgoals'],
          cta: 'Save this post and share with someone who needs this!',
          script: 'HOOK (0-3s): [Show before/after transformation]\nBODY (3-45s): [Walk through each step with b-roll]\nCTA (45-60s): [Face cam, direct ask to follow]',
        },
      ])
    } finally {
      setGenerating(false)
    }
  }

  const result = results[selectedResult]

  return (
    <div className="max-w-7xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Content Studio</h1>
        <p className="text-white/40 text-sm mt-0.5">AI-powered content generation for every platform</p>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2">
        {[
          { id: 'text', label: 'Text & Caption', icon: Wand2 },
          { id: 'image', label: 'AI Images', icon: Image },
          { id: 'video', label: 'AI Videos', icon: Video },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                         ${activeTab === id
                           ? 'bg-aura-gradient text-white shadow-glow'
                           : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/8'}`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT: Controls */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5 space-y-5">
            {/* Prompt */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Your Prompt</label>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder='e.g. "Create viral luxury fitness reels with cinematic style and motivational tone"'
                rows={4}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm
                           placeholder:text-white/25 focus:outline-none focus:border-aura-500/40 resize-none"
              />
            </div>

            {/* Platforms */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Platforms</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(p => (
                  <button
                    key={p}
                    onClick={() => togglePlatform(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                 ${selectedPlatforms.includes(p)
                                   ? 'bg-aura-500/30 border border-aura-500/50 text-aura-300'
                                   : 'bg-white/5 border border-white/10 text-white/40 hover:text-white'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Type */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Content Type</label>
              <div className="flex flex-wrap gap-2">
                {CONTENT_TYPES.map(t => (
                  <button key={t} onClick={() => setSelectedType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                 ${selectedType === t
                                   ? 'bg-purple-500/30 border border-purple-500/50 text-purple-300'
                                   : 'bg-white/5 border border-white/10 text-white/40 hover:text-white'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Tone</label>
              <div className="flex flex-wrap gap-2">
                {TONES.map(t => (
                  <button key={t} onClick={() => setSelectedTone(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                 ${selectedTone === t
                                   ? 'bg-cyan-500/30 border border-cyan-500/50 text-cyan-300'
                                   : 'bg-white/5 border border-white/10 text-white/40 hover:text-white'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-widest">
                Variations: <span className="text-white">{count}</span>
              </label>
              <input type="range" min={1} max={10} value={count} onChange={e => setCount(+e.target.value)}
                className="w-full accent-aura-500" />
            </div>

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={generating || !prompt.trim()}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-aura-gradient shadow-glow
                         hover:shadow-glow-lg hover:scale-105 active:scale-100 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
                         flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating {count} variations...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Content ⚡
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="lg:col-span-3 space-y-4">
          {generating && (
            <div className="glass-card p-8 space-y-4">
              {['🔍 Researching trends...', '✍️ Writing viral hooks...', '📝 Crafting captions...', '# Generating hashtags...'].map((step, i) => (
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.3 }} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-aura-500/20 border border-aura-500/40 flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                      className="w-2 h-2 rounded-full bg-aura-400" />
                  </div>
                  <span className="text-sm text-white/60">{step}</span>
                </motion.div>
              ))}
            </div>
          )}

          <AnimatePresence>
            {result && !generating && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4">

                {/* Variation tabs */}
                {results.length > 1 && (
                  <div className="flex gap-2">
                    {results.map((_, i) => (
                      <button key={i} onClick={() => setSelectedResult(i)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                                     ${selectedResult === i
                                       ? 'bg-aura-500 text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}>
                        Variation {i + 1}
                      </button>
                    ))}
                  </div>
                )}

                {/* Hook */}
                <div className="glass-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">🎣 Viral Hook</span>
                    <button onClick={() => navigator.clipboard.writeText(result.hook)}
                      className="text-white/30 hover:text-white transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                  </div>
                  <p className="text-white font-medium text-lg leading-relaxed">{result.hook}</p>
                </div>

                {/* Caption */}
                <div className="glass-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-aura-400 uppercase tracking-widest">📝 Caption</span>
                    <div className="flex gap-2">
                      <button onClick={() => navigator.clipboard.writeText(result.caption)}
                        className="text-white/30 hover:text-white transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{result.caption}</p>
                </div>

                {/* Hashtags */}
                <div className="glass-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">
                      # Hashtags ({result.hashtags.length})
                    </span>
                    <button onClick={() => navigator.clipboard.writeText(result.hashtags.map(h => `#${h}`).join(' '))}
                      className="text-white/30 hover:text-white transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.hashtags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10
                                                  text-xs text-white/60 hover:text-white hover:border-white/20 cursor-pointer transition-all">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Script */}
                {result.script && (
                  <div className="glass-card p-5 space-y-3">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">🎬 Video Script</span>
                    <p className="text-white/70 text-sm leading-relaxed font-mono whitespace-pre-wrap">{result.script}</p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 rounded-xl bg-aura-gradient text-white font-semibold text-sm
                                     shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" /> Schedule Post
                  </button>
                  <button className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60
                                     hover:text-white hover:bg-white/10 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                  <button onClick={generate} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10
                                     text-white/60 hover:text-white hover:bg-white/10 transition-all">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!result && !generating && (
            <div className="glass-card p-16 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-white/10 mx-auto" />
              <p className="text-white/30">Enter a prompt and click Generate to create viral content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
