export interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  href?: string
}

export interface FloatingImage {
  id: string
  src: string
  alt: string
  x: string
  y: string
  width: number
  rotation: number
  delay: number
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


export type PercentString = `${number}%`;

export type FloatingImagePosition = {
  x: PercentString;
  y: PercentString;
};

export type FloatingImageSize = {
  width: number;
  height: number;
};

export type FloatingImageItem = {
  id: string;
  src: string;
  alt: string;
  position: FloatingImagePosition;
  size: FloatingImageSize;

  /**
   * 0..1-ish
   * smaller = farther (moves less)
   * bigger  = closer (moves more)
   */
  parallaxSpeed: number;
};