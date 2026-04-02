# Developer Portfolio

Modern single-page developer portfolio built with Next.js (App Router + TypeScript), Tailwind CSS, Framer Motion, and Three.js. Features a black-hole background in dark mode and a code-grid background in light mode.

## Stack
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 3
- Framer Motion for page/section motion
- Three.js for interactive backgrounds

## Features
- Responsive single-page layout with smooth scroll navigation
- Theme toggle with localStorage persistence (dark: black-hole scene, light: code grid)
- Terminal-inspired project cards with header dots and blinking cursor on hover
- Hero, About, Skills, Projects, and Contact sections with motion reveals
- Three.js background lazy loaded to avoid blocking the main thread
- Contact form with basic validation and a mocked toast notification

## Quickstart
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Key Paths
- Layout and page shell: src/app/layout.tsx, src/app/page.tsx
- Global styles: src/app/globals.css, tailwind.config.ts
- Data: src/lib/constants.ts (skills, projects, socials)
- Sections: src/components (Hero, About, Skills, Projects, ProjectCard, Contact, ThemeToggle, Background)

## Notes
- Replace public/avatar.svg with your own photo or illustration if desired.
- The Three.js background is client-only and loaded via dynamic import.
- Update project links and social profiles in src/lib/constants.ts.
