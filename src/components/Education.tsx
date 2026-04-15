'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react'

const EDUCATION = [
  {
    degree: 'Postgraduate Diploma in Artificial Intelligence & Machine Learning',
    institution: 'Ontario, Canada',
    type: 'Postgraduate',
    focus: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Science'],
    color: 'text-blue-400',
    borderColor: 'border-blue-500/25',
    bgColor: 'bg-blue-500/5',
    accentColor: '#3b82f6',
    icon: GraduationCap,
  },
  {
    degree: 'Bachelor of Computer Applications',
    institution: 'India',
    type: 'Undergraduate',
    focus: ['Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering', 'Web Technologies'],
    color: 'text-violet-400',
    borderColor: 'border-violet-500/25',
    bgColor: 'bg-violet-500/5',
    accentColor: '#8b5cf6',
    icon: GraduationCap,
  },
]

const CERTIFICATIONS = [
  {
    title: 'Natural Language Processing Certification',
    description: 'Advanced NLP techniques including transformers, text classification, and sequence modeling.',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/5',
    accentColor: '#06b6d4',
  },
  {
    title: 'TensorFlow Developer Training',
    description: 'Deep learning with TensorFlow covering CNNs, RNNs, transfer learning, and deployment.',
    color: 'text-orange-400',
    borderColor: 'border-orange-500/20',
    bgColor: 'bg-orange-500/5',
    accentColor: '#f97316',
  },
]

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="education" className="py-24 lg:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-3">05. Education</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Academic{' '}
            <span className="gradient-text">foundation</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education cards */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <GraduationCap size={12} />
              Degrees
            </div>
            <div className="space-y-4">
              {EDUCATION.map((edu, i) => {
                const Icon = edu.icon
                return (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`glass rounded-2xl p-6 border ${edu.borderColor} ${edu.bgColor} hover:border-opacity-50 transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${edu.accentColor}15`, border: `1px solid ${edu.accentColor}25` }}
                      >
                        <Icon size={18} style={{ color: edu.accentColor }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-md"
                            style={{ color: edu.accentColor, backgroundColor: `${edu.accentColor}15` }}
                          >
                            {edu.type}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-100 text-sm leading-snug mb-1">
                          {edu.degree}
                        </h3>
                        <p className="text-xs text-slate-500 mb-3">{edu.institution}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {edu.focus.map((f) => (
                            <span
                              key={f}
                              className="text-xs px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] text-slate-400 rounded-md"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award size={12} />
              Certifications
            </div>
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`glass rounded-2xl p-6 border ${cert.borderColor} ${cert.bgColor} hover:border-opacity-50 transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${cert.accentColor}15` }}
                    >
                      <CheckCircle2 size={16} style={{ color: cert.accentColor }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm mb-2">{cert.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{cert.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* What I'm looking for */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass rounded-2xl p-6 border border-blue-500/15 bg-gradient-to-br from-blue-500/5 to-violet-500/5"
              >
                <h3 className="font-bold text-slate-100 text-sm mb-3 flex items-center gap-2">
                  <Award size={14} className="text-blue-400" />
                  Open to Opportunities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'AI/ML Engineer',
                    'Software Engineer',
                    'Full Stack Developer',
                    'Frontend Developer',
                    'Applied AI Developer',
                    'Backend Developer',
                  ].map((role) => (
                    <span
                      key={role}
                      className="text-xs px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
