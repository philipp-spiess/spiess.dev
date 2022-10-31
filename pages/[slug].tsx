import { getPost, Post } from "../lib/parser/post";
import { getPosts } from "../lib/parser/posts";
import Bio, { description } from "../lib/Bio";
import Head from "next/head";
import PostPreview from "../lib/PostPreview";
import styles from "./[slug].module.css";
import Avatar from "../lib/Avatar";
import Link from "next/link";

import { bold } from "../lib/fonts";

export async function getStaticPaths() {
  const paths = (await getPosts())
    .filter((post) => !post.external)
    .map((post) => "/" + post.id);
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
  post: Post;
}
export default function Slug(props: Props) {
  const { post } = props;
  return (
    <>
      <Head>
        <title>{post.title} | Philipp Spiess</title>
        <meta property="og:title" content="Philipp Spiess" />
        <meta property="og:description" content={post.excerpt} />
      </Head>

      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerContainer}`}>
          <div>
            <Avatar width={30} />
            <h3 className={styles.author}>Philipp Spiess</h3>
          </div>
          <div className={styles.spacer} />
          <div>
            <Link href="/">All Articles</Link>
          </div>
        </div>
      </header>

      <div className={`${styles.container} ${styles.post} post`}>
        <h1 className={bold.className} style={{ marginBottom: 0 }}>
          {post.title}
        </h1>
        <p>
          {post.formattedDate} • {post.readingTime}
        </p>

        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </div>
      <div className={styles.container}>
        <h4 style={{ marginTop: "3.5rem" }}>About the author</h4>
        <Bio direction="row" />
      </div>
    </>
  );
}
