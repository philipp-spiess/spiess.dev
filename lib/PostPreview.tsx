import Link from "next/link"

import type { Post } from "./parser/post"

interface Props {
  post: Post
}

export default function PostPreview({ post }: Props) {
  switch (post.type) {
    case "blog": {
      return (
        <div key={post.id}>
          <h3 className="mt-7.5 mb-1 sm:mt-10">
            <Link style={{ boxShadow: "none" }} href={`/blog/${post.id}`}>
              {post.title}
            </Link>
          </h3>
          <small className="block mb-2">
            {post.formattedDate} • {post.readingTime}
          </small>
          <p>{post.excerpt}</p>
        </div>
      )
    }
    case "external": {
      const domain = post.external.split("/")[2]
      return (
        <div key={post.id}>
          <h3 className="mt-7.5 mb-1 sm:mt-10">
            <Link href={post.external} style={{ boxShadow: "none" }}>
              {post.title}
            </Link>
          </h3>
          <small className="block mb-2">
            {post.formattedDate} • {domain}
          </small>
          <p>{post.excerpt}</p>
        </div>
      )
    }
  }
}
