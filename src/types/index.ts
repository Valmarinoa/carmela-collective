export interface Member {
  id: string
  title: string
  category: string
  description: string
  image: string
  href?: string
}

export interface FootageItem {
  id: string
  type?: 'image' | 'video'
  img: string  // image URL, or video URL when type === 'video'
  url?: string
  height: number
}

export interface Archive {
  id: string
  title: string
  category: string
  description: string
  // Media options
  mediaType?: 'image' | 'video'  // defaults to 'image' if not specified
  image?: string                 // for images (legacy support)
  src?: string                   // alternative image path
  video?: string                 // for videos
  // Display options
  objectFit?: 'cover' | 'contain'  // defaults to 'cover' if not specified
  // Link
  href?: string
  igHandle?: string
  // Event type for modal CTA
  type?: 'event' | 'radio'
  listenUrl?: string
  // Post-event footage for the archive modal gallery
  footage?: FootageItem[]
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
