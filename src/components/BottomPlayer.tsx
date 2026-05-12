'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, ListMusic } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useSoundCloud } from '@/context/SoundCloudContext'
import { art, fmt } from '@/lib/soundcloud'

// ─── Simple progress bar ──────────────────────────────────────────────────────

function ProgressBar({ progress, onSeek }: { progress: number; onSeek: (ratio: number) => void }) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    onSeek(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)))
  }

  return (
    <div
      className="relative h-[3px] w-full rounded-full bg-black/40 cursor-pointer group"
      onClick={handleClick}
    >
      <div
        className="h-full rounded-full bg-black/70 transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
      {/* Scrubber thumb — appears on hover */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black shadow opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ left: `${progress * 100}%` }}
      />
    </div>
  )
}

// ─── Up-next queue dialog ─────────────────────────────────────────────────────

function QueueDialog({
  tracks,
  currentIndex,
  isPlaying,
  onPlay,
  onClose,
}: {
  tracks: ReturnType<typeof useSoundCloud>['tracks']
  currentIndex: number
  isPlaying: boolean
  onPlay: (i: number) => void
  onClose: () => void
}) {
  // Close when clicking outside
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [onClose])

  return (
    <motion.div
      ref={ref}
      key="queue"
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute bottom-[calc(100%+10px)] right-4 w-72 rounded-2xl bg-[#1c1c1c] border border-white/[0.08] shadow-[0_-8px_40px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <p className="text-[9px] font-inter tracking-[0.25em] text-white/30 uppercase">Up Next</p>
      </div>

      {/* Track rows */}
      <div>
        {tracks.map((track, i) => {
          const active = i === currentIndex
          return (
            <button
              key={track.id}
              onClick={() => { onPlay(i); onClose() }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors border-l-2 ${
                active
                  ? 'bg-white/[0.05] border-[#70fe01]'
                  : 'border-transparent hover:bg-white/[0.04] hover:border-white/10'
              }`}
            >
              {/* Artwork */}
              <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 bg-white/[0.06]">
                {track.artwork_url && (
                  <img
                    src={art(track.artwork_url, 'small') ?? ''}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Title */}
              <p className={`flex-1 text-[12px] truncate leading-tight ${
                active ? 'text-[#70fe01] font-medium' : 'text-white/65'
              }`}>
                {track.title}
              </p>

              {/* Playing indicator / duration */}
              {active && isPlaying ? (
                <span className="text-[#70fe01] text-[10px] flex-shrink-0">▶</span>
              ) : (
                <span className="text-[10px] tabular-nums text-white/25 flex-shrink-0 font-inter">
                  {fmt(track.duration)}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── Bottom Player ────────────────────────────────────────────────────────────

export default function BottomPlayer() {
  const pathname = usePathname()
  const { tracks, currentIndex, isPlaying, progress, position, ready, playTrack, togglePlay, seekTo } =
    useSoundCloud()
  const [queueOpen, setQueueOpen] = useState(false)

  const current = tracks[currentIndex]
  const duration = current?.duration ?? 0
  const remaining = duration - position
  const hidden = !ready || tracks.length === 0 || pathname === '/calendar' || pathname === '/archive'
  const delay = pathname === '/' ? 3 : 0

  function handleSeek(ratio: number) {
    seekTo(ratio * duration)
  }

  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 z-50 ${hidden ? 'pointer-events-none' : ''}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? 8 : 0 }}
      transition={{ duration: 0.4, delay: hidden ? 0 : delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Queue dialog — rendered inside fixed container so it sits above the bar */}
      <AnimatePresence>
        {queueOpen && (
          <QueueDialog
            tracks={tracks}
            currentIndex={currentIndex}
            isPlaying={isPlaying}
            onPlay={playTrack}
            onClose={() => setQueueOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Bar ── */}
      <div className="h-fit py-2 bg-[#70fe01] items-center border-t border-white/[0.07]">
        {/* Progress line — sits flush at the very top of the bar */}
       

        {/* Three-zone layout */}
        <div className="flex items-center gap-4 px-4 md:px-6">

          {/* ZONE 1 — Controls */}
          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => playTrack(Math.max(0, currentIndex - 1))}
              disabled={!ready || currentIndex === 0}
              className="w-8 h-8 flex items-center justify-center text-black/70 hover:text-black disabled:opacity-20 transition-colors"
              aria-label="Previous"
            >
              <SkipBack size={15} />
            </button>

            <button
              onClick={togglePlay}
              disabled={!ready}
              className="w-9 h-9 rounded-full  flex items-center justify-center bg-black/70 disabled:opacity-30 text-black transition-opacity flex-shrink-0"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying
                ? <Pause size={14} className="text-[#70fe01]" />
                : <Play size={14} className="text-[#70fe01] translate-x-[1px]" />}
            </button>

            <button
              onClick={() => playTrack(Math.min(tracks.length - 1, currentIndex + 1))}
              disabled={!ready || currentIndex === tracks.length - 1}
              className="w-8 h-8 flex items-center justify-center text-black/70 hover:text-black disabled:opacity-20 transition-colors"
              aria-label="Next"
            >
              <SkipForward size={15} />
            </button>
          </div> 

          {/* ZONE 2 — Times (hidden on small mobile) */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[10px] tabular-nums text-black/70 font-inter flex-shrink-0 w-8 text-right">
              {fmt(position)}
            </span>
            <div className="flex-1" /> {/* spacer — progress bar is above the grid */}
            <span className="text-[10px] tabular-nums text-black/70 font-inter flex-shrink-0 w-10">
              -{fmt(remaining)}
            </span>
          </div>
          
          <div className="flex-1 flex">
          <ProgressBar progress={progress} onSeek={handleSeek} />
        </div>

          {/* ZONE 3 — Track info + queue button */}
          <div className="flex items-center gap-2 md:gap-3 w-1/4 min-w-0 justify-between">
            {/* Artwork */}
            <div className='flex gap-3'>
            <div className="w-9 h-9 rounded-md overflow-hidden flex-shrink-0 bg-white/[0.06]">
              {ready && current?.artwork_url && (
                <img
                  src={art(current.artwork_url, 'small') ?? ''}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Title */}
            <div className="min-w-0 hidden md:block">
              <p className="text-[10px] text-black/70 font-inter uppercase tracking-widest">
                Carmela Collective
              </p>
              <p className="text-[12px] text-black/70 font-medium truncate leading-tight max-w-[130px]">
                {ready && current ? current.title : 'Loading…'}
              </p>
            </div>
</div>
            {/* Queue toggle */}
            <button
              onClick={() => setQueueOpen((v) => !v)}
              disabled={!ready}
              aria-label="Up next"
              className={`relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors disabled:opacity-20 ${
                queueOpen ? 'text-[#70fe01] bg-black/70' : 'text-black/70 hover:text-black/70 hover:bg-black/70'
              }`}
            >
              <ListMusic size={15} />
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
