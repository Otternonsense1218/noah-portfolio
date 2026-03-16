# Noah Dean — Portfolio (React + TypeScript)

Refined retro-futuristic portfolio. Fully typed, modular component architecture.

## Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript 5 (strict) | Type safety across all components |
| Vite 5 | Dev server & build tool |
| CSS Variables | Design token system (no CSS-in-JS dependency) |

## Project Structure

```
noah-portfolio-ts/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx                    ← Entry point
│   ├── App.tsx                     ← Root composer — all content lives here
│   ├── vite-env.d.ts
│   │
│   ├── types/
│   │   └── index.ts                ← All shared interfaces & types
│   │
│   ├── tokens/
│   │   └── design-tokens.ts        ← Typed design tokens (as const)
│   │
│   ├── styles/
│   │   └── globals.css             ← CSS variables, keyframes, reset
│   │
│   └── components/
│       ├── NavBar.tsx
│       ├── HeroSplash.tsx
│       ├── SectionWrapper.tsx      ← Reusable section shell, scroll fade-in
│       ├── AboutSection.tsx
│       ├── SkillsGrid.tsx
│       ├── ProjectCard.tsx         ← Standalone reusable card
│       ├── ProjectsSection.tsx
│       ├── ExperienceTimeline.tsx
│       └── ContactSection.tsx
└── public/
    └── favicon.svg
```

## Quick Start

```bash
# Clone or copy this folder, then:
npm install
npm run dev
```

Visit `http://localhost:5173`

## Available Scripts

```bash
npm run dev        # Start dev server with HMR
npm run build      # Type-check + production build → dist/
npm run preview    # Preview the production build locally
npm run typecheck  # Run tsc --noEmit (no emit, just check)
npm run lint       # ESLint across all .ts / .tsx files
```

## Path Aliases

Configured in both `tsconfig.json` and `vite.config.ts`:

```ts
import HeroSplash from '@components/HeroSplash'
import tokens     from '@tokens/design-tokens'
import type { Project } from '@/types'
```

| Alias | Resolves to |
|-------|-------------|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@tokens/*` | `src/tokens/*` |
| `@styles/*` | `src/styles/*` |

## Content Editing

**All content is in `src/App.tsx`** — projects, experience, bio, socials.
No need to dig into individual components.

```ts
// src/App.tsx
const PROJECTS: Project[] = [
  {
    title:       'My Project',
    description: 'What it does and why it matters.',
    tags:        ['React', 'TypeScript'],
    liveHref:    'https://myproject.com',
    repoHref:    'https://github.com/noahdean/myproject',
  },
]
```

TypeScript will tell you immediately if something is wrong.

## Customising the Design

**Colors / tokens** → `src/styles/globals.css` `:root` block  
**JS token reference** → `src/tokens/design-tokens.ts`  
**Fonts** → Google Fonts import in `globals.css`; change `--font-display`, `--font-body`, `--font-mono`

## Reusing Components in a New Project

Every component is self-contained. To lift one out:

1. Copy the `.tsx` file
2. Copy `src/types/index.ts` (or just the interfaces you need)
3. Copy `src/styles/globals.css` and import once at root
4. Drop in and pass props — they all have sensible defaults

## Deployment

```bash
npm run build
# → dist/ folder ready for any static host

# Vercel (recommended)
npx vercel

# Or drag dist/ to Netlify drop
```

## Next Components to Build

- [ ] `ScrollProgress.tsx` — accent-colored top progress bar
- [ ] `CursorGlow.tsx` — custom cursor with ambient teal glow
- [ ] `ThemeToggle.tsx` — light/dark mode switch
- [ ] Mobile responsive breakpoints (`@media` queries in globals)
- [ ] `og-image.png` — social preview card for Open Graph
