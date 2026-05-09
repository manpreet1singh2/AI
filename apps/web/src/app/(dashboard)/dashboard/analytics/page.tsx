'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Eye, Heart, Users, Share2, Clock, Zap } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts'

const reachData = [
  { date: 'May 1', reach: 45000, engagement: 3200 },
  { date: 'May 5', reach: 62000, engagement: 4100 },
  { date: 'May 10', reach: 58000, engagement: 3800 },
  { date: 'May 15', reach: 89000, engagement: 6200 },
  { date: 'May 20', reach: 124000, engagement: 8900 },
  { date: 'May 25', reach: 156000, engagement: 11200 },
  { date: 'May 30', reach: 198000, engagement: 14500 },
]

const platformData = [
  { platform: 'Instagram', reach: 840000, color: '#E1306C' },
  { platform: 'TikTok', reach: 1200000, color: '#00f2ea' },
  { platform: 'YouTube', reach: 560000, color: '#FF0000' },
  { platform: 'LinkedIn', reach: 240000, color: '#0077B5' },
  { platform: 'Twitter', reach: 180000, color: '#1DA1F2' },
]

const topContent = [
  { title: 'Morning Routine Reel', platform: '📸', views: '2.4M', engagement: '12.4%', trend: '+45%' },
  { title: 'Tech Tools Thread', platform: '𝕏', views: '890K', engagement: '8.2%', trend: '+22%' },
  { title: 'Fitness Short', platform: '▶️', views: '1.1M', engagement: '9.8%', trend: '+38%' },
  { title: 'Brand Story Carousel', platform: '📸', views: '560K', engagement: '14.2%', trend: '+18%' },
]

const COLORS = ['#E1306C', '#00f2ea', '#FF0000', '#0077B5', '#1DA1F2']

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d')

  return (
    <div className="max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Analytics</h1>
          <p className="text-white/40 text-sm mt-0.5">AI-powered insights across all platforms</p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                           ${period === p ? 'bg-aura-500 text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Reach', value: '3.2M', change: '+24.8%', icon: Eye, color: 'text-aura-400', bg: 'from-aura-500/20' },
          { label: 'Avg Engagement', value: '9.4%', change: '+5.2%', icon: Heart, color: 'text-pink-400', bg: 'from-pink-500/20' },
          { label: 'New Followers', value: '+28.4K', change: '+31.2%', icon: Users, color: 'text-green-400', bg: 'from-green-500/20' },
          { label: 'Posts Published', value: '142', change: 'This month', icon: Zap, color: 'text-yellow-400', bg: 'from-yellow-500/20' },
        ].map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card p-5 bg-gradient-to-br ${kpi.bg} to-transparent`}>
              <Icon className={`w-5 h-5 ${kpi.color} mb-3`} />
              <div className="text-2xl font-display font-bold text-white">{kpi.value}</div>
              <div className="text-xs text-white/40 mt-1">{kpi.label}</div>
              <div className="text-xs text-green-400 font-medium mt-1">{kpi.change}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reach over time */}
        <div className="lg:col-span-2 glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Reach & Engagement</h3>
            <div className="flex gap-3 text-xs text-white/40">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-aura-500" />Reach</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />Engagement</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={reachData}>
              <defs>
                <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(13,13,26,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }} />
              <Area type="monotone" dataKey="reach" stroke="#6366f1" strokeWidth={2} fill="url(#reachGrad)" />
              <Area type="monotone" dataKey="engagement" stroke="#22c55e" strokeWidth={2} fill="url(#engGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Platform breakdown */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-semibold text-white">Platform Breakdown</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={platformData} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
                dataKey="reach" nameKey="platform" paddingAngle={3}>
                {platformData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'rgba(13,13,26,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {platformData.map((p, i) => (
              <div key={p.platform} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                <span className="text-white/60 flex-1">{p.platform}</span>
                <span className="text-white font-medium">{(p.reach / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Content + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top performing content */}
        <div className="lg:col-span-2 glass-card p-6 space-y-4">
          <h3 className="font-semibold text-white">Top Performing Content</h3>
          <div className="space-y-2">
            {topContent.map((item, i) => (
              <div key={item.title} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/3 transition-all">
                <span className="text-white/30 text-sm font-mono w-4">{i + 1}</span>
                <span className="text-xl">{item.platform}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{item.title}</div>
                  <div className="text-xs text-white/40">{item.views} views · {item.engagement} eng rate</div>
                </div>
                <span className="text-green-400 text-sm font-semibold">{item.trend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-aura-400" />
            <h3 className="font-semibold text-white text-sm">AI Insights</h3>
          </div>
          <div className="space-y-3">
            {[
              { insight: 'Your Reels perform 45% better when posted between 6-8 PM.', icon: '🕕', color: 'bg-aura-500/10 border-aura-500/20' },
              { insight: 'Hook style "Nobody talks about..." drives 3x more watch time.', icon: '🎣', color: 'bg-green-500/10 border-green-500/20' },
              { insight: 'TikTok is your fastest-growing platform. Post 2x more there.', icon: '📈', color: 'bg-cyan-500/10 border-cyan-500/20' },
              { insight: 'Carousel posts get 58% more saves than single images.', icon: '💾', color: 'bg-pink-500/10 border-pink-500/20' },
            ].map((item) => (
              <div key={item.insight} className={`p-3 rounded-xl border text-xs text-white/70 leading-relaxed ${item.color}`}>
                <span className="text-lg mr-2">{item.icon}</span>
                {item.insight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
