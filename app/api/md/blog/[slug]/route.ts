import fs from "node:fs/promises"
import path from "node:path"
import { NextRequest, NextResponse } from "next/server"

const postsDirectory = path.join(process.cwd(), "posts")

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  try {
    const content = await fs.readFile(fullPath, "utf8")
    return new NextResponse(content, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    })
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }
}
