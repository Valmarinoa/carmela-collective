'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { archive } from '@/data/data'
import { useRef } from 'react'
import { cardContainerVariants, cardItemVariants } from '@/lib/animations'
import Link from 'next/link'

const MotionLink = motion(Link)

export default function Archive() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const topY = useTransform(scrollYProgress, [0, 1], [40, -40])
  
  return (
    <section
      ref={sectionRef}
      id="archive"
      data-nav-dark
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
      <Link href="/archive" className="px-6 mb-20 md:px-12 md:mb-6  z-20 flex">
        <div className="flex md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic uppercase">
              Archive
            </h2>
          </div>
          {/* <div className="w-9 h-9 border border-black rounded-full flex items-center justify-center hover:bg-[#70fe01] transition-opacity duration-300"> 
            <ArrowUpRight size={16} />
          </div > */}
        </div>
      </Link>
      
      {/* Horizontal Scrolling archive */}
      <motion.div
        className="flex gap-6 pl-16 pr-6 md:pl-20 md:pr-12 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth [scrollbar-gutter:stable]"
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {archive.map((event) => (
          <MotionLink
            key={event.id}
            href={`/archive?event=${event.id}`}
            className="project-card flex-shrink-0 w-[250px] group cursor-pointer"
            variants={cardItemVariants}
          >
            {/* Project Media */}
            <div className="relative aspect-[3/4] rounded-md overflow-hidden mb-4">
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
              {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" /> */}
            </div>

            {/* Project Info */}
            <div className="space-y-1">
              <p className="text-[9px] text-neutral-950 uppercase tracking-wider">
                {event.date ?? event.category}
              </p>
              <h3 className="text-lg font-medium">{event.title}</h3>
            </div>
          </MotionLink>
        ))}
      </motion.div>
    </section>
  )
}