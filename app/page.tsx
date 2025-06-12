import Bio, { description } from "../lib/Bio"
import Notes from "../lib/Notes"
import { getNotes } from "../lib/parser/notes"
import { getPosts } from "../lib/parser/posts"
import PostPreview from "../lib/PostPreview"
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
  const [posts, notes] = await Promise.all([getPosts(), getNotes()])
  
  // Generate feed during build
  if (process.env.NODE_ENV === "production") {
    await generateFeed(posts, notes)
  }

  return (
    <div className="min-h-screen max-w-[1000px] mx-auto md:grid md:grid-cols-[350px_minmax(0,1fr)]">
      <aside className="flex flex-col items-center pt-8 px-2 md:px-7 md:pt-14 md:w-[350px]">
        <Bio />
        <hr className="w-full mt-8" />
        <section className="w-full max-w-[300px]">
          <h3 className="font-black text-lg mb-2">
            Subscribe to my newsletter
          </h3>
          <p className="mb-4 text-(--muted-color)">
            Get surprise updates on what&apos;s on my mind. You&apos;d be among the
            first to join. No spam, pinky promise.
          </p>
          <NewsletterForm />
        </section>
      </aside>

      <main className="px-2 md:px-8">
        <section>
          <h2 className="mt-12 mb-6 md:mt-14">Notes</h2>
          <Notes notes={notes} />
        </section>

        <section>
          <h2 className="mt-12 mb-6 md:mt-14">Posts</h2>
          {posts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </section>
      </main>
    </div>
  )
}