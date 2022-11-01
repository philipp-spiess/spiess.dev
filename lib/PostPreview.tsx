import Link from "next/link";
import styles from "./PostPreview.module.css";

import { Post } from "./parser/post";

interface Props {
  post: Post;
}
export default function PostPreview({ post }: Props) {
  switch (post.type) {
    case "blog": {
      return (
        <div key={post.id}>
          <h3 className={styles.postTitle}>
            <Link style={{ boxShadow: `none` }} href={"/blog/" + post.id}>
              {post.title}
            </Link>
          </h3>
          <small>
            {post.formattedDate} • {post.readingTime}
          </small>
          <p>{post.excerpt}</p>
        </div>
      );
    }
    case "external": {
      const domain = post.external.split("/")[2];
      return (
        <div key={post.id}>
          <h3 className={styles.postTitle}>
            <Link href={post.external} style={{ boxShadow: `none` }}>
              {post.title}
            </Link>
          </h3>
          <small>
            {post.formattedDate} • {domain}
          </small>
          <p>{post.excerpt}</p>
        </div>
      );
    }
  }
  return null;
}
