import format from "date-fns/format"
import { parseMarkdown } from "./markdown"
import fs from "fs/promises"
import path from "path"

export interface Note {
  title: string
  id: string
  formattedDate: string
  date: string
  category: string[]
  contentHtml: string
  excerpt: string
}

const HIDDEN_FILES = new Set(["README.md"])
const HIDDEN_DIRS = new Set(["Unlisted"])

export async function getNotes(): Promise<Note[]> {
  const notes: Note[] = []
  const rawNotes = (await fetchNotes()) as any
  for (const rawNote of rawNotes) {
    const { data, contentHtml, excerpt } = await parseMarkdown(rawNote.content)

    const date = data.date 
      ? (data.date instanceof Date ? data.date.toISOString() : new Date(data.date).toISOString())
      : new Date().toISOString()

    notes.push({
      title: rawNote.path.split("/").pop().replace(".md", ""),
      id: getId(rawNote.path),
      date,
      formattedDate: format(new Date(date), "LLLL d, Y"),
      category: rawNote.path.split("/").slice(0, -1),
      excerpt,
      contentHtml,
    })
  }

  // Sort posts by date
  return notes.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    }
    if (a > b) {
      return -1
    }
    return 0
  })
}

interface RawNote {
  path: string
  content: string
}
async function fetchNotes(): Promise<RawNote[]> {
  const notesDir = path.join(process.cwd(), 'notes')
  return recursivelyReadNotes(notesDir, '')
}

async function recursivelyReadNotes(dir: string, relativePath: string): Promise<RawNote[]> {
  const result: RawNote[] = []
  
  try {
    const entries = await fs.readdir(dir)
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry)
      const stat = await fs.stat(fullPath)
      const entryRelativePath = relativePath ? path.join(relativePath, entry) : entry
      
      if (stat.isDirectory()) {
        if (HIDDEN_DIRS.has(entry)) {
          continue
        }
        
        const subNotes = await recursivelyReadNotes(fullPath, entryRelativePath)
        result.push(...subNotes)
      } else if (stat.isFile() && entry.endsWith('.md')) {
        if (HIDDEN_FILES.has(entry)) {
          continue
        }
        
        const content = await fs.readFile(fullPath, 'utf-8')
        result.push({
          path: entryRelativePath,
          content,
        })
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }
  
  return result
}

function getId(text: string): string {
  return text.replace(".md", "").split("/").map(getSlug).join("/")
}

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
