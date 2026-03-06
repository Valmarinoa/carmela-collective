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

export const metadata: Metadata = {
  title: "Carmela Collective",
  description:
    "Carmela Collective",
  keywords: [
    "latin america",
    "diaspora",
    "music",
    "culture",
    "events",
    "party",
  ],
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
      <body className="antialiased">{children}</body>
    </html>
  );
}