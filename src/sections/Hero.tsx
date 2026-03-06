'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import SocialIcons from '@/components/SocialIcons'
import OvalButton from '@/components/OvalButton'
import KeepaLogo from '@/components/KeepaLogo'
import SpinningCircleText from '@/components/SpinningCircleText'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section 
    ref={sectionRef}
    className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 overflow-hidden"
  >
      {/* Main Content Container - NO fade out on scroll */}
      <div className="relative z-10">
        {/* Top Row */}
        <div className="flex justify-between items-start pt-8 fixed top-20 left-20 z-9999">
          {/* Social Icons - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <SocialIcons />
          </motion.div>
          
        </div>

        <div className="absolute top-16 right-8 z-20">
        <SpinningCircleText
            text=" LATINO-AMERICANA • LATINO-AMERICANA •"
            fontClass="font-funtastic text-xs"
            size={163}
            duration={16}
          />
        </div>
        
        {/* Center Logo */}
        <div className="flex justify-center mt-8 md:mt-32">
          <KeepaLogo />
        </div>
        
        {/* Bottom Content */}
        <div className="flex flex-col md:flex-row justify-between items-end mt-16 md:mt-32">
          {/* Left Side - Description & Email */}
          <motion.div 
            className="max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-xl leading-tight mb-8 text-white">
            We are Carmela Collective, an Amsterdam-based collective of LatinAmerican creatives building a platform for culture, arts and community space. 
            </p>
            
           
          </motion.div>
          
          {/* Right Side - Brief Buttons */}
          <motion.div 
            className="flex flex-col gap-3 mt-8 md:mt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <p className="text-xs text-white text-right mb-2">or submit a brief</p>
            <div className="flex flex-col items-end gap-3">
              <OvalButton href="#contact">design brief</OvalButton>
              <OvalButton href="#contact">branding brief</OvalButton>
            </div>
          </motion.div>
        </div>
        
       
      </div>
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-300 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
    </section>
  )
}
