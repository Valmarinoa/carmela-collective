'use client'

import Image from 'next/image'

interface SoundCloudProps {
  children?: React.ReactNode
  backgroundImage?: string
  backgroundAlt?: string
  objectFit?: 'cover' | 'contain'
}

export default function SoundCloud({ 
  children, 
  backgroundImage,
  backgroundAlt = 'Background',
  objectFit = 'cover'
}: SoundCloudProps) {
  
  return (
    <section 
      id="archive"
      className="relative py-20 z-[3] h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background layer */}
      {/* <div className="absolute inset-0 -z-10">
        <Image
          src="/images/archive-bg.png"
          alt="Footer background"
          fill
          priority
          className="object-cover scale-125"
        />
      </div> */}

      {/* SVG Container - centered */}
      <div className="relative w-[737px] h-[533px] max-w-[90vw] max-h-[70vh]">
        
        {/* SVG with image INSIDE it - using clipPath on the image element */}
        <svg 
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 737 533" 
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Single combined clip path of all 6 leaves */}
            <clipPath id="sixLeavesClip">
              <path d="M649.365 0C760.631 86.8255 769.775 436.042 649.484 532.906C529.236 436.077 538.211 86.9823 649.365 0Z" />
              <path d="M536.556 0C647.823 86.8255 656.966 436.042 536.675 532.906C416.428 436.077 425.403 86.9823 536.556 0Z" />
              <path d="M423.556 0C534.823 86.8255 543.966 436.042 423.675 532.906C303.428 436.077 312.403 86.9823 423.556 0Z" />
              <path d="M310.747 0C422.014 86.8255 431.157 436.042 310.867 532.906C190.619 436.077 199.594 86.9823 310.747 0Z" />
              <path d="M199.556 0C310.823 86.8255 319.966 436.042 199.675 532.906C79.4278 436.077 88.4025 86.9823 199.556 0Z" />
              <path d="M86.7474 0C198.014 86.8255 207.157 436.042 86.8668 532.906C-33.3808 436.077 -24.4061 86.9823 86.7474 0Z" />
            </clipPath>
          </defs>

          {/* Background image clipped to the shape */}
          {backgroundImage && (
            <image
              href={backgroundImage}
              width="737"
              height="533"
              preserveAspectRatio={objectFit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet'}
              clipPath="url(#sixLeavesClip)"
            />
          )}

          {/* Border strokes on top */}
          <path 
            d="M649.365 0C760.631 86.8255 769.775 436.042 649.484 532.906C529.236 436.077 538.211 86.9823 649.365 0Z" 
            fill="black" 
          />
          <path 
            d="M536.556 0C647.823 86.8255 656.966 436.042 536.675 532.906C416.428 436.077 425.403 86.9823 536.556 0Z" 
            fill="black" 
          />
          <path 
            d="M423.556 0C534.823 86.8255 543.966 436.042 423.675 532.906C303.428 436.077 312.403 86.9823 423.556 0Z" 
            fill="black" 
          />
          <path 
            d="M310.747 0C422.014 86.8255 431.157 436.042 310.867 532.906C190.619 436.077 199.594 86.9823 310.747 0Z" 
            fill="black" 
          />
          <path 
            d="M199.556 0C310.823 86.8255 319.966 436.042 199.675 532.906C79.4278 436.077 88.4025 86.9823 199.556 0Z" 
            fill="black" 
          />
          <path 
            d="M86.7474 0C198.014 86.8255 207.157 436.042 86.8668 532.906C-33.3808 436.077 -24.4061 86.9823 86.7474 0Z" 
            fill="black" 
          />
        </svg>

        {/* Content layer on top */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-black">
          <div className="pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}