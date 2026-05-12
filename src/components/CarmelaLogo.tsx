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
    <div className={`relative ${className}`}>
      {/* Animated container - only images inside */}
      <div 
        ref={containerRef}
        // style={{ scale, y, opacity }}
      >
        <div className="relative flex flex-col items-center">
          <div 
            className="relative w-[90vw] md:w-[80vw] md:h-[400px] h-20"
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
            
            {/* Carmela image only */}
            <div className="relative w-full h-20 md:h-[300px] mt-4 flex items-start md:items-center md:justify-center">
              <Image
                src="/images/carmela.png"
                alt="Carmela Collective"
                fill
                className="object-contain w-full"
                priority
              />
            </div>
          
          </div>
        </div>
      </div>

      {/* Text outside animated container - prevents flicker */}
      <h3 
        className='font-leakage text-cream/80 text-2xl md:text-6xl 
                   absolute -bottom-[64px] right-8 md:bottom-20 md:right-[15%] z-[2]'
      >
        Collective
      </h3>
    </div>
  )
}