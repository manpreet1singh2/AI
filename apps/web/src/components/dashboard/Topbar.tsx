'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, Sparkles, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'

export function DashboardTopbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 border-b border-white/5 flex items-center gap-4 px-6 bg-[#0a0a0f]/80 backdrop-blur-xl shrink-0">
      {/* AI Prompt Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-aura-400 group-focus-within:text-aura-300 transition-colors" />
          </div>
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder='Ask Aura AI anything... "Create 5 viral reels for fitness"'
            className="w-full pl-9 pr-20 py-2.5 rounded-xl bg-white/5 border border-white/8
                       text-sm text-white placeholder:text-white/25
                       focus:outline-none focus:border-aura-500/50 focus:bg-white/8
                       transition-all duration-200"
          />
          {aiPrompt && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg
                         bg-aura-gradient text-white text-xs font-semibold"
            >
              Generate ↵
            </button>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Credits badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-aura-500/10 border border-aura-500/20">
          <Sparkles className="w-3.5 h-3.5 text-aura-400" />
          <span className="text-sm font-medium text-aura-300">342 credits</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40
                     hover:text-white hover:bg-white/8 transition-all duration-200"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-white/40
                           hover:text-white hover:bg-white/8 transition-all duration-200">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-aura-500 border border-[#0a0a0f]" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl
                           hover:bg-white/5 transition-all duration-200">
          <div className="w-7 h-7 rounded-full bg-aura-gradient flex items-center justify-center text-xs font-bold text-white">
            U
          </div>
          <span className="text-sm font-medium text-white/70 hidden sm:block">User</span>
          <ChevronDown className="w-3.5 h-3.5 text-white/30" />
        </button>
      </div>
    </header>
  )
}
