'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Wand2, Video, Calendar, BarChart3, Zap, Globe,
  Image, Mic, Hash, Users, Layers, TrendingUp,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Wand2,
    label: 'AI Content Engine',
    description: 'Generate captions, scripts, hooks, and full content strategies with one prompt.',
    gradient: 'from-aura-500 to-violet-600',
    glow: 'rgba(99,102,241,0.4)',
    tags: ['GPT-4o', 'Gemini', 'Claude'],
  },
  {
    icon: Image,
    label: 'AI Image Generation',
    description: 'Create stunning visuals, thumbnails, ad creatives, and brand-consistent imagery.',
    gradient: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.4)',
    tags: ['DALL-E 3', 'Flux', 'Stable Diffusion'],
  },
  {
    icon: Video,
    label: 'AI Video & Reels',
    description: 'Generate cinematic reels, shorts, and videos with AI avatars, voiceovers & subtitles.',
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6,182,212,0.4)',
    tags: ['RunwayML', 'Pika', 'Remotion'],
  },
  {
    icon: Calendar,
    label: 'Smart Scheduling',
    description: 'AI-powered best-time predictions. Schedule and auto-publish across all 7 platforms.',
    gradient: 'from-green-500 to-emerald-600',
    glow: 'rgba(34,197,94,0.4)',
    tags: ['BullMQ', 'Cron', 'Timezone AI'],
  },
  {
    icon: BarChart3,
    label: 'Deep Analytics',
    description: 'Track views, engagement, followers, and get AI-powered insights on what performs best.',
    gradient: 'from-orange-500 to-amber-600',
    glow: 'rgba(249,115,22,0.4)',
    tags: ['Real-time', 'AI Insights', 'Reports'],
  },
  {
    icon: Zap,
    label: 'Workflow Automation',
    description: 'Build drag-and-drop AI agent workflows. Trigger → Generate → Post, fully automated.',
    gradient: 'from-yellow-500 to-orange-500',
    glow: 'rgba(234,179,8,0.4)',
    tags: ['No-code', 'AI Agents', 'Triggers'],
  },
  {
    icon: Globe,
    label: 'Multi-Platform Publishing',
    description: 'One-click publish to Instagram, YouTube, TikTok, LinkedIn, X, Facebook, Pinterest.',
    gradient: 'from-teal-500 to-cyan-600',
    glow: 'rgba(20,184,166,0.4)',
    tags: ['OAuth', 'Auto-resize', 'Bulk post'],
  },
  {
    icon: Mic,
    label: 'AI Voiceover & Audio',
    description: 'Generate human-quality voiceovers, clone your voice, and sync background music.',
    gradient: 'from-purple-500 to-pink-600',
    glow: 'rgba(168,85,247,0.4)',
    tags: ['ElevenLabs', 'Whisper', 'Voice Clone'],
  },
  {
    icon: Hash,
    label: 'Hashtag & SEO AI',
    description: 'Auto-generate trending, viral hashtags and SEO-optimized titles for every platform.',
    gradient: 'from-red-500 to-rose-600',
    glow: 'rgba(239,68,68,0.4)',
    tags: ['Trend API', 'SEO', 'Viral Score'],
  },
  {
    icon: Layers,
    label: 'Brand Management',
    description: 'Save your brand colors, fonts, voice, templates, and logos for consistent output.',
    gradient: 'from-indigo-500 to-aura-600',
    glow: 'rgba(99,102,241,0.4)',
    tags: ['Brand Kit', 'Templates', 'Style Guide'],
  },
  {
    icon: Users,
    label: 'Team Collaboration',
    description: 'Multi-workspace system with roles, approvals, comments, and agency client management.',
    gradient: 'from-fuchsia-500 to-purple-600',
    glow: 'rgba(217,70,239,0.4)',
    tags: ['Roles', 'Approvals', 'Agency'],
  },
  {
    icon: TrendingUp,
    label: 'Viral Intelligence',
    description: 'Detect trends, score content virality, A/B test, and find winning audio before it peaks.',
    gradient: 'from-lime-500 to-green-600',
    glow: 'rgba(132,204,22,0.4)',
    tags: ['Trend AI', 'A/B Test', 'Predict'],
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" ref={ref} className="relative py-32 bg-[#0a0a0f] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px
                      bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                           bg-aura-500/10 border border-aura-500/20 text-aura-400">
            Everything You Need
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            The Complete AI Marketing
            <br />
            <span className="gradient-text">Operating System</span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/50 text-lg">
            12 powerful modules working together to automate your entire social media presence.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group relative p-6 rounded-2xl bg-white/3 border border-white/8
                           hover:border-white/15 hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 40px ${feature.glow}15` }}
                />

                {/* Icon */}
                <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4
                                 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-white mb-2">{feature.label}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">{feature.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium
                                 bg-white/5 border border-white/10 text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
