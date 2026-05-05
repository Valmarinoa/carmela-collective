'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const marqueeItems = [
  "Let's chat :)",
  "Latin American Diaspora", 
  "Events",
  "Music Curation",
  "Creative Direction",
  "DJ Residencies",
]

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)

  // Measure actual content width for precise animation
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.scrollWidth / 4 // divide by number of duplicates
      setContentWidth(width)
    }
  }, [])

  // Duplicate items more to ensure seamless loop
  const duplicatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#70fe01] border-b border-black/10 overflow-hidden py-2">
      <div className="flex will-change-transform">
        <motion.div
          ref={containerRef}
          className="flex gap-8 items-center flex-shrink-0"
          animate={contentWidth > 0 ? { x: [0, -contentWidth] } : undefined}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25, // slightly slower for smoother feel
              ease: "linear",
            },
          }}
          style={{
            willChange: 'transform',
            translateZ: 0, // force GPU layer
          }}
        >
          {duplicatedItems.map((item, index) => (
            <span 
              key={index} 
              className="text-xs font-medium tracking-wide flex items-center text-neutral-950 gap-8 flex-shrink-0"
            >
              {item}
              <span className="w-1 h-1 bg-black rounded-full flex-shrink-0" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}