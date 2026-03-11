'use client'

import { motion } from 'framer-motion'

export default function CurvedNavigation() {
 
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[50]">
     <motion.nav 
        className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {['About', 'Events', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium font-funtastic text-cream hover:text-[#70fe01] transition-colors z-50"
            whileHover={{ y: -2 }}
          >
            {item}
          </motion.a>
        ))}
      </motion.nav>
    </nav>
  )
}