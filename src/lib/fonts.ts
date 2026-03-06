import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const arialRounded = localFont({
  src: "../fonts/Arial-Rounded-Bold.ttf",
  variable: "--font-arial",
  display: "swap",
});

export const funtastic = localFont({
  src: "../fonts/Funtastic.ttf",
  variable: "--font-funtastic",
  display: "swap",
});

export const leakage = localFont({
  src: "../fonts/Leakage.ttf",
  variable: "--font-leakage",
  display: "swap",
});

export const myriad = localFont({
  src: "../fonts/MyriadPro-Regular.ttf",
  variable: "--font-myriad",
  display: "swap",
});

export const spintee = localFont({
  src: "../fonts/Spintee.ttf",
  variable: "--font-spintee",
  display: "swap",
});