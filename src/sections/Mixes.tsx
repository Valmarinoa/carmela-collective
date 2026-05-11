'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'

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
  duration: number
  permalink_url: string
}

interface SCProgressEvent {
  currentPosition: number
  relativePosition: number
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SC_URL = 'https://soundcloud.com/carmela-collective'
const MAX_TRACKS = 5

const IFRAME_SRC =
  'https://w.soundcloud.com/player/?url=' +
  encodeURIComponent(SC_URL) +
  '&auto_play=false&buying=false&liking=false&download=false' +
  '&sharing=false&show_artwork=true&show_comments=false' +
  '&show_playcount=false&show_user=false&hide_related=true&visual=false'

// ─── Utilities ───────────────────────────────────────────────────────────────

function fmt(ms: number): string {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  if (h > 0)
    return `${h}:${String(m % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

function art(url: string | null, size: 't500x500' | 'small'): string | null {
  return url ? url.replace('-large', `-${size}`) : null
}

// Seeded waveform generator — same seed always produces the same waveform shape.
// Uses a slow-moving envelope so the pattern looks like real audio, not noise.
function generateWaveform(seed: number, count: number): number[] {
  let s = Math.abs(seed % 99991)
  const next = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  let env = 0.5
  return Array.from({ length: count }, () => {
    env += (next() - 0.5) * 0.22
    env = Math.max(0.12, Math.min(1, env))
    return env * (0.3 + next() * 0.7)
  })
}

// ─── Waveform component ───────────────────────────────────────────────────────

interface WaveformProps {
  seed: number
  count: number
  progress?: number       // 0–1, green portion
  showProgress?: boolean  // if false, all bars are muted (inactive track)
  onSeek?: (ratio: number) => void
  height?: string
}

function Waveform({ seed, count, progress = 0, showProgress = false, onSeek, height = 'h-12' }: WaveformProps) {
  const bars = useMemo(() => generateWaveform(seed, count), [seed, count])

  return (
    <div
      className={`flex items-center gap-[1.5px] w-full ${height} ${onSeek ? 'cursor-pointer group' : ''}`}
      onClick={onSeek ? (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        onSeek(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)))
      } : undefined}
    >
      {bars.map((h, i) => {
        const barRatio = (i + 0.5) / count
        const played = showProgress && barRatio <= progress
        return (
          <div
            key={i}
            className="flex-1 rounded-[1px] transition-colors duration-100"
            style={{
              height: `${h * 100}%`,
              backgroundColor: played
                ? '#70fe01'
                : onSeek
                  ? 'rgba(255,255,255,0.18)'   // full waveform — slightly brighter
                  : 'rgba(255,255,255,0.10)',   // mini waveform
            }}
          />
        )
      })}
    </div>
  )
}

// ─── Animated equalizer bars (artwork overlay) ───────────────────────────────

function EqBars({ active }: { active: boolean }) {
  const speeds = [0.85, 1.1, 0.7, 1.25]
  return (
    <div className="flex items-end gap-[2px] h-4 w-[14px]">
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

// ─── Main component ───────────────────────────────────────────────────────────

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
        setTracks(sounds.slice(0, MAX_TRACKS))
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

  function seekTo(ratio: number) {
    const current = tracksRef.current[currentIndex]
    if (!widgetRef.current || !current) return
    widgetRef.current.seekTo(ratio * current.duration)
  }

  const current = tracks[currentIndex]
  const remaining = current ? current.duration - position : 0

  return (
    <section
      id="mixes"
      className="relative pt-24 pb-24 md:pt-20 md:pb-32 overflow-hidden z-[1] max-w-7xl inset-0 mx-auto"
    >
      {/* Hidden SC iframe */}
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

      <motion.div
        className="px-6 md:px-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="bg-[#0d0d0d]/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl">

          {/* ── Card header ── */}
          <div className="px-5 md:px-6 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
            <span className="text-[9px] font-inter tracking-[0.25em] text-white/30 uppercase">
              Carmela Collective · Mixes
            </span>
            <a
              href={SC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-inter tracking-[0.15em] text-white/25 uppercase hover:text-white/60 transition-colors"
            >
              soundcloud.com/carmela-collective
            </a>
          </div>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col md:grid md:grid-cols-[260px_1fr] md:divide-x md:divide-white/[0.06]">

            {/* ══════════════════════════════════
                LEFT — Now Playing
            ══════════════════════════════════ */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3">
                  <EqBars active={isPlaying} />
                </div>
              </div>

              {/* Track info */}
              <div className="min-w-0">
                <p className="text-[9px] font-inter tracking-[0.2em] text-white/25 uppercase mb-1">
                  Now Playing
                </p>
                <p className="text-white font-medium text-[15px] leading-snug line-clamp-2 min-h-[2.5rem]">
                  {ready && current ? current.title : '\u00A0'}
                </p>
              </div>

              {/* Waveform (doubles as progress / seek bar) */}
              <div>
                <Waveform
                  seed={current?.id ?? 0}
                  count={80}
                  progress={progress}
                  showProgress
                  onSeek={seekTo}
                  height="h-12"
                />
                {/* Playhead line */}
                <div className="relative h-0 -mt-[1px] pointer-events-none">
                  <div
                    className="absolute top-0 bottom-0 w-px bg-white/30 h-12 -translate-y-full"
                    style={{ left: `${progress * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[10px] tabular-nums text-white/25 font-inter">
                  <span>{fmt(position)}</span>
                  <span>-{fmt(remaining)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={() => playTrack(Math.max(0, currentIndex - 1))}
                  disabled={!ready || currentIndex === 0}
                  className="p-2 text-white/30 hover:text-white disabled:opacity-15 transition-colors"
                  aria-label="Previous"
                >
                  <SkipBack size={18} />
                </button>

                <button
                  onClick={togglePlay}
                  disabled={!ready}
                  className="w-[50px] h-[50px] bg-[#70fe01] rounded-full flex items-center justify-center hover:opacity-80 disabled:opacity-25 transition-opacity shadow-[0_0_24px_rgba(112,254,1,0.3)]"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying
                    ? <Pause size={18} className="text-black" />
                    : <Play size={18} className="text-black translate-x-[1px]" />}
                </button>

                <button
                  onClick={() => playTrack(Math.min(tracks.length - 1, currentIndex + 1))}
                  disabled={!ready || currentIndex === tracks.length - 1}
                  className="p-2 text-white/30 hover:text-white disabled:opacity-15 transition-colors"
                  aria-label="Next"
                >
                  <SkipForward size={18} />
                </button>
              </div>
            </div>

            {/* ══════════════════════════════════
                RIGHT — Track list
            ══════════════════════════════════ */}
            <div className="flex flex-col">

              {/* Column headers */}
              <div className="hidden md:grid md:grid-cols-[28px_1fr_96px_48px] gap-4 px-5 py-3 border-b border-white/[0.06] items-center">
                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] text-center">#</span>
                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em]">Title</span>
                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em]">Waveform</span>
                <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] text-right">Time</span>
              </div>

              {/* Tracks */}
              <div className="flex-1">
                {!ready && (
                  <div className="px-5 py-10 text-center text-white/15 text-sm font-inter">
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
                        w-full text-left transition-colors duration-150 border-l-2
                        px-5 py-4
                        grid grid-cols-[28px_1fr_48px] md:grid-cols-[28px_1fr_96px_48px] gap-4 items-center
                        ${active
                          ? 'bg-white/[0.05] border-[#70fe01]'
                          : 'border-transparent hover:bg-white/[0.03] hover:border-white/10'}
                      `}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35 }}
                    >
                      {/* Index / eq indicator */}
                      <div className="flex items-center justify-center h-4">
                        {active && isPlaying
                          ? <EqBars active />
                          : <span className="text-[11px] text-white/20 tabular-nums font-inter">{i + 1}</span>
                        }
                      </div>

                      {/* Artwork + title */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-white/[0.06]">
                          {track.artwork_url && (
                            <img
                              src={art(track.artwork_url, 'small') ?? ''}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-[13px] truncate leading-tight font-medium ${active ? 'text-[#70fe01]' : 'text-white/70'}`}>
                            {track.title}
                          </p>
                        </div>
                      </div>

                      {/* Mini waveform — desktop only */}
                      <div className="hidden md:block">
                        <Waveform
                          seed={track.id}
                          count={36}
                          progress={active ? progress : 0}
                          showProgress={active}
                          height="h-6"
                        />
                      </div>

                      {/* Duration */}
                      <span className="text-[11px] text-white/25 text-right tabular-nums font-inter">
                        {fmt(track.duration)}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Follow button */}
              <a
                href={SC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 border-t border-white/[0.06] group transition-colors hover:bg-white/[0.03]"
              >
                <div>
                  <p className="text-[12px] font-medium text-white/60 group-hover:text-white transition-colors">
                    Follow us on SoundCloud
                  </p>
                  <p className="text-[10px] text-white/25 font-inter mt-0.5">
                    Stay updated with our latest mixes
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#70fe01] group-hover:text-[#70fe01] text-white/30 transition-colors flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </div>
              </a>

            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
