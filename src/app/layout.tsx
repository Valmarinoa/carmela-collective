import type { Metadata } from "next";
import "../styles/globals.css";
import {
  inter,
  arialRounded,
  funtastic,
  leakage,
  myriad,
  spintee,
} from "@/lib/fonts";
import CurvedNavigation from "@/components/CurvedNavigation";
import SocialIcons from "@/components/SocialIcons";
import Granient from "@/components/Granient";

export const metadata: Metadata = {
  metadataBase: new URL("https://carmela-collective.vercel.app"),
  title: {
    default: "Carmela Collective",
    template: "%s | Carmela Collective",
  },
  description:
    "Carmela Collective is a Latin American cultural collective in the Netherlands showcasing music, events, and artists from the Latin American diaspora.",
  keywords: [
    "Latin American music",
    "Latin diaspora Netherlands",
    "Latin events Amsterdam",
    "Latin DJs Netherlands",
    "Carmela Collective",
    "Latin American culture",
    "Latin music events Europe",
  ],

  icons: {
    icon: "/images/flower.png",
    shortcut: "/images/flower.png",
    apple: "/images/flower.png",
  },

  openGraph: {
    title: "Carmela Collective",
    description:
      "A Latin American cultural collective showcasing music, events, and artists from the Latin American diaspora.",
    url: "https://carmela-collective.vercel.app",
    siteName: "Carmela Collective",
    images: [
      {
        url: "/images/favicon.png",
        width: 1200,
        height: 630,
        alt: "Carmela Collective",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Carmela Collective",
    description:
      "A Latin American cultural collective showcasing music, events, and artists from the diaspora.",
    images: ["/images/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        inter.variable,
        arialRounded.variable,
        funtastic.variable,
        leakage.variable,
        myriad.variable,
        spintee.variable,
      ].join(" ")}
    >
      <body className="antialiased relative min-h-screen">
        {/* Animated WebGL Background - Fixed behind everything */}
        <Granient 
          color1="#7A8472"      // Pink/Lavender
          color2="#5F625B"      // Deep Purple
          color3="#879180"      // Light Purple
          grainAmount={0.08}    // Subtle grain
          timeSpeed={0.15}      // Slow, elegant movement
          warpStrength={0.8}    // Gentle warping
          contrast={1.3}
        />
        
        {/* Fixed Social Icons */}
        <div className="flex justify-between items-start pt-8 fixed top-14 left-6 md:top-10 md:left-20 z-[30]">
          <SocialIcons />
        </div>
        
        {/* Main Content */}
        {children}
        
        {/* Navigation */}
        <CurvedNavigation />
      </body>
    </html>
  );
}