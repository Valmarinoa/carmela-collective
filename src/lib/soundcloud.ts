// ─── SoundCloud Widget API — shared types, constants, utilities ──────────────

declare global {
  interface Window {
    SC?: { Widget: (iframe: HTMLIFrameElement) => SCWidget }
  }
}

export interface SCWidget {
  bind(event: string, callback: (e?: SCProgressEvent) => void): void
  play(): void
  pause(): void
  skip(index: number): void
  getSounds(cb: (sounds: SCSound[]) => void): void
  getCurrentSoundIndex(cb: (index: number) => void): void
  seekTo(ms: number): void
}

export interface SCSound {
  id: number
  title: string
  artwork_url: string | null
  duration: number // ms
  permalink_url: string
}

export interface SCProgressEvent {
  currentPosition: number   // ms
  relativePosition: number  // 0–1
}

export const SC_URL = 'https://soundcloud.com/carmela-collective'
export const MAX_TRACKS = 5

export const IFRAME_SRC =
  'https://w.soundcloud.com/player/?url=' +
  encodeURIComponent(SC_URL) +
  '&auto_play=false&buying=false&liking=false&download=false' +
  '&sharing=false&show_artwork=true&show_comments=false' +
  '&show_playcount=false&show_user=false&hide_related=true&visual=false'

/** Format milliseconds → `m:ss` or `h:mm:ss` */
export function fmt(ms: number): string {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  if (h > 0)
    return `${h}:${String(m % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

/** Swap SoundCloud artwork size suffix */
export function art(url: string | null, size: 't500x500' | 't300x300' | 'small'): string | null {
  return url ? url.replace('-large', `-${size}`) : null
}

/**
 * Deterministic waveform generator.
 * Same seed always produces the same shape — a slow-moving envelope so the
 * result resembles real audio rather than pure noise.
 */
export function generateWaveform(seed: number, count: number): number[] {
  let s = Math.abs(seed % 99991)
  const next = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  let env = 0.5
  return Array.from({ length: count }, () => {
    env += (next() - 0.5) * 0.22
    env = Math.max(0.12, Math.min(1, env))
    return env * (0.3 + next() * 0.7)
  })
}
