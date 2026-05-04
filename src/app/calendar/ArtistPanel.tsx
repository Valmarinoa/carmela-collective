'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Instagram, Music2 } from 'lucide-react'
import { Artist } from '@/lib/calendarData'

interface ArtistPanelProps {
  artist: Artist | null
  onClose: () => void
}

export default function ArtistPanel({ artist, onClose }: ArtistPanelProps) {
  return (
    <AnimatePresence>
      {artist && (
        <>
          {/* Scrim — clicking returns to modal */}
          <motion.div
            className="fixed inset-0 z-[70]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`Artist: ${artist.name}`}
            className="fixed top-0 right-0 h-screen w-full md:w-[360px] bg-[#0c0b09] border-l border-white/[0.08] z-[80] flex flex-col overflow-y-auto no-scrollbar"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] flex-shrink-0">
              <span className="text-[10px] tracking-[0.25em] uppercase text-cream/25 font-inter">
                Artist
              </span>
              <button
                onClick={onClose}
                className="text-cream/30 hover:text-cream transition-colors duration-150"
                aria-label="Close artist panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* Portrait placeholder */}
            <div className="w-full aspect-[3/4] bg-[#161210] relative overflow-hidden flex-shrink-0">
              {artist.imageUrl ? (
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="text-[6rem] leading-none text-cream/[0.05] select-none">
                    {artist.name.split(' ').map(w => w[0]).join('')}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/60 to-transparent" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 gap-4">
              <div>
                <h2 className="text-xl text-cream leading-tight mb-1">
                  {artist.name}
                </h2>
                <p className="text-[11px] tracking-[0.18em] uppercase text-cream/35 font-inter">
                  {artist.origin}
                </p>
              </div>

              <p className="text-sm text-cream/60 font-inter leading-relaxed">
                {artist.bio}
              </p>

              {(artist.instagram || artist.soundcloudUrl) && (
                <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-white/[0.08]">
                  {artist.instagram && (
                    <a
                      href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[12px] text-cream/40 hover:text-cream transition-colors duration-150 group"
                    >
                      <Instagram size={13} />
                      <span className="font-inter group-hover:underline underline-offset-4">
                        {artist.instagram}
                      </span>
                    </a>
                  )}
                  {artist.soundcloudUrl && (
                    <a
                      href={artist.soundcloudUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[12px] text-cream/40 hover:text-cream transition-colors duration-150 group"
                    >
                      <Music2 size={13} />
                      <span className="font-inter group-hover:underline underline-offset-4">
                        SoundCloud
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
