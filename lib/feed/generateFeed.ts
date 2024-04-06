import fs from "node:fs"
import path from "node:path"
import { description } from "../Bio"
import type { Note } from "../parser/notes"
import type { Post } from "../parser/post"

const generateRssItem = (postOrNote: Post | Note): string => {
  const url =
    "category" in postOrNote
      ? `https://spiess.dev/note/${postOrNote.id}`
      : postOrNote.type === "external"
        ? postOrNote.external
        : `https://spiess.dev/blog/${postOrNote.id}`

  return `
    <item>
      <guid>${url}</guid>
      <title>${postOrNote.title}</title>
      <link>${url}</link>
      <description>${postOrNote.excerpt}</description>
      <pubDate>${new Date(postOrNote.date).toUTCString()}</pubDate>
    </item>
  `
}

const generateRss = (postOrNote: (Post | Note)[]): string => `
  <rss version="2.0">
    <channel>
      <title>spiess.dev</title>
      <link>https://spiess.dev/</link>
      <description>${description}</description>
      <language>en</language>
      <lastBuildDate>${new Date(postOrNote[0].date).toUTCString()}</lastBuildDate>
      ${postOrNote.map(generateRssItem).join("")}
    </channel>
  </rss>
`

export async function generateFeed(posts: Post[], notes: Note[]) {
  const postsAndNotes = [...posts, ...notes].sort((a, b) => {
    if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
      return 1
    }
    return -1
  })

  const rss = generateRss(postsAndNotes)
  fs.writeFileSync(path.join(__dirname, "../../../public/feed.xml"), rss)
}
