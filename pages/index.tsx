import { getPosts } from "../lib/parser/posts";
import { Post } from "../lib/parser/post";
import Bio, { description } from "../lib/Bio";
import Head from "next/head";
import PostPreview from "../lib/PostPreview";
import styles from "./index.module.css";
import Notes from "../lib/Notes";
import { getNotes, Note } from "../lib/parser/notes";

export async function getStaticProps() {
  const [posts, notes] = await Promise.all([getPosts(), getNotes()]);
  return {
    props: {
      posts,
      notes,
    },
    revalidate: 60 * 60,
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
        <title>Philipp Spiess</title>
        <meta property="og:title" content="Philipp Spiess" />
        <meta property="og:description" content={description} />
      </Head>

      <div className={styles.container}>
        <aside className={styles.left}>
          <Bio />
        </aside>

        <main className={styles.right}>
          <section>
            <h2 className={styles.sectionTitle}>Notes</h2>
            <p>
              A collection of my random thoughts. Don’t expect a high bar for
              quality but perhaps you find something interesting. Inspired by
              Josh Branchaud’s{" "}
              <a href="https://github.com/jbranchaud/til">til</a> and Shawn
              Wang’s{" "}
              <a href="https://www.swyx.io/learn-in-public/">Learn In Public</a>
              .
            </p>
            <Notes notes={notes} />
          </section>

          <section>
            <h2 className={styles.sectionTitle}>Posts</h2>
            {posts.map((post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </section>
        </main>
      </div>
    </>
  );
}
