import {DM_Sans, Sora} from "next/font/google";
import localFont from "next/font/local"
export const  f_one = Sora({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-inter",
  display: "swap",
});

export const  f_two = DM_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-inter",
  display: "swap",
});
