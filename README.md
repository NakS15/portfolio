# Nakul Bukkawar — Full-Stack & GenAI Engineer Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![WebGL](https://img.shields.io/badge/Graphics-WebGL_(cobe)-black?style=for-the-badge&logo=webgl&logoColor=white)](https://github.com/shuding/cobe)

<p align="center">
  <strong>An interactive developer portfolio with a cursor-reactive hero, a live AI assistant grounded on my real background, and a hand-built interactive WebGL globe.</strong>
</p>

<p align="center">
  Built by <strong><a href="https://github.com/NakS15">Nakul Bukkawar</a></strong> — Full-Stack & GenAI Engineer.
</p>

</div>

---

## ✦ Overview

This is my personal portfolio: a single-page Next.js site that pairs clean
backend-engineer presentation with hands-on GenAI and motion-design work. It
doubles as a live demo of an AI assistant grounded on my real background
(not a generic chatbot), and every interactive effect on the page — the
smooth scroll, the 3D tilt cards, the drawing timeline, the WebGL globe — is
hand-built rather than pulled from a template.

---

## ✦ Key Features & Interactive Architecture

### 1. 🧲 Cursor-Reactive Hero
- Canvas-based constellation field that drifts and links to nearby points,
  leaning toward the cursor.
- Magnetic buttons that pull toward the pointer on hover.
- Renders a single static frame under `prefers-reduced-motion`.

### 2. 🪄 Ask My AI
- A live, server-grounded assistant (`src/app/api/ask/route.ts`) that answers
  questions about my real experience, backed by the Anthropic API /
  OpenRouter.
- Origin-matching, rate limiting, and a keyword content gate guard the
  endpoint; a deterministic fallback keeps the demo working with zero API
  key configured.

### 3. 🪟 Interactive Project Detail Modal
- Glassmorphic modal with backdrop blur and a spring entrance, surfacing
  resume-sourced highlights that don't fit on the card.
- Keyboard-accessible (focus management, Escape to close) and scroll-locked
  while open.

### 4. 🌍 Interactive WebGL Globe
- Autorotating, drag-to-spin globe ([`cobe`](https://github.com/shuding/cobe))
  marking my home base in India alongside tech hubs across Europe and
  beyond.
- Physics-based release damping via Framer Motion's spring.

### 5. 🪞 3D Tilt Project Cards
- Mouse-driven `perspective` / `rotateX` / `rotateY` tilt with a radial
  spotlight following the cursor.
- Cards scatter on scroll-in and settle into place, replaying every time
  they re-enter view.

### 6. 📈 Scroll-Linked Timeline & Counters
- The career timeline draws itself in as you scroll, tied directly to
  scroll progress.
- Stats count up from zero on every scroll-in, with fractional precision so
  even whole-number stats read as genuinely counting rather than jumping.

### 7. ☄️ Smooth Scroll & Ambient Motion
- Site-wide inertia scrolling via [Lenis](https://github.com/darkroomengineering/lenis).
- A 3D-tilted logo marquee, an animated "Backend ↔ GenAI" beam, and a subtle
  meteor accent round out the motion language — all respecting
  reduced-motion preferences.

---

## ✦ Tech Stack

| Domain | Technology | Description |
|---|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) | Server-rendered React with a server-only `/api/ask` route |
| **Language** | TypeScript | End-to-end type safety |
| **Styling** | Tailwind CSS 3 | Utility-first styling, single accent color defined once |
| **Motion** | [Framer Motion](https://www.framer.com/motion/) + [Lenis](https://github.com/darkroomengineering/lenis) | Scroll-linked animation, inertia smooth scroll |
| **3D / WebGL** | [cobe](https://github.com/shuding/cobe) | Lightweight WebGL globe, no Three.js required |
| **AI** | Anthropic SDK + OpenRouter | Grounded Q&A over a hand-written bio, with a deterministic fallback |
| **Rate limiting** | Upstash Redis (optional) | Distributed limiter with an in-memory fallback |
| **Icons** | [Phosphor Icons](https://phosphoricons.com/) | Consistent icon set across the UI |

---

## ✦ Featured Projects

The portfolio showcases real production and personal work:

- **FASTAG transactions platform** (IBM): High-throughput payment backend for
  HDFC Bank, 2M+ daily transactions.
- **Telecom and healthcare modernization** (IBM): Enterprise integrations for
  AT&T and Horizon BCBS.
- **BMW carbon footprint platform** (BMW TechWorks India): Microservices for
  sustainability and carbon accounting.
- **RAG knowledge engine**: Retrieval-augmented generation over PostgreSQL +
  pgvector, grounded on the Anthropic API.
- **MCP tool server**: A working Model Context Protocol server exposing
  typed tools to LLM clients.
- **Saree marketplace MVP**: Full-stack multi-vendor marketplace with
  separate customer/vendor/admin roles and real Razorpay checkout (React,
  Node.js, MongoDB).

---

## ✦ Project Structure

```bash
portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx            # Single-page layout, section composition
│   │   ├── layout.tsx          # Root layout, fonts, SmoothScroll mount
│   │   └── api/ask/route.ts    # Server-only AI endpoint
│   ├── components/              # One component per section/effect
│   └── lib/
│       ├── site.config.ts      # Single source of truth for all content
│       ├── bio.ts              # AI grounding context + fallback answers
│       └── rateLimit.ts        # Upstash-backed / in-memory rate limiter
├── public/                      # Resumes, logos, static assets
└── tailwind.config.ts            # Theme tokens + custom keyframes
```

---

## ✦ Getting Started Locally

### Prerequisites
- Node.js 18+

```bash
# Clone the repository
git clone https://github.com/NakS15/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run the dev server
npm run dev
```

Then open `http://localhost:3000`.

### Production build

```bash
npm run build
npm start
```

---

## ✦ Make It Yours (One File)

Almost everything personal lives in **`src/lib/site.config.ts`** — name,
role, headline, stats, stack, experience, projects, certifications, and
social links all live there. The AI grounding text lives in
**`src/lib/bio.ts`**.

---

## ✦ Environment Variables

The "Ask my AI" demo calls a **server** route; your API key never touches
the browser. Copy `.env.example` to `.env.local` to enable real AI answers
(optional — without a key, the demo runs on curated fallback answers so it
never looks broken):

```bash
ANTHROPIC_API_KEY=
AI_MODEL=claude-3-5-haiku-latest

# Optional: distributed rate limiting via Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

OpenRouter (`OPENROUTER_API_KEY` / `OPENROUTER_MODEL`) is also supported and
is tried first if set.

---

## ✦ Deployment

- **Vercel** (recommended): import the repo at
  [vercel.com/new](https://vercel.com/new) — framework preset Next.js is
  auto-detected.
- Add environment variables under Project → Settings → Environment
  Variables, then deploy.
- Works on any Node host that supports Next.js
  (`npm run build && npm start`).

---

## ✦ Connect & Socials

- **Portfolio**: [nakulbukkawar-portfolio.vercel.app](https://nakulbukkawar-portfolio.vercel.app/)
- **GitHub**: [@NakS15](https://github.com/NakS15)
- **LinkedIn**: [in/nakul-bukkawar](https://www.linkedin.com/in/nakul-bukkawar-115a89204/)
- **Credly**: [AWS + GCP badges](https://www.credly.com/users/nakul-bukkawar)
- **Email**: [nakulbukkawar07@gmail.com](mailto:nakulbukkawar07@gmail.com)

---

## ✦ Notes

- **Accessibility & motion**: every animation respects
  `prefers-reduced-motion`; the canvas renders a single static frame and
  transitions collapse to instant.
- **Brand logos** in the stack marquee hide themselves automatically if a
  logo file is missing, so a broken slug never leaves a broken image.
- **Single accent color** is defined in `tailwind.config.ts`
  (`colors.accent`) — change it there and it updates everywhere.
