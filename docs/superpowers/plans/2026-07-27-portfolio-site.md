# Portfolio/Resume Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder static site in this repo with a minimal, single-page Next.js portfolio built from Don Ignatius Cyriac's resume, including a working resume download and light/dark mode.

**Architecture:** Next.js App Router + TypeScript + Tailwind CSS v4, deployed to Vercel. One page (`src/app/page.tsx`) assembles small presentational components under `src/components/`, all reading from a single typed content module `src/data/resume.ts`. No backend, no API routes, no client-side data fetching.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS v4 (`@tailwindcss/postcss`), ESLint 9 (flat config via `eslint-config-next`).

## Global Constraints

- Deployment target is Vercel — do not add `output: "export"` or any static-export config.
- No automated test framework — this is a static content page with no logic worth unit testing (per spec). Verification is `npm run build`, `npm run lint`, and manual/curl smoke checks.
- All resume content must live in `src/data/resume.ts` — components render this data, never hardcode resume text.
- Dark mode is `class`-based (Tailwind `dark:` variants), defaults to `prefers-color-scheme`, and the user's explicit choice persists in `localStorage`.
- Resume PDF is served as a static file at `/resume/Don-Ignatius-Cyriac-Resume.pdf` — download links are plain `<a href=... download>` tags, no JS/API involved.
- After migrating assets, remove the old `index.html` and `resources/` directory entirely.

---

### Task 1: Project scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `next-env.d.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `.gitignore`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: a running Next.js app at `http://localhost:PORT/` rendering placeholder text "Portfolio coming together" from `src/app/page.tsx`. `src/app/layout.tsx` exports default `RootLayout({ children }: { children: React.ReactNode })` and imports `./globals.css`. Later tasks add imports to `src/app/page.tsx` and extend `src/app/layout.tsx`'s `metadata` object.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "don-cyriac-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "typescript": "^5.7.2",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.2",
    "@types/react-dom": "^19.0.2",
    "@tailwindcss/postcss": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.1.0",
    "@eslint/eslintrc": "^3.2.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: Create `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

- [ ] **Step 5: Create `postcss.config.mjs`**

```js
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

- [ ] **Step 6: Create `eslint.config.mjs`**

```js
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")];

export default eslintConfig;
```

- [ ] **Step 7: Create `.gitignore`**

```
node_modules
.next
out
.env*.local
.DS_Store
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 8: Create `src/app/globals.css`**

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100;
}
```

- [ ] **Step 9: Create `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Don Ignatius Cyriac — Senior Front End Developer",
  description:
    "Portfolio and resume of Don Ignatius Cyriac, Senior Front End Developer based in Bangalore.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 10: Create `src/app/page.tsx`**

```tsx
export default function Home() {
  return <p className="p-6">Portfolio coming together</p>;
}
```

- [ ] **Step 11: Install dependencies**

Run: `npm install`
Expected: installs without error, creates `package-lock.json`.

- [ ] **Step 12: Verify the build**

Run: `npm run build`
Expected: exits 0, no TypeScript or lint errors.

- [ ] **Step 13: Verify the page renders**

```bash
npm run start -- -p 3100 &
SERVER_PID=$!
sleep 3
curl -s http://localhost:3100 | grep -o "Portfolio coming together"
kill $SERVER_PID
```

Expected: prints `Portfolio coming together`.

- [ ] **Step 14: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts next-env.d.ts postcss.config.mjs eslint.config.mjs .gitignore src/app
git commit -m "Scaffold Next.js app with TypeScript and Tailwind CSS"
```

---

### Task 2: Resume content data module

**Files:**
- Create: `src/data/resume.ts`

**Interfaces:**
- Consumes: nothing beyond the TypeScript project set up in Task 1.
- Produces: `export type Resume`, `export const resume: Resume` from `src/data/resume.ts`, with shape `{ name, title, contact: { email, phone, linkedin }, summary, skills: SkillGroup[], experience: ExperienceEntry[], projects: ProjectEntry[], education: EducationEntry[], achievements: string[] }`. `SkillGroup = { category: string; items: string[] }`, `ExperienceEntry = { role, company, location, dates, responsibilities: string[] }`, `ProjectEntry = { name, context, description: string[] }`, `EducationEntry = { degree, institution, years }`. Every later component task imports `{ resume }` from `@/data/resume`.

- [ ] **Step 1: Create `src/data/resume.ts`**

```ts
export type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  dates: string;
  responsibilities: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type ProjectEntry = {
  name: string;
  context: string;
  description: string[];
};

export type EducationEntry = {
  degree: string;
  institution: string;
  years: string;
};

export type Resume = {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
  };
  summary: string;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  achievements: string[];
};

export const resume: Resume = {
  name: "Don Ignatius Cyriac",
  title: "Senior Front End Developer",
  contact: {
    email: "cyriacignatius@gmail.com",
    phone: "+91-8281461021",
    linkedin: "https://linkedin.com/in/don-ignatius-cyriac",
  },
  summary:
    "Senior Front End Developer (FE2) with 5+ years of experience designing and building responsive web applications in fintech and healthcare. Proficient with CSS and JS frameworks, with extensive experience in UI/UX and user psychology. Notable achievements include boosting the conversion rate of an existing website by 80% through improved code and design.",
  skills: [
    {
      category: "Tools and Technology",
      items: [
        "React",
        "Next.js",
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "Jest",
        "Webpack",
        "JIRA",
        "Mixpanel",
        "Countly",
        "Pullstate",
        "React Query",
      ],
    },
    {
      category: "Interpersonal Skills",
      items: ["Leadership", "Time Management", "Strategic Planning", "Excellent Communication"],
    },
    {
      category: "Language Skills",
      items: ["English", "Malayalam", "Hindi", "Tamil"],
    },
    {
      category: "Other Skills",
      items: ["Decision Making", "Project Management", "Stakeholder Management"],
    },
  ],
  experience: [
    {
      role: "Front End Developer",
      company: "Qure.ai",
      location: "Bangalore",
      dates: "Mar 2026–Present",
      responsibilities: [
        "Developed and maintained a React/Next.js healthcare platform for radiology workflow management",
        "Contributed to features across patient management, DICOM viewing, AI-assisted reporting, and real-time collaboration",
        "Worked on frontend architecture including state management (Pullstate, React Query)",
        "Implemented analytics instrumentation using Mixpanel and Countly",
      ],
    },
    {
      role: "Front End Developer (FE2)",
      company: "Clear (Cleartax)",
      location: "Bangalore",
      dates: "Aug 2021–Mar 2026",
      responsibilities: [
        "Worked closely with product managers and stakeholders to understand feature requirements and objectives",
        "Collaborated with designers, optimized applications, developed features, and maintained brand consistency for user-facing interfaces",
        "Utilized FE libraries like React to develop modular, reusable code components to streamline development and maintenance",
        "Wrote clean, efficient code to implement features and functionalities based on project requirements",
        "Developed, tested, and deployed features, ensuring adherence to project timelines and quality standards",
        "Troubleshot and debugged front-end issues using browser developer tools and debugging techniques",
        "Identified and addressed performance bottlenecks such as render-blocking resources, large asset sizes, and inefficient code",
        "Collaborated with back-end developers to troubleshoot integration issues and ensure seamless functionality",
        "Implemented performance optimization techniques like image compression, lazy loading, and server-side rendering",
        "Applied HTML5, CSS3, and JavaScript to create dynamic and interactive web experiences",
        "Implemented SEO best practices such as semantic HTML markup, meta tags, and structured data",
        "Monitored and analyzed website performance metrics using tools like Lighthouse and Google PageSpeed Insights",
      ],
    },
    {
      role: "Assistant System Engineer",
      company: "TCS",
      location: "Kochi",
      dates: "Mar 2017–Jul 2018",
      responsibilities: [
        "Created end-to-end user guides and support documents for the product for BFSI clients",
        "Worked with clients to set up the process for automatic web certificate renewal",
      ],
    },
  ],
  projects: [
    {
      name: "TestBuddy",
      context: "Clear Hackathon v3 — Special Mention, ₹10k",
      description: [
        "Built an Electron JS app for semi-technical roles like product and testing team members",
        "No-code, one-time setup app which handles auth, modularization, and storage of generated test cases",
      ],
    },
    {
      name: "Community",
      context: "Clear Hackathon v2",
      description: [
        "Built a comments and replies section to increase engagement on any content",
        "Designed a plug-and-play model where the content and community sections are independent",
      ],
    },
  ],
  education: [
    {
      degree: "M.Tech (CS)",
      institution: "Indian Institute of Technology, Kanpur",
      years: "2019–21 · Incomplete",
    },
    {
      degree: "B.Tech (CS)",
      institution: "Rajiv Gandhi Institute of Technology (RIT), Mahatma Gandhi University",
      years: "2012–16 · CGPA: 6.88",
    },
  ],
  achievements: [
    "Clear Hackathon Special Mention for presenting a solution to reduce time in integrated testing — 2024",
    "Spot Award for taking initiative and demonstrating strong ownership in improving engineering process — 2023",
    "Spartan Award for overachieving targets as a team — 2023",
    "Hall of Fame for delivering strong results year on year as a team — 2023",
  ],
};
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run build`
Expected: exits 0 (the module is unused so far, but must still compile cleanly).

- [ ] **Step 3: Commit**

```bash
git add src/data/resume.ts
git commit -m "Add typed resume content data module"
```

---

### Task 3: Static asset migration and legacy file cleanup

**Files:**
- Create: `public/images/profile.jpg` (copied from `resources/IMG_20230429_143910_Bokeh.jpg`)
- Create: `public/resume/Don-Ignatius-Cyriac-Resume.pdf` (copied from `/Users/doncyriac/Downloads/Don_Ignatius_Cyriac_Resume_Latest.pdf`)
- Create: `public/favicons/favicon.ico`, `public/favicons/favicon-16x16.png`, `public/favicons/favicon-32x32.png`, `public/favicons/apple-touch-icon.png`, `public/favicons/android-chrome-192x192.png`, `public/favicons/android-chrome-512x512.png` (copied from `resources/favicons/`)
- Create: `public/favicons/site.webmanifest` (rewritten, not a raw copy — see Step 3)
- Modify: `src/app/layout.tsx` (add `icons`/`manifest` to `metadata`)
- Delete: `index.html`
- Delete: `resources/` (entire directory)

**Interfaces:**
- Consumes: `src/app/layout.tsx`'s `metadata` export from Task 1.
- Produces: static assets at `/images/profile.jpg`, `/resume/Don-Ignatius-Cyriac-Resume.pdf`, `/favicons/*` that later tasks (Hero, DownloadResumeButton) reference by exact path.

- [ ] **Step 1: Copy the profile photo and resume PDF into `public/`**

```bash
mkdir -p public/images public/resume public/favicons
cp resources/IMG_20230429_143910_Bokeh.jpg public/images/profile.jpg
cp "/Users/doncyriac/Downloads/Don_Ignatius_Cyriac_Resume_Latest.pdf" "public/resume/Don-Ignatius-Cyriac-Resume.pdf"
```

- [ ] **Step 2: Copy favicon assets into `public/favicons/`**

```bash
cp resources/favicons/favicon.ico public/favicons/favicon.ico
cp resources/favicons/favicon-16x16.png public/favicons/favicon-16x16.png
cp resources/favicons/favicon-32x32.png public/favicons/favicon-32x32.png
cp resources/favicons/apple-touch-icon.png public/favicons/apple-touch-icon.png
cp resources/favicons/android-chrome-192x192.png public/favicons/android-chrome-192x192.png
cp resources/favicons/android-chrome-512x512.png public/favicons/android-chrome-512x512.png
```

- [ ] **Step 3: Create `public/favicons/site.webmanifest`**

The original manifest at `resources/favicons/site.webmanifest` points icons at the root path (`/android-chrome-*.png`) and has empty `name`/`short_name`. Write a corrected version reflecting the new `/favicons/` location and the site's name:

```json
{
  "name": "Don Ignatius Cyriac",
  "short_name": "Don Cyriac",
  "icons": [
    { "src": "/favicons/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/favicons/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

- [ ] **Step 4: Update `src/app/layout.tsx` metadata with icons**

Modify the `metadata` export (leave everything else in the file unchanged):

```tsx
export const metadata: Metadata = {
  title: "Don Ignatius Cyriac — Senior Front End Developer",
  description:
    "Portfolio and resume of Don Ignatius Cyriac, Senior Front End Developer based in Bangalore.",
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
};
```

- [ ] **Step 5: Remove the legacy static site files**

```bash
rm index.html
rm -rf resources
```

- [ ] **Step 6: Verify the build and asset paths**

```bash
npm run build
npm run start -- -p 3100 &
SERVER_PID=$!
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/images/profile.jpg
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/resume/Don-Ignatius-Cyriac-Resume.pdf
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/favicons/site.webmanifest
curl -s http://localhost:3100 | grep -o 'favicons/favicon-32x32.png'
kill $SERVER_PID
```

Expected: all three `curl -o /dev/null` calls print `200`, and the last command prints `favicons/favicon-32x32.png`.

- [ ] **Step 7: Confirm legacy files are gone**

Run: `ls index.html resources 2>&1`
Expected: `ls: index.html: No such file or directory` (and same for `resources`).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Migrate favicons, profile photo, and resume PDF into public/; remove legacy static site"
```

---

### Task 4: Dark/light theme infrastructure

**Files:**
- Modify: `src/app/layout.tsx` (add inline theme-init script in `<head>`)
- Create: `src/components/ThemeToggle.tsx`

**Interfaces:**
- Consumes: `src/app/layout.tsx`'s existing `<html>`/`<head>` structure from Task 3.
- Produces: `export function ThemeToggle()` — a client component with no props, rendering a `<button>` that toggles the `dark` class on `document.documentElement` and persists the choice to `localStorage` under key `"theme"`. Task 5 (Header) imports and renders it.

- [ ] **Step 1: Add the inline theme-init script to `src/app/layout.tsx`**

Replace the file's contents with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Don Ignatius Cyriac — Senior Front End Developer",
  description:
    "Portfolio and resume of Don Ignatius Cyriac, Senior Front End Developer based in Bangalore.",
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored ? stored : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Create `src/components/ThemeToggle.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-700 transition hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500"
    >
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}
```

- [ ] **Step 3: Verify the build and inline script presence**

```bash
npm run build
npm run start -- -p 3100 &
SERVER_PID=$!
sleep 3
curl -s http://localhost:3100 | grep -o "matchMedia"
kill $SERVER_PID
```

Expected: exits 0, and `matchMedia` is printed (confirms the inline script is in the rendered HTML `<head>`).

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/components/ThemeToggle.tsx
git commit -m "Add class-based dark mode with system-preference default and persisted toggle"
```

---

### Task 5: DownloadResumeButton and Header

**Files:**
- Create: `src/components/DownloadResumeButton.tsx`
- Create: `src/components/Header.tsx`
- Modify: `src/app/page.tsx` (render `Header` above the placeholder text)

**Interfaces:**
- Consumes: `ThemeToggle` from Task 4 (`src/components/ThemeToggle.tsx`), `resume` from Task 2 (`src/data/resume.ts`).
- Produces: `export function DownloadResumeButton({ variant = "primary" }: { variant?: "primary" | "secondary" })` and `export function Header()`. Task 6 (Hero) imports `DownloadResumeButton`.

- [ ] **Step 1: Create `src/components/DownloadResumeButton.tsx`**

```tsx
const RESUME_PATH = "/resume/Don-Ignatius-Cyriac-Resume.pdf";

export function DownloadResumeButton({
  variant = "primary",
}: {
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
      : "inline-block rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500";

  return (
    <a href={RESUME_PATH} download className={className}>
      Download Resume
    </a>
  );
}
```

- [ ] **Step 2: Create `src/components/Header.tsx`**

```tsx
import { resume } from "@/data/resume";
import { DownloadResumeButton } from "@/components/DownloadResumeButton";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold tracking-tight">{resume.name}</span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <DownloadResumeButton variant="secondary" />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Wire `Header` into `src/app/page.tsx`**

```tsx
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <p className="p-6">Portfolio coming together</p>
    </>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npm run build
npm run start -- -p 3100 &
SERVER_PID=$!
sleep 3
curl -s http://localhost:3100 | grep -o "Don Ignatius Cyriac"
curl -s http://localhost:3100 | grep -o "Download Resume"
kill $SERVER_PID
```

Expected: both strings print.

- [ ] **Step 5: Commit**

```bash
git add src/components/DownloadResumeButton.tsx src/components/Header.tsx src/app/page.tsx
git commit -m "Add Header with theme toggle and resume download button"
```

---

### Task 6: Hero section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/app/page.tsx` (replace placeholder paragraph with `<Hero />`)

**Interfaces:**
- Consumes: `resume` from `@/data/resume` (Task 2), `DownloadResumeButton` from `@/components/DownloadResumeButton` (Task 5).
- Produces: `export function Hero()`. No later task imports this directly (it's only used in `page.tsx`).

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
import Image from "next/image";
import { resume } from "@/data/resume";
import { DownloadResumeButton } from "@/components/DownloadResumeButton";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center">
      <Image
        src="/images/profile.jpg"
        alt={resume.name}
        width={128}
        height={128}
        className="h-32 w-32 rounded-full object-cover"
        priority
      />
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{resume.name}</h1>
        <p className="mt-1 text-lg text-neutral-600 dark:text-neutral-400">{resume.title}</p>
      </div>
      <p className="max-w-xl text-neutral-700 dark:text-neutral-300">{resume.summary}</p>
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        <a href={`mailto:${resume.contact.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
          {resume.contact.email}
        </a>
        <span aria-hidden>·</span>
        <a href={`tel:${resume.contact.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400">
          {resume.contact.phone}
        </a>
        <span aria-hidden>·</span>
        <a
          href={resume.contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          LinkedIn
        </a>
      </div>
      <DownloadResumeButton />
    </section>
  );
}
```

- [ ] **Step 2: Update `src/app/page.tsx`**

```tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run build
npm run start -- -p 3100 &
SERVER_PID=$!
sleep 3
curl -s http://localhost:3100 | grep -o "Senior Front End Developer"
curl -s http://localhost:3100 | grep -o "cyriacignatius@gmail.com"
kill $SERVER_PID
```

Expected: both strings print.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/app/page.tsx
git commit -m "Add Hero section with profile photo, summary, and contact links"
```

---

### Task 7: Experience section

**Files:**
- Create: `src/components/Experience.tsx`
- Modify: `src/app/page.tsx` (add `<Experience />` after `<Hero />`)

**Interfaces:**
- Consumes: `resume.experience` (Task 2).
- Produces: `export function Experience()`. Only used in `page.tsx`.

- [ ] **Step 1: Create `src/components/Experience.tsx`**

```tsx
import { resume } from "@/data/resume";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
      <div className="mt-6 space-y-8">
        {resume.experience.map((job) => (
          <div key={`${job.company}-${job.role}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-medium">
                {job.role} · {job.company}
              </h3>
              <span className="text-sm text-neutral-500 dark:text-neutral-500">{job.dates}</span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">{job.location}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `src/app/page.tsx`**

```tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experience />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run build
npm run start -- -p 3100 &
SERVER_PID=$!
sleep 3
curl -s http://localhost:3100 | grep -o "Qure.ai"
curl -s http://localhost:3100 | grep -o "Clear (Cleartax)"
curl -s http://localhost:3100 | grep -o "Assistant System Engineer"
kill $SERVER_PID
```

Expected: all three strings print.

- [ ] **Step 4: Commit**

```bash
git add src/components/Experience.tsx src/app/page.tsx
git commit -m "Add Experience section"
```

---

### Task 8: Skills section

**Files:**
- Create: `src/components/Skills.tsx`
- Modify: `src/app/page.tsx` (add `<Skills />` after `<Experience />`)

**Interfaces:**
- Consumes: `resume.skills` (Task 2).
- Produces: `export function Skills()`. Only used in `page.tsx`.

- [ ] **Step 1: Create `src/components/Skills.tsx`**

```tsx
import { resume } from "@/data/resume";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-6 space-y-5">
        {resume.skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {group.category}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `src/app/page.tsx`**

```tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experience />
        <Skills />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run build
npm run start -- -p 3100 &
SERVER_PID=$!
sleep 3
curl -s http://localhost:3100 | grep -o "Pullstate"
curl -s http://localhost:3100 | grep -o "React Query"
kill $SERVER_PID
```

Expected: both strings print.

- [ ] **Step 4: Commit**

```bash
git add src/components/Skills.tsx src/app/page.tsx
git commit -m "Add Skills section"
```

---

### Task 9: Projects, Education, and Achievements sections

**Files:**
- Create: `src/components/Projects.tsx`
- Create: `src/components/Education.tsx`
- Create: `src/components/Achievements.tsx`
- Modify: `src/app/page.tsx` (add `<Projects />`, `<Education />`, `<Achievements />` after `<Skills />`)

**Interfaces:**
- Consumes: `resume.projects`, `resume.education`, `resume.achievements` (Task 2).
- Produces: `export function Projects()`, `export function Education()`, `export function Achievements()`. Only used in `page.tsx`.

- [ ] **Step 1: Create `src/components/Projects.tsx`**

```tsx
import { resume } from "@/data/resume";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
      <div className="mt-6 space-y-6">
        {resume.projects.map((project) => (
          <div key={project.name}>
            <h3 className="font-medium">{project.name}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">{project.context}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
              {project.description.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/Education.tsx`**

```tsx
import { resume } from "@/data/resume";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Education</h2>
      <div className="mt-6 space-y-4">
        {resume.education.map((entry) => (
          <div
            key={entry.institution}
            className="flex flex-wrap items-baseline justify-between gap-x-4"
          >
            <div>
              <h3 className="font-medium">{entry.degree}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">{entry.institution}</p>
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-500">{entry.years}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/Achievements.tsx`**

```tsx
import { resume } from "@/data/resume";

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-xl font-semibold tracking-tight">Achievements</h2>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
        {resume.achievements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Update `src/app/page.tsx`**

```tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Achievements } from "@/components/Achievements";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npm run build
npm run start -- -p 3100 &
SERVER_PID=$!
sleep 3
curl -s http://localhost:3100 | grep -o "TestBuddy"
curl -s http://localhost:3100 | grep -o "Indian Institute of Technology, Kanpur"
curl -s http://localhost:3100 | grep -o "Spartan Award"
kill $SERVER_PID
```

Expected: all three strings print.

- [ ] **Step 6: Commit**

```bash
git add src/components/Projects.tsx src/components/Education.tsx src/components/Achievements.tsx src/app/page.tsx
git commit -m "Add Projects, Education, and Achievements sections"
```

---

### Task 10: Footer and README

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx` (render `<Footer />` after `<main>`)
- Modify: `README.md`

**Interfaces:**
- Consumes: `resume` from `@/data/resume` (Task 2).
- Produces: `export function Footer()`. This is the last new component — no later task depends on it.

- [ ] **Step 1: Create `src/components/Footer.tsx`**

```tsx
import { resume } from "@/data/resume";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-3xl px-6 py-12 text-sm text-neutral-500 dark:text-neutral-500">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <span>
          © {year} {resume.name}
        </span>
        <div className="flex gap-4">
          <a href={`mailto:${resume.contact.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
            Email
          </a>
          <a
            href={resume.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Update `src/app/page.tsx`**

```tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Achievements } from "@/components/Achievements";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Rewrite `README.md`**

```md
# Don Ignatius Cyriac — Portfolio

A minimal, single-page portfolio built with Next.js, TypeScript, and Tailwind CSS, generated from a resume. Includes light/dark mode and a resume download.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content

All resume content lives in `src/data/resume.ts`. Edit that file to update experience, skills, projects, education, or achievements — the page re-renders automatically.

## Deployment

Deployed on Vercel. Connect this repository in the Vercel dashboard; no extra configuration is required.
```

- [ ] **Step 4: Verify**

```bash
npm run build
npm run start -- -p 3100 &
SERVER_PID=$!
sleep 3
curl -s http://localhost:3100 | grep -o "LinkedIn"
kill $SERVER_PID
```

Expected: prints `LinkedIn` (appears in both Hero and Footer, at least one match).

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/app/page.tsx README.md
git commit -m "Add Footer section and rewrite README"
```

---

### Task 11: Final verification

**Files:**
- None (verification only; fix forward in the relevant file above if something fails here)

**Interfaces:**
- Consumes: the fully assembled `src/app/page.tsx` from Task 10 and all components/data from Tasks 1–10.
- Produces: nothing new — this is the final quality gate before calling the site done.

- [ ] **Step 1: Full build and lint**

```bash
npm run build
npm run lint
```

Expected: both exit 0 with no errors or warnings.

- [ ] **Step 2: Full-page smoke test**

```bash
npm run start -- -p 3100 &
SERVER_PID=$!
sleep 3
for text in "Don Ignatius Cyriac" "Senior Front End Developer" "Qure.ai" "Clear (Cleartax)" \
  "Assistant System Engineer" "Pullstate" "TestBuddy" "Community" \
  "Indian Institute of Technology, Kanpur" "Rajiv Gandhi Institute of Technology" \
  "Spartan Award" "Download Resume"; do
  echo -n "$text: "
  curl -s http://localhost:3100 | grep -qo "$text" && echo "FOUND" || echo "MISSING"
done
curl -s -o /dev/null -w "resume PDF status: %{http_code}\n" http://localhost:3100/resume/Don-Ignatius-Cyriac-Resume.pdf
kill $SERVER_PID
```

Expected: every line prints `FOUND`, and the resume PDF status is `200`.

- [ ] **Step 3: Confirm legacy files are absent from git**

Run: `git ls-files index.html resources`
Expected: empty output (no tracked files match).

- [ ] **Step 4: Manual visual check**

Run `npm run dev`, open `http://localhost:3000` in a browser, and confirm:
- Layout looks minimal and uncluttered in light mode.
- Clicking the theme toggle switches to dark mode and the page remains legible; reloading the page keeps the chosen theme.
- Clicking either "Download Resume" button downloads the PDF.

Stop the dev server (Ctrl+C) once confirmed.
