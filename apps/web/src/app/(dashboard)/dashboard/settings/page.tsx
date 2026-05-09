'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Bell, Shield, Palette, Globe, CreditCard,
  Key, Trash2, Save, Check, Eye, EyeOff, Zap,
  Instagram, Youtube, Linkedin, Twitter, Facebook,
  Link, Unlink, AlertCircle,
} from 'lucide-react'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'connections', label: 'Connections', icon: Globe },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'api', label: 'API Keys', icon: Key },
]

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: '📸', color: 'from-pink-500 to-rose-600', connected: true, username: '@mycreatoraccount' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', color: 'from-red-500 to-red-700', connected: true, username: 'MyChannel' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'from-cyan-400 to-blue-600', connected: false, username: null },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'from-blue-500 to-blue-700', connected: true, username: 'My Name' },
  { id: 'twitter', name: 'Twitter / X', icon: '𝕏', color: 'from-slate-600 to-slate-800', connected: false, username: null },
  { id: 'facebook', name: 'Facebook', icon: '📘', color: 'from-blue-600 to-indigo-700', connected: false, username: null },
  { id: 'pinterest', name: 'Pinterest', icon: '📌', color: 'from-red-500 to-rose-700', connected: false, username: null },
]

const PLANS = [
  { name: 'Starter', price: '$29', generations: '50/mo', platforms: 3 },
  { name: 'Pro', price: '$79', generations: '500/mo', platforms: 10, current: true },
  { name: 'Agency', price: '$199', generations: 'Unlimited', platforms: 'Unlimited' },
  { name: 'Enterprise', price: 'Custom', generations: 'Custom', platforms: 'Custom' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Creator',
    email: 'creator@example.com',
    username: 'mycreator',
    bio: 'Content creator & entrepreneur',
    website: 'https://example.com',
    timezone: 'America/New_York',
    language: 'en',
  })
  const [notifications, setNotifications] = useState({
    publishSuccess: true,
    publishFail: true,
    weeklyReport: true,
    aiComplete: false,
    teamActivity: true,
    trending: false,
    billing: true,
    marketing: false,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Settings</h1>
        <p className="text-white/40 text-sm mt-0.5">Manage your account, connections, and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <aside className="w-48 shrink-0 space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                ${activeTab === id
                  ? 'bg-aura-500/20 border border-aura-500/30 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-5">

          {/* Profile */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="glass-card p-6 space-y-5">
                <h3 className="font-semibold text-white">Personal Information</h3>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-aura-gradient flex items-center justify-center text-2xl font-bold text-white shadow-glow">
                    {profile.name[0]}
                  </div>
                  <div>
                    <button className="px-4 py-1.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-xs font-medium transition-all">
                      Change Avatar
                    </button>
                    <p className="text-[10px] text-white/30 mt-1">PNG, JPG · Max 4MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Full Name</label>
                    <input
                      value={profile.name}
                      onChange={e => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-aura-500/40 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Username</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">@</span>
                      <input
                        value={profile.username}
                        onChange={e => setProfile({ ...profile, username: e.target.value })}
                        className="w-full pl-7 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-aura-500/40 transition-all"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={e => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-aura-500/40 transition-all"
                    />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={e => setProfile({ ...profile, bio: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-aura-500/40 transition-all resize-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Website</label>
                    <input
                      value={profile.website}
                      onChange={e => setProfile({ ...profile, website: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-aura-500/40 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-widest">Timezone</label>
                    <select
                      value={profile.timezone}
                      onChange={e => setProfile({ ...profile, timezone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-aura-500/40 transition-all"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Asia/Kolkata">India (IST)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-aura-gradient text-white text-sm font-semibold shadow-glow hover:shadow-glow-lg hover:scale-105 active:scale-100 transition-all"
                >
                  {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>

              {/* Danger Zone */}
              <div className="glass-card p-6 space-y-4 border-red-500/20">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <h3 className="font-semibold text-red-400 text-sm">Danger Zone</h3>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                  <div>
                    <div className="text-sm font-medium text-white">Delete Account</div>
                    <div className="text-xs text-white/40 mt-0.5">Permanently delete your account and all data</div>
                  </div>
                  <button className="px-4 py-2 rounded-lg border border-red-500/40 text-red-400 text-sm hover:bg-red-500/10 transition-all">
                    Delete Account
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 space-y-5">
              <h3 className="font-semibold text-white">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: 'publishSuccess', label: 'Post Published Successfully', desc: 'Get notified when posts go live' },
                  { key: 'publishFail', label: 'Publishing Failed', desc: 'Alert when a scheduled post fails' },
                  { key: 'weeklyReport', label: 'Weekly Analytics Report', desc: 'Summary of your content performance' },
                  { key: 'aiComplete', label: 'AI Generation Complete', desc: 'When long AI tasks finish' },
                  { key: 'teamActivity', label: 'Team Activity', desc: 'When team members create or edit content' },
                  { key: 'trending', label: 'Trending Topic Alerts', desc: 'AI detects trends relevant to your niche' },
                  { key: 'billing', label: 'Billing Notifications', desc: 'Invoices and subscription updates' },
                  { key: 'marketing', label: 'Product Updates & Tips', desc: 'New features and best practices' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-white">{label}</div>
                      <div className="text-xs text-white/40 mt-0.5">{desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifications(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                        notifications[key as keyof typeof notifications] ? 'bg-aura-500' : 'bg-white/10'
                      }`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                        notifications[key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-aura-gradient text-white text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all">
                {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {saved ? 'Saved!' : 'Save Preferences'}
              </button>
            </motion.div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="glass-card p-6 space-y-5">
                <h3 className="font-semibold text-white">Change Password</h3>
                {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
                  <div key={label} className="space-y-1.5">
                    <label className="text-xs font-medium text-white/50 uppercase tracking-widest">{label}</label>
                    <div className="relative">
                      <input
                        type={i === 0 ? (showCurrentPass ? 'text' : 'password') : (showNewPass ? 'text' : 'password')}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-aura-500/40 transition-all"
                      />
                      {i < 2 && (
                        <button
                          type="button"
                          onClick={() => i === 0 ? setShowCurrentPass(!showCurrentPass) : setShowNewPass(!showNewPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                        >
                          {(i === 0 ? showCurrentPass : showNewPass) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-aura-gradient text-white text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all">
                  <Shield className="w-4 h-4" /> Update Password
                </button>
              </div>

              <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold text-white">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/8">
                  <div>
                    <div className="text-sm font-medium text-white">Authenticator App</div>
                    <div className="text-xs text-white/40 mt-0.5">Use Google Authenticator or Authy</div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-aura-500/20 border border-aura-500/30 text-aura-400 text-xs font-medium hover:bg-aura-500/30 transition-all">
                    Enable 2FA
                  </button>
                </div>
              </div>

              <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold text-white">Active Sessions</h3>
                {[
                  { device: 'MacBook Pro — Chrome', location: 'New York, US', current: true, time: 'Now' },
                  { device: 'iPhone 15 — Safari', location: 'New York, US', current: false, time: '2h ago' },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/8">
                    <div>
                      <div className="text-sm font-medium text-white">{session.device}</div>
                      <div className="text-xs text-white/40 mt-0.5">{session.location} · {session.time}</div>
                    </div>
                    {session.current
                      ? <span className="text-[10px] font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">Current</span>
                      : <button className="text-xs text-red-400 hover:text-red-300 transition-colors">Revoke</button>
                    }
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Connections */}
          {activeTab === 'connections' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="glass-card p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-white">Social Media Accounts</h3>
                  <p className="text-xs text-white/40 mt-1">Connect platforms to enable auto-publishing</p>
                </div>
                <div className="space-y-3">
                  {PLATFORMS.map((platform) => (
                    <div key={platform.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/8 hover:bg-white/5 transition-all"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-lg shrink-0`}>
                        {platform.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white">{platform.name}</div>
                        {platform.connected
                          ? <div className="text-xs text-white/40 mt-0.5">{platform.username}</div>
                          : <div className="text-xs text-white/30 mt-0.5">Not connected</div>
                        }
                      </div>
                      {platform.connected
                        ? (
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5 text-xs text-green-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                              Connected
                            </span>
                            <button className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
                              <Unlink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-aura-500/20 border border-aura-500/30 text-aura-400 text-xs font-medium hover:bg-aura-500/30 transition-all">
                            <Link className="w-3 h-3" /> Connect
                          </button>
                        )
                      }
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Billing */}
          {activeTab === 'billing' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              {/* Current Plan */}
              <div className="glass-card p-6 space-y-4 border-aura-500/20 bg-gradient-to-br from-aura-500/10 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-aura-400" />
                      <h3 className="font-semibold text-white">Pro Plan</h3>
                      <span className="px-2 py-0.5 rounded-full bg-aura-500/20 text-aura-400 text-[10px] font-bold border border-aura-500/30">CURRENT</span>
                    </div>
                    <p className="text-white/40 text-sm mt-1">$79/month · Renews Jun 9, 2026</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-display font-bold text-white">342</div>
                    <div className="text-xs text-white/40">credits left</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-aura-gradient" style={{ width: '68%' }} />
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-xl bg-aura-gradient text-white text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all">
                    Upgrade to Agency
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white text-sm transition-all">
                    Cancel Subscription
                  </button>
                </div>
              </div>

              {/* Plans */}
              <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold text-white">Available Plans</h3>
                <div className="grid grid-cols-2 gap-3">
                  {PLANS.map((plan) => (
                    <div key={plan.name}
                      className={`p-4 rounded-xl border transition-all ${
                        (plan as any).current
                          ? 'bg-aura-500/10 border-aura-500/30'
                          : 'bg-white/3 border-white/8 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-bold text-white">{plan.name}</div>
                          <div className="text-xs text-white/40 mt-1">{plan.generations} generations</div>
                          <div className="text-xs text-white/40">{plan.platforms} platforms</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-display font-bold text-white">{plan.price}</div>
                          {(plan as any).current && (
                            <div className="text-[10px] text-aura-400 font-medium">Active</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing History */}
              <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold text-white">Billing History</h3>
                <div className="space-y-2">
                  {[
                    { date: 'May 9, 2026', amount: '$79.00', status: 'Paid' },
                    { date: 'Apr 9, 2026', amount: '$79.00', status: 'Paid' },
                    { date: 'Mar 9, 2026', amount: '$79.00', status: 'Paid' },
                  ].map((invoice, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div>
                        <div className="text-sm font-medium text-white">Aura AI Pro Plan</div>
                        <div className="text-xs text-white/40">{invoice.date}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-white">{invoice.amount}</span>
                        <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">{invoice.status}</span>
                        <button className="text-xs text-aura-400 hover:text-aura-300 transition-colors">PDF</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* API Keys */}
          {activeTab === 'api' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <div className="glass-card p-6 space-y-5">
                <div>
                  <h3 className="font-semibold text-white">API Keys</h3>
                  <p className="text-xs text-white/40 mt-1">Use these to integrate Aura AI into your own apps</p>
                </div>

                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex gap-3">
                  <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-300/80">Keep your API keys secret. Never expose them in client-side code.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Production Key', key: 'aura_live_sk_••••••••••••••••••••4f2a', created: 'Apr 1, 2026', lastUsed: '2m ago' },
                    { name: 'Development Key', key: 'aura_test_sk_••••••••••••••••••••b1c9', created: 'Mar 15, 2026', lastUsed: '1d ago' },
                  ].map((apiKey, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-white">{apiKey.name}</div>
                        <button className="text-xs text-red-400 hover:text-red-300 transition-colors">Revoke</button>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 font-mono text-xs text-white/50">
                        <Key className="w-3.5 h-3.5 text-white/30 shrink-0" />
                        <span className="flex-1 truncate">{apiKey.key}</span>
                        <button className="text-aura-400 hover:text-aura-300 transition-colors shrink-0">Copy</button>
                      </div>
                      <div className="flex gap-4 text-[10px] text-white/30">
                        <span>Created: {apiKey.created}</span>
                        <span>Last used: {apiKey.lastUsed}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm transition-all">
                  <Key className="w-4 h-4" /> Generate New Key
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
