"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { floatingImages } from "@/data/data";
import type { FloatingImageItem } from "@/types/index";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Single item renderer
 * - Parallax is ONLY Y
 * - Simple hover (no rotation)
 */
function FloatingItem({
  item,
  progress,
  reduceMotion,
}: {
  item: FloatingImageItem;
  progress: ReturnType<typeof useSpring>;
  reduceMotion: boolean;
}) {
  // More perceivable depth separation:
  // baseTravel controls overall strength
  const baseTravelPx = 900;

  // Make speed distribution more “layered” (optional but helps a lot)
  // keeps your values but nudges them into a nicer curve
  const depth = clamp(item.parallaxSpeed, 0.1, 1.2);
  const travel = baseTravelPx * depth;

  // Move upward as we scroll through the section
  const y = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [0, -travel]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: item.position.x,
        top: item.position.y,
        width: item.size.width,
        height: item.size.height,
        y,
        willChange: "transform",
      }}
    >
      {/* Hover only on inner wrapper so parallax (outer) stays clean */}
      <div
        className={[
          "relative h-full w-full",
          "transition-transform duration-300 ease-out",
          "motion-reduce:transition-none",
          "hover:scale-[1.02] hover:-translate-y-1",
        ].join(" ")}
        style={{ willChange: "transform" }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-contain select-none"
          draggable={false}
          sizes="(max-width: 768px) 160px, 360px"
        />
      </div>
    </motion.div>
  );
}

export default function FloatingGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth the progress to avoid jitter
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.7,
  });

  /**
   * Flower: reaches full size faster
   * We compress the progress range so it finishes early.
   */
  const bgP = useTransform(smooth, [0.10, 0.28], [0, 1]);

  const bgOpacity = useTransform(bgP, [0, 0.4, 1], reduceMotion ? [1, 1, 1] : [0, 0.75, 1]);
  const bgScale   = useTransform(bgP, [0, 0.55, 1], reduceMotion ? [1, 1, 1] : [0.6, 0.92, 1]);
  const bgY       = useTransform(bgP, [0, 1], reduceMotion ? [0, 0] : [20, -90]);
  const exitP = useTransform(smooth, [0.72, 0.92], [0, 1])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative min-h-[150vh] pt-20 overflow-hidden"
    >
      {/* Background flower */}
      <motion.div
        className="fixed top-1/4 left-1/4 -z-2 pointer-events-none"
        style={{
          opacity: bgOpacity,
          scale: bgScale,
          y: bgY,
          willChange: "transform, opacity",
        }}
        aria-hidden="true"
      >
        <div className="relative w-[600px] h-[600px]">
          <Image
            src="/images/flower.png"
            alt="Carmela Collective"
            fill
            className="object-contain select-none"
            priority
            draggable={false}
          />
        </div>
      </motion.div>

      {/* Floating items */}
      <div className="absolute inset-0 z-10">
        {floatingImages.map((item) => (
          <FloatingItem
            key={item.id}
            item={item}
            progress={smooth}
            reduceMotion={Boolean(reduceMotion)}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      {/* <div className="absolute bottom-20 left-0 right-0 flex justify-center z-20">
        <nav className="flex gap-8">
          {["Projects", "Gallery", "About", "Contact"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-sm font-medium text-black/50 hover:text-black transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div> */}
    </section>
  );
}