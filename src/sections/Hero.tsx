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
      scale: prefersReducedMotion ? 1 : 0.8,
      y: prefersReducedMotion ? 0 : 30,
      filter: "blur(15px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1], // Spring-like ease out
        delay: 0.3
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
      {/* Background Layer - Renders first, triggers content after */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Pink Glow */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { 
            opacity: [0.22, 0.7, 0.42],
            scale: 1 
          } : { opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 7.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.5 },
            scale: { duration: 1.5, ease: "easeOut" }
          }}
          onAnimationComplete={() => {
            // Optional: Could trigger additional effects when background settles
          }}
          className="absolute top-1/4 left-[33%] md:left-[43%] w-72 h-64 md:w-[450px] md:h-96 bg-pink-400 rounded-full blur-3xl overflow-visible"
        /> */}
        
        {/* Orange Glow */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { 
            opacity: [0.28, 0.6, 0.48],
            scale: 1 
          } : { opacity: 0, scale: 0.8 }}
          transition={{
            opacity: { duration: 9.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 0.8 },
            scale: { duration: 1.8, ease: "easeOut", delay: 0.2 }
          }}
          className="absolute bottom-[25%] right-[40%] md:right-[53%] w-96 h-96 md:w-[450px] md:h-[350px] bg-orange-500 rounded-full blur-3xl z-[2] overflow-visible"
        /> */}
      </div>

      {/* Main Content Container - Animates in after background */}
      <motion.div 
        className="relative w-full z-10 h-[90vh] flex md:block flex-col md:flex-none justify-between items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Top Row - Social Icons + Spinning Circle */}
        <div className="z-20 flex justify-between items-start w-full pt-6">
          {/* Social Icons - Slide in from left */}
          <motion.div variants={socialIconsVariants}>
            {/* <SocialIcons /> */}
          </motion.div>

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