'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const events = [
  {
    id: '1',
    date: 'April 4',
    city: 'Amsterdam',
    title: 'Carmela x POS',
    subtitle: 'Fundraiser Event',
    href: '#',
  },
  {
    id: '2',
    date: 'May 4',
    city: 'Amsterdam',
    title: 'Vinilazo Carmela',
    subtitle: 'Vinil Event',
    href: '#',
  },
  {
    id: '3',
    date: 'May 19',
    city: 'Amsterdam',
    title: 'Carmela x SF',
    subtitle: 'Dance Evening',
    href: '#',
  },
  {
    id: '4',
    date: 'June 4',
    city: 'Amsterdam',
    title: 'Carmela en Salsa',
    subtitle: 'Salsa Vinils',
    href: '#',
  },
]

export default function Calendar() {
  return (
    <section
      id="calendar"
      className="relative pt-24 pb-44 md:pt-20 md:pb-44 overflow-hidden z-[1]"
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
      {/* Section Header */}
      <div className="px-6 mb-20 md:px-12 md:mb-6  z-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic">
              Calendar
            </h2>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="flex flex-col gap-9 w-full justify-center items-center px-6">
        {events.map((event, index) => (
          <motion.a
            key={event.id}
            href={event.href}
            className="group relative flex flex-col justify-center items-center text-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ y: -2 }}
          >
            <p className="absolute text-xs font-myriad font-light top-0 -left-2">
              {event.id}
            </p>

            <div className="bg-cream px-1 text-xs flex gap-2">
              <span>{event.date}</span>
              
            </div>

            <h3 className="font-funtastic text-3xl">
              {event.title}
            </h3>

            <p className="text-xs">{event.subtitle}</p>

            <motion.div
              className="absolute -right-12  w-9 h-9 border border-black rounded-full flex items-center justify-center opacity-0 hover:bg-[#70fe01] group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.08 }}
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </motion.a>
        ))}
      </div>
     
    </section>
  )
}