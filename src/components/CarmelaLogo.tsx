'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface CarmelaLogoProps {
  className?: string
}

export default function CarmelaLogo({ className = '' }: CarmelaLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Transform values based on scroll
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  return (
    <motion.div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ scale, y, opacity }}
    >
      {/* Main Logo Container */}
      <div className="relative flex flex-col items-center">
  
        
        {/* Carmela Image/Animation Placeholder */}
        <motion.div 
          className="relative w-[90vw] md:h-[400px] h-20"
          initial={{ opacity: 0, scale: 0.9,  }}
          animate={{ opacity: 1, scale: 1,  }}
          transition={{ 
            delay: 0.5, 
            duration: 0.5,
            // type: "spring",
            ease: [0.22, 1, 0.36, 1],
            // stiffness: 100
          }}
        >
          {/* This is where the animated Carmela video/3D element would go */}
          {/* Using the Carmela PNG as placeholder */}
          <div className="md:hidden -top-32 left-1/2 -translate-x-1/2 absolute h-36 w-36 flex items-center justify-center">
            <Image
              src="/images/flower.png"
              alt="Carmela Collective"
              fill
              className="object-contain w-full"
              priority
            />
            </div>
          <div className="relative w-full h-28 md:h-[300px] flex items-center justify-center">
            <Image
              src="/images/carmela.png"
              alt="Carmela Collective"
              fill
              className="object-contain w-full"
              priority
            />
          <h3 className='font-leakage text-cream/80 z-[2] text-2xl md:text-6xl absolute -bottom-4 right-8 md:bottom-0 md:right-[15%]'>Collective</h3>
          </div>
          
          {/* Animated blob effect behind logo */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Studio Oval */}
        {/* <motion.div 
          className="mt-4 px-8 py-2 border-2 border-black rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-lg font-medium tracking-wide">Collective</span>
        </motion.div> */}
      </div>
    </motion.div>
  )
}
