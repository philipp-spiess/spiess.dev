import Head from "next/head";
import Bio, { description } from "../lib/Bio";
import { generateFeed } from "../lib/feed/generateFeed";
import Notes from "../lib/Notes";
import { getNotes, type Note } from "../lib/parser/notes";
import type { Post } from "../lib/parser/post";
import { getPosts } from "../lib/parser/posts";
import PostPreview from "../lib/PostPreview";
import NewsletterForm from "../lib/NewsletterForm";

export async function getStaticProps() {
  const [posts, notes] = await Promise.all([getPosts(), getNotes()]);

  await generateFeed(posts, notes);

  return {
    props: {
      posts,
      notes,
    },
    revalidate: 12 * 60 * 60,
  };
}

interface Props {
  posts: Post[];
  notes: Note[];
}
export default function Home({ posts, notes }: Props) {
  return (
    <>
      <Head>
        <title>spiess.dev</title>
        <meta property="og:title" content="spiess.dev" />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://spiess.dev/api/og?title=spiess.dev&sub=&date="
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="/feed.xml"
        />
      </Head>

      <div className="min-h-screen max-w-[1000px] mx-auto md:grid md:grid-cols-[350px_minmax(0,1fr)]">
        <aside className="flex flex-col items-center pt-8 px-2 md:px-7 md:pt-14 md:w-[350px]">
          <Bio />
          <hr className="w-full mt-8" />
          <section className="w-full max-w-[300px]">
            <h3 className="font-black text-lg mb-2">
              Subscribe to my newsletter
            </h3>
            <p className="mb-4 text-(--muted-color)">
              Get surprise updates on what's on my mind. You'd be among the
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
    </>
  );
}
