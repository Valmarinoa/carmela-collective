'use client'

import { motion } from 'framer-motion'

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
  isDark?: boolean
}

export default function HamburgerButton({ isOpen, onClick, isDark = false }: HamburgerButtonProps) {
  const barColor = isDark ? '#0a0a0a' : '#F5F5F0'

  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      className="relative w-8 h-6 flex items-center justify-center focus:outline-none"
    >
      {/* Top bar */}
      <motion.span
        className="absolute w-7 block origin-center transition-colors duration-300"
        style={{ height: '1.5px', backgroundColor: barColor }}
        animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -9 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
      {/* Middle bar */}
      <motion.span
        className="absolute w-7 block origin-center transition-colors duration-300"
        style={{ height: '1.5px', backgroundColor: barColor }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      />
      {/* Bottom bar */}
      <motion.span
        className="absolute w-7 block origin-center transition-colors duration-300"
        style={{ height: '1.5px', backgroundColor: barColor }}
        animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 9 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
    </button>
  )
}
