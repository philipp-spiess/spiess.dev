import ArticleHeader from "../lib/ArticleHeader"
import Link from "next/link"

export default function NotFound() {
  return (
    <>
      <ArticleHeader type="blog" containerClass="max-w-[610px] px-3.5 mx-auto" />
      <div className="max-w-[610px] px-3.5 mx-auto pt-12">
        <h1 className="font-black text-xl bg-linear-to-br/oklch from-(--accent-color) to-orange-300 bg-clip-text text-transparent">
          404 — Page Not Found
        </h1>
        <p className="text-(--muted-color) mt-4">
          This page doesn't exist, or it may have moved.
        </p>
        <p className="mt-6">
          <Link href="/" className="text-(--accent-color)">
            ← Back to all articles
          </Link>
        </p>
      </div>
    </>
  )
}
