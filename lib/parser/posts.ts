import fs from "node:fs/promises"
import path from "node:path"
import { getPost, type Post } from "./post"

export const postsDirectory = path.join(process.cwd(), "posts")

export async function getPosts(): Promise<Post[]> {
  // Get file names under /posts
  const dirs = await fs.readdir(postsDirectory)

  const allPostsData: Post[] = []
  for (const fileName of dirs) {
    if (fileName.indexOf(".md") === -1) {
      continue
    }
    const stat = await fs.stat(path.join(postsDirectory, fileName))
    if (stat.isDirectory()) {
      continue
    }

    // Remove ".md" from file name to get the page slug
    const id = fileName.replace(/\.md$/, "")

    allPostsData.push(await getPost(id))
  }

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    }
    if (a > b) {
      return -1
    }
    return 0
  })
}
