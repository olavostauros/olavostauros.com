# AGENTS.md — olavostauros.com

Instructions for any agent working in this directory. Read this file fully
before doing anything, then read `docs/MISSION.md` and
`docs/SPECIFICATION.md`. There is no CLAUDE.md here on purpose; this file is
the context.

## 1. What this is

Olavo Stauros's personal site. Its first job is one page,
**`olavostauros.com/jotha-prime-pitch`**, a pitch page that Olavo sends to
Caúca (Jotha Prime) in an Instagram DM. The page shows the 2-minute proof
video, the proof (Plantão and Usher) and one pilot idea built for Jotha, and
asks for one small next step: a 20-minute coffee.

The campaign behind it lives in `~/Work/operation-get-a-job/`. Read these
there before changing any copy:

- `AGENTS.md`: the mission, the portfolio rules, the positioning.
- `targets/jotha-prime/dossier.md` and `strategy.md`: who Caúca and Jotha
  Prime are, the angle, the offer ladder.
- `video/script.md`: the checked numbers, with sources and dates.

That directory is the source of truth for facts. This one is the source of
truth for the site. Don't edit files in `operation-get-a-job/` from here; if
something there is wrong, tell Olavo.

## 2. Stack

- **Astro 7** with static output, and **React 19** through `@astrojs/react`
  for interactive islands only. Everything that doesn't need JavaScript is
  an `.astro` component.
- **TypeScript**, strict.
- **npm** as the package manager (pnpm isn't installed). Node is pinned in
  `mise.toml`.
- **Tailwind CSS 4** through the `@tailwindcss/vite` plugin. Design tokens
  (colors, fonts, spacing) live in `@theme` in `src/styles/global.css`, so
  components use utility classes and never hard-code a hex value. Use
  Tailwind in both `.astro` and React components.

Commands (once the project is scaffolded):

```
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview
npm run check     # astro check (types)
```

## 3. Layout

```
AGENTS.md                this file
docs/MISSION.md          why the site exists, who reads it, what success is
docs/SPECIFICATION.md    pages, sections, components, requirements, open questions
src/
  pages/                 one route per file (jotha-prime-pitch.astro, ...)
  components/            .astro components; React islands in components/islands/
  data/facts.ts          every number shown on the site, with source and date
  layouts/               the base layout (head, meta, fonts)
  styles/global.css      Tailwind import, @theme tokens, base styles
public/                  static files (video poster, favicon, og image)
```

## 4. Rules

- **Copy is in Brazilian Portuguese**, short, specific and without hype.
  Code, comments and docs are in English.
- **The company is "Jotha Prime"**, spelled J-O-T-H-A. Never "Jhota". Check
  every URL, title and alt text.
- **Call him Caúca.** Not "CTIO" or "COO" (his titles differ between
  Instagram and LinkedIn).
- **Every number comes from `src/data/facts.ts`**, and every entry there has
  a source and the date it was checked. Copy them from
  `operation-get-a-job/video/script.md`, which iris checks. Never type a
  number into a component. Never show a number nobody checked within the
  week before sending.
- **Plantão:** say "extraídas e validadas", never "publicadas". Say "menos
  de 30 horas", not "32 horas". The public site only shows fictitious
  examples, so link the repo (github.com/olavostauros/plantao) and not the
  site, until a real snapshot is live.
- **Usher:** only say "R$ 15 por dia" if the Grafana panel showed it. The
  public API `api.eventolivre.com` may be linked; the repo is private and
  may not.
- **Never** link or name any private repo (Plantão's database repo has an
  internal codename; see `operation-get-a-job/AGENTS.md`), host, IP,
  tailnet, `.env`, dashboard URL or database dump. Don't mention Caúca's or
  Thalita's personal life (family, health), even though it's public.
- **The pitch page is `noindex, nofollow`** and isn't linked from anywhere
  else on the site. It's addressed to a named person, so search engines
  shouldn't index it.
- **No tracking or third-party scripts** (analytics, pixels, chat widgets)
  unless Olavo asks for them. The one exception is the YouTube embed, and it
  loads only after the visitor taps play.
- **Hosting is GitHub Pages**, from the public repo
  `olavostauros/olavostauros.com`. Anything committed is public, so
  nothing from `operation-get-a-job/` (dossiers, strategy, prices) goes in
  the repo.
- **Mobile first.** Caúca opens the link from Instagram, which means the
  in-app browser on a phone. Test at 375 px width first.
- **Never deploy, push, or change DNS** without Olavo's go-ahead. Build and
  preview locally, then ask.
- When a decision is made, record it in `docs/SPECIFICATION.md` (section
  "Decisions") with its date.
