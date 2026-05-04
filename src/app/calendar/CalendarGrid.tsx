'use client'

import { useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Event } from '@/lib/calendarData'
import { getGridCells } from '@/lib/calendarUtils'
import EventCell from './EventCell'

// ─── Floating flyer ───────────────────────────────────────────────────────────

function FlyerCard({ event }: { event: Event | null }) {
  return (
    <div
      className="absolute z-10 -bottom-20 -right-16 pointer-events-none aspect-2/3  max-h-[600px] w-fit"
      style={{ width: 'calc(30.33% - 2rem)', aspectRatio: '2 / 3' }}
    >
      <AnimatePresence mode="wait">
        {event && (
          <motion.div
            key={event.id}
            className="absolute inset-0 "
            // style={{transformOrigin: 'bottom right' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            {event.flyer ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={event.flyer}
                alt={`${event.title} flyer`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#c4713a] via-[#7a3518] to-[#1a0a04] flex flex-col justify-between p-5">
                <span className="text-[9px] tracking-[0.25em] uppercase text-white/40 font-inter">
                  {event.venue}
                </span>
                <div>
                  <p className="font-leakage text-white text-xl leading-tight mb-1">
                    {event.title}
                  </p>
                  <p className="text-[10px] text-white/50 font-inter">
                    {event.lineup.map(a => a.name).join(', ')}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Grid ────────────────────────────────────────────────────────────────────

interface CalendarGridProps {
  year: number
  month: number
  events: Event[]
  onEventClick: (event: Event) => void
}

export default function CalendarGrid({
  year,
  month,
  events,
  onEventClick,
}: CalendarGridProps) {
  const cells = useMemo(
    () => getGridCells(events, month, year),
    [events, month, year]
  )

  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null)

  const handleHover = useCallback((event: Event) => {
    setHoveredEvent(event)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setHoveredEvent(null)
  }, [])

  return (
    <div className="relative h-full w-full max-w-6xl mx-auto">
      {/* 2 × 3 grid — outer border on container, inner dividers on cells */}
      <div className="grid grid-cols-3 grid-rows-2 h-full w-full border border-white">
        {cells.map((cell, i) => {
          const col = i % 3
          const row = Math.floor(i / 3)
          return (
            <EventCell
              key={i}
              event={cell}
              col={col}
              row={row}
              onClick={onEventClick}
              onHover={handleHover}
              onHoverEnd={handleHoverEnd}
            />
          )
        })}
      </div>

      {/* Floating flyer — appears on hover, keyed so it cross-fades per event */}
      <FlyerCard event={hoveredEvent} />
    </div>
  )
}
