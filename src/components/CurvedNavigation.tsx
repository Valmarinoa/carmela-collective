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
       
          <motion.a
            key={'about'}
            href={`#about`}
            className="text-sm font-medium font-funtastic text-cream hover:text-[#70fe01] transition-colors z-50"
            whileHover={{ y: -2 }}
          >
            About
          </motion.a>
          <motion.a
            key='about'
            href='/calendar'
            className="text-sm font-medium font-funtastic text-cream hover:text-[#70fe01] transition-colors z-50"
            whileHover={{ y: -2 }}
          >
            Calendar
          </motion.a>
          <motion.a
            key='contact'
            href='#contact'
            className="text-sm font-medium font-funtastic text-cream hover:text-[#70fe01] transition-colors z-50"
            whileHover={{ y: -2 }}
          >
            Contact
          </motion.a>
      </motion.nav>
    </nav>
  )
}