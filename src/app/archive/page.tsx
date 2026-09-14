'use client'

import { useMemo, Suspense } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getArchiveEvents, formatShortDate } from '@/lib/calendarData'
import EventModal from '@/app/calendar/EventModal'
import { useEventModal } from '@/hooks/useEventModal'

function ArchiveContent() {
  const { selectedEvent, openEvent, closeEvent } = useEventModal('archive')
  const archive = useMemo(() => getArchiveEvents(), [])

  return (
    <main className="relative flex flex-col overflow-x-hidden min-h-screen">
      <div className="relative z-[2] flex-1  flex flex-col px-4 md:px-10 py-24 md:py-28 pb-4">
        <header className="flex-shrink-0 mb-10">
          <h1 className="text-4xl md:text-5xl text-cream font-funtastic leading-none uppercase">
            Archive
          </h1>
        </header>

        <div className="gap-4 flex flex-wrap items-center pb-24 md:pb-0">
          {archive.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => openEvent(item)}
              className="relative h-56 w-[43.5vw] md:h-72 md:w-52 overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.08 }}
            >
              <div className="h-1/2 w-full bg-gradient-to-t from-[#010300]/70 to-transparent z-[50] absolute bottom-0 left-0" />
              {item.mediaType === 'video' && item.video ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              ) : item.flyer ? (
                <motion.div
                  className="absolute inset-0"
                  variants={{ hover: { scale: 1.05 } }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Image
                    src={item.flyer}
                    alt={item.title}
                    fill
                    sizes="(max-width: 368px) 12vw, 12vw"
                    className="object-cover rounded-lg"
                  />
                </motion.div>
              ) : null}

              <div className="absolute bottom-0 left-0 p-4 text-left z-[60]">
                <p className="text-[9px] tracking-[0.15em] uppercase text-white/60 font-inter mb-1">
                  {formatShortDate(item.date)}
                </p>
                <p className="text-sm md:text-base text-cream leading-tight">
                  {item.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <EventModal event={selectedEvent} onClose={closeEvent} isArchive />
    </main>
  )
}

export default function ArchivePage() {
  return (
    <Suspense>
      <ArchiveContent />
    </Suspense>
  )
}
