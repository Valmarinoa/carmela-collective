

'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import SocialIcons from './SocialIcons'

export default function SocialIconsWrapper() {
  const pathname = usePathname()
  const isCalendar = pathname === '/calendar'
  const isArchive = pathname === '/archive'
  const delay = pathname === '/' ? 3 : 0

  return (
    <motion.div
      className={[
        'justify-between items-start pt-8 fixed left-4 top-1/4 md:top-1/2  md:-translate-y-1/2 md:left-8 z-[30] hidden md:flex',
        isCalendar || isArchive ? 'hidden md:flex' : 'flex',
      ].join(' ')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <SocialIcons />
    </motion.div>
  )
}
