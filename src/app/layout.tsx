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

export const metadata: Metadata = {
  metadataBase: new URL("https://carmelacollective.com"),
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
        url: "/images/flower.png",
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
    images: ["/images/flower.png"],
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
      <body className="antialiased ">{children}   <CurvedNavigation /></body>
    </html>
  );
}