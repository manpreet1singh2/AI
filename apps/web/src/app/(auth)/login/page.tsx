'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Zap, ArrowRight, Github, Chrome } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Call NextAuth signIn
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aura-600/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-aura-gradient flex items-center justify-center shadow-glow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-white">
              Aura <span className="gradient-text">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-white mt-6">Welcome back</h1>
          <p className="text-white/40 text-sm mt-1">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <div className="glass-card p-8 space-y-5">
          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl
                               bg-white/5 border border-white/10 text-white/70 hover:text-white
                               hover:bg-white/10 transition-all text-sm font-medium">
              <Chrome className="w-4 h-4" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl
                               bg-white/5 border border-white/10 text-white/70 hover:text-white
                               hover:bg-white/10 transition-all text-sm font-medium">
              <Github className="w-4 h-4" /> GitHub
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30">or continue with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/50">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm
                           placeholder:text-white/25 focus:outline-none focus:border-aura-500/50 transition-all" />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-xs font-medium text-white/50">Password</label>
                <Link href="/forgot-password" className="text-xs text-aura-400 hover:text-aura-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-white text-sm
                             placeholder:text-white/25 focus:outline-none focus:border-aura-500/50 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-aura-gradient text-white font-bold shadow-glow
                         hover:shadow-glow-lg hover:scale-105 active:scale-100 transition-all duration-300
                         disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/40">
            Don't have an account?{' '}
            <Link href="/register" className="text-aura-400 hover:text-aura-300 font-medium transition-colors">
              Start free trial
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
