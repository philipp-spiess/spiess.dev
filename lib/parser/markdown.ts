import { remark } from "remark"

import matter from "gray-matter"
import readingTime from "reading-time"
import remarkFootnotes from "remark-footnotes"
import html from "remark-html"
import prism from "remark-prism"
import { excerpt } from "./excerpt"

export async function parseMarkdown(markdown: string): Promise<{
  data: any
  excerpt: string
  contentHtml: string
  readingTime: string
}> {
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(markdown)

  let { content, data } = matterResult

  content = content
    .replaceAll(/\-\ \[x\]/g, "<input type='checkbox' checked disabled />")
    .replaceAll(/\-\ \[.?\]/g, "<input type='checkbox' disabled />")

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(prism)
    .use(remarkFootnotes)
    .process(content)
  const contentHtml = processedContent.toString()

  return {
    data,
    contentHtml,
    excerpt: excerpt(content),
    readingTime: readingTime(content).text,
  }
}
