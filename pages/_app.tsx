import "../styles/editor.css";
import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { normal, bold, italic } from "../lib/fonts";
import Head from "next/head";
import type { AppProps } from "next/app";

import styles from "./_app.module.css";
// import LogkitAnalytics from "../lib/LogkitAnalytics";

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

      <div
        className={`${styles.layout} ${bold.variable} ${italic.variable} ${normal.variable} ${normal.className}`}
      >
        <Component {...pageProps} />
      </div>
      <Analytics />
      {/* <LogkitAnalytics /> */}
    </>
  );
}
