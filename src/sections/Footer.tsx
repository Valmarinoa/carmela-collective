'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 md:px-12 overflow-hidden h-[70vh]">

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
  <div className='h-full w-full flex flex-col justify-end items-center pb-20'>
     
      {/* Navigation */}
      {/* <motion.nav 
        className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {['Projects', 'Gallery', 'About', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium text-white hover:text-[#70fe01] transition-colors  z-50"
            whileHover={{ y: -2 }}
          >
            {item}
          </motion.a>
        ))}
      </motion.nav> */}
      
      {/* Copyright */}
      <motion.div 
        className="text-center z-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-xs text-black z-50">
          © {new Date().getFullYear()} Carmela Collective
        </p>
      </motion.div></div>

    </footer>
  )
}