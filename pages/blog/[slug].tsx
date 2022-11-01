import { BlogPost, getPost, Post } from "../../lib/parser/post";
import { getPosts } from "../../lib/parser/posts";
import ArticleHeader from "../../lib/ArticleHeader";
import Avatar from "../../lib/Avatar";
import Bio from "../../lib/Bio";
import Head from "next/head";
import Link from "next/link";
import styles from "./[slug].module.css";

import { bold } from "../../lib/fonts";

export async function getStaticPaths() {
  const paths = (await getPosts())
    .filter((post) => post.type === "blog")
    .map((post) => "/blog/" + post.id);
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
        <meta property="og:title" content="Philipp Spiess" />
        <meta property="og:description" content={post.excerpt} />
      </Head>

      <ArticleHeader type="blog" containerClass={styles.container} />

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
