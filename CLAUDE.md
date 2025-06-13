# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Philipp Spiess's personal blog/portfolio website built with Next.js 15 (App Router), TypeScript, and Tailwind CSS. Content is managed through markdown files.

## Commands

```bash
# Development
pnpm dev          # Start development server on http://localhost:3000

# Build & Production
pnpm build        # Create production build
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## Architecture

### Content Structure
- **Blog posts**: `/posts/*.md` - Markdown files with frontmatter (title, date, summary)
- **Notes**: `/notes/[category]/*.md` - Organized by categories (engineering, life, software, etc.)
- **Static assets**: `/public/` - Images for blog posts in `/public/blog/`

### Routing (App Router)
- `/app/page.tsx` - Homepage listing blog posts
- `/app/blog/[slug]/page.tsx` - Individual blog posts
- `/app/note/[...slug]/page.tsx` - Notes with nested routing
- `/app/api/og/route.tsx` - Open Graph image generation

### Key Libraries
- **Markdown Processing**: remark/rehype ecosystem with Shiki for syntax highlighting
- **Content Parsing**: Custom parsers in `/lib/parser/` handle markdown transformation
- **Styling**: Tailwind CSS with custom typography styles in `/pages/typography.css`
- **Fonts**: Custom Merriweather (body) and JetBrains Mono (code)

### Important Patterns
1. **Markdown Processing Pipeline**: 
   - Files are parsed in `/lib/parser/markdown.ts`
   - Frontmatter extraction, reading time calculation, syntax highlighting
   - HTML generation with custom components

2. **Dynamic Routes**:
   - Blog posts use simple dynamic routing: `[slug]`
   - Notes use catch-all routing: `[...slug]` for nested paths

3. **Analytics**: Dual setup with Vercel Analytics and LogKit Analytics in root layout

## Development Notes

- The project recently migrated from Pages Router to App Router
- When modifying markdown parsing, test with both blog posts and notes
- Typography styles are crucial for readability - changes should be tested across different content types
- RSS feed generation (`/lib/feed/`) must be updated when changing post structure