import { type BlogPost, getPost } from "../../lib/parser/post";
import { getPosts } from "../../lib/parser/posts";
import ArticleHeader from "../../lib/ArticleHeader";
import Bio from "../../lib/Bio";
import Head from "next/head";
import NewsletterForm from "../../lib/NewsletterForm";

export async function getStaticPaths() {
  const paths = (await getPosts())
    .filter((post) => post.type === "blog")
    .map((post) => `/blog/${post.id}`);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return {
    props: { post: await getPost(params.slug) },
  };
}

interface Props {
  post: BlogPost;
}
export default function Slug(props: Props) {
  const { post } = props;
  return (
    <>
      <Head>
        <title>{post.title} | Philipp Spiess</title>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:image"
          content={`https://spiess.dev/api/og?title=${encodeURIComponent(
            post.title
          )}&date=${encodeURIComponent(
            post.formattedDate
          )}&sub=${encodeURIComponent(post.readingTime)}`}
        />
      </Head>

      <ArticleHeader
        type="blog"
        containerClass="max-w-[610px] px-[0.875rem] mx-auto"
      />

      <div className="max-w-[610px] px-[0.875rem] mx-auto post">
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

      <div className="max-w-[610px] px-[0.875rem] mx-auto">
        <h3 className="mt-8">About the author</h3>
        <Bio direction="row" />
      </div>
    </>
  );
}
