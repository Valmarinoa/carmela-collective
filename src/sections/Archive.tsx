'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { getArchivePreview, formatShortDate } from '@/lib/calendarData'
import { useRef } from 'react'
import { cardContainerVariants, cardItemVariants } from '@/lib/animations'
import Link from 'next/link'

const MotionLink = motion(Link)
const LANDING_ARCHIVE_LIMIT = 7

export default function Archive() {
  const sectionRef = useRef<HTMLElement>(null)
  const archive = getArchivePreview(LANDING_ARCHIVE_LIMIT)

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
      className="relative md:pt-4 md:pb-20 z-[6] h-screen flex flex-col bg-red-700 justify-center"
    >
      <div className="absolute inset-0 -z-10 ">
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

{/* ARCHIVE TITLE */}
      <Link href="/archive" className="px-6 mb-20 md:px-12  z-20 flex">
        <div className="flex md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic uppercase">
              Archive
            </h2>
          </div>
        </div>
      </Link>

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
                  src={event.flyer || ''}
                  alt={event.title}
                  fill
                  loading="eager"
                  className={event.objectFit === 'contain' ? 'object-contain' : 'object-cover'}
                  sizes="400px"
                />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-[9px] text-neutral-950 uppercase tracking-wider">
                {formatShortDate(event.date)}
              </p>
              <h3 className="text-lg font-medium">{event.title}</h3>
            </div>
          </MotionLink>
        ))}

        <motion.div
          className="flex-shrink-0 self-center pr-6 md:pr-12"
          variants={cardItemVariants}
        >
          <Link
            href="/archive"
            className="font-inter border border-black gap-2 px-6 py-5 bg-transparent backdrop-blur-xl text-black hover:text-black hover:border-black text-[11px] tracking-[0.2em] uppercase hover:bg-cream transition-colors duration-150 rounded-full inline-flex"
          >
            See Archive
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
