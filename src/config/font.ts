import { Outfit, Inter, Geist } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-outfit",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const fontVariables = `${outfit.variable} ${geist.variable}`;
