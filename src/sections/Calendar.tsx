'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { CALENDAR } from "@/lib/calendarData";
import Link from 'next/link';

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  const day = String(d.getDate()).padStart(2, '0')
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
}

export default function Calendar() {
  const sortedCalendar = [...CALENDAR].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <section
      id="calendar"
      className="relative pt-24 pb-64 md:pt-20 md:pb-56 overflow-hidden z-[1]"
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
      <div className="px-6 mb-20 md:px-12 md:mb-6  z-20 flex">
        <div className="flex md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic uppercase">
              Calendar
            </h2>
          </div>
          <Link href="/calendar" className="w-9 h-9 border border-black rounded-full flex items-center justify-center hover:bg-[#70fe01] transition-opacity duration-300"> 
            <ArrowUpRight size={16} />
          </Link>
        </div>
        
      </div>

      {/* Calendar */}
      <div className="flex flex-col gap-9 w-full justify-center items-center px-6">
        {sortedCalendar.map((event, index) => (
          <motion.a
            key={event.id}
            href={event.ticketUrl || '/calendar'}
            className="group relative flex flex-col justify-center items-center text-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ y: -2 }}
          >
            <p className="absolute text-xs font-myriad font-light top-0 -left-2">
              {index + 1}
            </p>

            <div className="bg-cream px-1 text-xs flex gap-2">
              <span>{formatDate(event.date)}</span>
            </div>

            <h3 className="text-3xl">
              {event.title}
            </h3>

            <p className="text-xs">{event.venue}</p>

          
          </motion.a>
        ))}
      </div>
     
    </section>
  )
}