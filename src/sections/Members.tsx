'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { members } from '@/data/data'
import { useRef } from 'react'

// Sample members data - replace with your actual members


export default function Members() {
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
      id="members"
      className="relative py-20  bg-black md:pb-20 z-[3]"
    >
      <motion.div
        style={{ y: topY }}
        className="absolute -top-12 -right-14 md:right-[10%] h-56 w-72 z-10"
      >
        <Image
          src="/icons/carmela-figure.svg"
          alt="Carmela Collective"
          fill
          className="object-contain z-20"
          priority
        />
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
      <div  className="px-6 md:px-12 lg:px-20 mb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic uppercase">Members</h2> 
          </div>
        </div>
      </div>
      
      {/* Horizontal Scrolling members */}
      <div 
        className="flex gap-6 px-6 md:px-12 lg:px-20 overflow-x-auto overflow-y-visible md:pt-4  no-scrollbar scroll-smooth [scrollbar-gutter:stable]"
      >
        {members.map((member, index) => (
          <motion.article
            key={member.id}
            className="project-card flex-shrink-0 w-[250px]  group cursor-pointer "
            initial={{ opacity: 0,  }}
            whileInView={{ opacity: 1,}}
            transition={{ delay: index * 0.01, duration: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Project Image */}
            <div className="relative aspect-[3/4] rounded-3xl mb-4 ">
              <Image
                src={member.image}
                alt={member.title}
                fill
                className="object-cover rounded-3xl"
                sizes="400px"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-pink-500/20 transition-colors duration-300 rounded-3xl" />
              
              {/* Arrow Icon */}
              <motion.a
              href={`${member.igLink}`}
                className="absolute top-4 right-4 w-10 h-10 bg-[#70fe01] rounded-full flex items-center justify-center
                           opacity-0 group-hover:opacity-100  transition-opacity duration-300"
              >
                <ArrowUpRight size={18} />
              </motion.a>
            </div>
            
            {/* Project Info */}
            <div className="space-y-1">
              <p className="text-[9px] text-neutral-950 uppercase tracking-wider">{member.category}</p>
              <h3 className="text-lg font-medium">{member.title}</h3>
              <p className="text-[9px] text-neutral-950 uppercase tracking-wider">{member.nationality}</p>
              <a href={`${member.igLink}`} className="text-[9px] text-neutral-950 tracking-wider">{member.igHandle}</a>
              <p className="text-xs text-neutral-950/70 line-clamp-2 font-myriad">{member.description}</p>
            </div>
          </motion.article>
        ))}
        
       
      </div>
    </section>
  )
}
