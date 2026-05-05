// FloatingGallery.tsx
"use client";

import { useRef, useState, useEffect } from "react";
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

// Hook to detect mobile viewport
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function FloatingItem({
  item,
  progress,
  reduceMotion,
  isMobile,
}: {
  item: FloatingImageItem;
  progress: ReturnType<typeof useSpring>;
  reduceMotion: boolean;
  isMobile: boolean;
}) {
  const baseTravelPx = 900;
  const depth = clamp(item.parallaxSpeed, 0.1, 1.2);
  const travel = baseTravelPx * depth;

  const y = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [0, -travel]);

  // Determine position and size based on mobile/desktop
  const position = isMobile && item.mobile 
    ? item.mobile.position 
    : item.position;
  
  const size = isMobile && item.mobile 
    ? item.mobile.size 
    : item.size;

  // Build style object - use left/right for mobile, x/y for desktop
  const style = isMobile && item.mobile?.position
    ? {
        ...(item.mobile.position.left !== undefined && { left: item.mobile.position.left }),
        ...(item.mobile.position.right !== undefined && { right: item.mobile.position.right }),
        top: item.mobile.position.y,
        width: size.width,
        height: size.height,
        y,
        willChange: "transform",
      }
    : {
        left: (position as { x: string }).x,
        top: (position as { y: string }).y,
        width: size.width,
        height: size.height,
        y,
        willChange: "transform",
      };

  return (
    <motion.div className="absolute" style={style}>
      <div
        className={[
          "relative h-full w-full",
          "transition-transform duration-300 ease-out",
          "motion-reduce:transition-none",
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
  const isMobile = useIsMobile();

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

  // Mobile-specific flower transforms
  const mobileBgScale = useTransform(
    bgP,
    [0, 0.2, 1],
    reduceMotion ? [1, 1, 1] : [0.3, 0.5, 0.6]
  );
  const mobileBgX = useTransform(bgP, [0, 1], [-90, -90]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative min-h-[190vh] pt-20 overflow-hidden"
    >
    
      {/* Background flower - different positioning for mobile/desktop */}
      <motion.div
        className="fixed top-[30%] -z-2 pointer-events-none"
        style={{
          left: isMobile ? "20%" : "25%",
          x: isMobile ? mobileBgX : 0,
          opacity: bgOpacity,
          scale: isMobile ? mobileBgScale : bgScale,
          y: bgY,
          willChange: "transform, opacity",
        }}
        aria-hidden="true"
      >
        <div className={isMobile ? "relative h-[600px] w-[400px]" : "relative h-[600px] w-[600px]"}>
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
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
}