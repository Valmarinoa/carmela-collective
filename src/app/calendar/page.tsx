'use client'

import { useState, useCallback, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getUpcomingEvents, Event } from '@/lib/calendarData'
import { getMonthsWithEvents } from '@/lib/calendarUtils'
import MonthFilter from './MonthFilter'
import CalendarGrid from './CalendarGrid'
import EventModal from './EventModal'

// ─── SVG grain data URI ───────────────────────────────────────────────────────
const GRAIN_URL = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const mobileListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

const mobileItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
  },
}

function CalendarContent() {
  const upcomingEvents = useMemo(() => getUpcomingEvents(), [])

  const months = useMemo(() => getMonthsWithEvents(upcomingEvents), [upcomingEvents])
  const searchParams = useSearchParams()

  const requestedYear = Number(searchParams.get('year'))
  const requestedMonth = Number(searchParams.get('month')) - 1 // incoming month is 1-indexed
  const requestedEventId = searchParams.get('event')
  const hasRequestedMonth = months.some(
    (item) => item.year === requestedYear && item.month === requestedMonth
  )

  // Default to the current real-world month/year, not months[0] — since the
  // list now starts 2 months in the past, months[0] would otherwise land
  // someone on an old month when they open /calendar with no query params.
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() // 0-indexed

  const [activeYear, setActiveYear] = useState<number>(
    hasRequestedMonth ? requestedYear : currentYear
  )
  const [activeMonth, setActiveMonth] = useState<number>(
    hasRequestedMonth ? requestedMonth : currentMonth
  )
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    if (!hasRequestedMonth) return
    setActiveYear(requestedYear)
    setActiveMonth(requestedMonth)
  }, [hasRequestedMonth, requestedYear, requestedMonth])

  const handleMonthSelect = useCallback((year: number, month: number) => {
    setActiveYear(year)
    setActiveMonth(month)
  }, [])

  const handleEventClick = useCallback((event: Event) => {
    setSelectedEvent(event)
  }, [])

  const handleModalClose = useCallback(() => {
    setSelectedEvent(null)
  }, [])

  // Mobile: filter events for the active month
  const mobileEvents = useMemo(
    () =>
      upcomingEvents.filter(e => {
        const [y, m] = e.date.split('-').map(Number)
        return y === activeYear && m - 1 === activeMonth
      }).sort((a, b) => a.date.localeCompare(b.date)),
    [upcomingEvents, activeYear, activeMonth]
  )

  return (
    <main className="relative min-h-dvh bg-[#0a0a08]/88 flex flex-col">
      {/* Grain texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035]"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: '160px 160px' }}
      />

      {/* Page content */}
      <div className="relative z-[2] flex-1 flex flex-col px-4 md:px-10 lg:px-16 pt-24 md:pt-28 pb-28">
        {/* ── Header ──────────────────────────────────────────────── */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:md-16 flex-shrink-0">
          <div>
         
            <h1 className="text-4xl md:text-5xl text-cream font-funtastic leading-none">
              Calendar
            </h1>
          </div>

          <MonthFilter
            months={months}
            activeMonth={activeMonth}
            activeYear={activeYear}
            onSelect={handleMonthSelect}
          />
        </header>

        {/* ── Desktop grid (≥768px) ────────────────────────────────── */}
        <div className="hidden md:block flex-1 h-0">
          <div className="h-full">
            <CalendarGrid
              year={activeYear}
              month={activeMonth}
              events={upcomingEvents}
              onEventClick={handleEventClick}
              selectedEventId={requestedEventId}
            />
          </div>
        </div>

        {/* ── Mobile list (<768px) ─────────────────────────────────── */}
        <div className="md:hidden flex-1">
          <motion.div
            key={`${activeYear}-${activeMonth}`}
            variants={mobileListVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2"
          >
            {mobileEvents.length === 0 && (
              <p className="text-sm text-cream/30 font-inter py-8 text-center tracking-[0.2em] uppercase">
                We are planning our next events!
              </p>
            )}
            {mobileEvents.map(event => {
              const d = new Date(`${event.date}T00:00:00`)
              const day = d.toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })
                return (
                  <motion.article
                    key={event.id}
                    className="flex gap-4 w-full p-4 bg-[#1a1714]/50 transition-colors duration-150 text-left group relative overflow-hidden"
                    variants={mobileItemVariants}
                  >
                    <div className='w-full h-full absolute inset-0 z-0'>
                      {event.flyer && (
                        <Image
                          src={event.flyer}
                          alt={event.title}
                          fill
                          sizes="100vw"
                          className="object-cover blur-lg"
                        />
                      )}
                      <div className='w-full h-full absolute inset-0 z-0 bg-[#231e18]/30' />
                    </div>
                    <div className='w-full flex flex-col z-[20]'>
                    <div className='flex justify-between w-full'>
                    <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.1em] uppercase text-white font-inter leading-tight">
                        {day}
                      </p>
                      <p className="text-xl py-1 text-cream leading-tight group-hover:text-[#e8955a] transition-colors duration-150">
                        {event.title}
                      </p>
                      <p className="text-[11px] text-white mt-0.5 truncate">
                        {event.venue}
                      </p>
                      <p className="text-[11px] text-white font-inter mt-1 truncate">
                        {event.lineup.map(slot => slot.isB2B ? slot.artists.map(a => a.name).join(' B2B ') : slot.artists[0]?.name ?? '').join(', ')}
                      </p>
                    </div>
                        {event.flyer && (
                         <div className='w-20 h-28'>
                            <Image
                              src={event.flyer}
                              alt={event.title}
                              width={80}
                              height={112}
                              className="w-full h-full object-contain"
                            />
                            </div>
                        )}
                    </div>
                    {/* <span className="text-cream/15 group-hover:text-cream/40 transition-colors text-sm mt-0.5">
                      →
                    </span> */}
                     <div className="mt-5 pt-4 border-t border-white/15 flex items-center gap-4">
                      {event.ticketUrl && (
                        <a
                          href={event.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-inter text-white/70 hover:text-white transition-colors duration-150"
                        >
                          Buy Tickets
                          <span className="transition-transform duration-150 hover:translate-x-1">→</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleEventClick(event)}
                        className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-inter text-white/70 hover:text-white transition-colors duration-150"
                      >
                        Info
                        <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
                      </button>
                    </div>
                    </div>
                  </motion.article>
                )
              })}
          </motion.div>
        </div>
      </div>

      {/* ── Event modal ─────────────────────────────────────────────── */}
      <EventModal event={selectedEvent} onClose={handleModalClose} />
    </main>
  )
}

export default function CalendarPage() {
  return (
    <Suspense>
      <CalendarContent />
    </Suspense>
  )
}