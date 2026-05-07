'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { navLinks } from '@/data/site'

const MotionLink = motion.create(Link)

export default function CurvedNavigation() {
  return (
    <nav className="hidden md:block">
      <motion.nav
        className="flex flex-wrap gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {navLinks.map(({ label, href }) => (
          <MotionLink
            key={label}
            href={href}
            className="text-sm font-medium font-funtastic text-cream hover:text-[#70fe01] transition-colors z-50"
            whileHover={{ y: -2 }}
          >
            {label}
          </MotionLink>
        ))}
      </motion.nav>
    </nav>
  )
}