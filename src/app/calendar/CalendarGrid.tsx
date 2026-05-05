'use client'

import { useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import FlowerSilhoutte from '@/components/FlowerSilhouette'
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
        <motion.div
          key={event?.id ?? 'default-flyer'}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {event?.flyer ? (
            <Image
              src={event.flyer}
              alt={`${event.title} flyer`}
              fill
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FlowerSilhoutte fillColor="#F08C43" width={360} height={617} />
            </div>
          )}
        </motion.div>
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
