'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// true  → navbar should be dark (black text/icons)
// false → navbar should be light (white text/icons, default)
const NavThemeContext = createContext(false)

export function useNavTheme() {
  return useContext(NavThemeContext)
}

// How far down from the top (px) we consider "the navbar area"
const NAV_BOTTOM = 90

function checkDark(): boolean {
  return Array.from(
    document.querySelectorAll<HTMLElement>('[data-nav-dark]')
  ).some((el) => {
    const rect = el.getBoundingClientRect()
    return rect.top <= NAV_BOTTOM && rect.bottom > 0
  })
}

export function NavThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsDark(checkDark())

    // Run immediately for the current scroll position / new route
    setIsDark(checkDark())
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname]) // re-run on every route change so initial state is correct

  return (
    <NavThemeContext.Provider value={isDark}>
      {children}
    </NavThemeContext.Provider>
  )
}
