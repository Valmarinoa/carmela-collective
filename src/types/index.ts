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
  mediaType: FloatingMediaType;
  src?: string;
  vid?: string;
  alt: string;
  position: FloatingImagePosition;
  size: FloatingImageSize;
  parallaxSpeed: number;
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
