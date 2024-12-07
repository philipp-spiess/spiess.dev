import Avatar from "./Avatar"
import Link from "next/link"
import React from "react"

interface Props {
  containerClass: string
  type: "note" | "blog"
}
export default function ArticleHeader(props: Props) {
  return (
    <header className="w-full">
      <div className={`${props.containerClass} justify-between h-14 flex items-center`}>
        <Link href="/" className="shadow-none flex items-center text-(--fg-color)">
          <Avatar width={30} className="mb-0"/>
          <h3 className="mb-0 mx-3 font-bold text-lg vertical-align-top">spiess.dev</h3>
        </Link>
        <div>
          <Link href="/" className="text-(--fg-color)">
            All {props.type === "note" ? "Notes" : "Articles"}
          </Link>
        </div>
      </div>
    </header>
  )
}
