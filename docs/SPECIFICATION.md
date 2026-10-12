# Specification

Version 0.2, 2026-10-12 (the page now follows the new video). Read `docs/MISSION.md` first: it says why each
section below exists.

## 1. Scope

**v1 (now):** one page, `/jotha-prime-pitch`, plus the minimum around it
(a base layout, a bare home page, a 404).

**Later, not now:** a real home page, more pitch pages, a blog. Build v1 so
a second pitch page is a copy with new content, not a rewrite (see §6).

## 2. Stack

| Piece | Choice | Version (2026-10-09) |
|---|---|---|
| Framework | Astro, `output: "static"` | 7.3.x |
| UI islands | React via `@astrojs/react` | React 19.3, integration 7.0 |
| Styling | Tailwind CSS via `@tailwindcss/vite` | 4.3.x |
| Language | TypeScript, strict (`astro/tsconfigs/strict`) | |
| Package manager | npm | |
| Node | pinned in `mise.toml` | 26.x |

Principles:

- **Zero JavaScript by default.** A section is an `.astro` component unless
  it needs state or browser APIs. Then it's a React component in
  `src/components/islands/`, hydrated with the laziest directive that works
  (`client:visible` before `client:load`).
- **Tailwind tokens, not hex values.** Colors, fonts and spacing live in
  `@theme` in `src/styles/global.css`.
- **Fonts self-hosted** (or the system stack). No Google Fonts request from
  a phone on a slow connection.

## 3. Routes

| Route | Content | Indexed |
|---|---|---|
| `/` | Name, one line, LinkedIn and GitHub links, and two project cards, Usher and oikos (KnickKnackLabs contributions), with `ProofCard` and facts from `facts.ts`. Placeholder until the real home page. | yes |
| `/jotha-prime-pitch` | The pitch page (§4) | **no** (`noindex, nofollow`) |
| `/404` | Short, in Portuguese, link to `/` | no |

The pitch page is not linked from `/` or any other page, and isn't in a
sitemap. Use `trailingSlash: "never"` or make sure both
`/jotha-prime-pitch` and `/jotha-prime-pitch/` work on the chosen host.

## 4. The pitch page

Order matters: Caúca decides in the first screen whether to keep reading.
All copy is in Brazilian Portuguese. The text below is the intent; the final
wording is Olavo's.

### 4.1 Hero (first screen on a 375 × 667 phone)

- A line addressed to him: "Caúca, isso aqui é pra Jotha Prime."
- A headline that echoes his own reel: engineering, not slides
  ("IA com engenharia, rodando em produção").
- One sentence on who Olavo is: Vila Velha; builds AI systems that run in
  production, operated by a team of agents.
- The video (§4.2) starts on this screen or right below it, with its poster
  visible without scrolling.

### 4.2 Video

- The 2-minute proof video, "A engenharia, em 2 minutos"
  (`operation-get-a-job/video/jotha-prime/script.md`): his reel → oikos and
  lab → Usher, the product → Usher, the operation → "bora tomar um café".
  No Plantão. Until it's on YouTube, the page shows a placeholder with the
  same size and a "em breve" note, and the page can't be sent until the real
  one is in.
- Hosted on **YouTube, unlisted** (§10). The page shows a local poster
  image with a play button; tapping it swaps in the
  `youtube-nocookie.com` iframe with autoplay. Nothing loads from YouTube
  before the tap.
- Portuguese subtitles uploaded to YouTube, so it works muted in the in-app
  browser.
- Fallback link "abrir no YouTube" under the player, in case the in-app
  browser blocks the embed.

### 4.3 Proof: two cards, in the video's order

**oikos** (with lab): how Olavo runs agents with rules.
- Numbers: 44 of Olavo's own PRs merged in 8 KnickKnackLabs repos; 17 PRs
  opened by his agents in 9 repos. Keep the two apart: the agents' PRs are
  "abertos", never "aceitos", and neither agent merges.
- Detail: each agent has its own GitHub account; written rules for what each
  may do; lab sets up an agent team's rules, queue, permissions and checks,
  and `lab doctor` verifies them.
- Links: Olavo's merged PRs, github.com/olavostauros/oikos,
  github.com/olavostauros/lab.

**Usher**: a national event catalog in production.
- Numbers: 5 ticketing platforms, more than 12 thousand upcoming events in
  32 cities, a public API.
- Detail: Google Cloud Spot VM that restarts itself, an automatic budget
  cut, Grafana dashboards, freshness alerts. **No R$ figure.**
- Links: eventolivre.com/usher (the project page) and eventolivre.com. Not the repo.

Every number comes from `src/data/facts.ts` (§5).

### 4.4 (Removed) The engine and the bridge

Removed on 2026-10-12 (§10): the pitch page doesn't mention Plantão. The
proof goes straight from Usher to the pilot idea.

### 4.5 The pilot idea for Jotha

A document-intake agent, shown as a 4-step flow:

1. The client sends a photo or PDF on WhatsApp (where JothaX already is).
2. The agent extracts and classifies it (OCR for scans).
3. It validates the data against rules; anything doubtful goes to a human
   review queue.
4. Validated data is loaded into Senior (ERP, HCM or WMS) through its API,
   traceable to the source page.

Be honest about the Senior gap in one line: Jotha knows Senior, Olavo builds
and runs the agent and the pipeline.

Rendered as an `.astro` component with CSS, no island. An optional island
later could step through the flow, if it earns its JavaScript.

### 4.6 How we could work together

The offer ladder, smallest first:

1. **Café de 20 min** in Serra, with the demo. Free.
2. **Diagnóstico e protótipo** (1–2 weeks, fixed price): one process, a
   working agent on real or anonymised data.
3. **Piloto em produção** (3–6 weeks, fixed price): deployed, monitored,
   documented, handed over with a runbook.
4. **Engenheiro dedicado ou parceiro white-label** for JothaX, JothaZap and
   new products.

**No prices on the page.** They're for the call (`strategy.md`).

### 4.7 Call to action

- One primary action: "Bora tomar um café?", which opens WhatsApp
  (`https://wa.me/<number>?text=<prefilled>`). The number is in `src/data/site.ts`.
- Secondary: email (olavodevilhenalima@gmail.com), LinkedIn, GitHub.
- It appears at the end, and as a compact sticky bar on mobile after the
  video.

### 4.8 Footer

Name, Vila Velha · ES, the date the numbers were checked ("números
conferidos em …").

## 5. Content model

All facts live in **`src/data/facts.ts`**, typed:

```ts
export type Fact = {
  value: string;      // as shown, e.g. "5.152", "~30 h"
  label: string;      // "questões extraídas e validadas"
  source: string;     // where it was checked; public names only
  checked: string;    // ISO date, e.g. "2026-10-12"
};
```

The build fails (a check in `astro.config` or a test) if any fact shown on
the pitch page was checked more than 7 days before the build. That makes
stale numbers impossible to deploy by accident.

Pitch-specific content (the greeting, the pilot idea, the target's name)
lives in **`src/data/pitches/jotha-prime.ts`**, so a new pitch is a new data
file plus a route.

## 6. Components

| Component | Kind | Purpose |
|---|---|---|
| `layouts/Base.astro` | Astro | `<head>`, meta, robots, fonts, global CSS |
| `Hero.astro` | Astro | §4.1 |
| `islands/VideoPlayer.tsx` | React | §4.2: poster, tap to load the YouTube embed, placeholder state |
| `ProofCard.astro` | Astro | §4.3 and §4.4, one per project |
| `Bridge.astro` | Astro | §4.4 |
| `PilotFlow.astro` | Astro | §4.5, the 4-step flow |
| `OfferLadder.astro` | Astro | §4.6 |
| `islands/ContactCTA.tsx` | React | §4.7: the sticky bar that appears after the video scrolls by |
| `Footer.astro` | Astro | §4.8 |

## 7. Requirements

- **Mobile first,** tested at 375 px wide and in Instagram's in-app browser
  (iOS and Android), then desktop.
- **Fast:** first screen readable in under 2 s on 4G; Lighthouse
  performance ≥ 95 on mobile; the page without the video is under 150 KB.
- **Accessible:** semantic headings, alt text, visible focus, contrast AA,
  the video has subtitles.
- **Light and dark** following the system setting.
- **Open Graph:** title, description and an image, so the link previews well
  in the Instagram DM. The preview must not show anything private.
- **Meta:** `<meta name="robots" content="noindex, nofollow">` on the pitch
  page; `lang="pt-BR"`.
- **No tracking** and no third-party requests at runtime, except the YouTube
  embed, which loads only after a tap (§10).

## 8. Privacy checklist (before every deploy)

- [ ] No private repo names or links, hosts, IPs, tailnet names,
      dashboard URLs. `npm run build` passes with `.private-words` filled
      in (it fails on a private word in `src/`, `public/`, `docs/`,
      `dist/` or a root file).
- [ ] No Plantão link (repo or site) until Olavo says so.
- [ ] Every number is in `facts.ts` and was checked in the last 7 days.
- [ ] "Extraídas e validadas", never "publicadas". "Cerca de 30 horas".
- [ ] No R$ figure for Usher. Agent PRs "abertos", never "aceitos".
- [ ] "Jotha" spelled right everywhere, including the URL and OG tags.
- [ ] Nothing about Caúca's or Thalita's personal life.
- [ ] The video passed iris's privacy audit (no terminal hostname, no URL
      bar, no host or IP in frame).

## 9. Open questions

| # | Question | Notes | Owner |
|---|---|---|---|
| Q1 | A short personal opener for Caúca in the video (iris's "v1-jotha" idea) or only on the page | | Olavo, iris |

## 10. Decisions

| Date | Decision |
|---|---|
| 2026-10-09 | Astro + React islands + Tailwind CSS, static output. |
| 2026-10-09 | Route is `/jotha-prime-pitch` (company spelled Jotha). |
| 2026-10-09 | Pitch page is `noindex` and unlinked. |
| 2026-10-09 | No prices on the page; prices are for the call. |
| 2026-10-09 | Hosting: GitHub Pages, built by a GitHub Actions workflow, from a project repo `olavostauros/olavostauros.com` with custom domain `olavostauros.com`. (No user-site repo `olavostauros.github.io` exists, so `olavostauros.github.io/plantao` and `/charlespersonal` keep their URLs.) |
| 2026-10-09 | Video: YouTube, unlisted, embedded through `youtube-nocookie.com` behind a click-to-load poster (the iframe loads only after a tap). This is the one allowed third-party request. |
| 2026-10-09 | Primary CTA: WhatsApp (`wa.me`) with a prefilled message. |
| 2026-10-09 | Email shown: olavodevilhenalima@gmail.com. WhatsApp: +55 27 98121-8258. |
| 2026-10-09 | DNS moves off Vercel to **Cloudflare** (DNS only, no proxy), keeping the Resend records (§11). |
| 2026-10-09 | The repo is public, `docs/` and `AGENTS.md` included. |
| 2026-10-09 | The home page shows Usher and oikos, the KnickKnackLabs contributions (Olavo's call). Their numbers go through `assertFresh` like the pitch page's. Agent PRs are called "abertos" until merged. |
| 2026-10-12 | The name of Plantão's private database repo never appears in this repo (files, comments, commit messages, alt text, build output, tests or check scripts). Guarded by `scripts/check-private-words.mjs`, which reads the words from the gitignored `.private-words` and runs in `npm run check` and after `npm run build`. |
| 2026-10-12 | No Plantão link on the site: the public repo still names the private codename (being scrubbed) and the site shows fictitious examples. A link comes back only when the repo is scrubbed and Olavo says so. |
| 2026-10-12 | The pitch page follows the new video: hero → video ("A engenharia, em 2 minutos") → oikos (with lab) and Usher → Plantão as "o motor do piloto" + the bridge → pilot → ladder → CTA. |
| 2026-10-12 | Usher: "corte automático de gasto quando bate o orçamento", no R$ figure (Grafana has no cost panel; R$ 15/day is a target). Plantão: "cerca de 30 horas" (the current report is 30 h 07 min). Facts re-checked 2026-10-12. |
| 2026-10-12 | Plantão comes off the pitch page entirely: the "O motor do piloto" section (intro, Plantão card, bridge paragraph) is removed, not renamed, since police exams, Cebraspe and the numbers identify it anyway. Its `projects.ts` entry and `plantao*` facts are deleted (no other page used them). The page is now hero → video → oikos and Usher → pilot → ladder → CTA; the pilot and ladder wording is unchanged. |

## 11. DNS (set up 2026-10-09)

- **Registrar:** Namecheap, registered until **2026-12-31**, auto-renew
  **off**. Nameservers: `celine.ns.cloudflare.com`, `rex.ns.cloudflare.com`.
- **DNS:** Cloudflare (Free plan), every record **DNS only** (grey cloud).
  GitHub Pages issues its own Let's Encrypt certificate, which needs the
  records unproxied. DNSSEC is off.
- **Records:**
  - `@` A 185.199.108–111.153 and AAAA 2606:50c0:8000–8003::153 (GitHub
    Pages); `www` CNAME `olavostauros.github.io`.
  - `_github-pages-challenge-olavostauros` TXT: GitHub domain verification
    (the domain is verified on the olavostauros account, which blocks
    takeover by other accounts). Keep it.
  - `resend._domainkey` TXT, `send` TXT (SPF), `send` MX: Resend email. Keep.
  - CAA for letsencrypt.org, pki.goog, sectigo.com.
  - `_domainconnect` CNAME to Vercel: left over from the Vercel scan, safe
    to delete.
- **Before:** nameservers were Vercel's (`ns1/ns2.vercel-dns.com`); the
  Vercel team still lists the domain but no longer serves it.
