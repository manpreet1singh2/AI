'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus, Clock, Instagram, Youtube, Linkedin } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const SAMPLE_POSTS = [
  { day: 2, title: 'Morning Routine Reel', platform: 'instagram', time: '7:00 AM', color: 'bg-pink-500/20 border-pink-500/30 text-pink-300' },
  { day: 5, title: 'LinkedIn Article', platform: 'linkedin', time: '9:00 AM', color: 'bg-blue-500/20 border-blue-500/30 text-blue-300' },
  { day: 5, title: 'YouTube Short', platform: 'youtube', time: '3:00 PM', color: 'bg-red-500/20 border-red-500/30 text-red-300' },
  { day: 9, title: 'Fitness Carousel', platform: 'instagram', time: '6:00 PM', color: 'bg-pink-500/20 border-pink-500/30 text-pink-300' },
  { day: 12, title: 'Brand Story Post', platform: 'instagram', time: '12:00 PM', color: 'bg-pink-500/20 border-pink-500/30 text-pink-300' },
  { day: 15, title: 'Tech Tutorial', platform: 'youtube', time: '2:00 PM', color: 'bg-red-500/20 border-red-500/30 text-red-300' },
  { day: 19, title: 'Motivational Reel', platform: 'instagram', time: '7:00 AM', color: 'bg-pink-500/20 border-pink-500/30 text-pink-300' },
  { day: 22, title: 'Product Launch', platform: 'linkedin', time: '10:00 AM', color: 'bg-blue-500/20 border-blue-500/30 text-blue-300' },
  { day: 26, title: 'AI Tools Review', platform: 'youtube', time: '4:00 PM', color: 'bg-red-500/20 border-red-500/30 text-red-300' },
]

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  instagram: <span className="text-[10px]">📸</span>,
  youtube: <span className="text-[10px]">▶️</span>,
  linkedin: <span className="text-[10px]">💼</span>,
  tiktok: <span className="text-[10px]">🎵</span>,
}

export default function SchedulePage() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today)
  const [view, setView] = useState<'month' | 'week'>('month')

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const cells = [...Array(firstDay).fill(null), ...Array(daysInMonth).keys()].map((v, i) => v === null ? null : v + 1)
  while (cells.length % 7 !== 0) cells.push(null)

  const getPostsForDay = (day: number) => SAMPLE_POSTS.filter(p => p.day === day)

  return (
    <div className="max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Content Calendar</h1>
          <p className="text-white/40 text-sm mt-0.5">Schedule and manage all your posts</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            {(['month', 'week'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all
                             ${view === v ? 'bg-aura-500 text-white' : 'text-white/40 hover:text-white'}`}>
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-aura-gradient text-white
                             text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all">
            <Plus className="w-4 h-4" />
            Schedule Post
          </button>
        </div>
      </div>

      {/* AI Best Times Banner */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-aura-500/10 border border-aura-500/20">
        <span className="text-2xl">🤖</span>
        <div>
          <span className="text-sm font-semibold text-white">AI Insight: </span>
          <span className="text-sm text-white/60">Best posting times this week are </span>
          <span className="text-sm font-medium text-aura-400">Mon 7AM, Wed 6PM, Fri 9AM</span>
          <span className="text-sm text-white/60"> based on your audience activity patterns.</span>
        </div>
      </div>

      {/* Calendar */}
      <div className="glass-card overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/8 text-white/50 hover:text-white transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-display font-bold text-white">
            {MONTHS[month]} {year}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/8 text-white/50 hover:text-white transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-white/5">
          {DAYS.map(d => (
            <div key={d} className="py-3 text-center text-xs font-semibold text-white/30 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
            const posts = day ? getPostsForDay(day) : []

            return (
              <div key={i}
                className={`min-h-[100px] p-2 border-r border-b border-white/5 last:border-r-0
                             ${day ? 'hover:bg-white/2 cursor-pointer' : 'bg-white/1'} transition-colors group`}>
                {day && (
                  <>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium mb-1.5
                                     ${isToday ? 'bg-aura-500 text-white shadow-glow' : 'text-white/50 group-hover:text-white'}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {posts.slice(0, 2).map((post, j) => (
                        <div key={j} className={`px-1.5 py-1 rounded text-[10px] font-medium border truncate
                                                   flex items-center gap-1 ${post.color}`}>
                          {PLATFORM_ICONS[post.platform]}
                          <span className="truncate">{post.title}</span>
                        </div>
                      ))}
                      {posts.length > 2 && (
                        <div className="text-[10px] text-white/30 pl-1">+{posts.length - 2} more</div>
                      )}
                      {posts.length === 0 && day && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="flex items-center gap-1 text-[10px] text-white/30 hover:text-aura-400 transition-colors">
                            <Plus className="w-3 h-3" /> Add post
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Upcoming Queue */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold text-white">Upcoming Queue</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SAMPLE_POSTS.slice(0, 4).map((post) => (
            <div key={post.title} className={`p-4 rounded-xl border ${post.color} space-y-2`}>
              <div className="flex items-center justify-between">
                <span className="text-lg">{PLATFORM_ICONS[post.platform]}</span>
                <span className="text-[10px] font-medium opacity-80">
                  <Clock className="w-3 h-3 inline mr-1" />{post.time}
                </span>
              </div>
              <div className="text-sm font-medium text-white">{post.title}</div>
              <div className="text-[10px] opacity-60">Day {post.day} of this month</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
