import fs from "node:fs/promises"
import path from "node:path"
import { format } from "date-fns"

interface RawPodcastEpisode {
  title: string
  href: string
  date: string
  podcast?: string
}

export interface PodcastEpisode {
  title: string
  href: string
  date: string
  formattedDate: string
  podcast: string
}

const podcastsFile = path.join(process.cwd(), "podcasts.json")

export async function getPodcasts(): Promise<PodcastEpisode[]> {
  const fileContents = await fs.readFile(podcastsFile, "utf8")
  const rawEpisodes = JSON.parse(fileContents) as RawPodcastEpisode[]

  return rawEpisodes
    .map((episode) => ({
      title: episode.title,
      href: episode.href,
      date: new Date(episode.date).toISOString(),
      formattedDate: format(new Date(episode.date), "LLLL d, y"),
      podcast: episode.podcast ?? "Podcast",
    }))
    .sort(({ date: a }, { date: b }) => {
      if (a < b) {
        return 1
      }
      if (a > b) {
        return -1
      }
      return 0
    })
}
