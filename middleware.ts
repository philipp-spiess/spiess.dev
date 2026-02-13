import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") || ""

  if (accept.includes("text/markdown")) {
    const { pathname } = request.nextUrl
    const url = request.nextUrl.clone()

    // Rewrite / → /api/md
    if (pathname === "/") {
      url.pathname = "/api/md"
      return NextResponse.rewrite(url)
    }

    // Rewrite /blog/[slug] → /api/md/blog/[slug]
    if (pathname.startsWith("/blog/")) {
      url.pathname = `/api/md${pathname}`
      return NextResponse.rewrite(url)
    }

    // Rewrite /note/[...slug] → /api/md/note/[...slug]
    if (pathname.startsWith("/note/")) {
      url.pathname = `/api/md${pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/blog/:path+", "/note/:path+"],
}
