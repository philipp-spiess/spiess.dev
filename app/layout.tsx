import "./global.css"
import { Analytics } from "@vercel/analytics/react"
import { Merriweather, JetBrains_Mono } from "next/font/google"
import { LogkitAnalytics } from "@logkit/client-react"
import type { Metadata } from "next"
import { description } from "../lib/Bio"

const marriweather = Merriweather({
  weight: ["400", "700", "900"],
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--marriweather",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  weight: ["400"],
  subsets: ["latin", "latin-ext"],
  variable: "--jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://spiess.dev"),
  title: {
    default: "Philipp Spiess",
    template: "%s | Philipp Spiess",
  },
  description,
  keywords: ["blog", "JavaScript", "React", "TypeScript", "WebAssembly", "Elixir", "Ruby", "Node.js", "Go"],
  authors: [{ name: "Philipp Spiess" }],
  creator: "Philipp Spiess",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spiess.dev",
    siteName: "Philipp Spiess",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@philippspiess",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#8c7001" />
        <meta
          name="keywords"
          content="blog, JavaScript, React, TypeScript, WebAssembly, Elixir, Ruby, Node.js, Go"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <div className={`text-base mb-12 ${marriweather.variable} ${jetbrainsMono.variable} font-serif`}>
          {children}
        </div>
        <Analytics />
        <LogkitAnalytics />
      </body>
    </html>
  )
}
