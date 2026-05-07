'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { Archive } from '@/types/index'

interface ArchiveModalProps {
  item: Archive | null
  onClose: () => void
}

export default function ArchiveModal({ item, onClose }: ArchiveModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <AnimatePresence>
      {item && (
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
            aria-label={item.title}
            className="relative w-full max-w-sm md:mx-20 max-h-[91dvh] bg-[#0f0d0b] overflow-hidden flex flex-col md:rounded-sm"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-3 z-[20] text-white transition-colors duration-150"
              aria-label="Close"
            >
              <X size={28} />
            </button>

            {/* Media */}
            <div className="relative w-full aspect-[3/4] bg-[#181410] flex-shrink-0 overflow-hidden">
              {item.mediaType === 'video' && item.video ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (item.image || item.src) ? (
                <Image
                  src={item.image || item.src || ''}
                  alt={item.title}
                  fill
                  sizes="448px"
                  className={item.objectFit === 'contain' ? 'object-contain' : 'object-cover'}
                />
              ) : null}
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col gap-2">
              <p className="text-[9px] tracking-[0.2em] uppercase text-cream/40 font-inter">
                {item.category}
              </p>
              <h2 className="text-2xl text-cream leading-tight">{item.title}</h2>
              {item.description && (
                <p className="text-sm text-cream/60 font-inter leading-relaxed mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
