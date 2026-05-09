'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Eye, Heart, Users, Zap, Video, Calendar } from 'lucide-react'

const STATS = [
  {
    label: 'Total Reach',
    value: '2.4M',
    change: '+18.2%',
    up: true,
    icon: Eye,
    gradient: 'from-aura-500/20 to-violet-500/20',
    iconColor: 'text-aura-400',
    border: 'border-aura-500/20',
  },
  {
    label: 'Engagement',
    value: '8.7%',
    change: '+34.1%',
    up: true,
    icon: Heart,
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
    border: 'border-pink-500/20',
  },
  {
    label: 'New Followers',
    value: '+12.4K',
    change: '+22.8%',
    up: true,
    icon: Users,
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
    border: 'border-green-500/20',
  },
  {
    label: 'Content Generated',
    value: '847',
    change: '+156 this month',
    up: true,
    icon: Zap,
    gradient: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-400',
    border: 'border-yellow-500/20',
  },
  {
    label: 'Videos Published',
    value: '124',
    change: '-3.2%',
    up: false,
    icon: Video,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
    border: 'border-blue-500/20',
  },
  {
    label: 'Posts Scheduled',
    value: '38',
    change: 'Next 30 days',
    up: null,
    icon: Calendar,
    gradient: 'from-purple-500/20 to-fuchsia-500/20',
    iconColor: 'text-purple-400',
    border: 'border-purple-500/20',
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {STATS.map((stat, i) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} border ${stat.border}
                         hover:scale-105 transition-all duration-300 cursor-default`}
          >
            <Icon className={`w-4 h-4 ${stat.iconColor} mb-3`} />
            <div className="text-2xl font-display font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-white/40 mb-2">{stat.label}</div>
            {stat.up !== null && (
              <div className={`flex items-center gap-1 text-xs font-medium
                               ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            )}
            {stat.up === null && (
              <div className="text-xs text-white/30">{stat.change}</div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

// ============ QUICK GENERATE ============
export function QuickGenerate() {
  const PRESETS = [
    { emoji: '🎬', label: 'Viral Reel', desc: 'Instagram & TikTok' },
    { emoji: '📸', label: 'Post + Caption', desc: 'All platforms' },
    { emoji: '▶️', label: 'YouTube Short', desc: '60s video' },
    { emoji: '💼', label: 'LinkedIn Post', desc: 'Professional' },
    { emoji: '🖼️', label: 'AI Image', desc: 'DALL-E 3 + Flux' },
    { emoji: '📧', label: 'Newsletter', desc: 'Email campaign' },
  ]

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Quick Generate</h3>
        <span className="text-xs text-white/30">Choose a template or start free</span>
      </div>

      {/* Main prompt input */}
      <div className="relative">
        <textarea
          placeholder='Describe your content... "Create 5 viral luxury fitness reels for Instagram with cinematic style"'
          className="w-full p-4 pr-24 rounded-xl bg-white/5 border border-white/10 text-white text-sm
                     placeholder:text-white/25 focus:outline-none focus:border-aura-500/40 resize-none h-20
                     transition-all duration-200"
        />
        <button className="absolute bottom-3 right-3 px-4 py-2 rounded-lg bg-aura-gradient
                           text-white text-xs font-bold shadow-glow hover:shadow-glow-lg transition-all">
          ⚡ Generate
        </button>
      </div>

      {/* Preset cards */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/3 border border-white/8
                       hover:bg-white/8 hover:border-white/15 transition-all duration-200 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">{p.emoji}</span>
            <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors text-center leading-tight">
              {p.label}
            </span>
            <span className="text-[10px] text-white/30 text-center leading-tight hidden sm:block">
              {p.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ============ RECENT CONTENT ============
const CONTENT_ITEMS = [
  { title: 'Luxury Fitness Morning Routine', type: 'REEL', platform: '📸 Instagram', status: 'PUBLISHED', views: '124K', time: '2h ago' },
  { title: 'Top 5 AI Tools 2024', type: 'SHORT', platform: '▶️ YouTube', status: 'SCHEDULED', views: '—', time: 'Tomorrow 9AM' },
  { title: 'Brand Story Thread', type: 'THREAD', platform: '𝕏 Twitter', status: 'DRAFT', views: '—', time: 'Just now' },
  { title: 'Product Launch Campaign', type: 'CAROUSEL', platform: '📸 Instagram', status: 'GENERATING', views: '—', time: '5m ago' },
]

const STATUS_STYLES: Record<string, string> = {
  PUBLISHED: 'bg-green-500/20 text-green-400 border-green-500/30',
  SCHEDULED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  DRAFT: 'bg-white/10 text-white/40 border-white/10',
  GENERATING: 'bg-aura-500/20 text-aura-400 border-aura-500/30 animate-pulse',
}

export function RecentContent() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Recent Content</h3>
        <a href="/dashboard/content" className="text-xs text-aura-400 hover:text-aura-300 transition-colors">
          View all →
        </a>
      </div>
      <div className="space-y-2">
        {CONTENT_ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/3 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-aura-500/10 border border-aura-500/20 flex items-center justify-center text-lg shrink-0">
              {item.type === 'REEL' ? '🎬' : item.type === 'SHORT' ? '▶️' : item.type === 'THREAD' ? '📝' : '🖼️'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate group-hover:text-aura-300 transition-colors">
                {item.title}
              </div>
              <div className="text-xs text-white/40">{item.platform} · {item.time}</div>
            </div>
            {item.views !== '—' && (
              <div className="text-sm font-medium text-white/60">{item.views}</div>
            )}
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${STATUS_STYLES[item.status]}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ UPCOMING POSTS ============
const UPCOMING = [
  { title: 'Fitness Reel #3', platform: '📸', time: 'Today 6:00 PM', ready: true },
  { title: 'LinkedIn Article', platform: '💼', time: 'Tomorrow 9:00 AM', ready: true },
  { title: 'YouTube Short', platform: '▶️', time: 'Wed 3:00 PM', ready: false },
  { title: 'Twitter Thread', platform: '𝕏', time: 'Thu 12:00 PM', ready: true },
]

export function UpcomingPosts() {
  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm">Upcoming Posts</h3>
        <a href="/dashboard/schedule" className="text-xs text-aura-400 hover:text-aura-300">Calendar →</a>
      </div>
      <div className="space-y-2">
        {UPCOMING.map((post) => (
          <div key={post.title} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/3 cursor-pointer">
            <span className="text-xl">{post.platform}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">{post.title}</div>
              <div className="text-[10px] text-white/30">{post.time}</div>
            </div>
            <span className={`w-2 h-2 rounded-full ${post.ready ? 'bg-green-400' : 'bg-yellow-400'}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ PLATFORM STATS ============
const PLATFORMS_PERF = [
  { name: 'Instagram', emoji: '📸', reach: '1.2M', growth: '+24%', bar: 85, color: 'bg-pink-500' },
  { name: 'YouTube', emoji: '▶️', reach: '840K', growth: '+18%', bar: 65, color: 'bg-red-500' },
  { name: 'TikTok', emoji: '🎵', reach: '2.1M', growth: '+56%', bar: 95, color: 'bg-cyan-500' },
  { name: 'LinkedIn', emoji: '💼', reach: '240K', growth: '+12%', bar: 40, color: 'bg-blue-500' },
]

export function PlatformStats() {
  return (
    <div className="glass-card p-5 space-y-4">
      <h3 className="font-semibold text-white text-sm">Platform Performance</h3>
      <div className="space-y-4">
        {PLATFORMS_PERF.map((p) => (
          <div key={p.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span>{p.emoji}</span>
                <span className="text-white/60">{p.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/40">{p.reach}</span>
                <span className="text-green-400 font-medium">{p.growth}</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.bar}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`h-full rounded-full ${p.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
