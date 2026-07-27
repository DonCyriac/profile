# Portfolio/Resume Site — Design

**Date:** 2026-07-27
**Status:** Approved

## Goal

Replace the current placeholder static site (`index.html` + `resources/`) with a
minimal, single-page Next.js portfolio built from Don Ignatius Cyriac's resume
(`Don_Ignatius_Cyriac_Resume_Latest.pdf`), with a working resume download.
Deployment target is Vercel.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- No backend/API routes — fully static content, no server-side data fetching
- ESLint (Next's default config)

## Content structure

All resume content lives in one typed data module, `src/data/resume.ts`,
exporting a single structured object (name, title, contact info, summary,
skills grouped by category, experience entries, projects, education entries,
achievements). Components render this data — no content is hardcoded in JSX
beyond section labels/headings.

## Page layout

Single page (`src/app/page.tsx`), composed of these section components under
`src/components/`, top to bottom:

1. **Header** — sticky, shows name, a dark/light mode toggle, and a
   "Download Resume" button.
2. **Hero** — profile photo, name, title, one-paragraph summary, contact
   links (email, phone, LinkedIn), primary "Download Resume" CTA.
3. **Experience** — Qure.ai, Clear (Cleartax), TCS — role, company, dates,
   bullet responsibilities, in reverse chronological order.
4. **Skills** — grouped tag/chip lists: Tools & Technology, Interpersonal
   Skills, Language Skills, Other Skills.
5. **Projects** — TestBuddy (Clear Hackathon v3), Community (Clear
   Hackathon v2) — name, context, bullet descriptions.
6. **Education** — IIT Kanpur M.Tech (CS, incomplete), RIT/MGU B.Tech (CS).
7. **Achievements** — compact list of the 4 resume awards, most recent
   first.
8. **Footer** — repeats contact links, minimal styling, no new content.

## Visual design

Minimal aesthetic: generous whitespace, one accent color, clean sans-serif
type, no decorative clutter. Tailwind's `class`-based dark mode:

- On first load, theme follows `prefers-color-scheme`.
- A toggle in the Header lets the user override; the choice persists in
  `localStorage` and is applied before paint (inline script in
  `<head>`/layout) to avoid a flash of the wrong theme.

## Resume download

- The actual PDF is copied into the repo at
  `public/resume/Don-Ignatius-Cyriac-Resume.pdf`.
- Both the Header button and the Hero CTA are plain anchor tags:
  `<a href="/resume/Don-Ignatius-Cyriac-Resume.pdf" download>Download Resume</a>`.
- No JS or API route involved — this is a static file download.

## Assets & migration

- Profile photo: `resources/IMG_20230429_143910_Bokeh.jpg` →
  `public/images/profile.jpg`, rendered with `next/image`.
- Favicons: `resources/favicons/*` → `public/favicons/*`, wired into
  `src/app/layout.tsx` metadata (`icons` field) plus `site.webmanifest`.
- Remove after migration: root `index.html`, `resources/` directory.
- `README.md` rewritten with project description + local dev instructions
  (`npm install`, `npm run dev`).

## Error handling

Not applicable — no user input, no network calls, no dynamic data. The only
failure mode is a missing/broken asset path, which is caught at build/dev
time by simply loading the page.

## Testing / verification

No automated test suite (static content page with no logic worth unit
testing). Verification consists of:

- `npm run build` succeeds
- `npm run lint` passes
- Manual check of the dev server in a browser: layout, all sections render
  expected resume content, resume download works, dark/light toggle works
  and persists across reload.

## Out of scope

- No CMS/dynamic content editing UI — content changes are code edits to
  `src/data/resume.ts`.
- No contact form or backend.
- No automated deployment step — user will connect the repo to Vercel
  themselves.
