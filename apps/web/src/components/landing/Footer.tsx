import Link from 'next/link'
import { Zap, Twitter, Linkedin, Github, Youtube, Instagram } from 'lucide-react'

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'API Docs', href: '/docs/api' },
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
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Templates', href: '/templates' },
    { label: 'Community', href: '/community' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Partners', href: '/partners' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const SOCIALS = [
  { icon: Twitter, href: 'https://twitter.com/aura_ai', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/aura-ai', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@aura-ai', label: 'YouTube' },
  { icon: Instagram, href: 'https://instagram.com/aura.ai', label: 'Instagram' },
  { icon: Github, href: 'https://github.com/aura-ai', label: 'GitHub' },
]

export function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-aura-gradient flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">
                Aura <span className="gradient-text">AI</span>
              </span>
            </Link>

            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              The next-generation AI marketing operating system for creators, agencies, 
              and businesses. Generate, schedule, and publish viral content automatically.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                               text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20
                               transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>

            {/* Contact */}
            <div className="space-y-1 text-sm text-white/40">
              <p>📧 hello@aura-ai.com</p>
              <p>💬 support@aura-ai.com</p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-sm font-semibold text-white">{category}</h4>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6
                        flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Aura AI Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-white/60 transition-colors">Cookies</Link>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
