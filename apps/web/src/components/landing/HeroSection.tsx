'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Zap, TrendingUp, X } from 'lucide-react'

const PLATFORMS = ['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'X', 'Facebook', 'Pinterest']

const FLOATING_CARDS = [
  { icon: '🎬', label: 'Reel Generated', value: '2.4M views', color: 'from-pink-500/20 to-rose-500/20', delay: 0 },
  { icon: '📈', label: 'Engagement Rate', value: '+340%', color: 'from-green-500/20 to-emerald-500/20', delay: 0.2 },
  { icon: '⚡', label: 'Posts Scheduled', value: '1,247', color: 'from-aura-500/20 to-violet-500/20', delay: 0.4 },
  { icon: '🤖', label: 'AI Content Ready', value: '98 pieces', color: 'from-cyan-500/20 to-blue-500/20', delay: 0.6 },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[#0a0a0f]">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <motion.div style={{ y }} className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-aura-600/20 blur-[120px] animate-float" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-600/20 blur-[100px] animate-float [animation-delay:2s]" />
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-cyan-600/15 blur-[80px] animate-float [animation-delay:4s]" />
        </motion.div>
      </div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center space-y-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-aura-500/10 border border-aura-500/30 text-aura-400 text-sm font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Future of Content Creation is Here</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute h-2 w-2 rounded-full bg-aura-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-aura-500" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.05] tracking-tight">
              <span className="text-white">One Prompt.</span>
              <br />
              <span className="gradient-text">Infinite Content.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/50 font-light leading-relaxed">
              Aura AI generates, schedules, and publishes viral content across every platform —
              automatically. From a single idea to a full content strategy in seconds.
            </p>
          </motion.div>

          {/* Platform Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {PLATFORMS.map((p, i) => (
              <motion.span
                key={p}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60"
              >
                {p}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/register"
              className="group relative flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white bg-aura-gradient shadow-glow-lg hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-100 transition-all duration-300"
            >
              <Zap className="w-4 h-4" />
              Start Creating Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setVideoOpen(true)}
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-medium text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-aura-500/30 transition-colors">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              Watch Demo (2 min)
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-white/40"
          >
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0a0a0f] bg-gradient-to-br from-aura-400 to-purple-600" />
              ))}
            </div>
            <span><strong className="text-white/70">12,000+</strong> creators already using Aura AI</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xs">★</span>
              ))}
              <span className="ml-1">4.9/5</span>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <div className="relative mt-16">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
                {/* Browser chrome */}
                <div className="h-8 bg-white/5 border-b border-white/5 flex items-center gap-2 px-4">
                  <div className="flex gap-1.5">
                    {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map(c => (
                      <div key={c} className={`w-2.5 h-2.5 rounded-full ${c} opacity-80`} />
                    ))}
                  </div>
                  <div className="flex-1 mx-4 h-4 bg-white/5 rounded-full flex items-center px-3">
                    <span className="text-[10px] text-white/20">app.aura-ai.com/dashboard</span>
                  </div>
                </div>

                {/* Dashboard mockup */}
                <div className="bg-[#0d0d1a] p-6 grid grid-cols-12 gap-4 min-h-[400px]">
                  {/* Sidebar */}
                  <div className="col-span-2 space-y-2">
                    <div className="h-6 w-6 rounded-lg bg-aura-gradient mb-4" />
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className={`h-8 rounded-lg ${i === 0 ? 'bg-aura-500/20 border border-aura-500/30' : 'bg-white/5'}`} />
                    ))}
                  </div>
                  {/* Main content */}
                  <div className="col-span-10 space-y-4">
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { c: 'from-aura-500/20', label: '50K', sub: 'Followers' },
                        { c: 'from-green-500/20', label: '+340%', sub: 'Engagement' },
                        { c: 'from-pink-500/20', label: '2.4M', sub: 'Total Views' },
                        { c: 'from-yellow-500/20', label: '1,247', sub: 'Posts Live' },
                      ].map((s, i) => (
                        <div key={i} className={`h-20 rounded-xl bg-gradient-to-br ${s.c} to-transparent border border-white/5 p-3 flex flex-col justify-between`}>
                          <div className="h-1.5 bg-white/10 rounded w-1/2" />
                          <div>
                            <div className="text-white font-bold text-sm">{s.label}</div>
                            <div className="text-white/30 text-[10px]">{s.sub}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-36 rounded-xl bg-white/3 border border-white/5 flex items-end p-3 overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-aura-600/20 to-transparent" />
                          <div className="relative space-y-1 w-full">
                            <div className="h-2 bg-white/20 rounded w-3/4" />
                            <div className="h-2 bg-white/10 rounded w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* AI Prompt bar */}
                    <div className="h-12 rounded-xl bg-aura-500/10 border border-aura-500/30 flex items-center px-4 gap-3">
                      <Sparkles className="w-4 h-4 text-aura-400 shrink-0" />
                      <div className="flex-1 h-2 bg-white/10 rounded" />
                      <div className="h-7 px-3 rounded-lg bg-aura-500/50 flex items-center">
                        <span className="text-[10px] text-white font-medium">Generate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow under dashboard */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-aura-600/30 blur-[60px] rounded-full" />
            </motion.div>

            {/* Floating stat cards */}
            {FLOATING_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1 + card.delay, duration: 0.5 }}
                className={`absolute hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl glass-card bg-gradient-to-r ${card.color} shadow-glass
                  ${i === 0 ? '-left-4 top-12' : ''}
                  ${i === 1 ? '-left-8 bottom-20' : ''}
                  ${i === 2 ? '-right-4 top-8' : ''}
                  ${i === 3 ? '-right-8 bottom-24' : ''}`}
              >
                <span className="text-2xl">{card.icon}</span>
                <div>
                  <div className="text-xs text-white/50">{card.label}</div>
                  <div className="text-sm font-bold text-white">{card.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Play button overlay on the dashboard */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              onClick={() => setVideoOpen(true)}
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-aura-500/30 group-hover:border-aura-500/50 group-hover:scale-110 transition-all duration-300 shadow-glow-lg">
                <Play className="w-6 h-6 text-white fill-current ml-1" />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Video embed — using a YouTube embed as demo */}
              <div className="aspect-video bg-[#0d0d1a]">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1&color=white"
                  title="Aura AI Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
