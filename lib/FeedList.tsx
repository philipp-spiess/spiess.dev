"use client"

import Link from "next/link"
import { useMemo, useRef, useState } from "react"

export interface FeedItem {
  title: string
  href: string
  date: string
  formattedDate: string
  category: "Notes" | "Posts" | "Podcasts"
  label: string
}

type CategoryKey = "All" | "Posts" | "Notes" | "Podcasts"
type SortMode =
  | "titleAsc"
  | "titleDesc"
  | "category"
  | "widthAsc"
  | "widthDesc"
  | "dateDesc"
  | "dateAsc"
  | "dayOfMonthDesc"
  | "dayOfMonthAsc"

type Category = {
  key: CategoryKey
  dotClass?: string
  description?: string
}

const CATEGORIES: Category[] = [
  { key: "All", description: "Everything in one place." },
  {
    key: "Posts",
    dotClass: "bg-[#b45a45]",
    description:
      "Long-form essays and reflections, pieces I’ve taken time to think through and craft.",
  },
  {
    key: "Notes",
    dotClass: "bg-[#2e7a78]",
    description:
      "A collection of my random thoughts. This is a place for me to write down raw ideas, so don’t expect a high bar for polish.",
  },
  {
    key: "Podcasts",
    dotClass: "bg-[#5f6fb5]",
    description: "Podcast conversations and guest appearances, in audio and video.",
  },
]

const TITLE_SORT_CYCLE: SortMode[] = [
  "titleAsc",
  "titleDesc",
  "category",
  "widthAsc",
  "widthDesc",
]

const DATE_SORT_CYCLE: SortMode[] = [
  "dateDesc",
  "dateAsc",
  "dayOfMonthDesc",
  "dayOfMonthAsc",
]

const CATEGORY_SORT_ORDER: Record<FeedItem["category"], number> = {
  Posts: 0,
  Notes: 1,
  Podcasts: 2,
}

function getCategoryDotClass(category: FeedItem["category"]): string {
  return CATEGORIES.find((c) => c.key === category)?.dotClass ?? "bg-[#888]"
}

function getItemKey(item: FeedItem): string {
  return `${item.href}__${item.date}__${item.title}__${item.label}`
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const thisYear = now.getFullYear()
  const dateYear = date.getFullYear()

  const month = date.toLocaleString("en-US", { month: "short" })
  const day = date.getDate()

  if (dateYear === thisYear) {
    return `${month} ${day}`
  }
  return `${month} ${day}, ${dateYear}`
}

function splitEpisodeTitle(title: string) {
  const match = title.match(/^(\d+)\s*(.*)$/)
  if (!match) {
    return null
  }

  return {
    number: match[1],
    rest: match[2],
  }
}

export default function FeedList({ items }: { items: FeedItem[] }) {
  const [active, setActive] = useState<CategoryKey>("All")
  const [sortMode, setSortMode] = useState<SortMode>("dateDesc")
  const titleWidthsRef = useRef<Map<string, number>>(new Map())

  const filtered =
    active === "All" ? items : items.filter((i) => i.category === active)

  const sorted = useMemo(() => {
    const withIndex = filtered.map((item, index) => ({ item, index }))

    withIndex.sort((a, b) => {
      const itemA = a.item
      const itemB = b.item
      let result = 0

      switch (sortMode) {
        case "titleAsc": {
          result = `${itemA.title} ${itemA.label}`
            .trim()
            .localeCompare(`${itemB.title} ${itemB.label}`.trim())
          break
        }
        case "titleDesc": {
          result = `${itemB.title} ${itemB.label}`
            .trim()
            .localeCompare(`${itemA.title} ${itemA.label}`.trim())
          break
        }
        case "category": {
          result =
            CATEGORY_SORT_ORDER[itemA.category] - CATEGORY_SORT_ORDER[itemB.category]
          if (result === 0) {
            result = itemA.title.localeCompare(itemB.title)
          }
          break
        }
        case "widthAsc": {
          result =
            (titleWidthsRef.current.get(getItemKey(itemA)) ?? 0) -
            (titleWidthsRef.current.get(getItemKey(itemB)) ?? 0)
          break
        }
        case "widthDesc": {
          result =
            (titleWidthsRef.current.get(getItemKey(itemB)) ?? 0) -
            (titleWidthsRef.current.get(getItemKey(itemA)) ?? 0)
          break
        }
        case "dateAsc": {
          result = new Date(itemA.date).getTime() - new Date(itemB.date).getTime()
          break
        }
        case "dayOfMonthDesc": {
          result =
            new Date(itemB.date).getDate() - new Date(itemA.date).getDate()
          break
        }
        case "dayOfMonthAsc": {
          result =
            new Date(itemA.date).getDate() - new Date(itemB.date).getDate()
          break
        }
        case "dateDesc":
        default: {
          result = new Date(itemB.date).getTime() - new Date(itemA.date).getTime()
          break
        }
      }

      if (result !== 0) {
        return result
      }

      return a.index - b.index
    })

    return withIndex.map((entry) => entry.item)
  }, [filtered, sortMode])

  // Only show categories that have items (always show Podcasts)
  const categoriesWithItems = CATEGORIES.filter(
    (c) =>
      c.key === "All" ||
      c.key === "Podcasts" ||
      items.some((i) => i.category === c.key)
  )

  const cycleTitleSort = () => {
    setSortMode((current) => {
      const index = TITLE_SORT_CYCLE.indexOf(current)
      if (index === -1) {
        return TITLE_SORT_CYCLE[0]
      }
      return TITLE_SORT_CYCLE[(index + 1) % TITLE_SORT_CYCLE.length]
    })
  }

  const cycleDateSort = () => {
    setSortMode((current) => {
      const index = DATE_SORT_CYCLE.indexOf(current)
      if (index === -1) {
        return DATE_SORT_CYCLE[0]
      }
      return DATE_SORT_CYCLE[(index + 1) % DATE_SORT_CYCLE.length]
    })
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
        {categoriesWithItems.map(({ key, dotClass, description }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            title={description}
            className={`flex cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 text-sm font-bold transition-colors ${
              active === key
                ? "text-[rgba(var(--fg-color),0.85)]"
                : "text-(--muted-color)"
            }`}
          >
            {dotClass && (
              <span
                className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${dotClass}`}
              />
            )}
            {key}
          </button>
        ))}
      </div>

      <div className="mb-3 flex justify-between text-sm text-(--muted-color)">
        <button
          type="button"
          onClick={cycleTitleSort}
          title="Sort by title/category/rendered width"
          className="cursor-default border-none bg-transparent p-0 text-sm text-inherit"
        >
          Title
        </button>
        <button
          type="button"
          onClick={cycleDateSort}
          title="Sort by date/day of month"
          className="cursor-default border-none bg-transparent p-0 text-sm text-inherit"
        >
          Date
        </button>
      </div>

      <div className="flex flex-col">
        {sorted.length === 0 && (
          <div className="py-4 text-sm text-(--muted-color)">Coming soon.</div>
        )}

        {sorted.map((item, i) => {
          const itemKey = getItemKey(item)
          const episode =
            item.category === "Podcasts" ? splitEpisodeTitle(item.title) : null

          return (
            <Link
              key={`${itemKey}-${i}`}
              href={item.href}
              className="group flex items-baseline justify-between gap-4 rounded-sm py-[0.35rem] text-inherit no-underline shadow-none transition-colors"
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="flex min-w-0 items-baseline gap-2.5">
                <span
                  className={`relative -top-px inline-block h-2.5 w-2.5 shrink-0 rounded-full ${getCategoryDotClass(item.category)}`}
                />

                <span
                  ref={(element) => {
                    if (element) {
                      titleWidthsRef.current.set(itemKey, element.clientWidth)
                    }
                  }}
                  className="flex min-w-0 items-baseline gap-2.5"
                >
                  <span className="truncate whitespace-nowrap text-[rgba(var(--fg-color),0.8)] transition-colors group-hover:text-[rgba(var(--fg-color),1)]">
                    {item.category === "Podcasts" ? (
                      episode ? (
                        <>
                          <span className='tabular-nums [font-feature-settings:"tnum"]'>
                            {episode.number}
                          </span>
                          {episode.rest ? ` ${episode.rest}` : ""}
                        </>
                      ) : (
                        item.title
                      )
                    ) : (
                      item.title
                    )}
                  </span>

                  {item.label && (
                    <span className="whitespace-nowrap text-sm text-(--muted-color) transition-colors group-hover:text-[rgba(var(--fg-color),0.78)]">
                      {item.label}
                    </span>
                  )}
                </span>
              </span>

              <span className="whitespace-nowrap text-sm text-(--muted-color) transition-colors group-hover:text-[rgba(var(--fg-color),0.78)]">
                {formatDate(item.date)}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
