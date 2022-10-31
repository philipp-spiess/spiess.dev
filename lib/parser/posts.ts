import fs from "fs/promises";
import path from "path";
import { getPost, Post } from "./post";

export const postsDirectory = path.join(process.cwd(), "posts");

export async function getPosts(): Promise<Post[]> {
  // Get file names under /posts
  const dirs = await fs.readdir(postsDirectory);

  let allPostsData: Post[] = [];
  for (const fileName of dirs) {
    if (fileName.indexOf(".md") === -1) {
      continue;
    }
    const stat = await fs.stat(path.join(postsDirectory, fileName));
    if (stat.isDirectory()) {
      continue;
    }

    // Remove ".md" from file name to get the page slug
    const id = fileName.replace(/\.md$/, "");

    allPostsData.push(await getPost(id));
  }

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
