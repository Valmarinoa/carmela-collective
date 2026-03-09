'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'


export default function About() {
  return (
    <section
      id="about"
      className="md:hidden relative py-32 h-[90vh] px-6 overflow-y-visible flex flex-col justify-center "
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
      <div className="md:px-12 lg:px-20 mb-24">
        <h2 className="text-4xl md:text-5xl font-bold font-funtastic text-left">About</h2> 
      </div>
      <motion.div 
        className="max-w-lg md:hidden z-[2]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="text-xl leading-tight text-black">
        <p> Carmela is a Latin American cultural and musical collective that creates spaces to celebrate the

region’s diversity through a contemporary, critical, and experimental lens.<br/> We bring together high-
quality musical and artistic proposals that make our identities visible through our own authentic voices,

free from imposed narratives or stereotypes.</p>
      </div>
      </motion.div>
    </section>
  )
}