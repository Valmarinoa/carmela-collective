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

function FloatingItem({
  item,
  progress,
  reduceMotion,
}: {
  item: FloatingImageItem;
  progress: ReturnType<typeof useSpring>;
  reduceMotion: boolean;
}) {
  const baseTravelPx = 900;
  const depth = clamp(item.parallaxSpeed, 0.1, 1.2);
  const travel = baseTravelPx * depth;

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
      <div
        className={[
          "relative h-full w-full",
          "transition-transform duration-300 ease-out",
          "motion-reduce:transition-none",
          "hover:scale-[1.02] hover:-translate-y-1",
        ].join(" ")}
        style={{ willChange: "transform" }}
      >
        {item.mediaType === "video" && item.vid ? (
          <video
            src={item.vid}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-contain select-none"
          />
        ) : item.mediaType === "image" && item.src ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain select-none"
            draggable={false}
            sizes="(max-width: 768px) 160px, 360px"
          />
        ) : null}
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

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.7,
  });

  const bgP = useTransform(smooth, [0.1, 0.28], [0, 1]);

  const bgOpacity = useTransform(
    bgP,
    [0, 0.4, 1],
    reduceMotion ? [1, 1, 1] : [0, 0.75, 1]
  );
  const bgScale = useTransform(
    bgP,
    [0, 0.55, 1],
    reduceMotion ? [1, 1, 1] : [0.6, 0.92, 1]
  );
  const bgY = useTransform(bgP, [0, 1], reduceMotion ? [0, 0] : [20, -90]);

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
        <div className="relative h-[600px] w-[600px]">
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
    </section>
  );
}