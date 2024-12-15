import type { Note } from "./parser/notes"
import Link from "next/link"
import React from "react"

interface Props {
  notes: Note[]
}
export default function Notes({ notes }: Props) {
  return (
    <>
      {notes.map((note) => (
        <div key={note.id} className="m-0 flex justify-between max-md:flex-col">
          <div>
            {note.category.map((category) => (
              <React.Fragment key={category}>
                {category}
                <span className="mx-1 text-[color-mix(in_oklch,rgb(var(--fg-color))_20%,transparent)]">
                  /
                </span>
              </React.Fragment>
            ))}
            <Link style={{ boxShadow: "none" }} href={`/note/${note.id}`}>
              {note.title}
            </Link>
          </div>
          <div className="text-(--muted-color) text-sm text-nowrap">
            {note.formattedDate}
          </div>
        </div>
      ))}
    </>
  )
}
