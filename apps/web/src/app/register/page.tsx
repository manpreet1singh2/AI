'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Zap, ArrowRight, Github, Chrome, Check } from 'lucide-react'

const PERKS = [
  '14-day free trial, no card required',
  '500 AI content generations included',
  'All platforms connected instantly',
  'Cancel anytime — zero risk',
]

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setStep(2)
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative text-center space-y-6 max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white">You're in! 🎉</h1>
          <p className="text-white/50">
            Welcome to Aura AI. Your 14-day free trial has started. Let's set up your first content workflow.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-aura-gradient text-white font-bold shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
          >
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Left Panel — Value Prop */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#0d0d1a] to-[#0a0a0f] border-r border-white/5 p-12">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-aura-gradient flex items-center justify-center shadow-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold text-white">
            Aura <span className="gradient-text">AI</span>
          </span>
        </Link>

        <div className="space-y-10">
          <div className="space-y-4">
            <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-aura-500/10 border border-aura-500/20 text-aura-400">
              Start Free · No Credit Card
            </span>
            <h2 className="text-4xl font-display font-bold text-white leading-tight">
              Join 12,000+ creators<br />
              <span className="gradient-text">growing on autopilot</span>
            </h2>
            <p className="text-white/50 leading-relaxed">
              Generate weeks of content in minutes. Schedule, publish, and analyze — all from one AI-powered dashboard.
            </p>
          </div>

          <ul className="space-y-4">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-white/70">
                <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-green-400" />
                </div>
                {perk}
              </li>
            ))}
          </ul>

          {/* Testimonial snippet */}
          <div className="p-6 rounded-2xl glass-card space-y-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              "Aura AI replaced my $8,000/month content team. I now publish 3x more with better engagement."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-aura-gradient flex items-center justify-center text-xs font-bold text-white">JT</div>
              <div>
                <div className="text-white text-xs font-medium">Jake Thompson</div>
                <div className="text-white/30 text-xs">E-commerce Brand Owner</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-white/20">
          <Link href="/privacy" className="hover:text-white/40 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white/40 transition-colors">Terms of Service</Link>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-aura-600/10 blur-[120px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-aura-gradient flex items-center justify-center shadow-glow">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">
                Aura <span className="gradient-text">AI</span>
              </span>
            </Link>
          </div>

          <div className="text-center mb-8 lg:text-left">
            <h1 className="text-2xl font-display font-bold text-white">Create your account</h1>
            <p className="text-white/40 text-sm mt-1">Free 14-day trial · No credit card needed</p>
          </div>

          <div className="glass-card p-8 space-y-5">
            {/* OAuth */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
                <Chrome className="w-4 h-4" /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
                <Github className="w-4 h-4" /> GitHub
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/30">or sign up with email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/50">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-aura-500/50 focus:ring-1 focus:ring-aura-500/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/50">Work Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-aura-500/50 focus:ring-1 focus:ring-aura-500/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/50">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="Min 8 characters"
                    minLength={8}
                    required
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-aura-500/50 focus:ring-1 focus:ring-aura-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-aura-gradient text-white font-bold shadow-glow hover:shadow-glow-lg hover:scale-[1.02] active:scale-100 transition-all duration-300 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Start Free Trial <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              <p className="text-center text-xs text-white/30 leading-relaxed">
                By creating an account you agree to our{' '}
                <Link href="/terms" className="text-white/50 hover:text-white underline transition-colors">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-white/50 hover:text-white underline transition-colors">Privacy Policy</Link>
              </p>
            </form>

            <p className="text-center text-sm text-white/40">
              Already have an account?{' '}
              <Link href="/login" className="text-aura-400 hover:text-aura-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
