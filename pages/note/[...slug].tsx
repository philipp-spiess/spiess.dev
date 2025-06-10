import Head from "next/head";

import { getNotes, type Note } from "../../lib/parser/notes";
import ArticleHeader from "../../lib/ArticleHeader";
import Notes from "../../lib/Notes";
import React from "react";
import Bio from "../../lib/Bio";
import NewsletterForm from "../../lib/NewsletterForm";

export async function getStaticPaths() {
  const paths = (await getNotes()).map((note) => `/note/${note.id}`);
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
    revalidate: 12 * 60 * 60,
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
        <meta property="og:title" content={note.title} />
        <meta
          property="og:image"
          content={`https://spiess.dev/api/og?title=${encodeURIComponent(
            note.title
          )}&date=${encodeURIComponent(
            note.formattedDate
          )}&sub=${encodeURIComponent(note.category.join("/"))}`}
        />
      </Head>

      <ArticleHeader
        type="note"
        containerClass="max-w-[610px] px-[0.875rem] mx-auto"
      />

      <div className="max-w-[610px] px-[0.875rem] mx-auto post">
        <h1
          className="font-black text-xl text bg-linear-to-br/oklch from-(--accent-color) text-pretty to-orange-300 bg-clip-text text-transparent"
          style={{ marginBottom: 0 }}
        >
          {note.title}
        </h1>
        <p className="text-(--muted-color)">
          {note.formattedDate} •{" "}
          {note.category.map((category, index) => (
            <React.Fragment key={category}>
              {index !== 0 ? (
                <span className="mx-1 text-[color-mix(in_oklch,rgb(var(--fg-color))_20%,transparent)]">
                  /
                </span>
              ) : null}
              {category}
            </React.Fragment>
          ))}
        </p>

        <div dangerouslySetInnerHTML={{ __html: note.contentHtml }} />

        <section>
          <hr />
          <NewsletterForm className="my-8" title="Enjoyed this note?" />
          <hr />
          <h3>Other Notes</h3>
          <Notes notes={notes} />
        </section>
      </div>

      <div className="max-w-[610px] px-[0.875rem] mx-auto">
        <h3 className="mt-8">About the author</h3>
        <Bio direction="row" />
      </div>
    </>
  );
}
