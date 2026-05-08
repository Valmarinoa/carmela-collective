'use client'

import { useMemo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { archive } from '@/data/data'
import type { Archive } from '@/types/index'
import type { Event } from '@/lib/calendarData'
import EventModal from '@/app/calendar/EventModal'

const GRID_SIZE = 6
const cells: (Archive | null)[] = Array.from(
  { length: GRID_SIZE },
  (_, i) => archive[i] ?? null
)

const monthMap: Record<string, number> = {
  JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
  JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12,
}

export default function ArchivePage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const toArchiveEvent = useCallback((item: Archive): Event => {
    const [rawMonth = 'JAN', rawYear = '2026'] = item.category.split(' ')
    const month = monthMap[rawMonth.toUpperCase()] ?? 1
    const year = Number(rawYear) || 2026
    const monthPadded = String(month).padStart(2, '0')

    return {
      id: `archive-${item.id}`,
      title: item.title,
      date: `${year}-${monthPadded}-01`,
      venue: 'Carmela Collective Archive',
      description: item.description || 'Archive event highlight.',
      flyer: item.image || item.src,
      ticketUrl: item.href,
      type: item.type,
      listenUrl: item.listenUrl,
      tags: [item.category],
      lineup: [],
      footage: item.footage,
    }
  }, [])

  const handleItemClick = useCallback((item: Archive) => {
    setSelectedEvent(toArchiveEvent(item))
  }, [toArchiveEvent])

  const handleModalClose = useCallback(() => {
    setSelectedEvent(null)
  }, [])

  // Generate a stable random stagger order for the visible items on initial mount.
  // Keeps the "random" order consistent across re-renders (e.g. when the modal opens).
  const delayRankById = useMemo(() => {
    const presentItems = cells.filter((c): c is Archive => Boolean(c))

    // Fisher-Yates shuffle on indexes.
    const order = presentItems.map((_, idx) => idx)
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[order[i], order[j]] = [order[j], order[i]]
    }

    const rankById = new Map<string, number>()
    order.forEach((originalIdx, rank) => {
      rankById.set(presentItems[originalIdx].id, rank)
    })
    return rankById
  }, [])

  return (
    <main className="relative h-dvh flex flex-col overflow-y-auto overflow-x-hidden">
      {/* Page content */}
      <div className="relative z-[2] flex-1 min-h-0 flex flex-col px-4 md:px-10 pt-24 md:pt-28 pb-4">
        {/* ── Header ──────────────────────────────────────────────── */}
        <header className="flex-shrink-0 mb-10">
          <h1 className="text-4xl md:text-5xl text-cream font-funtastic leading-none uppercase">
            Archive
          </h1>
        </header>

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <motion.div
          className="flex-1 min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="gap-4 flex flex-wrap items-center">
            {cells.map((item, index) =>
              item ? (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className="relative h-56 w-[43.5vw] md:h-72 md:w-52 overflow-hidden rounded-lg"
                  whileHover="hover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: (delayRankById.get(item.id) ?? index) * 0.08,
                  }}
                >
                  <div className='h-1/2 w-full bg-gradient-to-t from-[#010300]/70 to-transparent z-[50] absolute bottom-0 left-0'/>
                  {/* Background media */}
                  {item.mediaType === 'video' && item.video ? (
                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                  ) : (item.image || item.src) ? (
                    <motion.div
                      className="absolute inset-0"
                      variants={{ hover: { scale: 1.05 } }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <Image
                        src={item.image || item.src || ''}
                        alt={item.title}
                        fill
                        sizes="(max-width: 368px) 12vw, 12vw"
                        className="object-cover rounded-lg"
                      />
                    </motion.div>
                  ) : null}

                  {/* Dark overlay */}
                  {/* <motion.div
                    className="absolute inset-0 bg-black/50"
                    variants={{ hover: { backgroundColor: 'rgba(0,0,0,0.25)' } }}
                    transition={{ duration: 0.3 }}
                  /> */}

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 p-4 text-left z-[60]">
                    <p className="text-[9px] tracking-[0.15em] uppercase text-white/60 font-inter mb-1">
                      {item.category}
                    </p>
                    <p className="text-sm md:text-base text-cream leading-tight">
                      {item.title}
                    </p>
                  </div>
                </motion.button>
              ) : (
                <div
                  key={`empty-${index}`}
                  className="border-r border-b border-white/20"
                />
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Shared event modal ───────────────────────────────────────── */}
      <EventModal event={selectedEvent} onClose={handleModalClose} isArchive />
    </main>
  )
}
