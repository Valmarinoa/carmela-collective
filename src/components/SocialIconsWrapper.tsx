'use client'

import { usePathname } from 'next/navigation'
import SocialIcons from './SocialIcons'

export default function SocialIconsWrapper() {
  const pathname = usePathname()
  const isCalendar = pathname === '/calendar'

  return (
    <div
      className={[
        'flex justify-between items-start pt-8 fixed top-14 left-4 md:top-1/2 md:-translate-y-1/2 md:left-10 z-[30]',
        isCalendar ? 'hidden md:flex' : 'flex',
      ].join(' ')}
    >
      <SocialIcons />
    </div>
  )
}
