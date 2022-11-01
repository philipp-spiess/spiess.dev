import { Note } from "./parser/notes";
import Link from "next/link";
import React from "react";
import styles from "./Notes.module.css";

interface Props {
  notes: Note[];
}
export default function Notes({ notes }: Props) {
  return (
    <>
      {notes.map((note) => (
        <div key={note.id} className={styles.note}>
          <div>
            {note.category.map((category) => (
              <React.Fragment key={category}>
                {category}
                <span className={styles.separator}>/</span>
              </React.Fragment>
            ))}
            <Link style={{ boxShadow: `none` }} href={"/note/" + note.id}>
              {note.title}
            </Link>
          </div>
          <div className={styles.date}>{note.formattedDate}</div>
        </div>
      ))}
    </>
  );
}
