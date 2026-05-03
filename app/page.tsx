import Hero from '@/components/hero/Hero'
import About from '@/components/about/About'
import Projects from '@/components/projects/Projects'
import Contact from '@/components/contact/Contact'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  )
}
