import { getPost } from "../../../lib/parser/post"
import { getPosts } from "../../../lib/parser/posts"
import ArticleHeader from "../../../lib/ArticleHeader"
import Bio from "../../../lib/Bio"
import NewsletterForm from "../../../lib/NewsletterForm"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts
    .filter((post) => post.type === "blog")
    .map((post) => ({
      slug: post.id,
    }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: `https://spiess.dev/api/og?title=${encodeURIComponent(
            post.title
          )}&date=${encodeURIComponent(
            post.formattedDate
          )}&sub=${encodeURIComponent(post.readingTime)}`,
        },
      ],
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  return (
    <>
      <ArticleHeader
        type="blog"
        containerClass="max-w-[610px] px-3.5 mx-auto"
      />

      <div className="max-w-[610px] px-3.5 mx-auto post">
        <h1
          className="font-black text-xl text bg-linear-to-br/oklch from-(--accent-color) to-orange-300 text-pretty bg-clip-text text-transparent"
          style={{ marginBottom: 0 }}
        >
          {post.title}
        </h1>
        <p className="text-(--muted-color)">
          {post.formattedDate} • {post.readingTime}
        </p>

        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

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
          <hr />
        </section>
      </div>

      <div className="max-w-[610px] px-3.5 mx-auto">
        <h3 className="mt-8">About the author</h3>
        <Bio direction="row" />
      </div>
    </>
  )
}