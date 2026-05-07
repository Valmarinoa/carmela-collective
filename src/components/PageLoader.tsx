'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { OutlineTraceLoader } from './loaders/OutlineTraceLoader'

const DURATION_MS = 3000

interface PageLoaderProps {
  onDone?: () => void
}

export default function PageLoader({ onDone }: PageLoaderProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      onDone?.()
    }, DURATION_MS)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <OutlineTraceLoader
            size={88}
            duration={1.6}
            strokeWidth={2.5}
            className="text-[#FFFCF4]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
