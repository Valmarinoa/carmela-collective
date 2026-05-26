'use client'

import { useId } from "react"
import { SHAPE_D, SHAPE_TRANSFORM } from "./shape"

type Props = {
  size?: number
  className?: string
  /** Loop duration in seconds. */
  duration?: number
  /** Stroke width in viewBox units (200×200). */
  strokeWidth?: number
}

export function OutlineTraceLoader({
  size = 64,
  className,
  duration = 2.1,
  strokeWidth = 3,
}: Props) {
  const uid = useId().replace(/:/g, "")
  const filterId = `outline-${uid}`
  const dur = `${duration}s`

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="status"
      aria-label="Loading"
    >
      <defs>
        <filter id={filterId}>
          <feTurbulence baseFrequency="0.05" numOctaves={2} seed={3} />
          <feDisplacementMap in="SourceGraphic" scale={3} />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        {/* The traced stroke that draws on, then wipes off. */}
        <path
          transform={SHAPE_TRANSFORM}
          d={SHAPE_D}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={100}
          strokeDasharray={100}
        >
          <animate
            attributeName="stroke-dashoffset"
            values="100;0;0;-100"
            keyTimes="0;0.55;0.7;1"
            dur={dur}
            repeatCount="indefinite"
          />
        </path>
        {/* Brief solid-fill flash near the end of each cycle. */}
        <path transform={SHAPE_TRANSFORM} d={SHAPE_D} fill="currentColor" opacity={0}>
          <animate
            attributeName="opacity"
            values="0;0;1;0"
            keyTimes="0;0.7;0.85;1"
            dur={dur}
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  )
}
