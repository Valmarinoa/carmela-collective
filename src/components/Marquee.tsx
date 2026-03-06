'use client'

import { motion } from 'framer-motion'

const marqueeItems = [
  "Let's chat :)",
  "Latin American Diaspora", 
  "Events",
  "Music Curation",
  "Creative Direction",
  "DJ Residencies",
]

export default function Marquee() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#70fe01] border-b border-black/10 overflow-hidden py-2">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={index} className="text-xs font-medium tracking-wide flex items-center text-neutral-950 gap-8">
              {item}
              <span className="w-1 h-1 bg-black rounded-full" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
