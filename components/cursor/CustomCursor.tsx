'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let hovering = false

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e

      gsap.to(dot, { x, y, duration: 0.08, ease: 'none' })
      gsap.to(ring, { x, y, duration: 0.35, ease: 'power2.out' })

      const target = e.target as Element
      const isHoverable = !!target.closest('a, button, [data-cursor]')

      if (isHoverable && !hovering) {
        hovering = true
        gsap.to(dot, { scale: 0.4, duration: 0.2 })
        gsap.to(ring, {
          scale: 2.2,
          borderColor: 'rgba(0, 245, 255, 0.9)',
          duration: 0.25,
        })
      } else if (!isHoverable && hovering) {
        hovering = false
        gsap.to(dot, { scale: 1, duration: 0.2 })
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(0, 245, 255, 0.45)',
          duration: 0.25,
        })
      }
    }

    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.1 })
      gsap.to(ring, { scale: 0.85, duration: 0.1 })
    }

    const onMouseUp = () => {
      gsap.to(dot, { scale: hovering ? 0.4 : 1, duration: 0.2 })
      gsap.to(ring, { scale: hovering ? 2.2 : 1, duration: 0.2 })
    }

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
    }

    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent-cyan rounded-full pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)', mixBlendMode: 'screen' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-accent-cyan/45 rounded-full pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)', mixBlendMode: 'screen' }}
      />
    </>
  )
}
