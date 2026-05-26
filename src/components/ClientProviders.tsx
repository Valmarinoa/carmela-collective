'use client'

import { SoundCloudProvider } from '@/context/SoundCloudContext'
import { NavThemeProvider } from '@/context/NavThemeContext'
import BottomPlayer from '@/components/BottomPlayer'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <NavThemeProvider>
      <SoundCloudProvider>
        {children}
        <BottomPlayer />
      </SoundCloudProvider>
    </NavThemeProvider>
  )
}
