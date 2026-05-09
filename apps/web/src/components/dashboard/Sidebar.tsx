'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, LayoutDashboard, Wand2, Calendar, BarChart3,
  Palette, Users, Settings, Workflow, Plus, ChevronLeft,
  ChevronRight, Globe, CreditCard, HelpCircle, Bell,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/content', label: 'Content Studio', icon: Wand2, badge: 'NEW' },
  { href: '/dashboard/schedule', label: 'Scheduler', icon: Calendar },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/automation', label: 'Automation', icon: Workflow },
  { href: '/dashboard/brand', label: 'Brand Kit', icon: Palette },
  { href: '/dashboard/team', label: 'Team', icon: Users },
]

const BOTTOM_ITEMS = [
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/pricing', label: 'Upgrade', icon: CreditCard },
  { href: '/docs', label: 'Help & Docs', icon: HelpCircle },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="relative flex flex-col h-full bg-[#0d0d1a] border-r border-white/5 overflow-hidden shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5 shrink-0">
        <div className="w-8 h-8 rounded-xl bg-aura-gradient flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-lg font-display font-bold text-white whitespace-nowrap"
            >
              Aura <span className="gradient-text">AI</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Create */}
      <div className="p-3">
        <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                            bg-aura-gradient text-white text-sm font-semibold
                            shadow-glow hover:shadow-glow-lg transition-all duration-200
                            ${collapsed ? 'justify-center' : ''}`}>
          <Plus className="w-4 h-4 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap"
              >
                Create Content
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-item ${active ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
              {badge && !collapsed && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-aura-500/20 text-aura-400 border border-aura-500/30">
                  {badge}
                </span>
              )}
            </Link>
          )
        })}

        {/* Platforms section */}
        {!collapsed && (
          <div className="pt-4 pb-2">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-white/20 mb-2">
              Connected Platforms
            </p>
            {[
              { name: 'Instagram', emoji: '📸', connected: true },
              { name: 'YouTube', emoji: '▶️', connected: true },
              { name: 'TikTok', emoji: '🎵', connected: false },
              { name: 'LinkedIn', emoji: '💼', connected: true },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm">
                <span className="text-base">{p.emoji}</span>
                <span className="text-white/50 flex-1">{p.name}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${p.connected ? 'bg-green-400' : 'bg-white/20'}`} />
              </div>
            ))}
            <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 text-xs text-aura-400 hover:text-aura-300 transition-colors">
              <Globe className="w-3.5 h-3.5" />
              + Connect more
            </Link>
          </div>
        )}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-white/5 space-y-0.5">
        {BOTTOM_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`sidebar-item ${collapsed ? 'justify-center px-2' : ''}`}
          >
            <Icon className="w-4.5 h-4.5 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                             className="whitespace-nowrap">
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        ))}

        {/* User */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2.5 mt-2 rounded-xl bg-white/3 border border-white/5">
            <div className="w-7 h-7 rounded-full bg-aura-gradient flex items-center justify-center text-xs font-bold text-white shrink-0">
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">User Name</div>
              <div className="text-xs text-white/40 truncate">Pro Plan</div>
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#0d0d1a] border border-white/10
                   flex items-center justify-center text-white/40 hover:text-white hover:border-white/30
                   transition-all duration-200 z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  )
}
