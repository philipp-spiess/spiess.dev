import { Merriweather } from "@next/font/google"

const marriweatherNormal = Merriweather({
  weight: "400",
  subsets: ["latin"],
  variable: "--marriweather",
})
const marriweatherBold = Merriweather({
  weight: "900",
  subsets: ["latin"],
  variable: "--marriweather-bold",
})

const marriweatherItalic = Merriweather({
  weight: "400",
  subsets: ["latin"],
  style: "italic",
  variable: "--marriweather-italic",
})

export const normal = marriweatherNormal
export const bold = marriweatherBold
export const italic = marriweatherItalic
