import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import "./tailwind.css"

export const meta = () => [
  { charSet: "utf-8" },
  { title: "My app" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
]

export default function App() {
  return (
    <html lang="en" className="dark [color-scheme:dark] min-h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
