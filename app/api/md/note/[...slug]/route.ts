import fs from "node:fs/promises"
import path from "node:path"
import { NextRequest, NextResponse } from "next/server"

const notesDirectory = path.join(process.cwd(), "notes")

function getSlug(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

async function findNoteFile(
  dir: string,
  slugParts: string[]
): Promise<string | null> {
  try {
    const entries = await fs.readdir(dir)

    if (slugParts.length === 1) {
      // Last part — look for a matching .md file
      for (const entry of entries) {
        if (entry.endsWith(".md") && getSlug(entry.replace(".md", "")) === slugParts[0]) {
          return path.join(dir, entry)
        }
      }
      return null
    }

    // Intermediate part — look for a matching directory
    for (const entry of entries) {
      const fullPath = path.join(dir, entry)
      const stat = await fs.stat(fullPath)
      if (stat.isDirectory() && getSlug(entry) === slugParts[0]) {
        return findNoteFile(fullPath, slugParts.slice(1))
      }
    }

    return null
  } catch {
    return null
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const filePath = await findNoteFile(notesDirectory, slug)

  if (!filePath) {
    return new NextResponse("Not found", { status: 404 })
  }

  try {
    const content = await fs.readFile(filePath, "utf8")
    return new NextResponse(content, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    })
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }
}
