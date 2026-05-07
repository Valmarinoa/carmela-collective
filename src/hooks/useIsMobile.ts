'use client'

import { useState, useEffect } from 'react'

/**
 * Returns true when the viewport is narrower than the Tailwind `md` breakpoint (768 px).
 * Listens for resize events so the value stays accurate after orientation changes.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}
