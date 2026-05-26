'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Hero from '@/sections/Hero'
import FloatingGallery from '@/sections/FloatingGallery'
import Contact from '@/sections/Contact'
import Footer from '@/sections/Footer'
import BackToTop from '@/components/BackToTop'
import About from '@/sections/About'
import Members from '@/sections/Members'
import Archive from '@/sections/Archive'
import CALENDAR from '@/sections/Calendar'
import Mixes from '@/sections/Mixes'
import PageLoader from '@/components/PageLoader'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <PageLoader onDone={() => setLoaded(true)} />

      <motion.main
        ref={mainRef}
        className="relative min-h-screen overflow-x-clip"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
      {/* Hero Section - stays visible, doesn't fade */}
      <Hero />

      

      <About />
      {/* Floating Gallery - background image fades in and scales */}
      <FloatingGallery />
 {/* <Mixes /> */}
      {/* CALENDAR */}
      <CALENDAR />
      
      <Archive />

      {/* Mixes Section */}
     

      {/* Projects Section */}
      <Members />

      {/* Contact Section */}
      <Contact />
       {/* <Marquee/> */}
      {/* Footer */}
      <Footer />
     
      
      {/* Back to Top Button */}
      
      <div className='hidden md:block'><BackToTop /></div>
      </motion.main>
    </>
  )
}
