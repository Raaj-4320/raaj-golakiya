'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Code2, BrainCircuit, Zap } from 'lucide-react'

const ROLES = [
  'AI/ML Engineer',
  'Full Stack Developer',
  'Software Engineer',
  'ML Systems Builder',
  'Applied AI Developer',
]

const TECH_TAGS = [
  { label: 'Python', color: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5' },
  { label: 'React', color: 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5' },
  { label: 'TensorFlow', color: 'text-orange-400 border-orange-400/20 bg-orange-400/5' },
  { label: 'Node.js', color: 'text-green-400 border-green-400/20 bg-green-400/5' },
  { label: 'PyTorch', color: 'text-red-400 border-red-400/20 bg-red-400/5' },
  { label: 'PostgreSQL', color: 'text-blue-400 border-blue-400/20 bg-blue-400/5' },
  { label: 'Docker', color: 'text-sky-400 border-sky-400/20 bg-sky-400/5' },
  { label: 'NLP', color: 'text-violet-400 border-violet-400/20 bg-violet-400/5' },
]

const STATS = [
  { value: '5+', label: 'Projects Shipped', icon: Code2 },
  { value: 'ML + Web', label: 'Dual Expertise', icon: BrainCircuit },
  { value: 'Real-Time', label: 'Systems Built', icon: Zap },
]

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, text.length + 1))
          if (text.length + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause)
          }
        } else {
          setText(current.slice(0, text.length - 1))
          if (text.length - 1 === 0) {
            setDeleting(false)
            setWordIndex((i) => (i + 1) % words.length)
          }
        }
      },
      deleting ? speed / 2 : speed
    )
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, speed, pause])

  return text
}

export default function Hero() {
  const role = useTypewriter(ROLES)

  const scrollToProjects = () => {
    const el = document.getElementById('projects')
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center hero-gradient grid-bg overflow-hidden"
    >
      {/* Ambient orbs */}
      <div
        className="orb w-[600px] h-[600px] bg-blue-600 left-[-200px] top-[-100px]"
        style={{ opacity: 0.07 }}
      />
      <div
        className="orb w-[500px] h-[500px] bg-violet-600 right-[-150px] bottom-[100px]"
        style={{ opacity: 0.06 }}
      />
      <div
        className="orb w-[300px] h-[300px] bg-cyan-500 right-[30%] top-[10%]"
        style={{ opacity: 0.04 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide mb-6"
            >
              <Sparkles size={12} />
              Available for Opportunities · Toronto, Canada
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4"
            >
              <span className="text-white">Raj</span>
              <br />
              <span className="gradient-text">Golakiya</span>
            </motion.h1>

            {/* Role typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-xl sm:text-2xl font-semibold text-slate-300">
                {role}
              </span>
              <span className="cursor" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              I build intelligent, scalable software — from ML pipelines and NLP
              systems to real-time web apps and production APIs. End-to-end,
              performance-first, business-aware.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={scrollToProjects}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-glow-blue hover:scale-105 active:scale-100"
              >
                View Projects
              </button>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 bg-white/[0.06] hover:bg-white/[0.1] text-slate-100 font-semibold rounded-xl border border-white/[0.08] hover:border-white/20 transition-all duration-200"
              >
                Download Resume
              </a>
              <button
                onClick={scrollToContact}
                className="flex items-center gap-2 px-6 py-3 text-blue-400 font-semibold rounded-xl border border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/5 transition-all duration-200"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/5 rounded-lg transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:raj.golakiya0@gmail.com"
                className="p-2.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-spin-slow" style={{ width: '380px', height: '380px', margin: 'auto' }} />
              <div className="absolute inset-0 rounded-full border border-violet-500/10 animate-[spin_30s_linear_infinite_reverse]" style={{ width: '320px', height: '320px', margin: 'auto', top: '30px', left: '30px' }} />

              {/* Center avatar */}
              <div className="relative w-56 h-56 mx-auto rounded-full overflow-hidden">
                {/* Gradient bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-violet-600/20 to-cyan-600/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900" style={{ inset: '2px', borderRadius: '50%' }} />

                {/* Initials */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black gradient-text leading-none">RG</span>
                  <span className="text-xs text-slate-500 mt-2 tracking-widest font-medium uppercase">Portfolio</span>
                </div>

                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full ring-2 ring-blue-500/20 ring-offset-4 ring-offset-navy-950" />
              </div>

              {/* Floating tech tags */}
              <div className="absolute top-0 -right-4 flex flex-col gap-2 animate-float">
                {TECH_TAGS.slice(0, 4).map((tag) => (
                  <div
                    key={tag.label}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${tag.color} backdrop-blur-sm`}
                  >
                    {tag.label}
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 -left-8 flex flex-col gap-2 animate-float-delayed">
                {TECH_TAGS.slice(4).map((tag) => (
                  <div
                    key={tag.label}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${tag.color} backdrop-blur-sm`}
                  >
                    {tag.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-3 gap-4 lg:gap-6 mt-16 pt-10 border-t border-white/[0.06] max-w-lg"
        >
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="group">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} className="text-blue-500" />
                <span className="text-xl lg:text-2xl font-black gradient-text-blue">{value}</span>
              </div>
              <div className="text-xs text-slate-500 font-medium leading-tight">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => {
          const el = document.getElementById('about')
          if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors group"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}
