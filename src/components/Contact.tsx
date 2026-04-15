'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  MapPin,
  MessageSquare,
} from 'lucide-react'

const SOCIAL_LINKS = [
  {
    label: 'Email',
    value: 'raj.golakiya0@gmail.com',
    href: 'mailto:raj.golakiya0@gmail.com',
    icon: Mail,
    color: '#3b82f6',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    textColor: 'text-blue-400',
  },
  {
    label: 'Phone',
    value: '+1 437-473-4320',
    href: 'tel:+14374734320',
    icon: Phone,
    color: '#10b981',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    textColor: 'text-emerald-400',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/raj-golakiya',
    href: 'https://linkedin.com/in/raj-golakiya',
    icon: Linkedin,
    color: '#0ea5e9',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    textColor: 'text-sky-400',
  },
  {
    label: 'GitHub',
    value: 'github.com/raj-golakiya',
    href: 'https://github.com/raj-golakiya',
    icon: Github,
    color: '#a78bfa',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    textColor: 'text-violet-400',
  },
]

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('sending')
    // Simulate send — replace with real email service (Resend, EmailJS, etc.)
    await new Promise((r) => setTimeout(r, 1500))
    setFormState('sent')
  }

  return (
    <section id="contact" className="py-24 lg:py-32 relative bg-navy-900/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-3">07. Contact</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Let&apos;s{' '}
            <span className="gradient-text">work together</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl">
            Open to software engineering, AI/ML, and full stack opportunities.
            Whether you have a project or just want to connect — reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {formState === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-16 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <CheckCircle2 size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-black text-slate-100 mb-2">Message sent!</h3>
                <p className="text-slate-400 mb-6">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setFormState('idle'); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-xl border border-white/[0.08] transition-all"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-100 text-sm focus:outline-none focus:border-blue-500/50 transition-all appearance-none"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" className="bg-navy-900">Select a topic...</option>
                    <option value="job" className="bg-navy-900">Job Opportunity</option>
                    <option value="freelance" className="bg-navy-900">Freelance / Contract Work</option>
                    <option value="project" className="bg-navy-900">Project Collaboration</option>
                    <option value="consulting" className="bg-navy-900">AI/ML Consulting</option>
                    <option value="other" className="bg-navy-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-glow-blue"
                >
                  {formState === 'sending' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Location badge */}
            <div className="flex items-center gap-3 p-4 glass rounded-2xl border border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200">Toronto, Ontario</div>
                <div className="text-xs text-slate-500">Canada · Open to remote worldwide</div>
              </div>
            </div>

            {/* Contact links */}
            {SOCIAL_LINKS.map((link, i) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className={`flex items-center gap-4 p-4 glass rounded-2xl border ${link.border} ${link.bg} hover:scale-[1.02] transition-all duration-200 group`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${link.color}20`, border: `1px solid ${link.color}30` }}
                  >
                    <Icon size={16} style={{ color: link.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                      {link.label}
                    </div>
                    <div className={`text-sm font-semibold ${link.textColor} truncate`}>
                      {link.value}
                    </div>
                  </div>
                  <Send size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 rotate-45" />
                </motion.a>
              )
            })}

            {/* Availability note */}
            <div className="glass rounded-2xl border border-emerald-500/20 p-5 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-bold text-emerald-400">Available Now</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Currently seeking full-time roles and freelance projects in AI/ML,
                full stack development, and software engineering. Response within 24 hours.
              </p>
            </div>

            {/* Response time note */}
            <div className="flex items-start gap-3 p-4 glass rounded-2xl border border-white/[0.06]">
              <MessageSquare size={14} className="text-slate-600 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">
                I read every message personally. Whether you have a role, project, or
                just want to connect about AI/ML — I&apos;m happy to chat.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
