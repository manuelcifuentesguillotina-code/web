import localFont from "next/font/local";

export const displayFont = localFont({
  src: "../../public/fonts/anton-regular.ttf",
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

export const bodyFont = localFont({
  src: "../../public/fonts/manrope-variable.ttf",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});
