'use client'

import { motion } from 'framer-motion'
import { MousePointer2 } from 'lucide-react'

interface OvalButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

export default function OvalButton({ children, href, onClick, className = '' }: OvalButtonProps) {
  const buttonContent = (
    <motion.span
      className={`inline-flex items-center gap-2 px-5 py-2 border border-white rounded-full 
                  text-sm font-medium text-white transition-all duration-300 
                  hover:bg-[#70fe01] hover:text-black hover:border-black cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <MousePointer2 size={14} className="rotate-[-15deg]" />
    </motion.span>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {buttonContent}
      </a>
    )
  }

  return (
    <button onClick={onClick} type="button">
      {buttonContent}
    </button>
  )
}
