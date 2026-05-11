'use client'

import { useMemo } from 'react'
import { generateWaveform } from '@/lib/soundcloud'

interface WaveformBarsProps {
  seed: number
  count: number
  progress?: number        // 0–1 — green portion
  showProgress?: boolean   // false → all bars muted (inactive track)
  onSeek?: (ratio: number) => void
  height?: string          // Tailwind height class, e.g. 'h-12'
  playedColor?: string
  unplayedColor?: string
}

export default function WaveformBars({
  seed,
  count,
  progress = 0,
  showProgress = false,
  onSeek,
  height = 'h-12',
  playedColor = '#70fe01',
  unplayedColor,
}: WaveformBarsProps) {
  const bars = useMemo(() => generateWaveform(seed, count), [seed, count])

  const unplayed = unplayedColor ?? (onSeek
    ? 'rgba(255,255,255,0.18)'   // full waveform — slightly brighter
    : 'rgba(255,255,255,0.10)')  // mini waveform — muted

  return (
    <div
      className={`flex items-center gap-[1.5px] w-full ${height} ${onSeek ? 'cursor-pointer' : ''}`}
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
            className="flex-1 rounded-[1px] transition-colors duration-75"
            style={{
              height: `${h * 100}%`,
              backgroundColor: played ? playedColor : unplayed,
            }}
          />
        )
      })}
    </div>
  )
}
