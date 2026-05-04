'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'About',   href: '#about' },
  { label: 'Work',    href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const fadeDown = {
  hidden:  { opacity: 0, y: -12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.33, 1, 0.68, 1] },
  }),
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] px-6 lg:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/5' : ''
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Logo */}
      <motion.a
        href="#"
        className="flex items-center gap-2.5 group"
        custom={0}
        variants={fadeDown}
        initial="hidden"
        animate="visible"
        data-cursor
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 border border-accent-cyan/30 flex items-center justify-center group-hover:border-accent-cyan/60 transition-colors duration-300">
          <span className="font-display font-bold text-accent-cyan text-sm tracking-tighter">AK</span>
        </div>
        <span className="font-display font-semibold text-sm tracking-wide text-white/75 hidden sm:block">
          Athul Krishna
        </span>
      </motion.a>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-8">
        {links.map(({ label, href }, i) => (
          <motion.li
            key={label}
            custom={i + 1}
            variants={fadeDown}
            initial="hidden"
            animate="visible"
          >
            <a
              href={href}
              className="relative text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 group"
              data-cursor
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-accent-cyan to-accent-purple group-hover:w-full transition-all duration-300" />
            </a>
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a
        href="/resume.pdf"
        download="Athul_Krishna_V_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        custom={links.length + 1}
        variants={fadeDown}
        initial="hidden"
        animate="visible"
        className="relative px-5 py-2 text-sm font-medium font-display text-accent-cyan border border-accent-cyan/40 rounded-full overflow-hidden group hover:border-accent-cyan/80 transition-colors duration-300"
        data-cursor
      >
        <span className="relative z-10">Resume</span>
        <span className="absolute inset-0 bg-accent-cyan/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      </motion.a>
    </motion.nav>
  )
}
