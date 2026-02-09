import { remark } from "remark"
import rehypeShiki from "@shikijs/rehype"
import rehypeStringify from "rehype-stringify"
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

import matter from "gray-matter"
import readingTime from "reading-time"
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

  const excerptContent = excerpt(content)
  content = content
    .replaceAll(
      /(\-\ )(\[x\])/g,
      "$1<input type='checkbox' checked disabled />",
    )
    .replaceAll(/(\-\ )(\[.?\])/g, "$1<input type='checkbox' disabled />")
  
  // Convert unspecified code blocks to plaintext
  const lines = content.split('\n')
  let inCodeBlock = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.match(/^```\s*$/)) {
      if (!inCodeBlock) {
        // This is an opening tag without language specification
        lines[i] = '```plaintext'
        inCodeBlock = true
      } else {
        // This is a closing tag, leave it as is
        inCodeBlock = false
      }
    } else if (line.match(/^```\w+/)) {
      // This is an opening tag with language specification
      inCodeBlock = true
    }
  }
  
  content = lines.join('\n')

  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'prepend',
      properties: {
        className: ['header-anchor'],
        ariaLabel: 'Link to this heading'
      },
      content: {
        type: 'text',
        value: '#'
      }
    })
    .use(rehypeShiki, {
      theme: "vitesse-dark",
      langs: [
        "javascript",
        "typescript", 
        "jsx",
        "tsx",
        "bash",
        "shell",
        "json",
        "css",
        "html",
        "markdown",
        "python",
        "rust",
        "go",
        "sql",
        "plaintext" as any
      ],
      transformers: [
        {
          name: "remove-italics",
          span(node) {
            // Remove font-style: italic from all spans
            if (node.properties.style) {
              node.properties.style = (node.properties.style as string).replace(/font-style:\s*italic;?/g, '')
            }
            return node
          }
        }
      ]
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)
  let contentHtml = processedContent.toString()
  
  // Convert plaintext code blocks by looking for the original markdown
  if (content.includes('```plaintext')) {
    contentHtml = contentHtml.replace(
      /<pre class="shiki vitesse-dark"[^>]*>([\s\S]*?)<\/pre>/g,
      (match, innerContent) => {
        // Check if this block only has "line" spans (no syntax highlighting)
        const hasOnlyLineSpans = innerContent.includes('<span class="line">') && 
                                !innerContent.match(/<span[^>]*style[^>]*color:/);
        if (hasOnlyLineSpans) {
          return match.replace(
            /<pre class="shiki vitesse-dark"[^>]*>/,
            '<pre class="shiki vitesse-dark claude-plaintext" style="background-color:#121212;color:#dbd7ca !important" tabindex="0">'
          )
        }
        return match
      }
    )
  }

  return {
    data,
    contentHtml,
    excerpt: excerptContent,
    readingTime: readingTime(content).text,
  }
}
