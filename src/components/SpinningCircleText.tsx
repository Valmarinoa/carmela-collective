"use client";

import { motion } from "framer-motion";

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
      animate={{ rotate: 360 }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
      style={{ width: size, height: size }}
    >
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
  );
}