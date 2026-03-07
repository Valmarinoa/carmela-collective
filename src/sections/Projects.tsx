'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

// Sample projects data - replace with your actual projects
const projects = [
  {
    id: '1',
    title: 'Monse Alvarez',
    category: 'Marketing, New Media & Digital Comms',
    description: 'A refreshing hard seltzer brand with a strategic marketing approach and distinctive visual identity.',
    image: '/images/monse.png',
    igHandle:''
  },
  {
    id: '2',
    title: 'Adrian Figueroa',
    category: 'Music & Cultural Programming',
    description: 'Cheri (Cherry in Japanese) is a multi-level Japanese-fusion tapas dining and drinks upstairs and an underground nightclub.',
    image: '/images/adrian.png',
     igHandle:''
  },
  {
    id: '3',
    title: 'Juliana Erazo',
    category: 'Filmmaker & Visual Artist',
    description: 'El Sabor - "The Flavour" Tapas Bar is a traditional Spanish restaurant and bar with a contemporary twist.',
    image: '/images/juliana.png',
     igHandle:''
  },
  {
    id: '4',
    title: 'Patrick Kimber',
    category: 'DJ & Producer',
    description: 'Leap Frog Landscapes is a modern and fresh Landscaping company that prides themselves on being vibrant and friendly.',
    image: '/images/patrick.png',
     igHandle:''
  },
  {
    id: '5',
    title: 'Valentina Marino',
    category: 'Art Direction & Developer',
    description: 'Myles Club for Runners is a vibrant community of running enthusiasts who share a passion for fitness and social connection.',
    image: '/images/val.png',
     igHandle:''
  },
  {
    id: '6',
    title: 'Mike Federico',
    category: 'DJ & Producer',
    description: 'Back 2 Balance Counseling empowers individuals towards holistic wellness through compassionate and personalized mental health counseling.',
    image: '/images/mike.png',
     igHandle:''
  },
  {
    id: '7',
    title: 'Andrea Fischer',
    category: 'Cultural Event Logistics & Coordination',
    description: 'First Thing Coffee House is a casual cafe venue located in suburbs with a cozy and welcoming energy.',
    image: '/images/andrea.png',
     igHandle:''
  },

  {
    id: '8',
    title: 'Silvia Oviedo',
    category: 'Artist & Researcher',
    description: 'First Thing Coffee House is a casual cafe venue located in suburbs with a cozy and welcoming energy.',
    image: '/images/silvia.png',
     igHandle:''
  },
]

export default function Projects() {
  return (
    <section 
      id="projects"
      className="relative pb-20 overflow-visible bg-[#B2C29B] z-[1]"
    >
        <div className="absolute inset-0 -z-10">
        <Image
          src="/images/projects-bg.png"
          alt="Footer background"
          fill
          priority
          className="object-cover scale-150"
        />
      </div>

<div className="absolute text-xs font-myriad font-light -top-32 right-20 h-56 w-72 z-72">
      <Image
              src="/images/xx.png"
              alt="Carmela Collective"
              fill
              className="object-contain z-20"
              priority
            />
            </div>
      {/* Section Header */}
      <div  className="px-6 md:px-12 lg:px-20 mb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic">Members</h2> 
          </div>
        </div>
      </div>
      
      {/* Horizontal Scrolling Projects */}
      <div 
        className="flex gap-6 px-6 md:px-12 lg:px-20 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth [scrollbar-gutter:stable]"
      >
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className="project-card flex-shrink-0 w-[250px]  group cursor-pointer"
            initial={{ opacity: 0,  }}
            whileInView={{ opacity: 1,}}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Project Image */}
            <div className="relative aspect-[3/4] rounded-md overflow-hidden mb-4 ">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="400px"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              
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
              <p className="text-[9px] text-neutral-950 uppercase tracking-wider">{project.category}</p>
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="text-sm text-neutral-950 line-clamp-2 font-myriad">{project.description}</p>
            </div>
          </motion.article>
        ))}
        
       
      </div>
    </section>
  )
}
