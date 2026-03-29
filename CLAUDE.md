# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website for Afonso Metello. Static site built with Astro, deployed to GitHub Pages via GitHub Actions. All HTML templates already exist (from Stitch export) and need to be converted to Astro layouts and pages.

## Commands

```bash
npm run dev        # Start dev server (localhost:4321)
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
```

## Tech Stack

- **Framework:** Astro 6 (ESM, Node >= 22.12.0)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin (NOT v3 - no `tailwind.config.mjs`, config goes in `src/styles/global.css` after `@import "tailwindcss"`)
- **Fonts:** Outfit (Google Fonts) + Material Symbols Outlined
- **Icons:** Material Symbols Outlined (Google Fonts)
- **Content:** Markdown with frontmatter (Astro Content Collections)
- **Deployment:** GitHub Pages via GitHub Actions
- **Domain:** afonsometello.com

## Current State

Project is scaffolded but mostly empty. `src/pages/index.astro` has the default Astro template. The layouts, components, content collections, and deploy workflow from the spec below have not been built yet.

### Reference HTML templates (read-only, do NOT serve directly)
- `homepage-v3-original.html` - Hero, Speaking, Community, Connect, Footer
- `references/project-detail.html` - Project detail page
- `references/blog-listing.html` - Blog listing page
- `references/blog-post-detail.html` - Blog post body
- `references/projects-listing.html` - Projects listing page

Use these as visual/code reference when building Astro components. Convert class-by-class.

## Project Structure

```
afonsometello.com/
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── public/
│   ├── photo.jpg              ← hero photo (B&W Thailand train)
│   └── favicon.ico
├── src/
│   ├── layouts/
│   │   ├── Base.astro         ← html head, nav, footer (shared)
│   │   ├── Page.astro         ← extends Base, for static pages
│   │   └── Post.astro         ← extends Base, for blog post detail
│   ├── pages/
│   │   ├── index.astro        ← homepage (Hero + Projects + Speaking + Blog + Community + Connect)
│   │   ├── blog/
│   │   │   └── index.astro    ← blog listing page
│   │   │   └── [...slug].astro ← dynamic blog post pages
│   │   └── projects/
│   │       └── index.astro    ← projects listing page
│   │       └── [...slug].astro ← dynamic project detail pages
│   ├── content/
│   │   ├── config.ts          ← content collection schemas
│   │   ├── blog/
│   │   │   ├── how-ai-changed-architecture.md
│   │   │   └── career-framework-from-scratch.md
│   │   └── projects/
│   │       ├── impact-benchmark.md
│   │       └── chama-repique.md
│   └── components/
│       ├── Nav.astro
│       ├── Footer.astro
│       ├── HeroHome.astro
│       ├── SectionProjects.astro
│       ├── SectionSpeaking.astro
│       ├── SectionBlog.astro
│       ├── SectionCommunity.astro
│       ├── SectionConnect.astro
│       ├── ProjectCard.astro
│       └── BlogPostRow.astro
└── .github/
    └── workflows/
        └── deploy.yml         ← GitHub Pages deploy action
```

## Tailwind Config

Extract from existing Stitch templates. Key points:
- borderRadius: all 0px (brutalist, no rounded corners)
- fontFamily: Outfit for everything
- Colors: the full monochromatic palette from the Stitch export (surface, surface-container-*, primary, secondary, outline-variant, etc.)
- darkMode: "class" with `dark` always on

## Content Collection Schemas (src/content/config.ts)

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    category: z.string(),
    draft: z.boolean().default(false),
    readingTime: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['LIVE', 'IN DEVELOPMENT', 'COMING SOON']),
    category: z.string(),
    year: z.string(),
    stack: z.array(z.string()),
    links: z.object({
      forge: z.string().optional(),
      github: z.string().optional(),
      demo: z.string().optional(),
    }).optional(),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    order: z.number().default(0),
    icon: z.string().default('terminal'),
  }),
});

export const collections = { blog, projects };
```

## Sample Content Files

### src/content/blog/how-ai-changed-architecture.md

```markdown
---
title: "How AI Changed the Way I Architect Solutions"
date: 2026-04-15
excerpt: "What happens when you bring real AI workflows into architecture — not chatbots, not demos."
category: "AI & Architecture"
draft: true
readingTime: "8 min read"
---

Content goes here when ready.
```

### src/content/blog/career-framework-from-scratch.md

```markdown
---
title: "Building a Career Framework from Scratch"
date: 2026-04-01
excerpt: "19 positions, two tracks, and the thinking behind Bool's developer progression model."
category: "Leadership"
draft: true
readingTime: "12 min read"
---

Content goes here when ready.
```

### src/content/projects/impact-benchmark.md

```markdown
---
title: "Impact Benchmark"
description: "Measure what your team actually produces. Productivity, quality, and waste — scored by real complexity, not deploy counts."
status: "IN DEVELOPMENT"
category: "OUTSYSTEMS FORGE"
year: "2026"
stack: ["OutSystems", "O11", "Service Center API"]
links:
  forge: ""
  github: ""
features:
  - title: "Complexity-weighted scoring"
    description: "A Server Action with 20 nodes scores what it should. A label change gets a fraction."
  - title: "Anonymous team benchmarking"
    description: "Opt-in sharing to see where your team sits against others. No names, no company identifiers."
order: 1
icon: "terminal"
---

The Impact Benchmark reads your version history — every publish, every module, every delta — and scores the actual development work: screens built, logic written, data models designed, integrations wired.

Three dimensions: Build (what you produce), Quality (what you break), and Waste (what nobody uses).
```

### src/content/projects/chama-repique.md

```markdown
---
title: "Chama Repique!"
description: "Play a repique call, a virtual bateria responds. TensorFlow + OutSystems."
status: "IN DEVELOPMENT"
category: "MOBILE APP"
year: "2026"
stack: ["OutSystems", "TensorFlow", "TFLite", "Python"]
links:
  github: ""
features:
  - title: "Real-time audio recognition"
    description: "Microphone captures repique patterns, ML model identifies the call in milliseconds."
  - title: "Full bateria response"
    description: "Each recognised call triggers the correct response from surdos, caixas, tamborins, and chocalhos."
order: 2
icon: "music_note"
---

Chama Repique! is a mobile app where a repiquista plays a real call on a real repique, and a virtual bateria de samba responds with the matching response pattern.
```

## Shared Layout (Base.astro) - Key Elements

The Base layout wraps every page. It includes:
- `<html class="dark">` (always dark mode)
- Google Fonts: Outfit + Material Symbols
- Tailwind CSS
- Nav component (fixed top, blur bg, AFONSO METELLO left, links right)
- Footer component (ghost text links, copyright)
- Slot for page content

### Nav links (same on every page):
- PROJECTS → /projects
- SPEAKING → /#speaking (homepage anchor)
- BLOG → /blog
- COMMUNITY → /#community (homepage anchor)
- CONTACT → /#connect (homepage anchor)

Active page gets `text-white border-b-4 border-white pb-1`, inactive gets `text-neutral-400 hover:text-white`.

### Footer links (same on every page):
Ghost text large: LINKEDIN, GITHUB, WONDERBOOL, EMAIL
Below separator: AFONSO METELLO left, © 2026 right.
All with real URLs.

## Homepage (index.astro) - Section Order

1. **HeroHome** — Full-screen photo bg (B&W, grayscale), name huge, role, CTA button
2. **SectionProjects** — Italic heading, 2 rectangular cards from projects collection (latest 2-3)
3. **SectionSpeaking** — Staggered layout, sticky heading left, 3 talks (hardcoded for now)
4. **SectionBlog** — Latest 2-3 posts from blog collection, VIEW ALL link
5. **SectionCommunity** — Outline heading, 3 square cards with offset (Champion, Trainer, Wonderbool)
6. **SectionConnect** — White bg, LET'S BUILD THE FUTURE., link grid 2x2, email large

## Blog Listing (blog/index.astro)

- Hero: "BLOG" massive
- Subtitle: "THOUGHTS ON AI, ARCHITECTURE, AND BUILDING THINGS THAT MATTER."
- Category filters (static for now): ALL POSTS, AI & ARCHITECTURE, LEADERSHIP, OUTSYSTEMS
- Post rows from collection: date | title | category tag | arrow
- Full row hover inverts to white bg
- No pagination until >10 posts
- No newsletter section for now

## Blog Post Detail (blog/[...slug].astro)

- Date + reading time + category (small, uppercase, tracking wide)
- Title: Outfit 900, huge, uppercase
- Body: Outfit 300, 18px, line-height 1.8, max-width 680px, normal case
- Blockquotes: left white border, italic, larger text
- Code: monospace, dark bg
- Tags at bottom
- No newsletter CTA for now

## Projects Listing (projects/index.astro)

- Hero: "PROJECTS" massive
- Subtitle: "ARCHITECTING INTELLIGENCE THROUGH CODE AND CRAFT."
- Project cards from collection: tags (status + category), title, description, arrow icon, counter (01/02)
- Hover inverts to white
- No editorial image section for now

## Project Detail (projects/[...slug].astro)

- Title huge + status/category tags inline
- Screenshot placeholder (full-width dark area)
- Two-column: description left (Outfit 300, readable), metadata right (status, category, year, stack tags, CTA buttons)
- Features section with border-left accent cards

## Speaking Data (hardcoded in component for now)

```javascript
const talks = [
  {
    number: "01",
    type: "CONFERENCE TALK",
    title: "What a Samba Drum Taught Me About ML",
    description: "Pattern detection with TensorFlow, deployed on mobile, wired into OutSystems. Then things get loud.",
    venue: "ONE26 · AMSTERDAM · 2026"
  },
  {
    number: "02",
    type: "CONFERENCE TALK",
    title: "Event-Driven Architecture in Action",
    description: "Coordinating a SpaceX rocket launch with OutSystems Events — with a little help from the audience.",
    venue: "OUTSYSTEMS CONFERENCE"
  },
  {
    number: "03",
    type: "MEETUPS",
    title: "Wonderbool",
    description: "Indie OutSystems community meetups. By the community, for the community. Running since 2019.",
    venue: "LISBON · PORTO · THE HAGUE · TERCEIRA"
  }
];
```

## Community Data (hardcoded in component)

```javascript
const badges = [
  { icon: "military_tech", label: "OutSystems Champion" },
  { icon: "school", label: "Certified Trainer" },
  { icon: "groups", label: "Wonderbool Meetup Organizer" },
  // Add when confirmed:
  // { icon: "hub", label: "Claude Partner Network" },
  // { icon: "public", label: "Claude Community Ambassador" },
  // { icon: "architecture", label: "Claude Certified Architect" },
];
```

## External Links (constants)

```javascript
const links = {
  linkedin: "https://www.linkedin.com/in/afonsometello",
  github: "https://github.com/afonsometello",
  wonderbool: "https://www.meetup.com/Wonderbool-Lisbon/",
  bool: "https://bool.pt",
  email: "afonso@afonsometello.com",
};
```

## GitHub Pages Deploy (.github/workflows/deploy.yml)

Standard Astro GitHub Pages workflow:
- Trigger on push to main
- Build with Astro
- Deploy to GitHub Pages
- Custom domain: afonsometello.com

## Commands to Bootstrap

```bash
npm create astro@latest afonsometello.com -- --template minimal
cd afonsometello.com
npx astro add tailwind
npm install
```

Then paste this spec into CLAUDE.md and let Claude Code build it out.

## Important Notes

- All templates come from Stitch export HTML — convert class-by-class to Astro components
- Keep `transition-none` on hovers (brutalist, no smooth transitions)
- `::selection { background-color: #FFFFFF; color: #000000; }` on every page
- `.text-outline { -webkit-text-stroke: 1px #FFFFFF; color: transparent; }` for Community heading
- `.grayscale-image { filter: grayscale(100%) contrast(120%); }` for hero photo
- Draft posts (draft: true) should not appear in production builds
- The hero photo needs to be hosted in /public/photo.jpg — use the Thailand train photo in B&W
