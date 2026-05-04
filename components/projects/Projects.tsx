'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

type Project = {
  id: string
  category: string
  title: string
  description: string
  tech: string[]
  gradient: string
  accentColor: string
  icon: string
  badge: string | null
  details: {
    overview: string
    highlights: string[]
    role: string
    image?: string
  }
}

const projects: Project[] = [
  {
    id: '01',
    category: 'Enterprise Product · Current Role',
    title: 'Learning Management System',
    description:
      'Full-stack Python developer at Cyber Square AI & Robotics — migrating legacy APIs, optimising database performance, integrating third-party services, and enforcing code quality across a live enterprise product.',
    tech: ['React', 'Angular', 'Python', 'MongoDB', 'AWS', 'REST API', 'SonarQube', 'Docker'],
    gradient: 'from-[#3b82f6]/20 via-[#0d1f40]/10 to-transparent',
    accentColor: '#3b82f6',
    icon: '▦',
    badge: null,
    details: {
      overview:
        'A large-scale Learning Management System built and maintained at Cyber Square AI & Robotics Private Limited. I work as a Python Full Stack Developer owning backend services, frontend modules, and code quality pipelines across the full product lifecycle.',
      role: 'Python Full Stack Developer · Cyber Square AI & Robotics Pvt Ltd · Jan 2023 – Present · On-Site',
      highlights: [
        'Led the migration of 90% of legacy APIs from Python 2 to Python 3, improving system performance, security compliance, maintainability, and long-term scalability.',
        'Debugged, refactored, and optimized production-grade codebases to enhance application stability, performance, and reliability in live environments.',
        'Optimized complex database queries and backend workflows, achieving a 20% reduction in page load times and significant improvements in overall system efficiency.',
        'Designed and integrated Google Image Search functionality using Google Programmable Search Engine and Custom Search JSON API, enabling seamless in-platform image discovery and selection for users.',
        'Improved code quality, security standards, and maintainability by implementing SonarQube for static code analysis, technical debt monitoring, and continuous code quality enforcement.',
        'Actively contributed to sprint planning, backlog grooming, and agile ceremonies, ensuring timely delivery of high-quality features and product releases.',
        'Collaborated with cross-functional teams and supported junior developers through technical guidance, code reviews, and knowledge sharing to strengthen team productivity and engineering standards.',
      ],
    },
  },
  {
    id: '02',
    category: 'Personal Project · Full-Stack · Cloud',
    title: 'Mystery Matrix — Quiz Platform',
    description:
      'Competitive quiz platform with a scalable microservices architecture, real-time leaderboards, and background cron jobs — containerised with Docker and deployed to AWS ECS to support 7,000 concurrent users.',
    tech: ['React', 'Python', 'Docker', 'MongoDB', 'AWS', 'REST API'],
    gradient: 'from-[#10b981]/20 via-[#0a2e20]/10 to-transparent',
    accentColor: '#10b981',
    icon: '◉',
    badge: null,
    details: {
      overview:
        'Mystery Matrix is a competitive quiz platform built as a personal project. It features dynamic question banks, real-time scoring, and leaderboards backed by a microservices architecture containerised with Docker and deployed on AWS ECS.',
      role: 'Full-Stack Developer · Personal Project',
      highlights: [
        'Built a scalable microservices-based architecture for leaderboard cron jobs and background processing.',
        'Containerized services using Docker and deployed to AWS ECS.',
        'Designed the system to support up to 7,000 concurrent users.',
        'Implemented REST APIs for secure client-server communication.',
      ],
    },
  },
  {
    id: '03',
    category: 'Personal Project · AI-Accelerated',
    title: 'Perfect Learning — LMS Frontend',
    description:
      'A fully responsive Learning Management System frontend built with React — covering User Dashboard, Course Materials, Bookmarks, Practice Tests, and an Analytics Dashboard with REST API integration.',
    tech: ['React', 'AWS', 'REST API', 'Responsive UI'],
    gradient: 'from-[#a855f7]/20 via-[#2d0d55]/10 to-transparent',
    accentColor: '#a855f7',
    icon: '◈',
    badge: null,
    details: {
      overview:
        'Perfect Learning is a Learning Management System frontend built as a personal project using React and deployed on AWS. The focus was on clean responsive UI, modular component architecture, and seamless REST API integration across all learning modules.',
      role: 'Frontend Developer · Personal Project',
      highlights: [
        'Developed a fully responsive frontend UI using React.',
        'Implemented modules including User Dashboard, Course Materials, Bookmarks, Practice Tests, and Analytics Dashboard.',
        'Integrated REST APIs for dynamic data rendering across all modules.',
      ],
    },
  },
  {
    id: '04',
    category: 'SaaS · In Development',
    title: 'Portfolio Creation Platform',
    description:
      'A full SaaS product that lets anyone build a stunning portfolio in minutes — AI generation, GitHub project sync, real-time analytics, one-click deployment, and custom domain management.',
    tech: ['SaaS', 'AI', 'GitHub API', 'Analytics', 'Custom Domains', 'Static Deploy'],
    gradient: 'from-[#00f5ff]/20 via-[#0d4f55]/10 to-transparent',
    accentColor: '#00f5ff',
    icon: '⬡',
    badge: 'In Development',
    details: {
      overview:
        'An ambitious SaaS platform designed to democratise portfolio creation. Users get a full AI-powered portfolio generation experience — from blank to deployed in minutes — with automatic GitHub project sync, a real-time analytics dashboard, and wildcard subdomain support.',
      role: 'Solo Founder & Developer · In Active Development',
      highlights: [
        'AI-driven portfolio generation — users describe themselves and the platform builds their entire portfolio.',
        'Automatic GitHub project sync to keep portfolios up to date without manual input.',
        'Real-time analytics dashboard to track visitor engagement and traffic sources.',
        'One-click static site deployment with zero DevOps knowledge required.',
        'Custom domain management with wildcard subdomain support for white-labelled portfolios.',
        'Designed from the ground up as a scalable multi-tenant SaaS architecture.',
      ],
    },
  },
]

/* ── Project Detail Modal ─────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto glass rounded-2xl"
        style={{ border: `1px solid ${project.accentColor}30` }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}80, transparent)` }}
        />

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-obsidian/80 backdrop-blur-sm border-b border-white/5">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-lg border"
              style={{ borderColor: `${project.accentColor}30`, backgroundColor: `${project.accentColor}10`, color: project.accentColor }}
            >
              {project.icon}
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: project.accentColor }}>
                {project.category}
              </p>
              <h3 className="font-display font-bold text-white text-lg leading-tight">{project.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-text-dim hover:text-white hover:border-white/30 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="px-8 py-8 space-y-8">
          {/* Image slot */}
          {project.details.image ? (
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img src={project.details.image} alt={project.title} className="w-full object-cover" />
            </div>
          ) : (
            <div
              className="rounded-xl h-52 flex items-center justify-center relative overflow-hidden border"
              style={{ background: `${project.accentColor}06`, borderColor: `${project.accentColor}20` }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(${project.accentColor}20 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}20 1px, transparent 1px)`,
                  backgroundSize: '28px 28px',
                }}
              />
              <span className="font-display text-[120px] font-bold leading-none opacity-[0.06]" style={{ color: project.accentColor }}>
                {project.icon}
              </span>
              <p className="absolute bottom-4 text-xs text-text-dim tracking-widest uppercase">Project preview coming soon</p>
            </div>
          )}

          {/* Role */}
          <div className="flex items-center gap-2 text-xs text-text-dim tracking-wide">
            <span style={{ color: project.accentColor }}>◆</span>
            {project.details.role}
          </div>

          {/* Overview */}
          <div>
            <p className="text-xs tracking-[0.3em] text-text-dim uppercase mb-3">Overview</p>
            <p className="text-text-secondary text-sm leading-relaxed">{project.details.overview}</p>
          </div>

          {/* Highlights */}
          <div>
            <p className="text-xs tracking-[0.3em] text-text-dim uppercase mb-4">Key Contributions</p>
            <ul className="space-y-3">
              {project.details.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: project.accentColor }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <p className="text-xs tracking-[0.3em] text-text-dim uppercase mb-4">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                  style={{ color: project.accentColor, borderColor: `${project.accentColor}30`, backgroundColor: `${project.accentColor}10` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── 3-axis tilt card ─────────────────────────────────────────── */
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

  const onLeave = () => { rotateX.set(0); rotateY.set(0) }

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
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: glare }} />
    </motion.div>
  )
}

/* ── Main Section ─────────────────────────────────────────────── */
export default function Projects() {
  const sectionRef   = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const headerRef    = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0, y: 40, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
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

      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
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
    <>
      <section ref={sectionRef} id="projects" className="relative py-24 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent-cyan/4 blur-[160px] pointer-events-none" />

        <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
          <p className="text-xs tracking-[0.4em] text-accent-purple uppercase mb-3">— Selected Work</p>
          <div className="flex items-end justify-between">
            <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="hidden md:block text-text-dim text-sm mb-2">Scroll to explore →</p>
          </div>
        </div>

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
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}60, transparent)` }}
                />

                <div className="relative z-10 flex flex-col h-full p-8">
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
                            style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, backgroundColor: `${project.accentColor}15` }}
                          >
                            {project.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-6xl font-display font-bold opacity-10" style={{ color: project.accentColor }}>
                        {project.id}
                      </span>
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border"
                      style={{ borderColor: `${project.accentColor}30`, backgroundColor: `${project.accentColor}10`, color: project.accentColor }}
                    >
                      {project.icon}
                    </div>
                  </div>

                  {/* Abstract visual */}
                  <div
                    className="flex-1 rounded-xl mb-8 relative overflow-hidden"
                    style={{ background: `${project.accentColor}06`, border: `1px solid ${project.accentColor}15` }}
                  >
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

                  <h3 className="font-display font-bold text-xl text-white mb-3">{project.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium"
                        style={{ color: project.accentColor, backgroundColor: `${project.accentColor}12`, border: `1px solid ${project.accentColor}25` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => setActiveProject(project)}
                    className="flex items-center gap-2 text-sm font-display font-medium group self-start"
                    style={{ color: project.accentColor }}
                    data-cursor
                  >
                    View Project
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </div>
              </TiltCard>
            ))}

            {/* End spacer */}
            <div className="flex-shrink-0 w-[min(60vw,320px)] h-[560px] flex flex-col items-center justify-center gap-6 px-8">
              <div className="w-px h-24 bg-gradient-to-b from-transparent via-accent-cyan/40 to-transparent" />
              <p className="font-display text-text-dim text-sm text-center tracking-wide">More projects coming soon</p>
              <a href="#contact" className="text-accent-cyan text-sm font-medium underline underline-offset-4 hover:text-white transition-colors" data-cursor>
                Let&apos;s build yours
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
