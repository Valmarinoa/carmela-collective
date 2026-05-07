'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Granient from '@/components/Granient'

type GradientConfig = {
  color1: string
  color2: string
  color3: string
  color4?: string
  color5?: string
  accentSpread?: number
  timeSpeed?: number
}

const DEFAULT_GRADIENT: GradientConfig = {
  color1: '#5F625B',
  color2: '#6D7269',
  color3: '#879180',
  color4: '#F08C43',
  color5: '#f472b6',
  accentSpread: 0.35,
  timeSpeed: 0.3,
}

const CALENDAR_GRADIENT: GradientConfig = {
  color1: '#3a332d',
  color2: '#1e1a15',
  color3: '#0a0908',
  color4: '#7a5a3c',
  accentSpread: 0.2,
  timeSpeed: 0.3,
}

const ARCHIVE_GRADIENT: GradientConfig = {
  color1: '#2f1502',
  color2: '#010300',
  color3: '#b75b1a',
  color4: '#b7897f',
  accentSpread: 0.15,
  timeSpeed: 0.3,
}

const getGradientByPath = (pathname: string): GradientConfig => {
  if (pathname.startsWith('/archive')) return ARCHIVE_GRADIENT
  if (pathname.startsWith('/calendar')) return DEFAULT_GRADIENT
  return DEFAULT_GRADIENT
}

export default function AppGradient() {
  const pathname = usePathname()
  const gradient = useMemo(
    () => getGradientByPath(pathname ?? '/'),
    [pathname]
  )

  return <Granient {...gradient} />
}
