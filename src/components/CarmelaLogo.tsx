'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface CarmelaLogoProps {
  className?: string
}

export default function CarmelaLogo({ className = '' }: CarmelaLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  
  const scale = useTransform(scrollY, [0, 300], [1, 0.6])
  const y = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

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
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.5, 
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Mobile flower */}
          <div className="md:hidden -top-32 left-1/2 -translate-x-1/2 absolute h-44 w-44 flex items-center justify-center">
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
            
            {/* Fixed: Added transform-gpu, will-change, and backface-visibility */}
            <h3 
              className='font-leakage text-cream/80 text-2xl md:text-6xl absolute -bottom-4 right-8 md:bottom-0 md:right-[15%] z-[3]
                         transform-gpu will-change-transform
                         [-webkit-backface-visibility:hidden] [backface-visibility:hidden]
                         [-webkit-transform:translateZ(0)]'
              style={{
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              Collective
            </h3>
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
      </div>
    </motion.div>
  )
}