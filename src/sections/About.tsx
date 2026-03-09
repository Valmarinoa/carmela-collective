'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function About() {
  return (
    <section
      id="about"
      className="relative pb-28 md:pt-20 h-[80vh] md:mt-20 px-6 md:px-12 overflow-y-visible flex flex-col justify-center md:justify-evenly items-center"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/calendar-bg.png"
          alt="Footer background"
          fill
          priority
          className="object-fill scale-110"
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
      <div className="absolute -bottom-20 right-20 h-56 w-72 z-10">
        <Image
          src="/images/xx.png"
          alt="Carmela Collective"
          fill
          className="object-contain z-20 rotate-180"
          priority
        />
      </div>

      {/* Section Header */}
      <div className="mb-24 md:mb-6 text-left w-full ">
        <h2 className="text-4xl md:text-5xl font-bold font-funtastic">About</h2> 
      </div>
      
      <motion.div 
        className="max-w-[700px] w-full z-[2] flex justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="text-xl md:text-3xl leading-tight text-black text-center">
          <p>Carmela is a Latin American cultural and musical collective that creates spaces to celebrate the region's diversity through a contemporary, critical, and experimental lens.<br/> We bring together high-quality musical and artistic proposals that make our identities visible through our own authentic voices, free from imposed narratives or stereotypes.</p>
        </div>
      </motion.div>
    </section>
  )
}