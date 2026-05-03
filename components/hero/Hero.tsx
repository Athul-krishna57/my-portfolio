'use client'

import { useEffect, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'

const ParticleField = dynamic(() => import('./ParticleField'), {
  ssr: false,
  loading: () => null,
})

/* Split a string into individually animatable char spans */
function SplitChars({ text, className = '' }: { text: string; className?: string }) {
  return (
    <>
      {text.split('').map((c, i) => (
        <span
          key={i}
          className={`char inline-block ${className}`}
          style={{ whiteSpace: c === ' ' ? 'pre' : 'normal' }}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </>
  )
}

const stats = [
  { value: '3+', label: 'Years Exp.' },
  { value: '15+', label: 'Projects' },
  { value: '5+', label: 'Brands' },
]

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
        .from(
          '.hero-title .char',
          { opacity: 0, y: 90, rotateX: -80, stagger: 0.025, duration: 0.7, ease: 'back.out(1.4)' },
          '-=0.2'
        )
        .from('.hero-line2', { opacity: 0, y: 60, duration: 0.65, ease: 'power3.out' }, '-=0.45')
        .from('.hero-sub', { opacity: 0, y: 30, duration: 0.6 }, '-=0.3')
        .from('.hero-desc', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.2')
        .from('.hero-stat', { opacity: 0, y: 20, stagger: 0.07, duration: 0.5 }, '-=0.2')
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.1')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Radial gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-purple/8 blur-[120px]" />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-accent-cyan/6 blur-[100px]" />
      </div>

      {/* Three.js particle canvas — full-screen background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-20">
        <div className="max-w-3xl">

          {/* Status badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 mb-8 glass rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="text-xs font-medium text-text-secondary tracking-widest uppercase">
              Available for hire
            </span>
          </div>

          {/* Name */}
          <h1
            ref={headingRef}
            className="hero-title font-display font-bold leading-none tracking-tight mb-4"
            style={{ perspective: '800px' }}
          >
            {/* "ATHUL" — char-by-char 3D entrance */}
            <div className="overflow-clip">
              <div className="text-[clamp(3.5rem,10vw,8rem)] text-white">
                <SplitChars text="ATHUL" />
              </div>
            </div>
            {/* "KRISHNA V" — whole-line slide (gradient text needs direct text node, not child spans) */}
            <div className="overflow-clip">
              <div className="hero-line2 text-[clamp(3.5rem,10vw,8rem)] text-gradient">
                KRISHNA V
              </div>
            </div>
          </h1>

          {/* Role */}
          <div className="overflow-clip mb-5">
            <p className="hero-sub font-display text-[clamp(1.1rem,3vw,1.75rem)] text-text-secondary font-light tracking-wide">
              FullStack Software Developer
            </p>
          </div>

          {/* Description */}
          <p className="hero-desc max-w-md text-text-secondary/70 text-sm leading-relaxed mb-10">
            Crafting high-performance web applications and immersive digital experiences at the intersection of
            clean engineering and bold creative direction.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#projects"
              className="hero-cta relative group inline-flex items-center gap-2 px-7 py-3.5 bg-accent-cyan text-obsidian font-display font-semibold text-sm rounded-full overflow-hidden glow-cyan hover:scale-105 transition-transform duration-200"
              data-cursor
            >
              <span className="relative z-10">View My Work</span>
              <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="hero-cta inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-display font-medium text-sm rounded-full hover:border-accent-cyan/50 hover:text-accent-cyan transition-colors duration-300"
              data-cursor
            >
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="hero-stat">
                <div className="font-display font-bold text-2xl text-white">{value}</div>
                <div className="text-xs text-text-dim tracking-wider uppercase mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-text-dim tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent-cyan/50 to-transparent animate-float" />
      </div>
    </section>
  )
}
