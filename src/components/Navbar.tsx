'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy-950/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-9 h-9 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 opacity-90" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-black text-sm tracking-tight">RG</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                  Raj Golakiya
                </div>
                <div className="text-[10px] text-slate-500 font-medium tracking-wide">
                  AI/ML · Full Stack
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-blue-400'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                )
              })}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="/resume.pdf"
                download
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-200 hover:shadow-glow-sm"
              >
                <Download size={14} />
                Resume
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-navy-900/95 backdrop-blur-xl border-b border-white/[0.06] lg:hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="flex w-full items-center px-4 py-3 text-sm font-medium text-slate-300 hover:text-blue-400 hover:bg-blue-500/5 rounded-xl transition-all"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 pb-1 border-t border-white/[0.06]">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
