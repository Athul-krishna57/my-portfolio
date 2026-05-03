'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: '01',
    category: 'Enterprise Product · Current Role',
    title: 'Learning Management System',
    description:
      'Full-stack ownership of an enterprise LMS product — implementing pixel-perfect responsive UIs from designer specs, building RESTful microservices in Python, and managing MongoDB data layers. Ships across React and Angular frontends with an AWS-hosted backend.',
    tech: ['React', 'Angular', 'Python', 'MongoDB', 'AWS', 'Microservices'],
    gradient: 'from-[#3b82f6]/20 via-[#0d1f40]/10 to-transparent',
    accentColor: '#3b82f6',
    icon: '▦',
    badge: null,
  },
  {
    id: '02',
    category: 'Full-Stack · Cloud',
    title: 'Quiz & Assessment Platform',
    description:
      'End-to-end quiz platform with dynamic question banks, real-time scoring, and leaderboards. Containerised with Docker for environment parity and deployed on AWS — Flask powers the API while React delivers a fast, responsive front end.',
    tech: ['Python', 'Flask', 'React', 'AWS', 'Docker', 'REST API'],
    gradient: 'from-[#10b981]/20 via-[#0a2e20]/10 to-transparent',
    accentColor: '#10b981',
    icon: '◉',
    badge: null,
  },
  {
    id: '03',
    category: 'Personal Project · AI-Accelerated',
    title: 'AI-Powered Learning Platform',
    description:
      'A fully responsive learning platform frontend built in days, not weeks — by strategically leveraging AI tooling to compress the development cycle. Clean component architecture, dynamic content modules, and progress tracking; a live proof of AI-augmented velocity.',
    tech: ['React', 'AI Tooling', 'Responsive UI', 'Component Design'],
    gradient: 'from-[#a855f7]/20 via-[#2d0d55]/10 to-transparent',
    accentColor: '#a855f7',
    icon: '◈',
    badge: null,
  },
  {
    id: '04',
    category: 'SaaS · In Development',
    title: 'Portfolio Creation Platform',
    description:
      'A full SaaS product that lets anyone build a stunning portfolio in minutes — AI generation from scratch, automatic GitHub project sync, a real-time analytics dashboard, one-click static site deployment, and domain management with wildcard subdomain support.',
    tech: ['SaaS', 'AI', 'GitHub API', 'Analytics', 'Custom Domains', 'Static Deploy'],
    gradient: 'from-[#00f5ff]/20 via-[#0d4f55]/10 to-transparent',
    accentColor: '#00f5ff',
    icon: '⬡',
    badge: 'In Development',
  },
]

/* 3-axis tilt card */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    rotateX.set((0.5 - y) * 10)
    rotateY.set((x - 0.5) * 10)
    glareX.set(x * 100)
    glareY.set(y * 100)
  }

  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const glare = useTransform([glareX, glareY], ([gx, gy]) =>
    `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.06) 0%, transparent 60%)`
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`perspective ${className}`}
    >
      {children}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: glare }}
      />
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef    = useRef<HTMLElement>(null)
  const containerRef  = useRef<HTMLDivElement>(null)
  const trackRef      = useRef<HTMLDivElement>(null)
  const headerRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })

      const track   = trackRef.current
      const wrapper = containerRef.current
      if (!track || !wrapper) return

      const getScrollAmount = () => -(track.scrollWidth - wrapper.offsetWidth)

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      // Card clip-path reveals as each card enters the viewport within the horizontal scroll
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
        gsap.from(card, {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left 85%',
            once: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent-cyan/4 blur-[160px] pointer-events-none" />

      {/* Static header above the pinned zone */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <p className="text-xs tracking-[0.4em] text-accent-purple uppercase mb-3">— Selected Work</p>
        <div className="flex items-end justify-between">
          <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="hidden md:block text-text-dim text-sm mb-2">Scroll to explore →</p>
        </div>
      </div>

      {/* Pinned horizontal scroll container */}
      <div ref={containerRef} className="relative h-screen flex items-center">
        <div
          ref={trackRef}
          className="flex gap-6 px-6 lg:px-12 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {projects.map((project) => (
            <TiltCard
              key={project.id}
              className="project-card relative flex-shrink-0 w-[min(85vw,520px)] h-[560px] glass rounded-2xl overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />

              {/* Top line accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}60, transparent)` }}
              />

              <div className="relative z-10 flex flex-col h-full p-8">
                {/* Card header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs tracking-[0.25em] uppercase font-medium block"
                        style={{ color: project.accentColor }}
                      >
                        {project.category}
                      </span>
                      {project.badge && (
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border animate-pulse-dot"
                          style={{
                            color: project.accentColor,
                            borderColor: `${project.accentColor}40`,
                            backgroundColor: `${project.accentColor}15`,
                          }}
                        >
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <span
                      className="text-6xl font-display font-bold opacity-10"
                      style={{ color: project.accentColor }}
                    >
                      {project.id}
                    </span>
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border"
                    style={{
                      borderColor: `${project.accentColor}30`,
                      backgroundColor: `${project.accentColor}10`,
                      color: project.accentColor,
                    }}
                  >
                    {project.icon}
                  </div>
                </div>

                {/* Abstract visual block */}
                <div
                  className="flex-1 rounded-xl mb-8 relative overflow-hidden"
                  style={{ background: `${project.accentColor}06`, border: `1px solid ${project.accentColor}15` }}
                >
                  {/* Animated grid lines inside card visual */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `linear-gradient(${project.accentColor}20 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}20 1px, transparent 1px)`,
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-2xl"
                    style={{ background: `${project.accentColor}20` }}
                  />
                  <div
                    className="absolute bottom-4 right-4 font-display text-[80px] font-bold leading-none opacity-[0.07]"
                    style={{ color: project.accentColor }}
                  >
                    {project.icon}
                  </div>
                </div>

                {/* Title & desc */}
                <h3 className="font-display font-bold text-xl text-white mb-3">{project.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium"
                      style={{
                        color: project.accentColor,
                        backgroundColor: `${project.accentColor}12`,
                        border: `1px solid ${project.accentColor}25`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-sm font-display font-medium group self-start"
                  style={{ color: project.accentColor }}
                  data-cursor
                >
                  View Project
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </div>
            </TiltCard>
          ))}

          {/* End-of-track spacer card */}
          <div className="flex-shrink-0 w-[min(60vw,320px)] h-[560px] flex flex-col items-center justify-center gap-6 px-8">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-accent-cyan/40 to-transparent" />
            <p className="font-display text-text-dim text-sm text-center tracking-wide">
              More projects coming soon
            </p>
            <a href="#contact" className="text-accent-cyan text-sm font-medium underline underline-offset-4 hover:text-white transition-colors" data-cursor>
              Let&apos;s build yours
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
