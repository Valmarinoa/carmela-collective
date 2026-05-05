'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function StickyLogo() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  // On non-home pages the logo is always visible.
  // On the home page it appears once the user has scrolled past the hero (~80vh).
  const [visible, setVisible] = useState(!isHome)

  useEffect(() => {
    if (!isHome) {
      setVisible(true)
      return
    }

    const check = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }

    check() // run once on mount in case page is already scrolled
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [isHome])

  // When the route changes to home, reset until threshold is crossed
  useEffect(() => {
    if (isHome) {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    } else {
      setVisible(true)
    }
  }, [isHome])

  return (
    <AnimatePresence>
      {/* {visible && ( */}
        <motion.div
          key="sticky-logo"
          className="fixed top-0 left-[36%] md:left-[45%] -translate-x-1/2 z-[40]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/"
            className="pointer-events-auto flex items-center justify-center pt-5"
            aria-label="Carmela Collective — home"
          >
            <div className="relative w-28 md:w-36 h-7 md:h-16">
              <Image
                src="/images/carmela-menu.png"
                alt="Carmela Collective"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </motion.div>
      {/* )} */}
    </AnimatePresence>
  )
}
