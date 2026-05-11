'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, ArrowUpRight } from 'lucide-react'

// ─── SoundCloud Widget API types ─────────────────────────────────────────────

declare global {
  interface Window {
    SC?: { Widget: (iframe: HTMLIFrameElement) => SCWidget }
  }
}

interface SCWidget {
  bind(event: string, callback: (e?: SCProgressEvent) => void): void
  play(): void
  pause(): void
  skip(index: number): void
  getSounds(cb: (sounds: SCSound[]) => void): void
  getCurrentSoundIndex(cb: (index: number) => void): void
  seekTo(ms: number): void
}

interface SCSound {
  id: number
  title: string
  artwork_url: string | null
  duration: number // ms
  permalink_url: string
}

interface SCProgressEvent {
  currentPosition: number // ms
  relativePosition: number // 0–1
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SC_URL = 'https://soundcloud.com/carmela-collective'
const IFRAME_SRC =
  'https://w.soundcloud.com/player/?url=' +
  encodeURIComponent(SC_URL) +
  '&auto_play=false&buying=false&liking=false&download=false' +
  '&sharing=false&show_artwork=true&show_comments=false' +
  '&show_playcount=false&show_user=false&hide_related=true&visual=false'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(ms: number): string {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  if (h > 0)
    return `${h}:${String(m % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

function art(url: string | null, size: 't500x500' | 't300x300' | 'small'): string | null {
  return url ? url.replace('-large', `-${size}`) : null
}

// ─── Equalizer bars ───────────────────────────────────────────────────────────
// Framer Motion animates 4 bars from the bottom; static when paused.

function EqBars({ active, size = 'md' }: { active: boolean; size?: 'sm' | 'md' }) {
  const speeds = [0.85, 1.1, 0.7, 1.25]
  const h = size === 'sm' ? 'h-3' : 'h-4'
  const w = size === 'sm' ? 'w-[9px]' : 'w-[14px]'
  return (
    <div className={`flex items-end gap-[2px] ${h} ${w}`}>
      {speeds.map((speed, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-[1px] bg-[#70fe01]"
          style={{ originY: 1 }}
          animate={active ? { scaleY: [0.15, 1, 0.25, 0.8, 0.15] } : { scaleY: 0.15 }}
          transition={
            active
              ? { duration: speed, repeat: Infinity, ease: 'easeInOut', delay: i * 0.13 }
              : { duration: 0.35 }
          }
        />
      ))}
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Mixes() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<SCWidget | null>(null)
  const tracksRef = useRef<SCSound[]>([])

  const [tracks, setTracks] = useState<SCSound[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  const initWidget = useCallback(() => {
    if (!iframeRef.current || !window.SC) return
    const widget = window.SC.Widget(iframeRef.current)
    widgetRef.current = widget

    widget.bind('ready', () => {
      widget.getSounds((sounds) => {
        tracksRef.current = sounds
        setTracks(sounds)
        setReady(true)
      })
    })

    widget.bind('play', () => {
      setIsPlaying(true)
      widget.getCurrentSoundIndex((i) => setCurrentIndex(i))
    })

    widget.bind('pause', () => setIsPlaying(false))
    widget.bind('finish', () => setIsPlaying(false))

    widget.bind('playProgress', (e) => {
      if (!e) return
      setPosition(e.currentPosition)
      setProgress(e.relativePosition)
    })
  }, [])

  useEffect(() => {
    const existing = document.getElementById('sc-api-script')
    if (existing && window.SC) { initWidget(); return }
    if (existing) return
    const script = document.createElement('script')
    script.id = 'sc-api-script'
    script.src = 'https://w.soundcloud.com/player/api.js'
    script.onload = initWidget
    document.head.appendChild(script)
  }, [initWidget])

  function playTrack(index: number) {
    widgetRef.current?.skip(index)
  }

  function togglePlay() {
    if (!widgetRef.current) return
    isPlaying ? widgetRef.current.pause() : widgetRef.current.play()
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const current = tracksRef.current[currentIndex]
    if (!widgetRef.current || !current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    widgetRef.current.seekTo(ratio * current.duration)
  }

  const current = tracks[currentIndex]
  const remaining = current ? current.duration - position : 0

  return (
    <section
      id="mixes"
      className="relative pt-24 pb-24 md:pt-20 md:pb-32 overflow-hidden z-[1] max-w-7xl inset-0 mx-auto"
    >
      {/* Hidden SC iframe — must remain in DOM for Widget API */}
      <iframe
        ref={iframeRef}
        title="SoundCloud audio engine"
        src={IFRAME_SRC}
        width="1"
        height="1"
        allow="autoplay"
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />

      {/* Section header */}
  

      {/* Player card */}
      <motion.div
        className="px-6 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="bg-[#0d0d0d]/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl">

          {/* ── Layout: stacked on mobile / two-column on desktop ── */}
          <div className="flex flex-col md:grid md:grid-cols-[280px_1fr] md:divide-x md:divide-white/[0.06]">

            {/* ════════════════════════════════
                LEFT PANEL — Now Playing
            ════════════════════════════════ */}
            <div className="flex flex-col p-5 md:p-6 gap-5">

              {/* Artwork */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white/[0.04]">
                {ready && current?.artwork_url ? (
                  <img
                    src={art(current.artwork_url, 't500x500') ?? ''}
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/[0.06]" />
                )}

                {/* Equalizer overlay on artwork */}
                <div className="absolute bottom-3 left-3">
                  <EqBars active={isPlaying} size="md" />
                </div>

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Track info */}
              <div className="min-w-0">
                <p className="text-[9px] font-inter tracking-[0.22em] text-white/30 uppercase mb-1.5">
                  Now Playing
                </p>
                <p className="text-white font-medium text-[15px] leading-snug line-clamp-2">
                  {ready && current ? current.title : 'Loading…'}
                </p>
              </div>

              {/* Progress bar */}
              <div>
                <div
                  className="relative h-[3px] bg-white/10 rounded-full cursor-pointer group"
                  onClick={seek}
                >
                  <div
                    className="h-full bg-[#70fe01] rounded-full transition-[width] duration-150"
                    style={{ width: `${progress * 100}%` }}
                  />
                  {/* Scrubber thumb */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2"
                    style={{ left: `${progress * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[10px] tabular-nums text-white/25 font-inter">
                  <span>{fmt(position)}</span>
                  <span>-{fmt(remaining)}</span>
                </div>
              </div>

              {/* Playback controls */}
              <div className="flex items-center justify-between px-2">
                <button
                  onClick={() => playTrack(Math.max(0, currentIndex - 1))}
                  disabled={!ready || currentIndex === 0}
                  className="p-2 text-white/35 hover:text-white disabled:opacity-15 transition-colors"
                  aria-label="Previous"
                >
                  <SkipBack size={18} />
                </button>

                <button
                  onClick={togglePlay}
                  disabled={!ready}
                  className="w-[52px] h-[52px] bg-[#70fe01] rounded-full flex items-center justify-center hover:opacity-80 disabled:opacity-25 transition-opacity shadow-[0_0_20px_rgba(112,254,1,0.25)]"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying
                    ? <Pause size={19} className="text-black" />
                    : <Play size={19} className="text-black translate-x-px" />}
                </button>

                <button
                  onClick={() => playTrack(Math.min(tracks.length - 1, currentIndex + 1))}
                  disabled={!ready || currentIndex === tracks.length - 1}
                  className="p-2 text-white/35 hover:text-white disabled:opacity-15 transition-colors"
                  aria-label="Next"
                >
                  <SkipForward size={18} />
                </button>
              </div>
            </div>

            {/* ════════════════════════════════
                RIGHT PANEL — Track list
            ════════════════════════════════ */}
            <div className="flex flex-col min-h-0">

              {/* Column headers */}
              <div className="px-5 py-3 border-b border-white/[0.06] grid grid-cols-[28px_1fr_52px] gap-3 items-center flex-shrink-0">
                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] text-center">#</span>
                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em]">Title</span>
                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] text-right">Time</span>
              </div>

              {/* Rows */}
              <div className="overflow-y-auto no-scrollbar max-h-[380px] md:max-h-none md:flex-1">
                {!ready && (
                  <div className="px-5 py-10 text-center text-white/20 text-sm font-inter">
                    Loading mixes…
                  </div>
                )}

                {tracks.map((track, i) => {
                  const active = i === currentIndex
                  return (
                    <motion.button
                      key={track.id}
                      onClick={() => playTrack(i)}
                      className={`
                        w-full grid grid-cols-[28px_1fr_52px] gap-3 items-center
                        px-5 py-3.5 text-left transition-colors duration-150
                        border-l-[2px]
                        ${active
                          ? 'bg-white/[0.04] border-[#70fe01]'
                          : 'border-transparent hover:bg-white/[0.03] hover:border-white/15'}
                      `}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03, duration: 0.4 }}
                    >
                      {/* Index / EQ bars */}
                      <div className="flex items-center justify-center h-[14px]">
                        {active && isPlaying
                          ? <EqBars active size="sm" />
                          : <span className="text-[11px] text-white/20 tabular-nums font-inter">
                              {i + 1}
                            </span>
                        }
                      </div>

                      {/* Thumbnail + title */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 bg-white/[0.06]">
                          {track.artwork_url && (
                            <img
                              src={art(track.artwork_url, 'small') ?? ''}
                              alt=""
                              className="w-full h-full object-cover opacity-75"
                            />
                          )}
                        </div>
                        <span
                          className={`text-[13px] truncate leading-tight ${
                            active ? 'text-[#70fe01] font-medium' : 'text-white/65'
                          }`}
                        >
                          {track.title}
                        </span>
                      </div>

                      {/* Duration */}
                      <span className="text-[11px] text-white/25 text-right tabular-nums font-inter">
                        {fmt(track.duration)}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  )
}
