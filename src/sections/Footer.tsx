'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 md:px-12 overflow-hidden h-[70vh] bg-red-700">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/images/footer-bg.png"
          alt="Footer background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 z-20 bg-black/20" />
     {/* Large Logo */}
      <motion.div 
        className="relative flex flex-col items-center justify-center mb-16 z-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* KM */}
        <span className="text-lg font-bold tracking-wider mb-4"></span>
        
        {/* Large Carmela Text */}
        <div className="relative w-full max-w-4xl h-[40px]">
          <Image
            src="/images/carmela.png"
            alt="Carmela Collective"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    

      <motion.div 
        className="text-center z-50 h-full w-full flex flex-col items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-xs text-black z-50 absolute bottom-16">
          © {new Date().getFullYear()} Carmela Collective
        </p>
      </motion.div>

    </footer>
  )
}