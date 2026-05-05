'use client'

import { motion } from 'framer-motion'

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
}

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      className="relative w-8 h-6 flex items-center justify-center focus:outline-none"
    >
      {/* Top bar */}
      <motion.span
        className="absolute w-7 bg-[#F5F5F0] block origin-center"
        style={{ height: '1.5px' }}
        animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -9 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
      {/* Middle bar */}
      <motion.span
        className="absolute w-7 bg-[#F5F5F0] block origin-center"
        style={{ height: '1.5px' }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      />
      {/* Bottom bar */}
      <motion.span
        className="absolute w-7 bg-[#F5F5F0] block origin-center"
        style={{ height: '1.5px' }}
        animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 9 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
    </button>
  )
}
