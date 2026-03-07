export interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  href?: string
}

export type FloatingMediaType = "image" | "video";

export type PercentString = `${number}%`;

export type FloatingImagePosition = {
  x: PercentString;
  y: PercentString;
};

export type FloatingImageSize = {
  width: number;
  height: number;
};

export interface FloatingImageItem {
  id: string;
  mediaType: "image" | "video";
  src?: string;
  vid?: string;
  alt: string;
  // Desktop positioning (percentage-based)
  position: { x: string; y: string };
  size: { width: number; height: number };
  parallaxSpeed: number;
  // Mobile-specific overrides
  mobile?: {
    position: { left?: string; right?: string; y: string };
    size: { width: number; height: number };
  };
}

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  platform: string
  href: string
  icon: string
}
