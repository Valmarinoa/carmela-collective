'use client'

import { useState } from 'react'
import HamburgerButton from './HamburgerButton'
import MobileMenu from './MobileMenu'
import CurvedNavigation from './CurvedNavigation'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop nav — top-left, hidden on mobile */}
      <div className="hidden md:block fixed top-10 left-10 z-[110]">
        <CurvedNavigation />
      </div>

      {/* Mobile hamburger — top-right, hidden on desktop */}
      <div className="fixed top-5 right-5 z-[110] md:hidden">
        <HamburgerButton
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
