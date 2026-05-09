'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Check, Zap, Building2, Rocket } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter',
    icon: Zap,
    price: { monthly: 29, annual: 19 },
    description: 'Perfect for individual creators and small accounts.',
    highlight: false,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-white/10',
    features: [
      '50 AI content generations/mo',
      '3 social accounts connected',
      'AI captions & hashtags',
      'Basic image generation (100/mo)',
      'Content calendar',
      'Basic analytics',
      '5GB media storage',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    icon: Rocket,
    price: { monthly: 79, annual: 59 },
    description: 'For serious creators and growing brands.',
    highlight: true,
    gradient: 'from-aura-500/30 to-purple-600/30',
    border: 'border-aura-500/50',
    badge: 'Most Popular',
    features: [
      '500 AI content generations/mo',
      '10 social accounts connected',
      'AI video & reels generation (50/mo)',
      'Advanced image generation (500/mo)',
      'AI voiceover & subtitles',
      'Workflow automation (10 flows)',
      'Advanced analytics & AI insights',
      'Brand management',
      '50GB media storage',
      'Priority support',
    ],
  },
  {
    name: 'Agency',
    icon: Building2,
    price: { monthly: 199, annual: 149 },
    description: 'For agencies and teams managing multiple clients.',
    highlight: false,
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'border-white/10',
    features: [
      'Unlimited AI generations',
      'Unlimited social accounts',
      'Unlimited video generation',
      'AI influencer creation',
      'Unlimited workflow automation',
      'White-label options',
      'Team collaboration (20 seats)',
      'Client workspace management',
      '500GB media storage',
      'Dedicated account manager',
      'API access',
      'SLA guarantee',
    ],
  },
]

export function PricingSection() {
  const [annual, setAnnual] = useState(true)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pricing" ref={ref} className="relative py-32 bg-[#0a0a0f] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-aura-900/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 space-y-6"
        >
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium
                           bg-aura-500/10 border border-aura-500/20 text-aura-400">
            Transparent Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
            Start Free. Scale <span className="gradient-text">Infinitely.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            No hidden fees. Cancel anytime. 14-day free trial on all plans.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                          ${!annual ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                          ${annual ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
            >
              Annual
              <span className="ml-1.5 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                -30%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative flex flex-col p-8 rounded-2xl border bg-gradient-to-br ${plan.gradient}
                             ${plan.border} ${plan.highlight ? 'scale-105 shadow-glow-purple' : ''}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs
                                  font-bold bg-aura-gradient text-white shadow-glow">
                    {plan.badge}
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl ${plan.highlight ? 'bg-aura-500' : 'bg-white/10'}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                </div>

                <p className="text-white/50 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-display font-bold text-white">
                      ${annual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-white/40 mb-2">/mo</span>
                  </div>
                  {annual && (
                    <div className="text-xs text-green-400 mt-1">
                      Save ${(plan.price.monthly - plan.price.annual) * 12}/year
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href="/register"
                  className={`w-full py-3 rounded-xl font-semibold text-center text-sm mb-8 transition-all duration-300
                               ${plan.highlight
                                 ? 'bg-aura-gradient text-white shadow-glow hover:shadow-glow-lg hover:scale-105'
                                 : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  Start 14-Day Free Trial
                </Link>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                      <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center p-8 rounded-2xl glass-card"
        >
          <h3 className="text-xl font-bold text-white mb-2">Need Enterprise Scale?</h3>
          <p className="text-white/50 mb-6">
            Custom limits, dedicated infrastructure, SSO, audit logs, and SLA.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-black
                       font-semibold hover:bg-white/90 transition-all duration-300"
          >
            Contact Sales
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
