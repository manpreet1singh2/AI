'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Mail, Shield, Crown, User, UserPlus, MoreHorizontal, Check, X } from 'lucide-react'

const TEAM_MEMBERS = [
  { name: 'Sarah Chen', email: 'sarah@example.com', role: 'Admin', avatar: 'SC', gradient: 'from-pink-500 to-rose-600', status: 'active', lastActive: 'Online now', posts: 84 },
  { name: 'Marcus Rivera', email: 'marcus@example.com', role: 'Editor', avatar: 'MR', gradient: 'from-aura-500 to-violet-600', status: 'active', lastActive: '2h ago', posts: 52 },
  { name: 'Priya Sharma', email: 'priya@example.com', role: 'Viewer', avatar: 'PS', gradient: 'from-cyan-500 to-blue-600', status: 'inactive', lastActive: '3d ago', posts: 18 },
]

const PENDING_INVITES = [
  { email: 'jake@example.com', role: 'Editor', sentAt: '2 days ago' },
  { email: 'lisa@example.com', role: 'Viewer', sentAt: '5 days ago' },
]

const ROLE_INFO = [
  { role: 'Admin', icon: Crown, desc: 'Full access: manage team, billing, all content', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  { role: 'Editor', icon: Shield, desc: 'Create, edit, schedule content. Cannot manage team or billing.', color: 'text-aura-400', bg: 'bg-aura-500/10 border-aura-500/20' },
  { role: 'Viewer', icon: User, desc: 'Read-only access to analytics and published content.', color: 'text-white/50', bg: 'bg-white/5 border-white/10' },
]

export default function TeamPage() {
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Editor')
  const [inviteSent, setInviteSent] = useState(false)

  const handleInvite = () => {
    if (!inviteEmail.trim()) return
    setInviteSent(true)
    setTimeout(() => { setInviteSent(false); setInviteEmail('') }, 2000)
  }

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Team</h1>
          <p className="text-white/40 text-sm mt-0.5">
            Manage your team members, roles, and access permissions
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
          <Users className="w-3.5 h-3.5" />
          {TEAM_MEMBERS.length} / 20 seats used
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team List */}
        <div className="lg:col-span-2 space-y-5">
          {/* Invite Form */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-aura-400" />
              Invite Team Member
            </h3>
            <div className="flex gap-3">
              <input
                type="email"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-aura-500/40 transition-all"
              />
              <select
                value={inviteRole}
                onChange={e => setInviteRole(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-aura-500/40 transition-all"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
              <button
                onClick={handleInvite}
                className="px-5 py-2.5 rounded-xl bg-aura-gradient text-white text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-2 shrink-0"
              >
                {inviteSent ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                {inviteSent ? 'Sent!' : 'Send Invite'}
              </button>
            </div>
          </div>

          {/* Active Members */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-white">Active Members ({TEAM_MEMBERS.length})</h3>
            <div className="space-y-3">
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div
                  key={member.email}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/8 hover:bg-white/5 transition-all group"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white">{member.name}</div>
                    <div className="text-xs text-white/40">{member.email}</div>
                  </div>
                  <div className="text-center hidden sm:block">
                    <div className="text-sm font-medium text-white">{member.posts}</div>
                    <div className="text-[10px] text-white/30">posts</div>
                  </div>
                  <div className="text-xs text-white/30 hidden sm:block">{member.lastActive}</div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                    member.role === 'Admin' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                    : member.role === 'Editor' ? 'bg-aura-500/10 border-aura-500/20 text-aura-400'
                    : 'bg-white/5 border-white/10 text-white/40'
                  }`}>
                    {member.role}
                  </span>
                  <button className="w-8 h-8 rounded-lg bg-white/5 text-white/30 hover:text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pending Invites */}
          {PENDING_INVITES.length > 0 && (
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-semibold text-white">Pending Invites ({PENDING_INVITES.length})</h3>
              <div className="space-y-2">
                {PENDING_INVITES.map((invite) => (
                  <div key={invite.email} className="flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/8 border-dashed">
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white/70">{invite.email}</div>
                      <div className="text-xs text-white/30">Sent {invite.sentAt}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] text-white/40 bg-white/5 border border-white/8">{invite.role}</span>
                    <button className="text-white/20 hover:text-red-400 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Role Guide */}
        <div className="space-y-5">
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold text-white text-sm">Role Permissions</h3>
            <div className="space-y-3">
              {ROLE_INFO.map(({ role, icon: Icon, desc, color, bg }) => (
                <div key={role} className={`p-4 rounded-xl border ${bg} space-y-2`}>
                  <div className={`flex items-center gap-2 text-sm font-semibold ${color}`}>
                    <Icon className="w-4 h-4" /> {role}
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 space-y-3">
            <h3 className="font-semibold text-white text-sm">Need More Seats?</h3>
            <p className="text-xs text-white/40 leading-relaxed">
              Your current plan includes 20 seats. Upgrade to Agency for unlimited team members and client workspaces.
            </p>
            <button className="w-full py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors">
              Upgrade to Agency
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
