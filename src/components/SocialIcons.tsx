'use client'

import { motion } from 'framer-motion'
import { Instagram, Linkedin } from 'lucide-react'

export default function SocialIcons() {
  return (
    <div className="flex flex-col gap-4">
      <motion.a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 border border-white rounded-full flex items-center justify-center
                   text-white transition-all duration-300 
                   hover:bg-[#70fe01] hover:text-black hover:border-black"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Instagram size={18} />
      </motion.a>

      <motion.a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 border border-white rounded-full flex items-center justify-center
                   text-white transition-all duration-300 
                   hover:bg-[#70fe01] hover:text-black hover:border-black"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
         <Linkedin size={18} />
      </motion.a>

   

      {/* <motion.a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 border border-white rounded-full flex items-center justify-center
                   text-white transition-all duration-300 
                   hover:bg-[#70fe01] hover:text-black hover:border-black"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Linkedin size={18} />
      </motion.a> */}
    </div>
  )
}