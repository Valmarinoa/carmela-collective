'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { CALENDAR } from "@/lib/calendarData";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  const day = String(d.getDate()).padStart(2, '0')
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
}

export default function Calendar() {
  const router = useRouter()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const sortedCalendar = [...CALENDAR]
    .filter(e => new Date(`${e.date}T00:00:00`) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
      <Link href="/calendar" className="px-6 mb-20 md:px-12 md:mb-6  z-20 flex">
        <div className="flex md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic uppercase">
              Calendar
            </h2>
          </div>
          <div className="w-9 h-9 border border-black rounded-full flex items-center justify-center hover:bg-[#70fe01] transition-opacity duration-300"> 
            <ArrowUpRight size={16} />
          </div >
        </div>
      </Link>
      {/* Calendar */}
      <div className="flex flex-col gap-9 w-full justify-center items-center px-6">
        {sortedCalendar.map((event, index) => {
          const [year, month] = event.date.split('-')
          const monthLink = `/calendar?year=${year}&month=${month}&event=${event.id}`

          return (
            <motion.div
              key={event.id}
              role="link"
              tabIndex={0}
              onClick={() => router.push(monthLink)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  router.push(monthLink)
                }
              }}
              className="group cursor-pointer relative flex flex-col justify-center items-center text-center transition-opacity opacity-100"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ y: -2 }}
            >
            <p className="absolute text-xs font-inter font-light top-0 -left-2">
              {index + 1}
            </p>

            <div className="bg-cream px-1 text-xs flex gap-2">
              <span>{formatDate(event.date)}</span>
            </div>

            <h3 className="text-3xl">
              {event.title}
            </h3>

            {event.venueUrl ? (
              <a
                href={event.venueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline decoration-transparent hover:decoration-current transition"
                onClick={(e) => e.stopPropagation()}
              >
                {event.venue}
              </a>
            ) : (
              <p className="text-xs">{event.venue}</p>
            )}

            
            </motion.div>
          )
        })}
      </div>
     
    </section>
  )
}