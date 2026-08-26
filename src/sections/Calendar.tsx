'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { getUpcomingEvents } from "@/lib/calendarData";
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
  const sortedCalendar = getUpcomingEvents()

  return (
    <section
      id="calendar"
      className="relative pt-24 pb-64 md:pt-28 md:pb-56 overflow-hidden z-[1]"
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
      <Link href="/calendar" className="px-6 mb-20 md:px-12 md:mb-20 z-20 flex">
        <div className="flex md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold font-funtastic uppercase">
              Calendar
            </h2>
          </div>
        
        </div>
      </Link>
      {sortedCalendar.length === 0 ? (
        <p className="px-6 md:px-12 text-center font-inter text-sm tracking-[0.15em] uppercase text-black">
          Upcoming events to be announced soon!
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-6 w-full justify-between items-center px-4 md:px-6 divide divide-y-[1px] divide-black ">
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
                  className="group cursor-pointer relative flex justify-between items-center gap-4 text-left pt-6 w-full md:w-1/2"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true}}
                >
                <div className='flex gap-4'>
                <div  className='flex gap-1'>
                <p className="text-xs font-inter font-light top-4 -left-2">
                  {index + 1}
                </p>
                  <div className='h-28 w-24 relative'>
                  {event.flyer ? (
                    <Image
                      src={event.flyer}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 128px, 160px"
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 flex items-end p-6">
                        <span className="text-[7rem] md:text-[9rem] leading-none text-cream/[0.04] select-none">
                          {event.title.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f0d0b]/70" />
                    </>
                  )}
                  </div>
                </div>
                <div className=''>
                      <div className="text-black px-1 text-xs flex gap-2">
                        <span>{formatDate(event.date)}</span>
                      </div>

                      <h3 className="text-3xl">
                        {event.title}
                      </h3>

                      {event.venueUrl ? (
                        <a
                        href={Array.isArray(event.venueUrl) ? event.venueUrl[0] : event.venueUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm underline decoration-transparent hover:decoration-current transition"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {event.venue}
                        </a>
                      ) : (
                        <p className="text-xs">{event.venue}</p>
                      )}

                      {event.ticketUrl ? (
                      <Link href="" className="text-black text-xs flex gap-2 underline pt-[18px]">
                        Tickets
                      </Link>
                      )
                      :
                      (<p className="text-black text-xs flex gap-2 pt-[18px]">Free Entrance</p>)

                      }

                </div>
                </div>
                <div className="hidden md:flex w-9 h-9 border border-black rounded-full items-center justify-center hover:bg-[#70fe01] transition-opacity duration-300">
                <ArrowUpRight size={16} />
                </div >
                  </motion.div>
                  )
                })}
          </div>
          <div className='w-full mt-20 inline-flex justify-center items-center '>
            <Link href='/calendar'
                    className=" mx-auto font-inter border border-black gap-2 px-6 py-5 bg-transparent backdrop-blur-xl text-black hover:text-black hover:border-black text-[11px] tracking-[0.2em] uppercase hover:bg-cream transition-colors duration-150 rounded-full">
                    See full Calendar
            </Link>
          </div>
        </>
      )}
      
     
    </section>
  )
}