import { postsDirectory } from "./posts"

import format from "date-fns/format"
import fs from "node:fs/promises"
import path from "node:path"
import { parseMarkdown } from "./markdown"

interface ExternalPost {
  type: "external"
  id: string
  title: string
  excerpt: string
  formattedDate: string
  readingTime: string
  contentHtml: string
  external: string
  date: string
}
export interface BlogPost {
  type: "blog"
  id: string
  title: string
  excerpt: string
  formattedDate: string
  readingTime: string
  contentHtml: string
  date: string
}

export type Post = ExternalPost | BlogPost

export async function getPost(id: string): Promise<Post> {
  // Read markdown file as string
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = await fs.readFile(fullPath, "utf8")

  const { data, readingTime, contentHtml, excerpt } =
    await parseMarkdown(fileContents)

  return {
    id,
    ...data,
    type: data.external ? "external" : "blog",
    excerpt,
    formattedDate: format(new Date(data.date), "LLLL d, y"),
    readingTime,
    contentHtml,
  } as Post
}
