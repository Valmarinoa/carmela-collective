'use client'

import { useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { members } from '@/data/data'
import FlowerSilhoutte from '@/components/FlowerSilhouette'
import { cardContainerVariants, cardItemVariants } from '@/lib/animations'

function MemberCard({
  member,
}: {
  member: (typeof members)[number]
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article
      className="project-card flex-shrink-0 w-[250px] group overflow-y-visible"
      // variants={cardVariants}
    >
      {/* Project Image */}
      <div className="relative aspect-[3/4] rounded-md mb-4 overflow-visible ">
        <Image
          src={member.image}
          alt={member.title}
          fill
          loading="eager"
          className="object-cover rounded-md"
          sizes="400px"
        />

        {/* Hover Overlay */}
        {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-pink-500/20 transition-colors duration-100 rounded-md overflow-visible" /> */}

        {/* Arrow Icon */}
        <motion.a
          href={member.igLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 w-10 h-10 bg-[#70fe01] rounded-full flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight size={18} />
        </motion.a>
      </div>

       {/* Project Info */}
      <div className="space-y-1">
        <p className="text-[9px] text-neutral-950 uppercase tracking-wider font-medium">
          {member.category}
        </p>
        <h3 className="text-lg font-medium leading-tight">{member.title}</h3>
        <p className="text-[9px] text-neutral-950 uppercase tracking-wider">
          {member.nationality}
        </p>
        <a
          href={member.igLink}
          className="text-[9px] text-neutral-950 tracking-wider block hover:underline"
        >
          {member.igHandle}
        </a>

        {/* Description with smooth expand */}
        <div className="overflow-hidden">
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.p
                key="expanded"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs text-neutral-950/70 font-inter pt-2"
              >
                {member.description}
              </motion.p>
            ) : (
              <p className="text-xs text-neutral-950/70 font-inter line-clamp-2 pt-1">
                {member.description}
              </p>
            )}
          </AnimatePresence>
        </div>

        {member.description && member.description.length > 90 && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-[10px] uppercase tracking-wider text-neutral-950/80 hover:text-neutral-950 transition-colors duration-300 font-medium"
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
    </article>
  )
}

export default function Members() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const topY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
    ref={sectionRef}
    id="members"
    data-nav-dark
    className="relative pt-10 md:pt-4 md:pb-20 z-[3] h-screen bg-green-500 flex flex-col justify-center"
  >
    <motion.div
      style={{ y: topY }}
      className="absolute top-20 md:top-0 -right-12 md:right-[2%] w-56 h-56 md:h-56 md:w-72 z-50"
    >
      <FlowerSilhoutte fillColor="#F08C43" width={180} height={247} />
    </motion.div>

      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/archive-bg.png"
          alt="Footer background"
          fill
          priority
          className="object-cover scale-150"
        />
      </div>

      {/* Section Header */}
      <div className="px-6 mb-20 md:px-12 md:mb-20 mt-24 md:mt-12 ">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic uppercase">
              Members
            </h2>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling members */}
      <motion.div
        className="flex gap-6 pl-16 pr-6 md:pl-20 md:pr-12 overflow-x-auto overflow-y-visible md:pt-4 no-scrollbar scroll-smooth [scrollbar-gutter:stable]"
        variants={cardContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {members.map((member) => (
          <motion.div key={member.id} variants={cardItemVariants}>
            <MemberCard member={member} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}