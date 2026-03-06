'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MousePointer2 } from 'lucide-react'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative py-20 px-6 md:px-12 lg:px-20 bg-cream z-[1]"
    >
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Dark Contact Card */}
        <div className="bg-[#1a1a1a] rounded-[2rem] p-8 md:p-12 lg:p-16 text-white overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-medium mb-4">
                  Let's make it happen!
                </h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                  Fill out a quick form below to submit your design brief or email me to get started. 
                  I will reply with confirmation and pricing options shortly. Look forward to hearing form you!
                </p>
                <p className="text-white/40 text-sm mt-4">
                  Answering all enquiries :)
                </p>
              </div>
              
              {/* Brief Buttons */}
              <div className="flex flex-col gap-3">
               
                <motion.button 
                  className="inline-flex items-center gap-3 px-6 py-3 border border-white/30 rounded-full 
                             text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black w-fit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Inquiries</span>
                  <MousePointer2 size={16} className="text-white/60" />
                </motion.button>
              </div>
            </div>
            
            {/* Right Side - Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="form-input resize-none rounded-xl"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Submitting...' : submitted ? 'Message Sent!' : 'Submit'}
                </motion.button>
              </form>
              
              {/* Services Tags */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/40 mb-3">
                  Brand Design / Print Media / Digital Media / Web Design
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Brand Identities', 'One off Jobs', 'Designer on call'].map((service) => (
                    <span 
                      key={service}
                      className="px-3 py-1 text-xs text-white/60 border border-white/20 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
        </div>
      </motion.div>
    </section>
  )
}
