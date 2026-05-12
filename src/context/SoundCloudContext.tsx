'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  IFRAME_SRC,
  MAX_TRACKS,
  type SCSound,
  type SCWidget,
} from '@/lib/soundcloud'

// ─── Context shape ────────────────────────────────────────────────────────────

interface SoundCloudContextType {
  tracks: SCSound[]
  currentIndex: number
  isPlaying: boolean
  progress: number   // 0–1
  position: number   // ms
  ready: boolean
  playTrack: (index: number) => void
  togglePlay: () => void
  seekTo: (ms: number) => void
}

const SoundCloudContext = createContext<SoundCloudContextType | null>(null)

export function useSoundCloud(): SoundCloudContextType {
  const ctx = useContext(SoundCloudContext)
  if (!ctx) throw new Error('useSoundCloud must be used inside <SoundCloudProvider>')
  return ctx
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function SoundCloudProvider({ children }: { children: React.ReactNode }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<SCWidget | null>(null)

  const [tracks, setTracks] = useState<SCSound[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [position, setPosition] = useState(0)
  const [ready, setReady] = useState(false)

  const initWidget = useCallback(() => {
    if (widgetRef.current) return
    if (!iframeRef.current || !window.SC) return

    const widget = window.SC.Widget(iframeRef.current)
    widgetRef.current = widget

    const loadTracks = (sounds: SCSound[]) => {
      if (!sounds?.length) return
      setTracks(sounds.slice(0, MAX_TRACKS))
      setReady(true)
    }

    // Bind 'ready' for the normal case where the SC player isn't initialized yet
    widget.bind('ready', () => {
      widget.getSounds(loadTracks)
    })

    // Also call getSounds immediately — if the SC player is already ready
    // (race condition in production where 'ready' fires before our listener is bound),
    // this call will return data right away.
    widget.getSounds(loadTracks)

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

  // Load the SC Widget API script and initialize once it's ready
  useEffect(() => {
    const existing = document.getElementById('sc-api-script')
    if (!existing) {
      const script = document.createElement('script')
      script.id = 'sc-api-script'
      script.src = 'https://w.soundcloud.com/player/api.js'
      script.onload = initWidget
      document.head.appendChild(script)
    } else if (window.SC) {
      // Script was already loaded by a previous render
      initWidget()
    }
    // else: script tag exists but is still loading — the onload set above will fire
  }, [initWidget])

  const playTrack = useCallback((index: number) => {
    widgetRef.current?.skip(index)
  }, [])

  const togglePlay = useCallback(() => {
    if (!widgetRef.current) return
    isPlaying ? widgetRef.current.pause() : widgetRef.current.play()
  }, [isPlaying])

  const seekTo = useCallback((ms: number) => {
    widgetRef.current?.seekTo(ms)
  }, [])

  return (
    <SoundCloudContext.Provider
      value={{ tracks, currentIndex, isPlaying, progress, position, ready, playTrack, togglePlay, seekTo }}
    >
      {/*
        Hidden SC iframe — must have real dimensions and be within the document
        so the browser doesn't throttle it. Positioned at 1×1 with opacity:0
        so it is invisible but not off-screen.
      */}
      <iframe
        ref={iframeRef}
        title="SoundCloud audio engine"
        src={IFRAME_SRC}
        width="1"
        height="1"
        allow="autoplay"
        aria-hidden="true"
        tabIndex={-1}
        onLoad={initWidget}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          border: 'none',
        }}
      />
      {children}
    </SoundCloudContext.Provider>
  )
}
