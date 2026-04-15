'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  BrainCircuit,
  TrendingUp,
  Heart,
  MessageSquare,
  Layers,
  ExternalLink,
  ChevronRight,
  X,
  Sparkles,
  Target,
  Zap,
  Filter,
} from 'lucide-react'

type Category = 'all' | 'ml' | 'web' | 'realtime'

const PROJECTS = [
  {
    id: 'exam-gen',
    title: 'AI Exam Paper Generator',
    tagline: 'Automated exam creation with NLP & AI',
    category: 'ml' as Category,
    categoryLabel: 'AI / NLP',
    icon: BrainCircuit,
    gradient: 'from-violet-600/20 to-blue-600/20',
    accentColor: '#8b5cf6',
    borderColor: 'border-violet-500/25',
    badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    impact: 'Reduced manual exam prep effort by 80%+',
    impactIcon: Sparkles,
    overview:
      'An intelligent web application that automates the creation of exam papers using Natural Language Processing and machine learning models.',
    features: [
      'Topic-based or custom input question generation',
      'Difficulty-level control (Easy, Medium, Hard)',
      'Automated document generation (Word export)',
      'NLP-based content processing and topic extraction',
    ],
    highlights: [
      'Integrated NLP pipelines using SpaCy and NLTK for deep content understanding',
      'Dynamic data fetching via APIs and intelligent parsing pipelines',
      'AI model integration for high-quality, contextually relevant question generation',
      'Backend processing with Flask and Docker-based scalable deployment',
    ],
    stack: ['Python', 'Flask', 'SpaCy', 'NLTK', 'OpenAI API', 'BeautifulSoup', 'Docker', 'NLP'],
  },
  {
    id: 'bulldozer',
    title: 'Bulldozer Price Prediction',
    tagline: 'ML regression for heavy machinery pricing',
    category: 'ml' as Category,
    categoryLabel: 'Machine Learning',
    icon: TrendingUp,
    gradient: 'from-amber-600/20 to-orange-600/20',
    accentColor: '#f59e0b',
    borderColor: 'border-amber-500/25',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    impact: '20% improvement in prediction accuracy',
    impactIcon: Target,
    overview:
      'A regression-based machine learning system to predict resale prices of heavy machinery using historical auction data.',
    features: [
      'End-to-end data preprocessing and feature engineering pipeline',
      'Model optimization and performance tuning',
      'SMOTE-based class imbalance handling',
      'Feature importance analysis and selection',
    ],
    highlights: [
      'Applied TF-IDF and vectorization for categorical feature encoding',
      'Improved prediction accuracy by 20% through systematic feature engineering',
      'Built a complete ML pipeline from raw data to production-ready prediction',
      'Analyzed feature importance to identify key pricing drivers',
    ],
    stack: ['Python', 'Pandas', 'Scikit-Learn', 'NumPy', 'SMOTE', 'Feature Engineering', 'Regression'],
  },
  {
    id: 'heart-disease',
    title: 'Heart Disease Prediction',
    tagline: 'Predictive analytics for healthcare risk',
    category: 'ml' as Category,
    categoryLabel: 'Data Science',
    icon: Heart,
    gradient: 'from-rose-600/20 to-pink-600/20',
    accentColor: '#f43f5e',
    borderColor: 'border-rose-500/25',
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    impact: 'Early detection support via probabilistic analysis',
    impactIcon: Target,
    overview:
      'A machine learning project focused on predicting heart disease risk and extracting clinical insights from health data.',
    features: [
      'Data scraping, cleaning, and preprocessing pipeline',
      'Dimensionality reduction using PCA for visualization',
      'K-Means clustering for patient pattern discovery',
      'Monte Carlo simulations for probabilistic risk analysis',
    ],
    highlights: [
      'Applied PCA to reduce dimensionality and reveal meaningful health patterns',
      'Used Monte Carlo simulations for probabilistic analysis of risk factors',
      'Naive Bayes classifier for interpretable risk prediction',
      'Advanced EDA with comprehensive data visualization',
    ],
    stack: ['Python', 'Scikit-Learn', 'PCA', 'Naive Bayes', 'Pandas', 'Matplotlib', 'Seaborn', 'Monte Carlo'],
  },
  {
    id: 'chat',
    title: 'Real-Time AI Chat Interface',
    tagline: 'Low-latency messaging with rich UX',
    category: 'realtime' as Category,
    categoryLabel: 'Real-Time',
    icon: MessageSquare,
    gradient: 'from-cyan-600/20 to-blue-600/20',
    accentColor: '#06b6d4',
    borderColor: 'border-cyan-500/25',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    impact: 'Sub-50ms message delivery with optimized rendering',
    impactIcon: Zap,
    overview:
      'A real-time communication system designed for AI-driven applications with optimized performance and a rich user experience.',
    features: [
      'Live messaging with low latency via WebSocket architecture',
      'Markdown rendering and media preview support',
      'Optimized scrolling behavior for large message histories',
      'Real-time typing indicators and presence detection',
    ],
    highlights: [
      'Real-time architecture using Socket.IO for reliable bidirectional communication',
      'State management with Redux Saga for complex async message flows',
      'Efficient frontend-backend synchronization with optimistic UI updates',
      'Performance-optimized rendering for large conversation threads',
    ],
    stack: ['React.js', 'Socket.IO', 'Redux Saga', 'Node.js', 'JavaScript', 'CSS3'],
  },
  {
    id: 'visual-builder',
    title: 'Visual Content Builder',
    tagline: 'Drag-and-drop canvas editor for structured layouts',
    category: 'web' as Category,
    categoryLabel: 'Web / Editor',
    icon: Layers,
    gradient: 'from-emerald-600/20 to-teal-600/20',
    accentColor: '#10b981',
    borderColor: 'border-emerald-500/25',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    impact: 'Replaced manual design workflows with interactive canvas editing',
    impactIcon: Sparkles,
    overview:
      'An interactive design tool enabling users to create structured visual content using a canvas-based drag-and-drop interface.',
    features: [
      'Drag-and-drop UI for multi-element layouts',
      'Support for text, images, and design components',
      'Real-time editing with instant visual feedback',
      'Layer management and element grouping',
    ],
    highlights: [
      'Canvas rendering using Fabric.js for high-performance visual editing',
      'Modular frontend architecture enabling easy feature extension',
      'Scalable UI component system with reusable primitives',
      'Smooth, responsive editing experience with undo/redo support',
    ],
    stack: ['React.js', 'Fabric.js', 'JavaScript', 'CSS3', 'Modular Architecture', 'Canvas API'],
  },
]

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'ML / AI', value: 'ml' },
  { label: 'Web Dev', value: 'web' },
  { label: 'Real-Time', value: 'realtime' },
]

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof PROJECTS)[0]
  onClose: () => void
}) {
  const Icon = project.icon
  const ImpactIcon = project.impactIcon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: 'spring', bounce: 0.2 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-3xl border border-white/10 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-100 hover:bg-white/5 rounded-xl transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.gradient} border ${project.borderColor} flex items-center justify-center mb-5`}>
          <Icon size={22} style={{ color: project.accentColor }} />
        </div>

        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${project.badgeColor} mb-3`}>
          {project.categoryLabel}
        </div>

        <h2 className="text-2xl font-black text-slate-100 mb-2">{project.title}</h2>
        <p className="text-slate-400 mb-6 leading-relaxed">{project.overview}</p>

        {/* Impact */}
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border ${project.borderColor} mb-6`}
          style={{ background: `${project.accentColor}08` }}
        >
          <ImpactIcon size={16} style={{ color: project.accentColor }} />
          <span className="text-sm font-semibold text-slate-300">{project.impact}</span>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide mb-3">
            Key Features
          </h3>
          <ul className="space-y-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                <ChevronRight size={14} className="mt-0.5 shrink-0" style={{ color: project.accentColor }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Technical highlights */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide mb-3">
            Technical Highlights
          </h3>
          <ul className="space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-400">
                <ChevronRight size={14} className="mt-0.5 shrink-0" style={{ color: project.accentColor }} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack */}
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide mb-3">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-white/[0.08] bg-white/[0.04] text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: (typeof PROJECTS)[0]
  index: number
  onClick: () => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = project.icon
  const ImpactIcon = project.impactIcon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onClick}
      className={`group relative glass rounded-2xl p-6 border ${project.borderColor} cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:border-opacity-60 flex flex-col`}
      style={{ '--accent': project.accentColor } as React.CSSProperties}
    >
      {/* Top gradient accent bar */}
      <div
        className={`absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}
      />

      {/* Icon + Badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.gradient} border ${project.borderColor} flex items-center justify-center`}
        >
          <Icon size={20} style={{ color: project.accentColor }} />
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${project.badgeColor}`}>
          {project.categoryLabel}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-black text-slate-100 mb-2 group-hover:text-white transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-slate-400 mb-4 leading-relaxed flex-1">{project.tagline}</p>

      {/* Impact pill */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl mb-4"
        style={{ background: `${project.accentColor}0d`, border: `1px solid ${project.accentColor}20` }}
      >
        <ImpactIcon size={12} style={{ color: project.accentColor }} />
        <span className="text-xs font-medium text-slate-400">{project.impact}</span>
      </div>

      {/* Stack preview */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech} className="text-xs px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] text-slate-500 rounded-md">
            {tech}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="text-xs px-2 py-0.5 text-slate-600 rounded-md">
            +{project.stack.length - 4} more
          </span>
        )}
      </div>

      {/* CTA */}
      <div
        className="flex items-center gap-1 text-xs font-semibold mt-auto opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ color: project.accentColor }}
      >
        <ExternalLink size={12} />
        View Details
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>('all')
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null)

  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const filtered =
    activeFilter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="py-24 lg:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="section-label mb-3">03. Projects</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Work that{' '}
            <span className="gradient-text">ships and scales</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl">
            A selection of end-to-end projects spanning ML systems, real-time apps,
            and intelligent web platforms — each built for production, not just demos.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          <Filter size={14} className="text-slate-600 mr-1" />
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.value
                  ? 'bg-blue-600 text-white shadow-glow-sm'
                  : 'text-slate-400 hover:text-slate-100 bg-white/[0.04] border border-white/[0.06] hover:border-white/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
