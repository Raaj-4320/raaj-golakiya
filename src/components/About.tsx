'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  BrainCircuit,
  Code2,
  Database,
  Layers,
  Zap,
  TrendingUp,
  Target,
  Users,
} from 'lucide-react'

const STRENGTHS = [
  {
    icon: BrainCircuit,
    title: 'End-to-End AI Systems',
    desc: 'From raw data to deployed ML model — pipelines, feature engineering, inference.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: Code2,
    title: 'Full Stack Execution',
    desc: 'React frontends, Node.js backends, REST APIs, and real-time socket systems.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Zap,
    title: 'Real-Time Architectures',
    desc: 'Low-latency systems with WebSockets, Redux Saga, and event-driven design.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: Database,
    title: 'Data-Driven Products',
    desc: 'Data collection, EDA, visualization, and building insight-driven features.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Layers,
    title: 'Modular Architecture',
    desc: 'Microfrontend patterns, component systems, and scalable design decisions.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Business-Aware Engineering',
    desc: 'Building systems that solve real problems — performance, usability, and impact.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
]

const INTERESTS = [
  { icon: BrainCircuit, label: 'Applied Machine Learning' },
  { icon: Zap, label: 'Real-Time Systems' },
  { icon: Target, label: 'AI-Powered SaaS' },
  { icon: TrendingUp, label: 'Data-Driven Products' },
]

function FadeInSection({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      {/* Subtle section separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeInSection className="mb-16">
          <div className="section-label mb-3">01. About</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Building at the intersection of{' '}
            <span className="gradient-text">AI and engineering</span>
          </h2>
        </FadeInSection>

        {/* Bio */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 mb-20">
          <FadeInSection delay={0.1}>
            <div className="space-y-5 text-slate-400 text-base lg:text-lg leading-relaxed">
              <p>
                I&apos;m a software engineer with a background in artificial intelligence,
                machine learning, and full stack development. I build end-to-end
                applications — from data processing and model development to interactive
                frontend systems and production-ready APIs.
              </p>
              <p>
                My work spans machine learning solutions, real-time communication
                systems, rich text and visual editing tools, and scalable web
                platforms. I enjoy solving practical engineering problems and
                building products that are technically strong, efficient, and
                user-friendly.
              </p>
              <p>
                I&apos;m particularly interested in roles where I can contribute to
                product development, engineering execution, and the continuous
                improvement of intelligent software systems. I work best in
                environments where learning, ownership, collaboration, and clean
                execution matter.
              </p>
            </div>

            {/* Interests */}
            <div className="mt-8">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Focused on
              </div>
              <div className="flex flex-wrap gap-3">
                {INTERESTS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm text-slate-300 font-medium"
                  >
                    <Icon size={14} className="text-blue-400" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* Quick facts card */}
          <FadeInSection delay={0.2}>
            <div className="glass rounded-2xl p-6 space-y-5 h-fit">
              <div className="text-sm font-semibold text-slate-400 mb-2">Quick Profile</div>

              {[
                { label: 'Based in', value: 'Toronto, Canada' },
                { label: 'Focus', value: 'AI/ML + Full Stack' },
                { label: 'Education', value: 'PG Diploma in AI/ML' },
                { label: 'Experience', value: 'ML + SDE + Senior SDE' },
                { label: 'Available for', value: 'Full-time & Contract' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4">
                  <span className="text-xs text-slate-500 font-medium shrink-0">{label}</span>
                  <span className="text-xs text-slate-300 font-semibold text-right">{value}</span>
                </div>
              ))}

              <div className="pt-4 border-t border-white/[0.06]">
                <a
                  href="mailto:raj.golakiya0@gmail.com"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 text-sm font-semibold rounded-xl transition-all"
                >
                  <Users size={14} />
                  Let&apos;s Connect
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Core Strengths */}
        <FadeInSection delay={0.1}>
          <div className="section-label mb-3">Core Strengths</div>
          <h3 className="text-2xl font-bold text-white mb-8">What I bring to the table</h3>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STRENGTHS.map((item, i) => {
            const Icon = item.icon
            return (
              <FadeInSection key={item.title} delay={0.05 * i}>
                <div className={`glass glass-hover rounded-2xl p-5 border ${item.border} h-full`}>
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                    <Icon size={18} className={item.color} />
                  </div>
                  <h4 className="font-bold text-slate-100 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
