'use client'

import { useState, useRef, FormEvent, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Athul-krishna57',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/athul-krishna-499359285/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/athul_.x/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
]

/* ─── Floating-label input ────────────────────────────────────────── */
function FloatingInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  required,
}: {
  label: string
  id: string
  type?: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const filled = value.length > 0
  return (
    <div className="relative group">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="peer w-full bg-transparent border border-white/10 rounded-xl px-4 pt-6 pb-3 text-sm text-white outline-none focus:border-accent-cyan/50 transition-colors duration-300 placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none text-text-dim
          ${filled || true
            ? 'top-2.5 text-[10px] tracking-widest uppercase'
            : 'top-4 text-sm'}
          peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-accent-cyan/70`}
      >
        {label}
      </label>
      {/* Focus line */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="h-full bg-accent-cyan/60 scale-x-0 peer-focus:scale-x-100 origin-left transition-transform duration-300 group-focus-within:scale-x-100" />
      </div>
    </div>
  )
}

function FloatingTextarea({
  label,
  id,
  value,
  onChange,
  required,
}: {
  label: string
  id: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const filled = value.length > 0
  return (
    <div className="relative group">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={5}
        className="peer w-full bg-transparent border border-white/10 rounded-xl px-4 pt-6 pb-3 text-sm text-white outline-none focus:border-accent-cyan/50 transition-colors duration-300 placeholder-transparent resize-none"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none text-text-dim
          ${filled
            ? 'top-2.5 text-[10px] tracking-widest uppercase'
            : 'top-4 text-sm'}
          peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-accent-cyan/70`}
      >
        {label}
      </label>
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="h-full bg-accent-cyan/60 scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100" />
      </div>
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState<FormState>('idle')
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-left', {
        opacity: 0,
        x: -50,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
      gsap.from('.contact-right', {
        opacity: 0,
        x: 50,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    const subject = encodeURIComponent(fields.subject)
    const body = encodeURIComponent(
      `Name: ${fields.name}\nEmail: ${fields.email}\n\nMessage:\n${fields.message}`
    )
    window.open(`mailto:helloathulkrishna@gmail.com?subject=${subject}&body=${body}`)

    setTimeout(() => setFormState('success'), 500)
  }

  const set = (field: keyof typeof fields) => (v: string) =>
    setFields((prev) => ({ ...prev, [field]: v }))

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-purple/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: heading + info ─────────────────────────── */}
          <div className="contact-left">
            <p className="text-xs tracking-[0.4em] text-accent-cyan uppercase mb-4">— Get In Touch</p>
            <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,4rem)] leading-tight mb-6">
              Let&apos;s Create Something{' '}
              <span className="text-gradient">Extraordinary</span>
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-10 max-w-md">
              Whether you have a product to build, a brand to launch, or just want to connect — I&apos;m
              always open to a conversation.
            </p>

            <div className="space-y-4 mb-10">
              <a
                href="mailto:helloathulkrishna@gmail.com"
                className="flex items-center gap-3 text-text-secondary hover:text-white transition-colors group"
                data-cursor
              >
                <span className="w-10 h-10 rounded-lg glass flex items-center justify-center text-accent-cyan group-hover:border-accent-cyan/30 transition-colors border border-white/10">
                  ✉
                </span>
                helloathulkrishna@gmail.com
              </a>
              <div className="flex items-center gap-3 text-text-secondary">
                <span className="w-10 h-10 rounded-lg glass flex items-center justify-center text-accent-cyan border border-white/10">
                  📍
                </span>
                Kerala, India
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socials.map(({ label, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="w-11 h-11 glass rounded-xl flex items-center justify-center text-text-secondary hover:text-accent-cyan border border-white/10 hover:border-accent-cyan/30 transition-colors duration-200"
                  aria-label={label}
                  data-cursor
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Right: form ──────────────────────────────────── */}
          <div className="contact-right glass-strong rounded-2xl p-8 relative overflow-hidden">
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                    className="w-20 h-20 rounded-full border-2 border-accent-cyan/60 flex items-center justify-center mb-6 glow-cyan"
                  >
                    <svg className="w-8 h-8 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">Message Sent!</h3>
                  <p className="text-text-secondary text-sm">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setFormState('idle'); setFields({ name: '', email: '', subject: '', message: '' }) }}
                    className="mt-6 text-xs text-text-dim hover:text-accent-cyan transition-colors underline underline-offset-4"
                    data-cursor
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FloatingInput
                      label="Full Name"
                      id="name"
                      value={fields.name}
                      onChange={set('name')}
                      required
                    />
                    <FloatingInput
                      label="Email Address"
                      id="email"
                      type="email"
                      value={fields.email}
                      onChange={set('email')}
                      required
                    />
                  </div>

                  <FloatingInput
                    label="Subject"
                    id="subject"
                    value={fields.subject}
                    onChange={set('subject')}
                    required
                  />

                  <FloatingTextarea
                    label="Your Message"
                    id="message"
                    value={fields.message}
                    onChange={set('message')}
                    required
                  />

                  <motion.button
                    type="submit"
                    disabled={formState === 'submitting'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative py-4 rounded-xl font-display font-semibold text-sm overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #00f5ff22, #7b2ff722)', border: '1px solid rgba(0,245,255,0.3)' }}
                    data-cursor
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-accent-cyan">
                      {formState === 'submitting' ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-dim text-xs tracking-wide">
            © {new Date().getFullYear()} Athul Krishna V. Designed &amp; built with intent.
          </p>
          <div className="flex gap-6">
            {['About', 'Work', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs text-text-dim hover:text-white transition-colors"
                data-cursor
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
