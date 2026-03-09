'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import SocialIcons from '@/components/SocialIcons'
import CarmelaLogo from '@/components/CarmelaLogo'
import SpinningCircleText from '@/components/SpinningCircleText'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 overflow-hidden h-screen"
    >
      {/* Main Content Container - NO fade out on scroll */}
      <div className="relative w-full z-10 h-[90vh] flex md:block flex-col md:flex-none justify-between items-center">
        {/* Top Row */}
        <div className="flex justify-between items-start pt-8 fixed top-10 left-6 md:top-10 md:left-20 z-9999">
          {/* Social Icons - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <SocialIcons />
          </motion.div>
        </div>

        {/* Spinning Circle */}
        <div className="z-20 flex justify-end w-full pt-6">
          <SpinningCircleText
            text=" LATINO-AMERICANA • LATINO-AMERICANA •"
            fontClass="font-funtastic text-xs"
            size={161}
            duration={16}
          />
        </div>

        {/* Center Logo */}
        <div className="flex justify-center items-center top-1/2 -translate-y-[50%] absolute">
          <CarmelaLogo />
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-[43%] w-72 h-64 md:w-[450px] md:h-96 bg-pink-400 rounded-full blur-3xl overflow-visible"
          animate={{
            opacity: [0.22, 0.6, 0.42],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />

        <motion.div
          className="absolute bottom-[25%] right-[53%] w-96 h-96 md:w-[450px] md:h-[350px] bg-orange-500 rounded-full blur-3xl z-[2] overflow-visible"
          animate={{
            opacity: [0.28, 0.7, 0.48],
          }}
          transition={{
            duration: 9.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: .8,
          }}
        />
        

      </div>
    </section>
  )
}