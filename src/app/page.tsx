'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Marquee from '@/components/Marquee'
import Hero from '@/sections/Hero'
import FloatingGallery from '@/sections/FloatingGallery'
import Projects from '@/sections/Members'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'
import BackToTop from '@/components/BackToTop'
import Calendar from '@/sections/Calendar'
import IntroText from '@/sections/IntroText'
import Members from '@/sections/Members'
import Archive from '@/sections/Archive'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh()
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <main ref={mainRef} className="relative min-h-screen overflow-x-hidden"
>
      {/* Marquee Header */}
      <Marquee />
      
      {/* Hero Section - stays visible, doesn't fade */}
      <Hero />
      <IntroText />
      {/* Floating Gallery - background image fades in and scales */}
      <FloatingGallery />

      {/* Calendar */}
      <Calendar />
      
      {/* Projects Section */}
      <Members />

      <Archive />
      
      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </main>
  )
}
