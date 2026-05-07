'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import CarmelaLogo from '@/components/CarmelaLogo'
import SpinningCircleText from '@/components/SpinningCircleText'

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
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 40,
      scale: prefersReducedMotion ? 1 : 0.95,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for elegance
      }
    }
  }

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.9,
      y: prefersReducedMotion ? 0 : 10,
      filter: "blur(3px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: .2,
        ease: [0.16, 1, 0.8, 1], // Spring-like ease out
        delay: 0.1
      }
    }
  }

  const spinningCircleVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0,
      rotate: prefersReducedMotion ? 0 : -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.4,
        ease: [0.34, 1.56, 0.64, 1], // Elastic bounce
        delay: 0.5
      }
    }
  }

  const socialIconsVariants = {
    hidden: { 
      opacity: 0, 
      x: prefersReducedMotion ? 0 : -30,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.8
      }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 overflow-hidden h-screen"
    >
      {/* Main Content Container */}
      <motion.div 
        className="relative w-full z-10 h-[90vh] flex md:block flex-col md:flex-none justify-between items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Top Row - Social Icons + Spinning Circle */}
        <div className="z-20 flex justify-between items-start w-full pt-6">
          {/* Social Icons - Slide in from left */}
          <motion.div variants={socialIconsVariants} />

          {/* Spinning Circle - Elastic scale + rotate entrance */}
          <motion.div 
            className="md:fixed md:top-5 md:right-5 flex justify-end"
            variants={spinningCircleVariants}
          >
            <SpinningCircleText 
              text=" LATINO-AMERICANA • LATINO-AMERICANA •" 
              fontClass="font-funtastic text-xs" 
              size={161} 
              duration={16} 
            />
          </motion.div>
        </div>

        {/* Center Logo - Dramatic blur-to-focus entrance */}
        <motion.div 
          className="flex justify-center items-center top-[43%] md:top-[28%] md:-translate-y-[50%] absolute w-full left-0"
          variants={logoVariants}
        >
          <CarmelaLogo />
        </motion.div>

        {/* Bottom Row - Optional additional content */}
        <motion.div 
          className="absolute bottom-8 left-0 w-full flex justify-center"
          variants={itemVariants}
        >
          {/* Add any bottom content here */}
        </motion.div>
      </motion.div>
    </section>
  )
}