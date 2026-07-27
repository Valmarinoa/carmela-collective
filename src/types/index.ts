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

export type Artist = {
  id: string
  name: string
  origin: string
  bio: string
  instagram?: string
  soundcloudUrl?: string
  imageUrl?: string
}

export type LineupSlot = {
  id: string
  artists: Artist[]
  isB2B: boolean
  note?: string
}

/** Single event model used by both Calendar (upcoming) and Archive (past). */
export type Event = {
  id: string
  title: string
  date: string // ISO: "2026-05-04"
  venue: string
  venueUrl?: string
  venueAddress?: string
  description: string
  flyer?: string
  mediaType?: 'image' | 'video'
  video?: string
  objectFit?: 'cover' | 'contain'
  type?: 'event' | 'radio'
  ticketUrl?: string
  listenUrl?: string
  isFree?: boolean
  lineup: LineupSlot[]
  tags?: string[]
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
