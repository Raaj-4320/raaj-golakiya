'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Code2,
  BrainCircuit,
  BarChart3,
  Globe,
  Zap,
  Database,
  Cloud,
  Layers,
} from 'lucide-react'

const SKILL_CATEGORIES = [
  {
    id: 'languages',
    icon: Code2,
    label: 'Languages',
    color: 'text-yellow-400',
    accent: '#eab308',
    borderColor: 'border-yellow-500/20',
    bgColor: 'bg-yellow-500/5',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript', level: 92 },
      { name: 'TypeScript', level: 88 },
    ],
  },
  {
    id: 'ai-ml',
    icon: BrainCircuit,
    label: 'AI / Machine Learning',
    color: 'text-violet-400',
    accent: '#8b5cf6',
    borderColor: 'border-violet-500/20',
    bgColor: 'bg-violet-500/5',
    skills: [
      { name: 'Scikit-Learn', level: 92 },
      { name: 'TensorFlow / Keras', level: 88 },
      { name: 'PyTorch', level: 82 },
      { name: 'NLP (SpaCy, NLTK)', level: 90 },
      { name: 'Transformers / HuggingFace', level: 80 },
    ],
  },
  {
    id: 'data',
    icon: BarChart3,
    label: 'Data & Analytics',
    color: 'text-emerald-400',
    accent: '#10b981',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/5',
    skills: [
      { name: 'NumPy / Pandas / SciPy', level: 94 },
      { name: 'Feature Engineering', level: 90 },
      { name: 'EDA & Visualization', level: 88 },
      { name: 'Matplotlib / Seaborn', level: 86 },
      { name: 'Power BI / Tableau', level: 75 },
    ],
  },
  {
    id: 'frontend',
    icon: Globe,
    label: 'Frontend',
    color: 'text-cyan-400',
    accent: '#06b6d4',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/5',
    skills: [
      { name: 'React.js', level: 93 },
      { name: 'React Native', level: 82 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Redux / Redux Saga', level: 88 },
      { name: 'HTML5 / CSS3', level: 95 },
    ],
  },
  {
    id: 'backend',
    icon: Layers,
    label: 'Backend',
    color: 'text-blue-400',
    accent: '#3b82f6',
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/5',
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'Flask / FastAPI', level: 85 },
      { name: 'REST API Design', level: 92 },
      { name: 'JWT Auth', level: 88 },
    ],
  },
  {
    id: 'realtime',
    icon: Zap,
    label: 'Real-Time & Systems',
    color: 'text-orange-400',
    accent: '#f97316',
    borderColor: 'border-orange-500/20',
    bgColor: 'bg-orange-500/5',
    skills: [
      { name: 'Socket.IO / WebSocket', level: 88 },
      { name: 'Microfrontend / Module Fed.', level: 80 },
      { name: 'Webpack', level: 82 },
      { name: 'Fabric.js (Canvas)', level: 78 },
    ],
  },
  {
    id: 'databases',
    icon: Database,
    label: 'Databases',
    color: 'text-pink-400',
    accent: '#ec4899',
    borderColor: 'border-pink-500/20',
    bgColor: 'bg-pink-500/5',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'MySQL', level: 82 },
      { name: 'Redis', level: 78 },
    ],
  },
  {
    id: 'devops',
    icon: Cloud,
    label: 'DevOps & Cloud',
    color: 'text-sky-400',
    accent: '#0ea5e9',
    borderColor: 'border-sky-500/20',
    bgColor: 'bg-sky-500/5',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS (EC2, Beanstalk)', level: 80 },
      { name: 'GCP / Heroku', level: 75 },
      { name: 'Git / GitHub / CI-CD', level: 92 },
    ],
  },
]

function SkillBar({
  name,
  level,
  accent,
  delay,
}: {
  name: string
  level: number
  accent: string
  delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-slate-300">{name}</span>
        <span className="text-xs font-bold text-slate-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.34, 1.2, 0.64, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}40` }}
        />
      </div>
    </div>
  )
}

function CategoryCard({
  category,
  index,
}: {
  category: (typeof SKILL_CATEGORIES)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = category.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      className={`glass glass-hover rounded-2xl p-5 border ${category.borderColor} ${category.bgColor}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${category.accent}15`, border: `1px solid ${category.accent}30` }}
        >
          <Icon size={16} style={{ color: category.accent }} />
        </div>
        <span className="font-bold text-slate-100 text-sm">{category.label}</span>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            accent={category.accent}
            delay={index * 0.07 + i * 0.08}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="skills" className="py-24 lg:py-32 relative bg-navy-900/30">
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
          <div className="section-label mb-3">02. Skills</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Technical{' '}
            <span className="gradient-text">toolkit</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl">
            A full-spectrum skillset spanning AI/ML, modern web development, data
            engineering, and cloud deployment.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SKILL_CATEGORIES.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
