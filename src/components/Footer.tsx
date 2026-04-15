'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react'

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.06] bg-navy-950">
      {/* Top separator glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-black text-sm">RG</span>
                </div>
              </div>
              <div>
                <div className="font-bold text-slate-100">Raj Golakiya</div>
                <div className="text-xs text-slate-500">AI/ML Engineer · Full Stack Developer</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
              Building intelligent, scalable, and user-focused software with
              machine learning, real-time systems, and modern web technologies.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-slate-500 hover:text-blue-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social + back to top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-500 hover:text-slate-100 hover:bg-white/5 rounded-xl transition-all"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-slate-500 hover:text-blue-400 hover:bg-blue-500/5 rounded-xl transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:raj.golakiya0@gmail.com"
              className="p-2.5 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-xl transition-all"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>

            <div className="w-px h-5 bg-white/10 mx-1" />

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 text-slate-500 hover:text-slate-100 hover:bg-white/5 rounded-xl transition-all border border-white/[0.06]"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div>© {new Date().getFullYear()} Raj Golakiya. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            Built with Next.js · Tailwind CSS · Framer Motion
          </div>
        </div>
      </div>
    </footer>
  )
}
