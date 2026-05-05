'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '@/sections/Hero'
import FloatingGallery from '@/sections/FloatingGallery'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'
import BackToTop from '@/components/BackToTop'
import About from '@/sections/About'
import Members from '@/sections/Members'
import Archive from '@/sections/Archive'
import CALENDAR from '@/sections/Calendar'
import SpinningCircleText from '@/components/SpinningCircleText'

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
    <main ref={mainRef} className="relative min-h-screen overflow-hidden"
>
      
      
      {/* Hero Section - stays visible, doesn't fade */}
      <Hero />

      

      <About />
      {/* Floating Gallery - background image fades in and scales */}
      <FloatingGallery />

      {/* CALENDAR */}
      <CALENDAR />
      
      <Archive />

      {/* Projects Section */}
      <Members />

      {/* Contact Section */}
      <Contact />
      
      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      
      <div className='hidden md:block'><BackToTop /></div>
    </main>
  )
}
