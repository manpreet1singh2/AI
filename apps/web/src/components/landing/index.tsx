'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Play, Zap } from 'lucide-react'
import Link from 'next/link'

// ============ LOGO CLOUD ============
const PLATFORMS_DATA = [
  { name: 'Instagram', emoji: '📸' },
  { name: 'YouTube', emoji: '▶️' },
  { name: 'TikTok', emoji: '🎵' },
  { name: 'LinkedIn', emoji: '💼' },
  { name: 'X / Twitter', emoji: '𝕏' },
  { name: 'Facebook', emoji: '📘' },
  { name: 'Pinterest', emoji: '📌' },
  { name: 'Snapchat', emoji: '👻' },
]

export function LogoCloud() {
  return (
    <section className="py-16 border-y border-white/5 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
        <p className="text-sm text-white/30 uppercase tracking-widest font-medium">
          Auto-publish to every platform
        </p>
      </div>
      <div className="relative flex overflow-hidden">
        {/* Forward scroll */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-6 shrink-0"
        >
          {[...PLATFORMS_DATA, ...PLATFORMS_DATA].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/3 border border-white/8 shrink-0 hover:bg-white/8 transition-colors cursor-default"
            >
              <span className="text-2xl">{p.emoji}</span>
              <span className="text-white/60 font-medium whitespace-nowrap">{p.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============ HOW IT WORKS ============
const STEPS = [
  {
    step: '01',
    title: 'Connect Your Accounts',
    description: 'Link all your social media accounts with one-click OAuth. Instagram, YouTube, TikTok — all secured in under 60 seconds.',
    icon: '🔗',
    visual: {
      label: 'Account Connected',
      items: [
        { emoji: '📸', name: 'Instagram', status: 'Connected', color: 'text-green-400' },
        { emoji: '▶️', name: 'YouTube', status: 'Connected', color: 'text-green-400' },
        { emoji: '🎵', name: 'TikTok', status: 'Connecting...', color: 'text-yellow-400' },
        { emoji: '💼', name: 'LinkedIn', status: 'Connected', color: 'text-green-400' },
      ],
    },
  },
  {
    step: '02',
    title: 'Give Aura a Prompt',
    description: '"Create 5 luxury fitness reels for Instagram and Shorts." That\'s it. Aura handles everything else from scripts to publishing.',
    icon: '✍️',
    visual: {
      label: 'Prompt Input',
      prompt: '"Create 5 luxury fitness reels for Instagram & YouTube Shorts with cinematic style"',
    },
  },
  {
    step: '03',
    title: 'AI Generates Everything',
    description: 'Scripts, visuals, videos, voiceovers, captions, hashtags — all generated and optimized for each platform in under 60 seconds.',
    icon: '⚡',
    visual: {
      label: 'Generation Progress',
      steps: ['Analyzing trends', 'Writing scripts', 'Generating visuals', 'Adding voiceover', 'Optimizing captions'],
    },
  },
  {
    step: '04',
    title: 'Review & Schedule',
    description: 'Preview content in the calendar, make edits if needed, then schedule at the AI-recommended best times for maximum reach.',
    icon: '📅',
    visual: {
      label: 'Content Calendar',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  },
  {
    step: '05',
    title: 'Auto-Publish & Grow',
    description: 'Aura publishes automatically at peak times. Track performance with AI insights and continuously scale your content output.',
    icon: '🚀',
    visual: {
      label: 'Performance Stats',
      stats: [
        { label: 'Total Views', value: '2.4M', delta: '+180%' },
        { label: 'Followers', value: '50K', delta: '+12K' },
        { label: 'Posts Live', value: '1,247', delta: '+34' },
      ],
    },
  },
]

function StepVisual({ step }: { step: typeof STEPS[0] }) {
  if (step.visual.items) {
    return (
      <div className="glass-card p-6 space-y-3">
        <p className="text-xs text-white/30 uppercase tracking-widest">{step.visual.label}</p>
        {step.visual.items.map((item) => (
          <div key={item.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/8">
            <span className="text-xl">{item.emoji}</span>
            <span className="text-white/70 flex-1 text-sm">{item.name}</span>
            <span className={`text-xs font-medium ${item.color}`}>{item.status}</span>
          </div>
        ))}
      </div>
    )
  }
  if (step.visual.prompt) {
    return (
      <div className="glass-card p-6 space-y-4">
        <p className="text-xs text-white/30 uppercase tracking-widest">{step.visual.label}</p>
        <div className="p-4 rounded-xl bg-aura-500/10 border border-aura-500/20">
          <p className="text-white text-sm leading-relaxed">{step.visual.prompt}</p>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-white/40">AI processing your request...</span>
        </div>
      </div>
    )
  }
  if (step.visual.steps) {
    return (
      <div className="glass-card p-6 space-y-3">
        <p className="text-xs text-white/30 uppercase tracking-widest mb-2">{step.visual.label}</p>
        {step.visual.steps.map((s, i) => (
          <div key={s} className="space-y-1">
            <div className="flex justify-between text-xs text-white/40">
              <span>{s}</span><span>100%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full bg-aura-gradient" style={{ width: '100%' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (step.visual.days) {
    return (
      <div className="glass-card p-6 space-y-4">
        <p className="text-xs text-white/30 uppercase tracking-widest">{step.visual.label}</p>
        <div className="grid grid-cols-7 gap-1">
          {step.visual.days.map((d) => (
            <div key={d} className="text-center">
              <div className="text-[10px] text-white/30 mb-1">{d}</div>
              <div className={`h-14 rounded-lg border ${d === 'Mon' || d === 'Wed' || d === 'Fri' ? 'bg-aura-500/20 border-aura-500/30' : 'bg-white/3 border-white/8'} flex items-center justify-center`}>
                {(d === 'Mon' || d === 'Wed' || d === 'Fri') && <span className="text-xs">📸</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (step.visual.stats) {
    return (
      <div className="glass-card p-6 space-y-4">
        <p className="text-xs text-white/30 uppercase tracking-widest">{step.visual.label}</p>
        <div className="space-y-3">
          {step.visual.stats.map((s) => (
            <div key={s.label} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/8">
              <span className="text-white/50 text-sm">{s.label}</span>
              <div className="text-right">
                <div className="text-white font-bold text-sm">{s.value}</div>
                <div className="text-green-400 text-xs">{s.delta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" ref={ref} className="py-32 bg-[#08080f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20 space-y-4"
        >
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-400">
            Simple 5-Step Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            From Idea to Viral Post
            <br />
            <span className="gradient-text">in Under 60 Seconds</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            No technical skills needed. If you can type a sentence, you can run a world-class content machine.
          </p>
        </motion.div>

        <div className="space-y-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Text side */}
              <div className={`space-y-4 ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{step.icon}</span>
                  <span className="text-7xl font-display font-bold text-white/8">{step.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                <p className="text-white/50 leading-relaxed text-lg">{step.description}</p>
              </div>

              {/* Visual side */}
              <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <StepVisual step={step} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ AI SHOWCASE ============
const SHOWCASE_OUTPUTS = [
  { type: 'Reel Script', platform: 'Instagram', color: 'from-pink-900/50 to-purple-900/40', emoji: '🎬', views: '1.2M', time: '0:45' },
  { type: 'YouTube Short', platform: 'YouTube', color: 'from-red-900/50 to-orange-900/40', emoji: '▶️', views: '890K', time: '0:58' },
  { type: 'TikTok Video', platform: 'TikTok', color: 'from-cyan-900/50 to-blue-900/40', emoji: '🎵', views: '2.1M', time: '0:30' },
  { type: 'LinkedIn Post', platform: 'LinkedIn', color: 'from-blue-900/50 to-indigo-900/40', emoji: '💼', views: '45K', time: 'Article' },
  { type: 'Twitter Thread', platform: 'Twitter/X', color: 'from-slate-900/50 to-gray-900/40', emoji: '𝕏', views: '234K', time: '8 tweets' },
  { type: 'Pinterest Pin', platform: 'Pinterest', color: 'from-rose-900/50 to-red-900/40', emoji: '📌', views: '67K', time: 'Image' },
]

export function AIShowcaseSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [activePrompt, setActivePrompt] = useState(0)

  const prompts = [
    '"Create viral luxury fitness content for all platforms"',
    '"Write a product launch campaign for my SaaS startup"',
    '"Generate educational content about crypto investing"',
  ]

  return (
    <section ref={ref} className="py-32 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20 space-y-4"
        >
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-pink-500/10 border border-pink-500/20 text-pink-400">
            AI Generation Showcase
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Watch AI Create <span className="gradient-text">Real Content</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            One prompt. Six platform-native pieces. All generated in under 60 seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Input card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 space-y-6 sticky top-24"
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-medium">AI Generating...</span>
            </div>

            {/* Prompt selector */}
            <div className="space-y-3">
              <p className="text-xs text-white/30 uppercase tracking-widest">Try a Prompt</p>
              {prompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActivePrompt(i)}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 ${
                    activePrompt === i
                      ? 'bg-aura-500/15 border-aura-500/40 text-white'
                      : 'bg-white/3 border-white/8 text-white/50 hover:bg-white/8 hover:text-white/80'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Progress bars */}
            <div className="space-y-3">
              <p className="text-xs text-white/30 uppercase tracking-widest">Generation Pipeline</p>
              {['Trend Analysis', 'Script Writing', 'Visual Generation', 'Voiceover Synthesis', 'Caption & Hashtags', 'Platform Optimization'].map((s, i) => (
                <div key={s} className="space-y-1.5">
                  <div className="flex justify-between text-xs text-white/40">
                    <span>{s}</span>
                    <span>100%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: '100%' } : {}}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                      className="h-full rounded-full bg-aura-gradient"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <div className="text-green-400 font-semibold text-sm">6 pieces generated</div>
                <div className="text-white/40 text-xs">Ready to review and publish</div>
              </div>
            </div>
          </motion.div>

          {/* Output grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {SHOWCASE_OUTPUTS.map((item, i) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
                className={`rounded-2xl overflow-hidden aspect-[9/16] bg-gradient-to-br ${item.color} border border-white/8 relative group cursor-pointer hover:border-white/20 hover:scale-[1.02] transition-all duration-300`}
              >
                {/* Content type badge */}
                <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-[9px] bg-black/50 text-white/70 px-1.5 py-0.5 rounded-full">{item.time}</span>
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-aura-500/40 group-hover:border-aura-500/50 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-[10px] font-semibold text-white truncate">{item.type}</div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[9px] text-white/50">{item.platform}</span>
                    <span className="text-[9px] text-aura-400 font-medium">{item.views}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============ TESTIMONIALS ============
const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Fitness Creator',
    followers: '2.1M followers',
    avatar: 'SC',
    text: 'Aura AI completely replaced my entire content team. I went from posting 3x/week to 21x/week across all platforms, and my engagement tripled in 30 days.',
    rating: 5,
    platform: 'Instagram & TikTok',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Marcus Rivera',
    role: 'Agency Owner',
    followers: '47 clients',
    avatar: 'MR',
    text: "We've scaled from 10 to 47 clients without hiring additional staff. Aura handles content generation for all of them automatically. It's like having a 20-person team.",
    rating: 5,
    platform: 'Multi-platform',
    gradient: 'from-aura-500 to-violet-600',
  },
  {
    name: 'Priya Sharma',
    role: 'Tech Startup Founder',
    followers: '50K YouTube subscribers',
    avatar: 'PS',
    text: "Our YouTube channel went from 0 to 50K subscribers in 3 months using Aura's AI video generation. Completely hands-off. I just review and approve.",
    rating: 5,
    platform: 'YouTube & LinkedIn',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Jake Thompson',
    role: 'E-commerce Brand Owner',
    followers: '$2M+ revenue',
    avatar: 'JT',
    text: "The ROI is insane. $199/mo and we're generating what used to cost us $8,000/mo in content production. Non-negotiable tool for any serious business.",
    rating: 5,
    platform: 'Instagram & Facebook',
    gradient: 'from-green-500 to-emerald-600',
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-32 bg-[#08080f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20 space-y-4"
        >
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
            Real Results
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Loved by <span className="gradient-text">12,000+ Creators</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Real people. Real results. No paid testimonials — just creators who transformed their content strategy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 space-y-5 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-yellow-400 text-base">★</span>
                ))}
              </div>

              <p className="text-white/70 leading-relaxed text-base">"{t.text}"</p>

              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role} · {t.followers}</div>
                </div>
                <div className="text-xs text-white/30 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full shrink-0">
                  {t.platform}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/30"
        >
          {[
            { value: '12,000+', label: 'Active Creators' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '50M+', label: 'Posts Generated' },
            { value: '99.9%', label: 'Uptime SLA' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/30 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============ CTA SECTION ============
export function CTASection() {
  return (
    <section className="py-32 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative p-12 sm:p-16 rounded-3xl overflow-hidden">
          {/* BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-aura-600/20 via-purple-700/10 to-cyan-600/10" />
          <div className="absolute inset-0 border border-white/10 rounded-3xl" />
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-aura-600/30 blur-[100px] rounded-full" />
          <div className="absolute -bottom-1/2 right-1/4 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full" />

          <div className="relative space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20 text-white/70">
                🚀 Start in 2 minutes · No setup required
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                Start Creating Viral Content
                <br />
                <span className="gradient-text">Today. For Free.</span>
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
                Join 12,000+ creators who've replaced their entire content workflow with Aura AI.
                No credit card required. Cancel anytime.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/register"
                className="group px-10 py-4 rounded-2xl bg-aura-gradient text-white font-bold text-lg shadow-glow-lg hover:shadow-[0_0_80px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-100 transition-all duration-300 flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Start For Free — No Card Needed
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 rounded-2xl text-white/60 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 font-medium transition-all duration-300"
              >
                Sign In →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/30"
            >
              {['14-day free trial', 'Cancel anytime', 'Setup in 2 minutes', 'No credit card required'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
