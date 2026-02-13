import { NextResponse } from "next/server"
import { getPosts } from "../../../lib/parser/posts"
import { getNotes } from "../../../lib/parser/notes"
import { getPodcasts } from "../../../lib/parser/podcasts"

export async function GET() {
  const [posts, notes, podcasts] = await Promise.all([
    getPosts(),
    getNotes(),
    getPodcasts(),
  ])

  type FeedItem = { title: string; href: string; date: string; formattedDate: string; label: string }
  const items: FeedItem[] = []

  for (const post of posts) {
    const href = post.type === "external" ? post.external : `/blog/${post.id}`
    const label = post.type === "external" ? post.external.split("/")[2] : ""
    items.push({ title: post.title, href, date: post.date, formattedDate: post.formattedDate, label })
  }

  for (const note of notes) {
    items.push({ title: note.title, href: `/note/${note.id}`, date: note.date, formattedDate: note.formattedDate, label: note.category.join(" / ") })
  }

  for (const episode of podcasts) {
    items.push({ title: episode.title, href: episode.href, date: episode.date, formattedDate: episode.formattedDate, label: episode.podcast })
  }

  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  const lines: string[] = []

  lines.push("# Philipp Spiess [ˈʃpiːs]")
  lines.push("")
  lines.push("Somewhere between AI and UI.")
  lines.push("Prev: [Tailwind Labs](https://tailwindcss.com), [Meta](https://facebook.com), [Sourcegraph](https://sourcegraph.com), [React DOM](https://reactjs.org/) team.")
  lines.push("")
  lines.push("- X: https://twitter.com/philippspiess")
  lines.push("- GitHub: https://github.com/philipp-spiess")
  lines.push("- LinkedIn: https://www.linkedin.com/in/philipp-spiess/")
  lines.push("- Email: hi@spiess.dev")
  lines.push("")
  lines.push("---")
  lines.push("")

  for (const item of items) {
    const label = item.label ? ` (${item.label})` : ""
    lines.push(`- ${item.formattedDate} — [${item.title}](${item.href})${label}`)
  }

  lines.push("")

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
