'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Instagram, Music2 } from 'lucide-react'
import Image from 'next/image'
import { Artist } from '@/lib/calendarData'

interface ArtistPanelProps {
  artist: Artist | null
  onClose: () => void
}

export default function ArtistPanel({ artist, onClose }: ArtistPanelProps) {
  // Portal requires the DOM to be available — skip on SSR
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {artist && (
        <>
          {/* Scrim */}
          <motion.div
            className="fixed inset-0 z-[9000]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Panel — z-[9999] as a direct body child beats any stacking context */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`Artist: ${artist.name}`}
            className="fixed top-0 right-0 h-screen w-full md:w-[360px] mt-[60px] md:mt-0 bg-[#0c0b09] border-l border-white/[0.08] z-[9999] flex flex-col"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
          >
            {/* Header — flex-shrink-0, no fixed inside transformed element */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-4  border-b border-white/[0.08] bg-[#0c0b09]">
              <span className="text-xs tracking-[0.25em] uppercase text-cream/55 font-inter">
                Artist
              </span>
              <button
                onClick={onClose}
                className="text-cream/50 hover:text-cream transition-colors duration-150"
                aria-label="Close artist panel"
              >
                <X size={28} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar gap-4">
              <div className="w-full aspect-[3/4] bg-[#161210] relative overflow-hidden flex-shrink-0 -mt-10">
                {artist.imageUrl ? (
                  <Image
                    src={artist.imageUrl}
                    alt={artist.name}
                    fill
                    className="object-cover"
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

              <div className="px-6 pb-6">
                <h2 className="text-xl text-cream leading-tight mb-1">
                  {artist.name}
                </h2>
                <p className="text-xs tracking-[0.18em] uppercase text-cream/35 font-inter">
                  {artist.origin}
                </p>
                <p className="text-sm text-cream/60 font-inter leading-relaxed pt-6">
                  {artist.bio}
                </p>
              </div>
            </div>

            {/* Footer — flex-shrink-0, no fixed inside transformed element */}
            {(artist.instagram || artist.soundcloudUrl) && (
              <div className="flex-shrink-0 flex flex-col gap-2 py-4 px-6 border-t border-white/[0.08] bg-[#0c0b09]">
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
