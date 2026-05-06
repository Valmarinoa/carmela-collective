'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { archive } from '@/data/data'
import { useRef } from 'react'

export default function Archive() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Top image moves a bit upward as you scroll through the section
  const topYRaw = useTransform(scrollYProgress, [0, 1], [40, -40])
  const topY = useSpring(topYRaw, {
    stiffness: 60,
    damping: 18,
    mass: 0.8,
  })
  
  return (
    <section 
    ref={sectionRef}
      id="archive"
      className="relative pt-20 pb-28 bg-cream -mt-20 md:pb-44 md:mt-0 z-[3]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/projects-bg.png"
          alt="Footer background"
          fill
          priority
          className="object-fill scale-150"
        />
      </div>
      <motion.div
        style={{ y: topY }}
        className="absolute -top-32  -right-24 md:right-56 h-56 w-72 z-10"
      >
        <Image
          src="/images/xx.png"
          alt="Carmela Collective"
          fill
          className="object-contain z-20"
          priority
        />
      </motion.div>

      {/* Section Header */}
      <div className="px-6 mb-24 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic uppercase">Archive</h2> 
          </div>
        </div>
      </div>
      
      {/* Horizontal Scrolling members */}
      <div 
        className="flex gap-6 px-6 md:px-12 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth [scrollbar-gutter:stable]"
      >
        {archive.map((event, index) => (
          <motion.article
            key={event.id}
            className="project-card flex-shrink-0 w-[250px] group pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.01, duration: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Project Media */}
            <div className="relative aspect-[3/4] rounded-md overflow-hidden mb-4">
              {/* Render Video or Image based on mediaType */}
              {event.mediaType === 'video' && event.video ? (
                <video
                  src={event.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className={`w-full h-full ${event.objectFit === 'cover' ? 'object-cover' : 'object-contain'}`}
                />
              ) : (
                <Image
                  src={event.image || event.src || ''}
                  alt={event.title}
                  fill
                  className={event.objectFit === 'contain' ? 'object-contain' : 'object-cover'}
                  sizes="400px"
                />
              )}
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300" />
            </div>
            
            {/* Project Info */}
            <div className="space-y-1">
              <p className="text-[9px] text-neutral-950 uppercase tracking-wider">{event.category}</p>
              <h3 className="text-lg font-medium">{event.title}</h3>
              <p className="text-xs text-neutral-950/70 font-myriad line-clamp-2 pt-1">{event.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}