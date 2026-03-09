'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { archive } from '@/data/data'

export default function Archive() {
  return (
    <section 
      id="archive"
      className="relative py-20 bg-cream -mt-20 md:pb-44 md:mt-0 z-[3]"
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
      <div className="absolute -top-32 right-20 h-56 w-72 z-10">
      <Image
              src="/images/xx.png"
              alt="Carmela Collective"
              fill
              className="object-contain z-20"
              priority
            />
            </div>

      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-20 mb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic">Archive</h2> 
          </div>
        </div>
      </div>
      
      {/* Horizontal Scrolling members */}
      <div 
        className="flex gap-6 px-6 md:px-12 lg:px-20 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth [scrollbar-gutter:stable]"
      >
        {archive.map((event, index) => (
          <motion.article
            key={event.id}
            className="project-card flex-shrink-0 w-[250px] group cursor-pointer"
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
              
              {/* Arrow Icon */}
              <motion.div 
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight size={18} />
              </motion.div>
            </div>
            
            {/* Project Info */}
            <div className="space-y-1">
              <p className="text-[9px] text-neutral-950 uppercase tracking-wider">{event.category}</p>
              <h3 className="text-lg font-medium">{event.title}</h3>
              <p className="text-sm text-neutral-950 line-clamp-2 font-myriad">{event.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}