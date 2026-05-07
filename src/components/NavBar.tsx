'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import HamburgerButton from './HamburgerButton'
import MobileMenu from './MobileMenu'
import CurvedNavigation from './CurvedNavigation'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const delay = pathname === '/' ? 3 : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Desktop nav — top-left, hidden on mobile */}
      <div className="hidden md:block fixed top-10 left-10 z-[110]">
        <CurvedNavigation />
      </div>

      {/* Mobile hamburger — top-right, hidden on desktop */}
      <div className="fixed top-5 right-5 z-[700] md:hidden">
        <HamburgerButton
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </motion.div>
  )
}
