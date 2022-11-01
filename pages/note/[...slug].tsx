import Head from "next/head";
import styles from "./[...slug].module.css";

import { bold } from "../../lib/fonts";
import { getNotes, Note } from "../../lib/parser/notes";
import ArticleHeader from "../../lib/ArticleHeader";
import Notes from "../../lib/Notes";
import React from "react";
import Bio from "../../lib/Bio";

export async function getStaticPaths() {
  const paths = (await getNotes()).map((note) => "/note/" + note.id);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string[] };
}) {
  const notes = await getNotes();
  const note = notes.find((note) => note.id === params.slug.join("/"));
  return {
    props: { note: note, notes },
    revalidate: 60 * 60,
  };
}

interface Props {
  note: Note;
  notes: Note[];
}
export default function Slug({ note, notes }: Props) {
  return (
    <>
      <Head>
        <title>
          {note.title} | {[...note.category].reverse().join(" | ")} | Philipp
          Spiess
        </title>
        <meta property="og:title" content="Philipp Spiess" />
      </Head>

      <ArticleHeader type="note" containerClass={styles.container} />

      <div className={`${styles.container} ${styles.post} post`}>
        <h1 className={bold.className} style={{ marginBottom: 0 }}>
          {note.title}
        </h1>
        <p>
          {note.formattedDate} •{" "}
          {note.category.map((category, index) => (
            <React.Fragment key={category}>
              {index !== 0 ? <span className={styles.separator}>/</span> : null}
              {category}
            </React.Fragment>
          ))}
        </p>

        <div dangerouslySetInnerHTML={{ __html: note.contentHtml }} />

        <section>
          <hr />
          <h2>Other Notes</h2>
          <Notes notes={notes} />
        </section>
      </div>

      <div className={styles.container}>
        <h4 style={{ marginTop: "3.5rem" }}>About the author</h4>
        <Bio direction="row" />
      </div>
    </>
  );
}
