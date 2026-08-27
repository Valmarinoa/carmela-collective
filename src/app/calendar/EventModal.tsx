'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ExternalLink } from 'lucide-react'
import { Event, Artist } from '@/lib/calendarData'
import ArtistPanel from './ArtistPanel'
import Masonry from './Masonry'
import { track } from '@vercel/analytics';

interface EventModalProps {
  event: Event | null
  onClose: () => void
  isArchive?: boolean
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

export default function EventModal({ event, onClose, isArchive = false }: EventModalProps) {
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [event])

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
            className="relative w-full max-w-4xl md:mx-20 max-h-[91dvh] md:max-h-[96dvh] bg-[#0f0d0b] overflow-hidden flex flex-col md:rounded-sm md:pb-10"
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
             <button
                    onClick={onClose}
                    className="absolute right-5 top-3 z-[70] flex-shrink-0 mt-1 text-white transition-colors duration-150"
                    aria-label="Close event"
                  >
                    <X size={28} />
                  </button>

            {/* Hero area */}
            <motion.div
              className="w-full h-56 bg-[#181410] relative overflow-hidden flex-shrink-0 "
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.5 }}
            >
              {event.flyer ? (
                <Image
                  src={event.flyer}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover blur-lg z-[60]"
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
            <motion.div
              className="absolute right-[5%] top-[48px] z-[70] md:right-20 md:top-20 h-52 md:h-64 aspect-[2/3] overflow-hidden flex-shrink-0"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.5 }}
            >
              {event.flyer ? (
                <Image
                  src={event.flyer}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-contain"
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
            <div className="overflow-y-auto flex-1 no-scrollbar relative">
              <motion.div
                className="pt-6 px-3 md:p-8 flex flex-col gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Title row */}
                <motion.div
                  variants={lineVariants}
                  className="flex items-start justify-between gap-4"
                >
                  <h2 className="text-3xl md:text-3xl text-cream leading-tight">
                    {event.title}
                  </h2>
                 
                </motion.div>

                {/* Date + Venue */}
                <motion.div variants={lineVariants} className="flex flex-col gap-0.5">
                  <p className="text-sm text-cream/45 ">{event.date}</p>
                  {event.venueUrl ? (
                    <a
                      href={Array.isArray(event.venueUrl) ? event.venueUrl[0] : event.venueUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cream/45 hover:text-cream transition-colors duration-150 underline decoration-transparent hover:decoration-current w-fit"
                    >
                      {event.venue}
                    </a>
                  ) : (
                    <p className="text-sm text-cream/45 ">{event.venue}</p>
                  )}
                  {event.venueAddress && (
                    <p className="text-xs text-cream/30">{event.venueAddress}</p>
                  )}
                </motion.div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <motion.div variants={lineVariants} className="flex flex-wrap gap-1.5">
                    {event.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-white/[0.12] text-cream/40 "
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Description */}
                <motion.p
                  variants={lineVariants}
                  className="text-sm text-cream/60  leading-relaxed"
                >
                  {event.description}
                </motion.p>

                {/* Lineup */}
                {event.lineup.length > 0 && (
                  <motion.div variants={lineVariants} className="flex flex-col">
                    <h3 className="text-[10px] tracking-[0.25em] uppercase text-cream/25 font-inter py-4">
                      Lineup
                    </h3>
                    <div className="flex flex-col gap-0">
                      {event.lineup.map((slot, i) => {
                        const isClickable = !isArchive && !slot.isB2B && slot.artists.length === 1

                        if (slot.isB2B) {
                          return (
                            <motion.div
                              key={slot.id}
                              className="flex flex-col pb-3"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.32 + i * 0.07, duration: 0.32 }}
                            >
                              <p className="text-sm text-cream">
                                {slot.artists.map(a => a.name).join(' B2B ')}
                              </p>
                              {slot.note && (
                                <p className="text-[11px] text-cream/35">{slot.note}</p>
                              )}
                            </motion.div>
                          )
                        }

                        const artist = slot.artists[0]
                        return isClickable ? (
                          <motion.button
                            key={slot.id}
                            onClick={() => setSelectedArtist(artist)}
                            className="flex items-center pb-3 transition-all duration-200 text-left group"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.32 + i * 0.07, duration: 0.32 }}
                            whileHover={{ x: 2 }}
                          >
                            <div className="">
                              <p className="text-sm text-cream group-hover:underline underline-offset-4 truncate">
                                {artist.name}
                              </p>
                              {slot.note ? (
                                <p className="text-[11px] text-cream/35 truncate">{slot.note}</p>
                              ) : (
                                <p className="text-[11px] text-cream/35 truncate">{artist.origin}</p>
                              )}
                            </div>
                          </motion.button>
                        ) : (
                          <motion.div
                            key={slot.id}
                            className="flex flex-col pb-3"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.32 + i * 0.07, duration: 0.32 }}
                          >
                            <p className="text-sm text-cream">{artist.name}</p>
                            {slot.note ? (
                              <p className="text-[11px] text-cream/35">{slot.note}</p>
                            ) : artist.origin ? (
                              <p className="text-[11px] text-cream/35">{artist.origin}</p>
                            ) : null}
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* CTA */}
                

                {/* Footage gallery — archive only */}
                {isArchive && event.footage && event.footage.length > 0 && (
                  <motion.div variants={lineVariants} className="flex flex-col pt-2">
                    <h3 className="text-[10px] tracking-[0.25em] uppercase text-cream/25 font-inter py-4">
                      Footage
                    </h3>
                    <Masonry
                      items={event.footage}
                      ease="power3.out"
                      duration={0.6}
                      stagger={0.05}
                      animateFrom="bottom"
                      scaleOnHover
                      hoverScale={0.95}
                      blurToFocus
                      colorShiftOnHover={false}
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>
            {(() => {
                  const isPast = new Date(`${event.date}T00:00:00`) < new Date()
                  if (event.type === 'radio' && event.listenUrl) {
                    return (
                      <motion.div variants={lineVariants} className="py-6 pl-3 md:pt-10 md:pl-8 fixed bottom-0 left-10 bg-gradient-to-b from-transparent to-[#0f0d0b]">
                        <a
                          href={event.listenUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-[#0f0d0b] text-[11px] tracking-[0.2em] uppercase hover:bg-cream-dark transition-colors duration-150"
                        >
                          Listen
                          <ExternalLink size={12} />
                        </a>
                      </motion.div>
                    )
                  }
                  if (isPast) return null
                  if (event.isFree) {
                    return (
                      <motion.div variants={lineVariants} className="pt-1 py-6 pl-3 md:pt-10 md:pl-8 fixed bottom-0 left-10 bg-gradient-to-b from-transparent to-[#0f0d0b]">
                        <span className="inline-flex items-center px-6 py-3 border border-cream/30 text-cream/70 text-[11px] tracking-[0.2em] uppercase rounded-full">
                          Free Entrance
                        </span>
                      </motion.div>
                    )
                  }
                  if (event.ticketUrl) {
                    return (
                      <motion.div variants={lineVariants} className="pt-1 py-6 pl-3 md:pt-10 md:pl-8 sticky bottom-0 left-0 bg-gradient-to-b from-transparent to-[#0f0d0b] ">
                         <a
          href={event.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('ticket_click', { event: event.title, partner: event.venue ?? 'unknown' })}
          className="inline-flex font-inter items-center border border-cream hover:border-[#70fe01] gap-2 px-6 py-3 bg-cream text-[#0f0d0b] text-[11px] tracking-[0.2em] uppercase hover:bg-[#70fe01] transition-colors duration-150 rounded-full"
        >
          Buy Tickets
          <ExternalLink size={12} />
        </a>
                      </motion.div>
                    )
                  }
                  return null
                })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
