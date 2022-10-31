import { getPosts } from "../lib/parser/posts";
import { Post } from "../lib/parser/post";
import Bio, { description } from "../lib/Bio";
import Head from "next/head";
import PostPreview from "../lib/PostPreview";
import styles from "./index.module.css";

export async function getStaticProps() {
  return {
    props: {
      posts: await getPosts(),
    },
  };
}

interface Props {
  posts: Post[];
}
export default function Home({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Philipp Spiess</title>
        <meta property="og:title" content="Philipp Spiess" />
        <meta property="og:description" content={description} />
      </Head>

      <div className={styles.container}>
        <aside className={styles.left}>
          <Bio />
        </aside>

        <main className={styles.right}>
          {posts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </main>
      </div>
    </>
  );
}
