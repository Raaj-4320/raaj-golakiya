'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Code2, BrainCircuit, ChevronRight } from 'lucide-react'

const EXPERIENCES = [
  {
    id: 'senior',
    role: 'Senior Software Engineer',
    type: 'Full-Time',
    icon: Briefcase,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    accentColor: '#3b82f6',
    borderColor: 'border-blue-500/20',
    tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    highlights: [
      'Led development across web and mobile applications',
      'Designed backend APIs and worked with relational and NoSQL databases',
      'Delivered full stack solutions for business-focused platforms',
      'Supported project execution through code reviews, planning, and mentoring',
      'Built maintainable systems with a focus on performance and scalability',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'React Native'],
  },
  {
    id: 'sde',
    role: 'Software Development Engineer',
    type: 'Full-Time',
    icon: Code2,
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    accentColor: '#8b5cf6',
    borderColor: 'border-violet-500/20',
    tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    highlights: [
      'Developed scalable and modular web interfaces for modern software products',
      'Built real-time communication features and interactive frontend workflows',
      'Worked on editor systems, UI customization, and rich user experiences',
      'Improved frontend performance and integration reliability',
      'Collaborated with cross-functional teams to deliver production-ready features',
    ],
    stack: ['React', 'Redux Saga', 'Socket.IO', 'Fabric.js', 'Webpack', 'Microfrontend'],
  },
  {
    id: 'intern',
    role: 'Machine Learning Engineer',
    type: 'Internship',
    icon: BrainCircuit,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    accentColor: '#10b981',
    borderColor: 'border-emerald-500/20',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    highlights: [
      'Improved machine learning model performance through feature engineering and class balancing',
      'Worked on data collection, analysis, and preprocessing pipelines',
      'Contributed to model development and deployment workflows',
      'Supported data-driven problem-solving with analytical methods',
    ],
    stack: ['Python', 'TensorFlow', 'Keras', 'Scikit-Learn', 'Pandas', 'NumPy'],
  },
]

function ExperienceCard({
  exp,
  index,
  isLast,
}: {
  exp: (typeof EXPERIENCES)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = exp.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="relative flex gap-6"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-5 top-14 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
      )}

      {/* Icon node */}
      <div className="relative flex-shrink-0 mt-1">
        <div
          className={`w-10 h-10 rounded-xl ${exp.iconBg} border ${exp.borderColor} flex items-center justify-center z-10 relative`}
        >
          <Icon size={18} className={exp.iconColor} />
        </div>
        {/* Glow dot */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ backgroundColor: exp.accentColor, boxShadow: `0 0 10px ${exp.accentColor}` }}
        />
      </div>

      {/* Content */}
      <div className={`flex-1 glass rounded-2xl p-6 border ${exp.borderColor} mb-6 hover:border-opacity-50 transition-all`}>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-100 mb-1">{exp.role}</h3>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${exp.tagColor}`}
            >
              {exp.type}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-5">
          {exp.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
              <ChevronRight size={14} className={`mt-0.5 shrink-0 ${exp.iconColor}`} />
              {item}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {exp.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.06] text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="experience" className="py-24 lg:py-32 relative bg-navy-900/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-3">04. Experience</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Professional{' '}
            <span className="gradient-text">journey</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl">
            From ML internships to leading full stack development — a progression
            of growing ownership and technical depth.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === EXPERIENCES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
