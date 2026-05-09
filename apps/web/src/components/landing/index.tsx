'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ============ LOGO CLOUD ============
const PLATFORMS_DATA = [
  { name: 'Instagram', emoji: '📸' },
  { name: 'YouTube', emoji: '▶️' },
  { name: 'TikTok', emoji: '🎵' },
  { name: 'LinkedIn', emoji: '💼' },
  { name: 'X / Twitter', emoji: '𝕏' },
  { name: 'Facebook', emoji: '📘' },
  { name: 'Pinterest', emoji: '📌' },
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
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 shrink-0"
        >
          {[...PLATFORMS_DATA, ...PLATFORMS_DATA].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/3 border border-white/8
                         shrink-0 hover:bg-white/8 transition-colors cursor-default"
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
    description: 'Link all your social media accounts with one-click OAuth. Instagram, YouTube, TikTok — all secured.',
    icon: '🔗',
  },
  {
    step: '02',
    title: 'Give Aura a Prompt',
    description: '"Create 5 luxury fitness reels for Instagram and Shorts." That\'s it. Aura handles everything else.',
    icon: '✍️',
  },
  {
    step: '03',
    title: 'AI Generates Everything',
    description: 'Scripts, visuals, videos, voiceovers, captions, hashtags — all generated in under 60 seconds.',
    icon: '⚡',
  },
  {
    step: '04',
    title: 'Review & Schedule',
    description: 'Preview content in the calendar, make edits if needed, then schedule at the AI-recommended best times.',
    icon: '📅',
  },
  {
    step: '05',
    title: 'Auto-Publish & Grow',
    description: 'Aura publishes automatically. Track performance with AI insights and keep scaling.',
    icon: '🚀',
  },
]

export function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" ref={ref} className="py-32 bg-[#08080f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20 space-y-4"
        >
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium
                           bg-green-500/10 border border-green-500/20 text-green-400">
            Simple 5-Step Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            From Idea to Viral Post
            <br />
            <span className="gradient-text">in Under 60 Seconds</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b
                          from-transparent via-aura-500/30 to-transparent hidden lg:block" />

          <div className="space-y-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className={`flex items-center gap-8 lg:gap-16 
                             ${i % 2 === 0 ? 'flex-col lg:flex-row' : 'flex-col lg:flex-row-reverse'}`}
              >
                <div className="flex-1 max-w-md">
                  <div className="glass-card p-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{step.icon}</span>
                      <span className="text-6xl font-display font-bold text-white/10">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="text-white/50 leading-relaxed">{step.description}</p>
                  </div>
                </div>
                <div className="lg:flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ AI SHOWCASE ============
export function AIShowcaseSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-32 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20 space-y-4"
        >
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium
                           bg-pink-500/10 border border-pink-500/20 text-pink-400">
            AI Generation Showcase
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Watch AI Create <span className="gradient-text">Real Content</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            These examples were generated entirely by Aura AI from a single prompt.
          </p>
        </motion.div>

        {/* Prompt → Output demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Input prompt card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 space-y-6"
          >
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AI Generating...
            </div>
            <div className="space-y-3">
              <p className="text-xs text-white/30 uppercase tracking-widest">Your Prompt</p>
              <div className="p-4 rounded-xl bg-aura-500/10 border border-aura-500/20">
                <p className="text-white font-medium">
                  "Create 3 viral luxury fitness reels for Instagram with cinematic style"
                </p>
              </div>
            </div>
            {/* Progress bars simulating generation */}
            {['Analyzing trends...', 'Writing scripts...', 'Generating visuals...', 'Adding voiceover...', 'Publishing...'].map((step, i) => (
              <div key={step} className="space-y-1.5">
                <div className="flex justify-between text-xs text-white/40">
                  <span>{step}</span>
                  <span>{100}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: '100%' } : {}}
                    transition={{ delay: 0.5 + i * 0.3, duration: 0.8 }}
                    className="h-full rounded-full bg-aura-gradient"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Output preview grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-3"
          >
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden aspect-[9/16] 
                             ${i === 4 ? 'ring-2 ring-aura-500 ring-offset-2 ring-offset-[#0a0a0f]' : ''}
                             bg-gradient-to-br ${
                               ['from-pink-900/40 to-purple-900/40',
                                'from-blue-900/40 to-cyan-900/40',
                                'from-orange-900/40 to-red-900/40',
                                'from-green-900/40 to-teal-900/40',
                                'from-aura-900/40 to-violet-900/40',
                                'from-yellow-900/40 to-orange-900/40',
                                'from-rose-900/40 to-pink-900/40',
                                'from-indigo-900/40 to-blue-900/40',
                                'from-emerald-900/40 to-green-900/40',
                               ][i]
                             } border border-white/5 relative group cursor-pointer`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                                  group-hover:bg-white/20 transition-colors">
                    <span className="text-white text-xs">▶</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="h-1.5 bg-white/20 rounded w-3/4 mb-1" />
                  <div className="h-1 bg-white/10 rounded w-1/2" />
                </div>
              </div>
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
    role: 'Fitness Creator, 2.1M followers',
    avatar: 'SC',
    text: 'Aura AI completely replaced my entire content team. I went from posting 3x/week to 21x/week across all platforms, and my engagement tripled.',
    rating: 5,
    platform: 'Instagram & TikTok',
  },
  {
    name: 'Marcus Rivera',
    role: 'Agency Owner, 47 clients',
    avatar: 'MR',
    text: 'We\'ve scaled from 10 to 47 clients without hiring additional staff. Aura handles content generation for all of them automatically.',
    rating: 5,
    platform: 'Multi-platform',
  },
  {
    name: 'Priya Sharma',
    role: 'Tech Startup Founder',
    avatar: 'PS',
    text: 'Our YouTube channel went from 0 to 50K subscribers in 3 months using Aura\'s AI video generation. Completely hands-off.',
    rating: 5,
    platform: 'YouTube & LinkedIn',
  },
  {
    name: 'Jake Thompson',
    role: 'E-commerce Brand Owner',
    avatar: 'JT',
    text: 'The ROI is insane. $199/mo and we\'re generating what used to cost us $8,000/mo in content production. Non-negotiable for our business.',
    rating: 5,
    platform: 'Instagram & Facebook',
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-32 bg-[#08080f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Loved by <span className="gradient-text">12,000+ Creators</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 space-y-4 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-white/70 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-aura-gradient flex items-center justify-center
                                text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role}</div>
                </div>
                <div className="ml-auto text-xs text-white/30 bg-white/5 px-2 py-1 rounded-full">
                  {t.platform}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ CTA SECTION ============
export function CTASection() {
  return (
    <section className="py-32 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative p-12 rounded-3xl overflow-hidden">
          {/* BG gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-aura-600/20 via-purple-700/10 to-cyan-600/10" />
          <div className="absolute inset-0 border border-white/10 rounded-3xl" />
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-96 h-96
                          bg-aura-600/30 blur-[100px] rounded-full" />

          <div className="relative space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
              Start Creating Viral Content
              <br />
              <span className="gradient-text">Today. For Free.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Join 12,000+ creators who've replaced their entire content workflow with Aura AI.
              No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/register"
                className="px-10 py-4 rounded-2xl bg-aura-gradient text-white font-bold text-lg
                           shadow-glow-lg hover:shadow-[0_0_80px_rgba(99,102,241,0.5)]
                           hover:scale-105 active:scale-100 transition-all duration-300"
              >
                🚀 Start For Free — No Card Needed
              </a>
            </div>
            <p className="text-white/20 text-sm">
              14-day free trial · Cancel anytime · Setup in 2 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
