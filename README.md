# Nakul Bukkawar — Portfolio

An interactive developer portfolio built with Next.js (App Router), TypeScript,
Tailwind CSS, and Motion. It features a cursor-reactive canvas hero, magnetic
buttons, scroll reveals, and a live "Ask my AI" demo backed by the Anthropic API
(with a graceful offline fallback).

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Make it yours (one file)

Almost everything personal lives in **`src/lib/site.config.ts`** — edit that one
file to change your name, role, headline, stats, tech stack, experience,
projects, certifications, and social links.

Fields I couldn't fill for you are marked with `// TODO`. Before you ship, fill in:

| Where | What to set |
|-------|-------------|
| `socials` → `github` | Your real GitHub URL and handle (currently `your-github-handle`) |
| `socials` → `credly` | Your Credly profile URL (currently `your-credly-id`) |
| `certs` | The **exact** names of your AWS and GCP certifications + their Credly links |
| `resumes` | Drop the two PDFs in `/public` (see below) — filenames must match |
| `photoUrl` | Optional: add `/public/headshot.jpg` and set this to `"/headshot.jpg"` |

The AI grounding text lives in **`src/lib/bio.ts`** — update it whenever your
background changes, and tweak the suggested questions and offline fallback answers.

## Resume PDFs & assets

`/public` currently holds two **placeholder** PDFs so the download buttons work
right away. Replace them with your real resumes, keeping the same filenames:

- `public/Nakul-Bukkawar-GenAI.pdf`
- `public/Nakul-Bukkawar-FullStack.pdf`

(Or rename them and update `site.resumes` to match.)

## The "Ask my AI" demo

The chat widget calls a **server** route at `src/app/api/ask/route.ts`. Your API
key never touches the browser.

1. Copy `.env.example` to `.env.local`.
2. Add your key:

   ```bash
   ANTHROPIC_API_KEY=sk-ant-...
   AI_MODEL=claude-3-5-haiku-latest
   ```

3. Restart `npm run dev`.

**No key? It still works.** Without `ANTHROPIC_API_KEY`, the route returns
curated fallback answers (see `fallbackAnswers` in `src/lib/bio.ts`), so the demo
never looks broken on a static or keyless deploy. The same fallback kicks in if
an API call ever fails.

## Deploy (Vercel — recommended)

1. Push this folder to a GitHub repo.
2. Import it at [vercel.com/new](https://vercel.com/new). Framework preset:
   **Next.js** (auto-detected).
3. In Project → Settings → Environment Variables, add `ANTHROPIC_API_KEY`
   (and optionally `AI_MODEL`). Leave them out to run in fallback mode.
4. Deploy. Custom domains attach under Project → Domains.

Works on any Node host that supports Next.js (Netlify, Render, a Node server via
`npm run build && npm start`, etc.).

## Notes

- **Accessibility & motion:** every animation respects `prefers-reduced-motion`;
  the canvas renders a single static frame and transitions collapse to instant.
- **Brand logos** in the stack marquee load from the Simple Icons CDN and hide
  themselves if a slug is missing, so a wrong slug never leaves a broken image.
- **Single accent color** is defined in `tailwind.config.ts` (`colors.accent`).
  Change it there and it updates everywhere.

## Tech

Next.js 14 · React 18 · TypeScript · Tailwind CSS 3 · Motion (Framer Motion) ·
Phosphor Icons · Anthropic SDK
