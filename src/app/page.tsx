import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import ServicesPlayground from '@/components/ServicesPlayground'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-950 overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <ServicesPlayground />
      <Contact />
      <Footer />
    </main>
  )
}
