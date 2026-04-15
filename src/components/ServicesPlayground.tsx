'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Globe,
  Smartphone,
  BrainCircuit,
  BarChart3,
  Zap,
  Server,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Sparkles,
  Play,
  RotateCcw,
  Mail,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type ServiceId = 'web' | 'mobile' | 'aiml' | 'data' | 'realtime' | 'backend'
type Phase = 'explore' | 1 | 2 | 3 | 4

// ── Service catalog ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 'web' as ServiceId,
    title: 'Web Application',
    icon: Globe,
    color: '#3b82f6',
    gradient: 'from-blue-600 to-blue-400',
    bgGlow: 'rgba(59,130,246,0.15)',
    tags: ['React', 'Node.js', 'Full Stack'],
    description: 'Modern, scalable web platforms with rich user experiences.',
    features: [
      'User Authentication & Roles',
      'Admin Dashboard',
      'Real-time Updates',
      'Payment Integration',
      'Search & Filtering',
      'File Management',
      'Email Notifications',
      'Analytics Dashboard',
      'SEO Optimization',
      'Mobile Responsive',
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    baseMin: 8000,
    baseMax: 25000,
    baseWeeks: 8,
  },
  {
    id: 'mobile' as ServiceId,
    title: 'Mobile App',
    icon: Smartphone,
    color: '#10b981',
    gradient: 'from-emerald-600 to-emerald-400',
    bgGlow: 'rgba(16,185,129,0.15)',
    tags: ['React Native', 'iOS', 'Android'],
    description: 'Cross-platform iOS & Android apps with native performance.',
    features: [
      'User Authentication',
      'Push Notifications',
      'Offline Support',
      'Payment Integration',
      'Camera & Media Access',
      'Location Services',
      'Social Sharing',
      'Background Sync',
    ],
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
    baseMin: 12000,
    baseMax: 35000,
    baseWeeks: 10,
  },
  {
    id: 'aiml' as ServiceId,
    title: 'AI / ML System',
    icon: BrainCircuit,
    color: '#8b5cf6',
    gradient: 'from-violet-600 to-violet-400',
    bgGlow: 'rgba(139,92,246,0.15)',
    tags: ['Python', 'TensorFlow', 'NLP'],
    description: 'Intelligent, data-driven solutions powered by machine learning.',
    features: [
      'Predictive Modeling',
      'Natural Language Processing',
      'Computer Vision',
      'Recommendation Engine',
      'Anomaly Detection',
      'Sentiment Analysis',
      'Classification Pipeline',
      'Data Preprocessing',
      'Model API Endpoint',
      'Monitoring & Retraining',
    ],
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Docker'],
    baseMin: 15000,
    baseMax: 50000,
    baseWeeks: 12,
  },
  {
    id: 'data' as ServiceId,
    title: 'Data Analytics',
    icon: BarChart3,
    color: '#f59e0b',
    gradient: 'from-amber-600 to-amber-400',
    bgGlow: 'rgba(245,158,11,0.15)',
    tags: ['Python', 'Power BI', 'Pandas'],
    description: 'Turn raw data into actionable insights and interactive dashboards.',
    features: [
      'EDA & Reporting',
      'Interactive Dashboards',
      'Data Visualization',
      'Statistical Analysis',
      'Trend Detection',
      'Automated Reports',
      'Data Pipeline',
      'KPI Tracking',
    ],
    techStack: ['Python', 'Pandas', 'Power BI', 'PostgreSQL', 'Tableau'],
    baseMin: 5000,
    baseMax: 20000,
    baseWeeks: 6,
  },
  {
    id: 'realtime' as ServiceId,
    title: 'Real-Time App',
    icon: Zap,
    color: '#06b6d4',
    gradient: 'from-cyan-600 to-cyan-400',
    bgGlow: 'rgba(6,182,212,0.15)',
    tags: ['Socket.IO', 'WebSocket', 'Redux'],
    description: 'Live collaboration, streaming, and event-driven architectures.',
    features: [
      'Live Chat & Messaging',
      'Real-time Notifications',
      'Collaborative Editing',
      'Live Dashboards',
      'Event Broadcasting',
      'Presence & Typing',
      'Video/Audio Calls',
    ],
    techStack: ['React', 'Socket.IO', 'Node.js', 'Redis', 'PostgreSQL'],
    baseMin: 10000,
    baseMax: 30000,
    baseWeeks: 7,
  },
  {
    id: 'backend' as ServiceId,
    title: 'API & Backend',
    icon: Server,
    color: '#f43f5e',
    gradient: 'from-rose-600 to-rose-400',
    bgGlow: 'rgba(244,63,94,0.15)',
    tags: ['Node.js', 'PostgreSQL', 'AWS'],
    description: 'Scalable APIs, microservices, and production infrastructure.',
    features: [
      'REST API Design',
      'Authentication & JWT',
      'Database Architecture',
      'Cloud Deployment',
      'CI/CD Pipeline',
      'API Documentation',
      'Performance Optimization',
      'Security Hardening',
      'Caching Layer',
    ],
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
    baseMin: 6000,
    baseMax: 20000,
    baseWeeks: 6,
  },
]

const JOURNEY_PHASES = [
  {
    id: 'discovery',
    label: 'Discovery',
    weeks: '1–2 wks',
    description: 'Requirements, research, technical planning',
    color: '#3b82f6',
    tasks: ['Scope definition', 'Technical spec', 'Architecture design'],
  },
  {
    id: 'design',
    label: 'Design',
    weeks: '1 wk',
    description: 'UX/UI wireframes and system design',
    color: '#8b5cf6',
    tasks: ['Wireframes', 'Component library', 'Data models'],
  },
  {
    id: 'development',
    label: 'Development',
    weeks: 'varies',
    description: 'Core build, integrations, API endpoints',
    color: '#06b6d4',
    tasks: ['Feature sprints', 'API development', 'Integrations'],
  },
  {
    id: 'testing',
    label: 'Testing',
    weeks: '1–2 wks',
    description: 'QA, performance testing, bug fixes',
    color: '#f59e0b',
    tasks: ['Unit testing', 'Integration tests', 'Performance audit'],
  },
  {
    id: 'launch',
    label: 'Launch',
    weeks: '1 wk',
    description: 'Deployment, monitoring, handover',
    color: '#10b981',
    tasks: ['Cloud deploy', 'Monitoring setup', 'Documentation'],
  },
]

// ── Budget calc ────────────────────────────────────────────────────────────────

function calcBudget(service: (typeof SERVICES)[0], featureCount: number) {
  const extra = featureCount * 1800
  return {
    min: Math.round((service.baseMin + extra * 0.5) / 1000) * 1000,
    max: Math.round((service.baseMax + extra) / 1000) * 1000,
  }
}

function calcWeeks(service: (typeof SERVICES)[0], featureCount: number) {
  return service.baseWeeks + Math.floor(featureCount * 0.6)
}

// ── Sub components ─────────────────────────────────────────────────────────────

function ServiceOrb({ service, onClick }: { service: (typeof SERVICES)[0]; onClick: () => void }) {
  const Icon = service.icon
  return (
    <motion.button
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative group flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300"
      style={{
        background: `${service.bgGlow}`,
        borderColor: `${service.color}30`,
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 30px ${service.color}30, inset 0 0 30px ${service.color}08` }}
      />

      {/* Icon ring */}
      <div
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: `${service.color}18`, border: `1.5px solid ${service.color}40` }}
      >
        <Icon size={28} style={{ color: service.color }} />
        {/* Pulse ring */}
        <div
          className="absolute inset-0 rounded-2xl animate-ping-slow opacity-30"
          style={{ border: `1px solid ${service.color}` }}
        />
      </div>

      <div className="text-center">
        <div className="font-bold text-slate-100 text-sm mb-1">{service.title}</div>
        <div className="text-xs text-slate-500 leading-snug">{service.description}</div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 justify-center">
        {service.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{ color: service.color, background: `${service.color}15` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Arrow indicator */}
      <div
        className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: service.color }}
      >
        <Play size={10} />
        Start here
      </div>
    </motion.button>
  )
}

function ProgressBar({ current }: { current: 1 | 2 | 3 | 4 }) {
  const steps = [
    { n: 1, label: 'Service' },
    { n: 2, label: 'Features' },
    { n: 3, label: 'Roadmap' },
    { n: 4, label: 'Estimate' },
  ]
  return (
    <div className="flex items-center gap-1 mb-8">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center gap-1 flex-1">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                s.n < current
                  ? 'bg-blue-500 text-white'
                  : s.n === current
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400/40'
                  : 'bg-white/5 text-slate-600 border border-white/10'
              }`}
            >
              {s.n < current ? <CheckCircle2 size={14} /> : s.n}
            </div>
            <span
              className={`text-[10px] font-medium hidden sm:block ${
                s.n <= current ? 'text-blue-400' : 'text-slate-600'
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-1 rounded-full overflow-hidden bg-white/5 mb-4">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: s.n < current ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function JourneyMap({
  service,
  featureCount,
}: {
  service: (typeof SERVICES)[0]
  featureCount: number
}) {
  const totalWeeks = calcWeeks(service, featureCount)
  const phases = JOURNEY_PHASES.map((p) => ({
    ...p,
    weeks:
      p.id === 'development'
        ? `${Math.max(4, totalWeeks - 5)}–${Math.max(6, totalWeeks - 3)} wks`
        : p.weeks,
  }))

  return (
    <div className="w-full">
      {/* Visual pipeline */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-7 left-7 right-7 h-0.5 bg-white/5 hidden md:block" />
        <motion.div
          className="absolute top-7 left-7 h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 hidden md:block"
          style={{ right: '28px', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
        />

        {/* Phase nodes */}
        <div className="grid grid-cols-5 gap-2 relative z-10">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.2 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Node */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-sm relative"
                style={{
                  background: `${phase.color}20`,
                  border: `2px solid ${phase.color}50`,
                  boxShadow: `0 0 20px ${phase.color}20`,
                }}
              >
                <span style={{ color: phase.color }}>{i + 1}</span>
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
                  style={{ background: phase.color }}
                />
              </div>

              {/* Label */}
              <div className="text-center">
                <div className="text-xs font-bold text-slate-200">{phase.label}</div>
                <div className="text-[10px] text-slate-600 mt-0.5">{phase.weeks}</div>
              </div>

              {/* Tasks */}
              <div className="hidden lg:flex flex-col gap-1 w-full">
                {phase.tasks.map((task) => (
                  <div
                    key={task}
                    className="text-[10px] text-slate-500 text-center px-1.5 py-1 rounded-md"
                    style={{ background: `${phase.color}08` }}
                  >
                    {task}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended tech */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
      >
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Recommended Stack
        </div>
        <div className="flex flex-wrap gap-2">
          {service.techStack.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ color: service.color, background: `${service.color}12`, border: `1px solid ${service.color}25` }}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function ServicesPlayground() {
  const [phase, setPhase] = useState<Phase>('explore')
  const [selectedService, setSelectedService] = useState<(typeof SERVICES)[0] | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true })

  const scrollIntoView = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const startJourney = (service: (typeof SERVICES)[0]) => {
    setSelectedService(service)
    setSelectedFeatures([])
    setPhase(1)
    setTimeout(scrollIntoView, 100)
  }

  const toggleFeature = (f: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    )
  }

  const reset = () => {
    setPhase('explore')
    setSelectedService(null)
    setSelectedFeatures([])
    scrollIntoView()
  }

  const budget = selectedService
    ? calcBudget(selectedService, selectedFeatures.length)
    : null
  const weeks = selectedService
    ? calcWeeks(selectedService, selectedFeatures.length)
    : null

  const pageVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 70%)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background decorations */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="orb w-[500px] h-[500px] bg-blue-600 left-[-150px] top-[50%] -translate-y-1/2" style={{ opacity: 0.05 }} />
      <div className="orb w-[400px] h-[400px] bg-violet-600 right-[-100px] top-[30%]" style={{ opacity: 0.05 }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="section-label mb-3 justify-center flex">06. Services</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Your project,{' '}
            <span className="gradient-text">your journey</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore what&apos;s possible. Pick a service, shape your requirements, and
            watch your personalized project roadmap come to life — step by step.
          </p>
        </motion.div>

        {/* ── EXPLORE phase ─────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {phase === 'explore' && (
            <motion.div
              key="explore"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 mb-6">
                  <Sparkles size={14} className="text-blue-400" />
                  Click any service to begin your journey
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {SERVICES.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <ServiceOrb service={s} onClick={() => startJourney(s)} />
                  </motion.div>
                ))}
              </div>

              {/* Hint arrows */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center gap-2 mt-10 text-slate-600 text-sm"
              >
                <ArrowRight size={14} className="animate-pulse" />
                Select a service type to configure your project
              </motion.div>
            </motion.div>
          )}

          {/* ── STEP 1 — Choose service ────────────────────────────────────── */}
          {phase === 1 && selectedService && (
            <motion.div
              key="step1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35 }}
              className="max-w-4xl mx-auto"
            >
              <ProgressBar current={1} />

              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-100 mb-2">
                  What are you building?
                </h3>
                <p className="text-slate-400">
                  You&apos;ve selected{' '}
                  <span style={{ color: selectedService.color }} className="font-semibold">
                    {selectedService.title}
                  </span>
                  . Want to pick a different path?
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {SERVICES.map((s) => {
                  const Icon = s.icon
                  const isSelected = s.id === selectedService.id
                  return (
                    <motion.button
                      key={s.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedService(s)}
                      className="flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200"
                      style={{
                        background: isSelected ? `${s.color}15` : 'rgba(255,255,255,0.02)',
                        borderColor: isSelected ? `${s.color}50` : 'rgba(255,255,255,0.07)',
                        boxShadow: isSelected ? `0 0 20px ${s.color}20` : 'none',
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${s.color}20` }}
                      >
                        <Icon size={16} style={{ color: s.color }} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-200">{s.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {s.tags.slice(0, 2).join(' · ')}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2
                          size={16}
                          className="ml-auto shrink-0"
                          style={{ color: s.color }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-xl transition-all"
                >
                  <RotateCcw size={14} />
                  Start over
                </button>
                <button
                  onClick={() => setPhase(2)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all hover:shadow-glow-sm"
                >
                  Choose Features
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2 — Choose features ───────────────────────────────────── */}
          {phase === 2 && selectedService && (
            <motion.div
              key="step2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35 }}
              className="max-w-4xl mx-auto"
            >
              <ProgressBar current={2} />

              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-100 mb-2">
                  What do you need?
                </h3>
                <p className="text-slate-400">
                  Select the features for your{' '}
                  <span style={{ color: selectedService.color }} className="font-semibold">
                    {selectedService.title}
                  </span>
                  . Each selection refines your roadmap and estimate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {selectedService.features.map((feature, i) => {
                  const isOn = selectedFeatures.includes(feature)
                  return (
                    <motion.button
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleFeature(feature)}
                      className="flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200"
                      style={{
                        background: isOn ? `${selectedService.color}10` : 'rgba(255,255,255,0.02)',
                        borderColor: isOn ? `${selectedService.color}40` : 'rgba(255,255,255,0.07)',
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all"
                        style={{
                          background: isOn ? selectedService.color : 'transparent',
                          border: `1.5px solid ${isOn ? selectedService.color : 'rgba(255,255,255,0.15)'}`,
                        }}
                      >
                        {isOn && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isOn ? 'text-slate-100' : 'text-slate-400'
                        }`}
                      >
                        {feature}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Selected count indicator */}
              <div
                className="flex items-center gap-3 p-3 rounded-xl mb-6"
                style={{
                  background: `${selectedService.color}08`,
                  border: `1px solid ${selectedService.color}20`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                  style={{ background: selectedService.color, color: 'white' }}
                >
                  {selectedFeatures.length}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-300">
                    {selectedFeatures.length === 0
                      ? 'Select at least one feature'
                      : `${selectedFeatures.length} feature${selectedFeatures.length > 1 ? 's' : ''} selected`}
                  </div>
                  <div className="text-xs text-slate-500">
                    {selectedFeatures.length > 0 &&
                      `Budget and timeline update automatically`}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPhase(1)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-xl transition-all"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
                <button
                  onClick={() => setPhase(3)}
                  disabled={selectedFeatures.length === 0}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-all hover:shadow-glow-sm"
                >
                  See Your Roadmap
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3 — Journey map ───────────────────────────────────────── */}
          {phase === 3 && selectedService && (
            <motion.div
              key="step3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35 }}
              className="max-w-4xl mx-auto"
            >
              <ProgressBar current={3} />

              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-100 mb-2">
                  Your project roadmap
                </h3>
                <p className="text-slate-400">
                  Here&apos;s the full journey for your{' '}
                  <span style={{ color: selectedService.color }} className="font-semibold">
                    {selectedService.title}
                  </span>{' '}
                  with {selectedFeatures.length} feature
                  {selectedFeatures.length > 1 ? 's' : ''}.
                </p>
              </div>

              {/* Journey visualization */}
              <div className="glass rounded-2xl border border-white/[0.06] p-6 mb-6">
                <JourneyMap
                  service={selectedService}
                  featureCount={selectedFeatures.length}
                />
              </div>

              {/* Selected features summary */}
              <div className="glass rounded-2xl border border-white/[0.06] p-5 mb-6">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Your features
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedFeatures.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{
                        color: selectedService.color,
                        background: `${selectedService.color}12`,
                        border: `1px solid ${selectedService.color}25`,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPhase(2)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-xl transition-all"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
                <button
                  onClick={() => setPhase(4)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all hover:shadow-glow-sm"
                >
                  View Estimate
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4 — Estimate & CTA ────────────────────────────────────── */}
          {phase === 4 && selectedService && budget && weeks && (
            <motion.div
              key="step4"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35 }}
              className="max-w-2xl mx-auto"
            >
              <ProgressBar current={4} />

              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: `${selectedService.color}20`,
                    border: `2px solid ${selectedService.color}40`,
                    boxShadow: `0 0 40px ${selectedService.color}25`,
                  }}
                >
                  {(() => {
                    const Icon = selectedService.icon
                    return <Icon size={28} style={{ color: selectedService.color }} />
                  })()}
                </motion.div>
                <h3 className="text-2xl font-black text-slate-100 mb-2">
                  Your custom estimate
                </h3>
                <p className="text-slate-400">
                  Based on your{' '}
                  <span style={{ color: selectedService.color }} className="font-semibold">
                    {selectedService.title}
                  </span>{' '}
                  with {selectedFeatures.length} features
                </p>
              </div>

              {/* Estimate cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass rounded-2xl border border-blue-500/20 p-6 text-center"
                  style={{ background: 'rgba(59,130,246,0.05)' }}
                >
                  <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-3">
                    Budget Range
                  </div>
                  <div className="text-2xl font-black gradient-text-blue mb-1">
                    ${(budget.min / 1000).toFixed(0)}k–${(budget.max / 1000).toFixed(0)}k
                  </div>
                  <div className="text-xs text-slate-600">CAD estimate</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="glass rounded-2xl border border-violet-500/20 p-6 text-center"
                  style={{ background: 'rgba(139,92,246,0.05)' }}
                >
                  <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-3">
                    Timeline
                  </div>
                  <div className="text-2xl font-black text-violet-400 mb-1">
                    {weeks}–{weeks + 2} wks
                  </div>
                  <div className="text-xs text-slate-600">Project duration</div>
                </motion.div>
              </div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="glass rounded-2xl border border-white/[0.06] p-5 mb-8"
              >
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Includes
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Full discovery & planning',
                    'UI/UX design',
                    `${selectedFeatures.length} core features`,
                    'Testing & QA',
                    `${selectedService.techStack.slice(0, 3).join(', ')}`,
                    'Deployment & docs',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                      <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById('contact')
                    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all hover:shadow-glow-blue"
                >
                  <Mail size={16} />
                  Let&apos;s build this together
                </a>
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-white/[0.08] rounded-xl text-sm font-medium transition-all"
                >
                  <RotateCcw size={14} />
                  Start over
                </button>
              </motion.div>

              <p className="text-xs text-slate-600 text-center mt-4">
                Estimates are indicative. Final pricing is discussed during discovery.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
