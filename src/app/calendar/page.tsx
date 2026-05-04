'use client'

import { useState, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CALENDAR, Event } from '@/lib/calendarData'
import { getMonthsWithEvents } from '@/lib/calendarUtils'
import MonthFilter from './MonthFilter'
import CalendarGrid from './CalendarGrid'
import EventModal from './EventModal'

// ─── SVG grain data URI ───────────────────────────────────────────────────────
const GRAIN_URL = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export default function CalendarPage() {
  const months = useMemo(() => getMonthsWithEvents(CALENDAR), [])

  const [activeYear, setActiveYear] = useState<number>(months[0]?.year ?? 2026)
  const [activeMonth, setActiveMonth] = useState<number>(months[0]?.month ?? 4)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

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

  const activeKey = `${activeYear}-${activeMonth}`

  // Mobile: filter events for the active month
  const mobileEvents = useMemo(
    () =>
      CALENDAR.filter(e => {
        const [y, m] = e.date.split('-').map(Number)
        return y === activeYear && m - 1 === activeMonth
      }).sort((a, b) => a.date.localeCompare(b.date)),
    [activeYear, activeMonth]
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
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 flex-shrink-0">
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full"
            >
              <CalendarGrid
                year={activeYear}
                month={activeMonth}
                events={CALENDAR}
                onEventClick={handleEventClick}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Mobile list (<768px) ─────────────────────────────────── */}
        <div className="md:hidden flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-2"
            >
              {mobileEvents.length === 0 && (
                <p className="text-sm text-cream/25 font-inter py-8 text-center">
                  No events this month.
                </p>
              )}
              {mobileEvents.map((event, i) => {
                const d = new Date(`${event.date}T00:00:00`)
                const day = d.toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })
                return (
                  <motion.button
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="flex items-start gap-4 p-4 border border-white/[0.09] bg-[#1a1714]/50 hover:bg-[#231e18]/60 hover:border-[#c4713a]/30 transition-all duration-200 text-left group"
                  >
                    <div className="flex-shrink-0 w-14">
                      <p className="text-[10px] tracking-[0.1em] uppercase text-cream/30 font-inter leading-tight">
                        {day}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base text-cream font-leakage leading-tight group-hover:text-[#e8955a] transition-colors duration-150">
                        {event.title}
                      </p>
                      <p className="text-[11px] text-cream/35 font-inter mt-0.5 truncate">
                        {event.venue}
                      </p>
                      <p className="text-[11px] text-cream/25 font-inter mt-1 truncate">
                        {event.lineup.map(a => a.name).join(', ')}
                      </p>
                    </div>
                    <span className="text-cream/15 group-hover:text-cream/40 transition-colors text-sm mt-0.5">
                      →
                    </span>
                  </motion.button>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Event modal ─────────────────────────────────────────────── */}
      <EventModal event={selectedEvent} onClose={handleModalClose} />
    </main>
  )
}
