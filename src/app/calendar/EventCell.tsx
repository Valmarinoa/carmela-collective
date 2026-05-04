'use client'

import { motion } from 'framer-motion'
import { Event } from '@/lib/calendarData'

interface EventCellProps {
  event: Event | null
  /** Column index 0–2 */
  col: number
  /** Row index 0–1 */
  row: number
  onClick: (event: Event) => void
  onHover: (event: Event) => void
  onHoverEnd: () => void
}

function formatCellDate(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`)
  const day = String(d.getDate()).padStart(2, '0')
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
}

export default function EventCell({ event, col, row, onClick, onHover, onHoverEnd }: EventCellProps) {
  // Border logic: inner lines only (outer border lives on the container)
  const borderR = col < 2 ? 'border-r' : ''
  const borderB = row < 1 ? 'border-b' : ''

  // ── Empty cell ──────────────────────────────────────────────────────────────
  if (!event) {
    return (
      <div
        className={`${borderR} ${borderB} border-white bg-transparent`}
        aria-hidden="true"
      />
    )
  }

  // ── Event cell ──────────────────────────────────────────────────────────────
  const lineupNames = event.lineup.map(a => a.name).join(', ')

  return (
    <motion.button
      onClick={() => onClick(event)}
      onMouseEnter={() => onHover(event)}
      onMouseLeave={() => onHoverEnd()}
      className={[
        'group relative flex flex-col p-5 md:p-7 hover:bg-black/90 transition-colors  text-white text-left md:h-72',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
        borderR,
        borderB,
        'border-white',
      ].join(' ')}
      transition={{ duration: 0.15 }}
    >
      {/* Date */}
      <span className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-white/50 font-inter mb-3">
        {formatCellDate(event.date)}
      </span>

      {/* Event title */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight text-white mb-2 group-hover:text-cream transition-colors duration-150">
        {event.title}
      </h2>

      {/* Venue */}
      <p className="text-[11px] md:text-xs text-white/40 font-inter mb-3 tracking-wide">
        {event.venue}
      </p>

      {/* Lineup */}
      <p className="text-[11px] md:text-sm text-white/60 font-inter leading-relaxed flex-1">
        {lineupNames}
      </p>

      {/* Ticket button — pinned to bottom-left */}
      {event.ticketUrl && (
        <div className="mt-5 pt-4 border-t border-white/15">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-inter text-white/70 group-hover:text-white transition-colors duration-150">
            Buy Tickets
            <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
          </span>
        </div>
      )}
    </motion.button>
  )
}
