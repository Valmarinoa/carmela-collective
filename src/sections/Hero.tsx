'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import CarmelaLogo from '@/components/CarmelaLogo'
import SpinningCircleText from '@/components/SpinningCircleText'
import Link from 'next/link'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Trigger entrance animation after mount (simulating background/asset loading)
  useEffect(() => {
    // Small delay to ensure background elements are rendered
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40, scale: prefersReducedMotion ? 1 : 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9, y: prefersReducedMotion ? 0 : 10 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.8, 1], delay: 0.1 },
    },
  }

  const spinningCircleVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 },
    visible: {
      opacity: 1, scale: 1,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.4 },
    },
  }

  const socialIconsVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    visible: {
      opacity: 1, x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 },
    },
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 overflow-hidden h-screen"
    >
      {/* Main Content Container */}
      <motion.div 
        className="relative w-full z-10 h-[75vh] flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <motion.div 
            className="absolute -top-10 right-0 md:fixed md:top-5 md:right-5 flex justify-end"
            variants={spinningCircleVariants}
          >
            <SpinningCircleText 
              text="LATINO-AMERICANA LATINO-AMERICANA" 
              fontClass="font-funtastic text-xs" 
              size={161} 
              duration={16} 
            />
          </motion.div>
        {/* Top Row - Social Icons + Spinning Circle */}
        <div className="z-20 flex justify-between items-start w-full pt-6 fixed">
          <motion.div variants={socialIconsVariants} />
        </div>
        {/* Center Logo - Dramatic blur-to-focus entrance */}
        <motion.div 
          className="flex justify-center items-center w-full h-full -mt-10 md:mt-0"
          variants={logoVariants}
        >
          <CarmelaLogo />
        </motion.div>
        <motion.div 
          className="absolute bottom-24 md:bottom-0 left-0 w-full flex justify-center "
          variants={itemVariants}
            >
              <Link href='/calendar'           
                className="inline-flex font-inter items-center border border-cream gap-2 px-6 py-5 bg-transparent backdrop-blur-xl text-white hover:text-black hover:border-black text-[11px] tracking-[0.2em] uppercase hover:bg-[#70fe01] transition-colors duration-150">
                Upcoming Events
              </Link>
          {/* Add any bottom content here */}
        </motion.div>

        {/* Bottom Row - Optional additional content */}
        
      </motion.div>
    </section>
  )
}