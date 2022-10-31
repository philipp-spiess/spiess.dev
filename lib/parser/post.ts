import { excerpt } from "./excerpt";
import { postsDirectory } from "./posts";
import { remark } from "remark";

import format from "date-fns/format";
import fs from "fs/promises";
import html from "remark-html";
import prism from "remark-prism";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import remarkFootnotes from "remark-footnotes";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  formattedDate: string;
  readingTime: string;
  contentHtml: string;
  external?: string;
}

export async function getPost(id: string): Promise<Post> {
  // Read markdown file as string
  const fullPath = path.join(postsDirectory, id + ".md");
  const fileContents = await fs.readFile(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const { content, data } = matterResult;

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(prism)
    .use(remarkFootnotes)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    ...data,
    excerpt: excerpt(content),
    formattedDate: format(new Date(data.date), "LLLL d, Y"),
    readingTime: readingTime(content).text,
    contentHtml,
  } as Post;
}
