'use client'

import { SoundCloudProvider } from '@/context/SoundCloudContext'
import { NavThemeProvider } from '@/context/NavThemeContext'
import BottomPlayer from '@/components/BottomPlayer'
import { useLoader } from '@/context/LoaderContext'
import { motion } from 'framer-motion'

function BottomPlayerWithLoader() {
  const { loaded } = useLoader()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <BottomPlayer />
    </motion.div>
  )
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <NavThemeProvider>
      <SoundCloudProvider>
        {children}
        <BottomPlayerWithLoader />
      </SoundCloudProvider>
    </NavThemeProvider>
  )
}
