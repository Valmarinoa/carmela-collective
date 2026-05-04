'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { Event, Artist } from '@/lib/calendarData'
import ArtistPanel from './ArtistPanel'

interface EventModalProps {
  event: Event | null
  onClose: () => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.18 },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

function formatDate(dateStr: string): string {
  // Append T00:00:00 to avoid timezone-shifted parsing
  const d = new Date(`${dateStr}T00:00:00`)
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)

  // ESC: close artist panel first, then modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (selectedArtist) {
        setSelectedArtist(null)
      } else {
        onClose()
      }
    },
    [selectedArtist, onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Reset artist panel when modal is dismissed
  useEffect(() => {
    if (!event) setSelectedArtist(null)
  }, [event])

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={event.title}
            className="relative w-full max-w-4xl md:mx-20 max-h-[96dvh] md:max-h-[96dvh] bg-[#0f0d0b] border border-white/[0.09] overflow-hidden flex flex-col md:rounded-sm"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Artist side-panel stacks inside the modal */}
            <ArtistPanel
              artist={selectedArtist}
              onClose={() => setSelectedArtist(null)}
            />

            {/* Hero area */}
            <motion.div
              className="w-full h-28 md:h-44 bg-[#181410] relative overflow-hidden flex-shrink-0"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.5 }}
            >
              {event.flyer ? (
                <img
                  src={event.flyer}
                  alt={event.title}
                  className="w-full h-full object-cover"
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
            </motion.div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 no-scrollbar">
              <motion.div
                className="p-6 md:p-8 flex flex-col gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Title row */}
                <motion.div
                  variants={lineVariants}
                  className="flex items-start justify-between gap-4"
                >
                  <h2 className="text-2xl md:text-3xl text-cream leading-tight">
                    {event.title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 mt-1 text-cream/30 hover:text-cream transition-colors duration-150"
                    aria-label="Close event"
                  >
                    <X size={18} />
                  </button>
                </motion.div>

                {/* Date + Venue */}
                <motion.div variants={lineVariants} className="flex flex-col gap-0.5">
                  <p className="text-sm text-cream/45 font-inter">{formatDate(event.date)}</p>
                  <p className="text-sm text-cream/45 font-inter">{event.venue}</p>
                </motion.div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <motion.div variants={lineVariants} className="flex flex-wrap gap-1.5">
                    {event.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-white/[0.12] text-cream/40 font-inter"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Description */}
                <motion.p
                  variants={lineVariants}
                  className="text-sm text-cream/60 font-inter leading-relaxed"
                >
                  {event.description}
                </motion.p>

                {/* Lineup */}
                <motion.div variants={lineVariants} className="flex flex-col gap-3">
                  <h3 className="text-[10px] tracking-[0.25em] uppercase text-cream/25 font-inter">
                    Lineup
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {event.lineup.map((artist, i) => (
                      <motion.button
                        key={artist.id}
                        onClick={() => setSelectedArtist(artist)}
                        className="flex items-center gap-3 p-3 border border-white/[0.09] bg-white/[0.025] hover:bg-white/[0.06] hover:border-white/[0.18] transition-all duration-200 text-left group"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.32 + i * 0.07, duration: 0.32 }}
                        whileHover={{ x: 2 }}
                      >
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-[#231e1a] flex items-center justify-center flex-shrink-0 border border-white/[0.08]">
                          <span className="text-[11px] text-cream/35 font-inter">
                            {artist.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-cream font-inter group-hover:underline underline-offset-4 truncate">
                            {artist.name}
                          </p>
                          <p className="text-[11px] text-cream/35 font-inter truncate">
                            {artist.origin}
                          </p>
                        </div>
                        <span className="text-cream/15 group-hover:text-cream/40 transition-colors text-xs">
                          →
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Ticket CTA */}
                {event.ticketUrl && (
                  <motion.div variants={lineVariants} className="pt-1">
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-[#0f0d0b] text-[11px] tracking-[0.2em] uppercase font-inter hover:bg-cream-dark transition-colors duration-150"
                    >
                      Get Tickets
                      <ExternalLink size={12} />
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
