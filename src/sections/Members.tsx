'use client'

import { useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { members } from '@/data/data'
import FlowerSilhoutte from '@/components/FlowerSilhouette'

function MemberCard({
  member,
  index,
}: {
  member: (typeof members)[number]
  index: number
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      className="project-card flex-shrink-0 w-[250px] group overflow-y-visible"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: index * 0.01, duration: 0.3 }}
    >
      {/* Project Image */}
      <div className="relative aspect-[3/4] rounded-3xl mb-4 overflow-visible">
        <Image
          src={member.image}
          alt={member.title}
          fill
          className="object-cover rounded-3xl"
          sizes="400px"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-pink-500/20 transition-colors duration-300 rounded-3xl overflow-visible" />

        {/* Arrow Icon */}
        <motion.a
          href={member.igLink}
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
                className="text-xs text-neutral-950/70 font-myriad pt-2"
              >
                {member.description}
              </motion.p>
            ) : (
              <p className="text-xs text-neutral-950/70 font-myriad line-clamp-2 pt-1">
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
    </motion.article>
  )
}

export default function Members() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const topYRaw = useTransform(scrollYProgress, [0, 1], [40, -40])
  const topY = useSpring(topYRaw, {
    stiffness: 60,
    damping: 18,
    mass: 0.8,
  })

  return (
    <section
      ref={sectionRef}
      id="members"
      className="relative py-20 md:pb-20 z-[3]"
    >
      <motion.div
        style={{ y: topY }}
        className="absolute -top-10 -right-12 md:right-[2%] w-56 h-56 md:h-56 md:w-72 z-10"
      >
        <FlowerSilhoutte fillColor="#F08C43" width={160} 
  height={217}/>
       
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
      <div className="px-6 md:px-12 lg:px-20 mb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic uppercase">
              Members
            </h2>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling members */}
      <div className="flex gap-6 px-6 md:px-12 lg:px-20 overflow-x-auto overflow-y-visible md:pt-4 no-scrollbar scroll-smooth [scrollbar-gutter:stable]">
        {members.map((member, index) => (
          <MemberCard key={member.id} member={member} index={index} />
        ))}
      </div>
    </section>
  )
}