'use client'

import { motion } from 'framer-motion'
import { Event } from '@/lib/calendarData'
import { ExternalLink } from 'lucide-react'

interface EventCellProps {
  event: Event | null
  /** Column index 0–2 */
  col: number
  /** Row index 0–1 */
  row: number
  onClick: (event: Event) => void
  onHover: (event: Event) => void
  onHoverEnd: () => void
  isActive?: boolean
  dimmed?: boolean
}

function formatCellDate(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`)
  const day = String(d.getDate()).padStart(2, '0')
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
}

export default function EventCell({ event, col, row, onClick, onHover, onHoverEnd, isActive = false, dimmed = false }: EventCellProps) {
  // Border logic: inner lines only (outer border lives on the container)
  const borderR = col < 2 ? 'border-r' : ''
  const borderB = row < 1 ? 'border-b' : ''

  // ── Empty cell ──────────────────────────────────────────────────────────────
  if (!event) {
    return (
      <div
        className={`${borderR} ${borderB} border-cream bg-transparent md:h-72 ${dimmed ? 'opacity-0' : ''}`}
        aria-hidden="true"
      />
    )
  }

  // ── Event cell ──────────────────────────────────────────────────────────────
  const lineupNames = event.lineup.map(a => a.name).join(', ')

  return (
    <motion.article
      onMouseEnter={() => onHover(event)}
      onMouseLeave={() => onHoverEnd()}
      onClick={() => onClick(event)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      className={[
        'group relative flex flex-col p-5 md:p-7 transition-colors text-cream text-left md:h-72 cursor-pointer',
        isActive ? 'bg-black/90' : 'hover:bg-black/90',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream',
        borderR,
        borderB,
        'border-cream',
      ].join(' ')}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {/* Date */}
      <span className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-cream/50 font-inter mb-3">
        {formatCellDate(event.date)}
      </span>

      {/* Event title */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight text-cream mb-2 group-hover:text-cream transition-colors duration-150">
        {event.title}
      </h2>

      {/* Venue */}
      <p className="text-[11px] md:text-xs text-cream/40 font-inter mb-3 tracking-wide">
        {event.venue}
      </p>

      {/* Lineup */}
      <p className="text-[11px] md:text-sm text-cream/60 font-inter leading-relaxed flex-1">
        {lineupNames}
      </p>

      {/* CTAs */}
      <div className="mt-5 pt-4 flex items-center gap-4">
        {event.ticketUrl && (
          <a
          href={event.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex font-inter items-center border border-cream hover:border-[#70fe01] gap-2 px-6 py-3 bg-cream text-[#0f0d0b] text-[11px] tracking-[0.2em] uppercase hover:bg-[#70fe01] transition-colors duration-150"
        >
          Buy Tickets
          <ExternalLink size={12} />
        </a>
        )}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClick(event) }}
          className="inline-flex items-center gap-2 text-[11px] border px-5 py-3 hover:bg-[#70fe01] hover:border-transparent text-black backdrop-blur-lg border-cream tracking-[0.18em] uppercase font-inter text-cream/70 hover:text-black/90 transition-colors duration-150"
        >
          Info
      
        </button>
      </div>
    </motion.article>
  )
}
