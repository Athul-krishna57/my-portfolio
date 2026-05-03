'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  { name: 'React',       color: '#61DAFB' },
  { name: 'Python',      color: '#3776AB' },
  { name: 'Flask',       color: '#94a3b8' },
  { name: 'Angular',     color: '#DD0031' },
  { name: 'MongoDB',     color: '#47A248' },
  { name: 'PostgreSQL',  color: '#4169E1' },
  { name: 'AWS',         color: '#FF9900' },
]

const creativeWork = [
  'Brand Identity',
  'Product Design',
  '8K Automotive Photography',
  'Visual Overlays',
]

const marqueeItems = [
  'REACT', 'PYTHON', 'FLASK', 'ANGULAR', 'MONGODB', 'POSTGRESQL', 'AWS',
  'BRAND IDENTITY', 'PRODUCT DESIGN', '8K PHOTOGRAPHY', 'NEXT.JS', 'TYPESCRIPT',
  'NODE.JS', 'DOCKER', 'FIGMA', 'GSAP', 'THREE.JS',
]

const doubledMarquee = [...marqueeItems, ...marqueeItems]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-header', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      gsap.from('.bento-card', {
        opacity: 0,
        y: 60,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bento-grid',
          start: 'top 70%',
        },
      })

      // Stat counters
      document.querySelectorAll('.counter').forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0')
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="about-header mb-16">
          <p className="text-xs tracking-[0.4em] text-accent-cyan uppercase mb-3">— Who I Am</p>
          <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight max-w-2xl">
            Crafting Digital Experiences at the Intersection of{' '}
            <span className="text-gradient">Code &amp; Design</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid grid grid-cols-12 gap-4 auto-rows-auto">

          {/* ── About text card (7/12) ─────────────────────────────── */}
          <div className="bento-card col-span-12 lg:col-span-7 glass rounded-2xl p-8 relative overflow-hidden group hover:border-accent-cyan/20 transition-colors duration-300">
            {/* decorative dots grid */}
            <div className="absolute top-4 right-4 grid grid-cols-6 gap-2 opacity-20">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-accent-cyan" />
              ))}
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 border border-accent-cyan/20 flex items-center justify-center mb-6">
                <span className="text-accent-cyan text-xl">✦</span>
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-4">
                Hey, I&apos;m Athul
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                A FullStack Software Developer based in India, with a genuine love for both robust backend systems
                and pixel-perfect frontends. I build products that perform under pressure and look striking in the process.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                Beyond code, I channel the same precision into brand identity and visual storytelling — including
                8K automotive photography that has shaped brands like <span className="text-white font-medium">Elaneera</span>,{' '}
                <span className="text-white font-medium">LookIn</span>, and{' '}
                <span className="text-white font-medium">BRICK</span>.
              </p>
            </div>
          </div>

          {/* ── Tech stack card (5/12) ────────────────────────────── */}
          <div className="bento-card col-span-12 lg:col-span-5 glass rounded-2xl p-8 hover:border-accent-cyan/20 transition-colors duration-300">
            <p className="text-xs tracking-[0.3em] text-text-dim uppercase mb-5">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map(({ name, color }) => (
                <motion.span
                  key={name}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium font-display tracking-wide border"
                  style={{
                    color,
                    borderColor: `${color}30`,
                    backgroundColor: `${color}10`,
                  }}
                >
                  {name}
                </motion.span>
              ))}
            </div>
          </div>

          {/* ── Stats card (4/12) ─────────────────────────────────── */}
          <div className="bento-card col-span-12 sm:col-span-4 glass rounded-2xl p-8 hover:border-accent-cyan/20 transition-colors duration-300">
            <p className="text-xs tracking-[0.3em] text-text-dim uppercase mb-6">By the Numbers</p>
            <div className="space-y-5">
              {[
                { target: 3,  suffix: '+', label: 'Years of experience' },
                { target: 15, suffix: '+', label: 'Projects delivered' },
                { target: 5,  suffix: '+', label: 'Brands designed' },
              ].map(({ target, suffix, label }) => (
                <div key={label} className="flex items-baseline gap-1">
                  <span
                    className="counter font-display font-bold text-4xl text-white"
                    data-target={target}
                  >
                    0
                  </span>
                  <span className="font-display font-bold text-4xl text-accent-cyan">{suffix}</span>
                  <span className="ml-2 text-xs text-text-dim">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Creative skills card (4/12) ───────────────────────── */}
          <div className="bento-card col-span-12 sm:col-span-4 glass rounded-2xl p-8 relative overflow-hidden hover:border-accent-purple/20 transition-colors duration-300">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-accent-purple/10 blur-2xl pointer-events-none" />
            <p className="text-xs tracking-[0.3em] text-text-dim uppercase mb-5">Creative Work</p>
            <ul className="space-y-3">
              {creativeWork.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Availability card (4/12) ──────────────────────────── */}
          <div className="bento-card col-span-12 sm:col-span-4 glass rounded-2xl p-8 hover:border-emerald-500/20 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="text-xs tracking-[0.3em] text-text-dim uppercase">Status</span>
            </div>
            <p className="font-display font-semibold text-lg text-white mb-2">Open to Opportunities</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Available for freelance projects, full-time roles, and design collaborations.
            </p>
            <p className="text-xs text-text-dim mt-4">📍 Kerala, India · Remote friendly</p>
          </div>
        </div>

        {/* ── Marquee ticker ─────────────────────────────────────── */}
        <div className="mt-16 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />
          <div className="flex whitespace-nowrap animate-marquee">
            {doubledMarquee.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-4">
                <span className="font-display font-medium text-sm tracking-[0.2em] text-text-dim">{item}</span>
                <span className="text-accent-cyan/40">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
