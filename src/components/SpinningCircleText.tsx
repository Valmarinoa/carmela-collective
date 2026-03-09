"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  text: string;
  size?: number;
  duration?: number;
  fontSize?: number;
  fontClass?: string;
};

export default function SpinningCircleText({
  text,
  size = 220,
  duration = 16,
  fontSize = 16,
  fontClass = "",
}: Props) {
  const radius = size / 2 - 18;
  const pathId = `circle-${text.replace(/\s+/g, "-")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1], // elegant easeOutExpo feel
      }}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* ROTATION LAYER */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        style={{ width: size, height: size }}
      >
        {/* CENTER SVG */}
        <div className="absolute w-[40%] h-[40%]">
          <Image
            src="/icons/carmela-figure.svg"
            alt="Carmela figure"
            fill
            className="object-contain"
          />
        </div>

        {/* TEXT CIRCLE */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <path
              id={pathId}
              d={`
                M ${size / 2}, ${size / 2}
                m -${radius}, 0
                a ${radius},${radius} 0 1,1 ${radius * 2},0
                a ${radius},${radius} 0 1,1 -${radius * 2},0
              `}
            />
          </defs>

          <text
            fill="white"
            fontSize={fontSize}
            letterSpacing="2px"
            className={fontClass}
          >
            <textPath href={`#${pathId}`} startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </motion.div>
    </motion.div>
  );
}