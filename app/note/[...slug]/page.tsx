import { getNotes } from "../../../lib/parser/notes"
import ArticleHeader from "../../../lib/ArticleHeader"
import Bio from "../../../lib/Bio"
import NewsletterForm from "../../../lib/NewsletterForm"
import React from "react"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const notes = await getNotes()
  return notes.map((note) => ({
    slug: note.id.split("/"),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const notes = await getNotes()
  const note = notes.find((note) => note.id === slug.join("/"))
  
  if (!note) {
    return {
      title: "Note not found",
    }
  }

  return {
    title: `${note.title} | ${[...note.category].reverse().join(" | ")}`,
    openGraph: {
      title: note.title,
      images: [
        {
          url: `https://spiess.dev/api/og?title=${encodeURIComponent(
            note.title
          )}&date=${encodeURIComponent(
            note.formattedDate
          )}&sub=${encodeURIComponent(note.category.join("/"))}`,
        },
      ],
    },
  }
}

export const revalidate = 43200 // 12 hours

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const notes = await getNotes()
  const note = notes.find((note) => note.id === slug.join("/"))

  if (!note) {
    return <div>Note not found</div>
  }

  return (
    <>
      <ArticleHeader
        type="note"
        containerClass="max-w-[610px] px-3.5 mx-auto"
      />

      <div className="max-w-[610px] px-3.5 mx-auto post">
        <h1
          className="font-black text-xl text bg-linear-to-br/oklch from-(--accent-color) text-pretty to-orange-300 bg-clip-text text-transparent"
          style={{ marginBottom: 0 }}
        >
          {note.title}
        </h1>
        <p className="text-(--muted-color)">
          {note.formattedDate} •{" "}
          {note.category.map((category, index) => (
            <React.Fragment key={category}>
              {index !== 0 ? (
                <span className="mx-1 text-[color-mix(in_oklch,rgb(var(--fg-color))_20%,transparent)]">
                  /
                </span>
              ) : null}
              {category}
            </React.Fragment>
          ))}
        </p>

        <div dangerouslySetInnerHTML={{ __html: note.contentHtml }} />

        <section>
          <hr />
          <div className="my-8">
            <p className="mb-3">
              <em>Pssst!</em> If you liked what you just read, I just started a
              newsletter where I share things whenever inspiration strikes.
              You&apos;d be among the first to join our little secret club. No spam,
              pinky promise.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </div>

      <div className="max-w-[610px] px-3.5 mx-auto">
        <h3 className="mt-8">About the author</h3>
        <Bio direction="row" />
      </div>
    </>
  )
}