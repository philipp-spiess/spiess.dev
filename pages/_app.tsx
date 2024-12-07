import "./root.css"

import { Analytics } from "@vercel/analytics/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { Merriweather } from "@next/font/google"

const marriweather = Merriweather({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--marriweather",
})

import { LogkitAnalytics } from "@logkit/client-react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#8c7001" />
        <meta
          name="keywords"
          content="blog, JavaScript, React, TypeScript, WebAssembly, Elixir, Ruby, Node.js, Go"
        />
      </Head>

      <div className={`text-base mb-12 ${marriweather.variable} font-serif`}>
        <Component {...pageProps} />
      </div>
      <Analytics />
      <LogkitAnalytics />
    </>
  )
}
