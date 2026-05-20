'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/data/site'
import { useNavTheme } from '@/context/NavThemeContext'

const MotionLink = motion.create(Link)

export default function CurvedNavigation() {
  const isDark = useNavTheme()
  const pathname = usePathname()

  return (
    <nav className="hidden md:block">
      <motion.nav
        className="flex flex-wrap gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {navLinks.map(({ label, href }) => {
          const isActive = href.startsWith('/') && !href.includes('#') && pathname === href
          return (
            <MotionLink
              key={label}
              href={href}
              className="text-sm font-medium font-funtastic z-50"
              style={{ color: isActive ? '#70fe01' : isDark ? '#0a0a0a' : '#F5F5F0' }}
              whileHover={{ y: -2, color: '#70fe01' }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </MotionLink>
          )
        })}
      </motion.nav>
    </nav>
  )
}
