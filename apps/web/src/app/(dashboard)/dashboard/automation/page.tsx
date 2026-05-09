'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Play, Pause, Zap, ArrowRight, Settings, Trash2, Copy } from 'lucide-react'

const WORKFLOW_TEMPLATES = [
  {
    name: 'Auto Reel Publisher',
    description: 'When content is approved → Generate reel → Add voiceover → Post to Instagram + TikTok',
    icon: '🎬',
    runs: 142,
    status: 'active',
    triggers: ['Content Approved'],
    actions: ['Generate Reel', 'Add Voiceover', 'Post to Instagram', 'Post to TikTok'],
    gradient: 'from-pink-500/20 to-purple-500/20',
    border: 'border-pink-500/20',
  },
  {
    name: 'Blog → Social Repurposer',
    description: 'New blog post detected → Extract key points → Create 5 posts for all platforms',
    icon: '📝',
    runs: 89,
    status: 'active',
    triggers: ['New Blog Post (RSS)'],
    actions: ['Extract Key Points', 'Generate Captions', 'Create Images', 'Schedule All Platforms'],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/20',
  },
  {
    name: 'Trend Chaser',
    description: 'Trending topic detected → Generate relevant content → Publish within 30 minutes',
    icon: '🔥',
    runs: 34,
    status: 'paused',
    triggers: ['Trending Topic Alert'],
    actions: ['Research Trend', 'Generate Content', 'Quick Publish'],
    gradient: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/20',
  },
  {
    name: 'Product Launch Campaign',
    description: 'Product added to Shopify → Full campaign: teasers, launch day content, follow-ups',
    icon: '🚀',
    runs: 12,
    status: 'active',
    triggers: ['New Shopify Product'],
    actions: ['Create Teaser Series', 'Launch Day Content', 'Schedule 7-Day Campaign'],
    gradient: 'from-aura-500/20 to-violet-500/20',
    border: 'border-aura-500/20',
  },
]

const TRIGGER_OPTIONS = [
  { id: 'schedule', label: 'Scheduled Time', icon: '🕐' },
  { id: 'rss', label: 'New Blog Post (RSS)', icon: '📰' },
  { id: 'shopify', label: 'New Product (Shopify)', icon: '🛍️' },
  { id: 'notion', label: 'Notion Page Created', icon: '📋' },
  { id: 'trend', label: 'Trending Topic Alert', icon: '🔥' },
  { id: 'approved', label: 'Content Approved', icon: '✅' },
]

const ACTION_OPTIONS = [
  { id: 'generate_text', label: 'Generate Captions + Hashtags', icon: '✍️' },
  { id: 'generate_image', label: 'Generate AI Images', icon: '🎨' },
  { id: 'generate_video', label: 'Generate AI Video/Reel', icon: '🎬' },
  { id: 'generate_voice', label: 'Add AI Voiceover', icon: '🎙️' },
  { id: 'post_instagram', label: 'Post to Instagram', icon: '📸' },
  { id: 'post_youtube', label: 'Post to YouTube', icon: '▶️' },
  { id: 'post_tiktok', label: 'Post to TikTok', icon: '🎵' },
  { id: 'post_linkedin', label: 'Post to LinkedIn', icon: '💼' },
  { id: 'notify_slack', label: 'Notify Slack Channel', icon: '💬' },
  { id: 'save_draft', label: 'Save as Draft', icon: '💾' },
]

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState<'workflows' | 'builder'>('workflows')
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null)
  const [selectedActions, setSelectedActions] = useState<string[]>([])

  const toggleAction = (id: string) => {
    setSelectedActions(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  return (
    <div className="max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Automation</h1>
          <p className="text-white/40 text-sm mt-0.5">AI agent workflows that run on autopilot</p>
        </div>
        <button onClick={() => setActiveTab('builder')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-aura-gradient text-white
                     text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all">
          <Plus className="w-4 h-4" /> New Workflow
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[{ id: 'workflows', label: '⚡ My Workflows' }, { id: 'builder', label: '🔨 Workflow Builder' }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                         ${activeTab === tab.id ? 'bg-aura-500 text-white' : 'bg-white/5 text-white/50 hover:text-white'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'workflows' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {WORKFLOW_TEMPLATES.map((wf, i) => (
            <motion.div key={wf.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card p-6 space-y-4 bg-gradient-to-br ${wf.gradient} border ${wf.border} hover:scale-[1.01] transition-all duration-300`}>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{wf.icon}</span>
                  <div>
                    <h3 className="font-bold text-white">{wf.name}</h3>
                    <p className="text-xs text-white/50 mt-0.5">{wf.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Flow preview */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-1 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-[10px] font-semibold">
                  TRIGGER: {wf.triggers[0]}
                </span>
                {wf.actions.map((action, j) => (
                  <div key={j} className="flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-white/20" />
                    <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white/50 text-[10px]">
                      {action}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-xs text-white/30">
                  <Zap className="w-3 h-3 inline mr-1" />
                  {wf.runs} runs total
                </span>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1.5 text-xs font-medium
                                    ${wf.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${wf.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
                    {wf.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                  <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                      ${wf.status === 'active'
                                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}>
                    {wf.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {wf.status === 'active' ? 'Pause' : 'Resume'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trigger */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold text-black">1</div>
              <h3 className="font-bold text-white">Choose Trigger</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TRIGGER_OPTIONS.map(trigger => (
                <button key={trigger.id} onClick={() => setSelectedTrigger(trigger.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-sm text-left transition-all
                               ${selectedTrigger === trigger.id
                                 ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300'
                                 : 'bg-white/3 border-white/8 text-white/50 hover:text-white hover:bg-white/8'}`}>
                  <span>{trigger.icon}</span>
                  <span className="text-xs">{trigger.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-aura-500 flex items-center justify-center text-xs font-bold text-white">2</div>
              <h3 className="font-bold text-white">Add Actions</h3>
              <span className="text-xs text-white/30">(select in order)</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {ACTION_OPTIONS.map((action, i) => (
                <button key={action.id} onClick={() => toggleAction(action.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-sm text-left transition-all
                               ${selectedActions.includes(action.id)
                                 ? 'bg-aura-500/20 border-aura-500/40 text-aura-300'
                                 : 'bg-white/3 border-white/8 text-white/50 hover:text-white hover:bg-white/8'}`}>
                  <span>{action.icon}</span>
                  <span className="text-xs flex-1">{action.label}</span>
                  {selectedActions.includes(action.id) && (
                    <span className="text-[10px] bg-aura-500/30 px-1.5 py-0.5 rounded font-bold">
                      Step {selectedActions.indexOf(action.id) + 1}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview + Save */}
          {(selectedTrigger || selectedActions.length > 0) && (
            <div className="lg:col-span-2 glass-card p-6 space-y-4">
              <h3 className="font-bold text-white">Workflow Preview</h3>
              <div className="flex items-center gap-3 flex-wrap">
                {selectedTrigger && (
                  <span className="px-3 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-sm font-semibold">
                    🔔 {TRIGGER_OPTIONS.find(t => t.id === selectedTrigger)?.label}
                  </span>
                )}
                {selectedActions.map((actionId, i) => {
                  const action = ACTION_OPTIONS.find(a => a.id === actionId)
                  return action ? (
                    <div key={i} className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-white/20" />
                      <span className="px-3 py-2 rounded-xl bg-aura-500/20 border border-aura-500/30 text-aura-300 text-sm">
                        {action.icon} {action.label}
                      </span>
                    </div>
                  ) : null
                })}
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 rounded-xl bg-aura-gradient text-white font-semibold shadow-glow hover:shadow-glow-lg transition-all">
                  ⚡ Save & Activate Workflow
                </button>
                <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all">
                  Save as Draft
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
