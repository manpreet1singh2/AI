import Link from 'next/link'
import { Zap, Twitter, Linkedin, Github, Youtube, Instagram, Mail, MessageCircle, MapPin, Phone } from 'lucide-react'

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'API Docs', href: '/docs/api' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Solutions: [
    { label: 'For Creators', href: '/solutions/creators' },
    { label: 'For Agencies', href: '/solutions/agencies' },
    { label: 'For Startups', href: '/solutions/startups' },
    { label: 'For Enterprise', href: '/solutions/enterprise' },
    { label: 'White-Label', href: '/solutions/white-label' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Video Tutorials', href: '/tutorials' },
    { label: 'Template Library', href: '/templates' },
    { label: 'Community', href: '/community' },
  ],
  Company: [
    { label: 'About Aura AI', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Partner Program', href: '/partners' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const SOCIALS = [
  { icon: Twitter, href: 'https://twitter.com/aura_ai', label: 'Twitter / X', color: 'hover:text-sky-400 hover:border-sky-500/30' },
  { icon: Linkedin, href: 'https://linkedin.com/company/aura-ai', label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-500/30' },
  { icon: Youtube, href: 'https://youtube.com/@aura-ai', label: 'YouTube', color: 'hover:text-red-400 hover:border-red-500/30' },
  { icon: Instagram, href: 'https://instagram.com/aura.ai', label: 'Instagram', color: 'hover:text-pink-400 hover:border-pink-500/30' },
  { icon: Github, href: 'https://github.com/aura-ai', label: 'GitHub', color: 'hover:text-white hover:border-white/30' },
]

export function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-white/5">
      {/* Newsletter / pre-footer */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-display font-bold text-white">Stay ahead of the curve</h3>
              <p className="text-white/40 text-sm mt-1">Get AI content tips, platform updates, and viral strategies. Weekly. No spam.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-aura-500/40 transition-all"
              />
              <button className="px-5 py-2.5 rounded-xl bg-aura-gradient text-white text-sm font-semibold shadow-glow hover:shadow-glow-lg transition-all shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-aura-gradient flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">
                Aura <span className="gradient-text">AI</span>
              </span>
            </Link>

            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              The next-generation AI marketing OS for creators, agencies, and businesses.
              Generate, schedule, and publish viral content — automatically.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 transition-all duration-200 ${s.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>

            {/* Contact info */}
            <div className="space-y-2 text-sm">
              <a href="mailto:hello@aura-ai.io" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                hello@aura-ai.io
              </a>
              <a href="mailto:support@aura-ai.io" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                support@aura-ai.io
              </a>
              <div className="flex items-center gap-2 text-white/30">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                San Francisco, CA · Remote-first
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Aura AI Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-white/60 transition-colors">Cookies</Link>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400/70">All systems operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
