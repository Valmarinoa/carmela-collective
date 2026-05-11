'use client'

import { SoundCloudProvider } from '@/context/SoundCloudContext'
import BottomPlayer from '@/components/BottomPlayer'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SoundCloudProvider>
      {children}
      <BottomPlayer />
    </SoundCloudProvider>
  )
}
