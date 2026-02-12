import Bio, { description } from "../lib/Bio"
import { getNotes } from "../lib/parser/notes"
import { getPosts } from "../lib/parser/posts"
import { getPodcasts } from "../lib/parser/podcasts"
import FeedList, { type FeedItem } from "../lib/FeedList"
import NewsletterForm from "../lib/NewsletterForm"
import { generateFeed } from "../lib/feed/generateFeed"

export const metadata = {
  title: "spiess.dev",
  openGraph: {
    title: "spiess.dev",
    description: description,
    images: [
      {
        url: "https://spiess.dev/api/og?title=spiess.dev&sub=&date=",
      },
    ],
  },
  alternates: {
    types: {
      "application/rss+xml": "https://spiess.dev/feed.xml",
    },
  },
}

export const revalidate = 43200 // 12 hours

export default async function Home() {
  const [posts, notes, podcasts] = await Promise.all([
    getPosts(),
    getNotes(),
    getPodcasts(),
  ])

  // Generate feed during build
  if (process.env.NODE_ENV === "production") {
    await generateFeed(posts, notes)
  }

  // Build unified feed items
  const feedItems: FeedItem[] = []

  for (const post of posts) {
    const href =
      post.type === "external" ? post.external : `/blog/${post.id}`
    const label =
      post.type === "external" ? post.external.split("/")[2] : ""
    feedItems.push({
      title: post.title,
      href,
      date: post.date,
      formattedDate: post.formattedDate,
      category: "Posts",
      label,
    })
  }

  for (const note of notes) {
    feedItems.push({
      title: note.title,
      href: `/note/${note.id}`,
      date: note.date,
      formattedDate: note.formattedDate,
      category: "Notes",
      label: note.category.join(" / "),
    })
  }

  for (const episode of podcasts) {
    feedItems.push({
      title: episode.title,
      href: episode.href,
      date: episode.date,
      formattedDate: episode.formattedDate,
      category: "Podcasts",
      label: episode.podcast,
    })
  }

  // Sort all items by date descending
  feedItems.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  return (
    <div className="min-h-screen max-w-[1000px] mx-auto md:grid md:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="flex flex-col items-start pt-8 px-2 md:items-center md:px-7 md:pt-14 md:w-[300px]">
        <Bio />
        <hr className="mt-8 hidden w-full md:block" />
        <section className="hidden w-full px-2 md:block md:px-0">
          <h3 className="mb-2 text-lg font-black">Join my newsletter</h3>
          <p className="mb-4 text-(--muted-color)">
            Get surprise updates on what&apos;s on my mind. No spam, pinky
            promise.
          </p>
          <NewsletterForm />
        </section>
      </aside>

      <main className="px-2 pt-8 md:px-8 md:pt-14">
        <FeedList items={feedItems} />

        <section className="mt-12 md:hidden">
          <hr className="mb-8 w-full" />
          <div className="w-full">
            <h3 className="mb-2 text-lg font-black">Join my newsletter</h3>
            <p className="mb-4 text-(--muted-color)">
              Get surprise updates on what&apos;s on my mind. No spam, pinky
              promise.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>
    </div>
  )
}
