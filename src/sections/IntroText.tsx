'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'


export default function IntroText() {
  return (
    <section
      id="introText"
      className="md:hidden relative py-10 px-6 overflow-y-visible h-screen flex justify-center items-center"
    >
         <div className="absolute inset-0 -z-10">
        <Image
          src="/images/calendar-bg.png"
          alt="Footer background"
          fill
          priority
          className="object-cover scale-110"
        />
      </div>

      <div className="absolute -top-20 right-20 h-56 w-72 z-10">
      <Image
              src="/images/xx.png"
              alt="Carmela Collective"
              fill
              className="object-contain z-20"
              priority
            />
            </div>

      {/* Section Header */}
      <motion.div 
        className="max-w-lg md:hidden z-[2]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="text-xl leading-tight text-black">
        <p> We create spaces to celebrate Latin American cultural diversity through a contemporary, critical, and experimental lens — showcasing our identities with authenticity, beyond stereotypes.
        </p>
      </div>
      </motion.div>
    </section>
  )
}