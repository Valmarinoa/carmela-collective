'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { archive } from '@/data/data'
import type { Archive } from '@/types/index'
import type { Event } from '@/lib/calendarData'
import EventModal from '@/app/calendar/EventModal'
import { useRouter } from 'next/navigation'

const GRID_SIZE = 6
const cells: (Archive | null)[] = Array.from(
  { length: GRID_SIZE },
  (_, i) => archive[i] ?? null
)

/** Converts "DD.MM.YY" → "YYYY-MM-DD" for use with Date APIs */
function toISODate(dateStr: string): string {
  const [dd, mm, yy] = dateStr.split('.')
  return `20${yy}-${mm}-${dd}`
}

export default function ArchivePage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const router = useRouter()

  const toArchiveEvent = useCallback((item: Archive): Event => {
    return {
      id: `archive-${item.id}`,
      title: item.title,
      date: item.date ? toISODate(item.date) : '2026-01-01',
      venue: item.venue ?? 'Carmela Collective Archive',
      venueAddress: item.venueAddress,
      description: item.description || 'Archive event highlight.',
      flyer: item.image || item.src,
      ticketUrl: item.href,
      type: item.type,
      listenUrl: item.listenUrl,
      tags: item.category ? [item.category] : [],
      lineup: item.lineup ?? [],
      footage: item.footage,
    }
  }, [])

  const handleItemClick = useCallback((item: Archive) => {
    setSelectedEvent(toArchiveEvent(item))
  }, [toArchiveEvent])

  // On mount: if ?event=<id> is present, open that modal and clean the URL
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('event')
    if (!id) return
    const item = archive.find((a) => a.id === id)
    if (item) setSelectedEvent(toArchiveEvent(item))
    router.replace('/archive', { scroll: false })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleModalClose = useCallback(() => {
    setSelectedEvent(null)
  }, [])

  return (
    <main className="relative flex flex-col overflow-x-hidden min-h-screen">
      {/* Page content */}
      <div className="relative z-[2] flex-1  flex flex-col px-4 md:px-10 py-24 md:py-28 pb-4">
        {/* ── Header ──────────────────────────────────────────────── */}
        <header className="flex-shrink-0 mb-10">
          <h1 className="text-4xl md:text-5xl text-cream font-funtastic leading-none uppercase">
            Archive
          </h1>
        </header>

        {/* ── Grid ─────────────────────────────────────────────────── */}
        
          <div className="gap-4 flex flex-wrap items-center">
            {cells.map((item, index) =>
              item ? (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className="relative h-56 w-[43.5vw] md:h-72 md:w-52 overflow-hidden rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.08 }}
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
                      {item.date ?? item.category}
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
       
      </div>

      {/* ── Shared event modal ───────────────────────────────────────── */}
      <EventModal event={selectedEvent} onClose={handleModalClose} isArchive />
    </main>
  )
}
