import Avatar from "./Avatar";
import Link from "next/link";
import React from "react";
import styles from "./ArticleHeader.module.css";

interface Props {
  containerClass: string;
  type: "note" | "blog";
}
export default function ArticleHeader(props: Props) {
  return (
    <header className={styles.header}>
      <div className={`${props.containerClass} ${styles.headerContainer}`}>
        <div>
          <Link href="/" className={styles.authorLink}>
            <Avatar width={30} />
            <h3 className={styles.author}>Philipp Spiess</h3>
          </Link>
        </div>
        <div className={styles.spacer} />
        <div>
          <Link href="/">
            All {props.type === "note" ? "Notes" : "Articles"}
          </Link>
        </div>
      </div>
    </header>
  );
}
