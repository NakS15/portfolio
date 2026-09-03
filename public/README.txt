Files in this folder are served from the site root (`/`).

WHAT TO REPLACE
- Nakul-Bukkawar-GenAI.pdf       -> your real GenAI resume (keep the filename)
- Nakul-Bukkawar-FullStack.pdf   -> your real full-stack resume (keep the filename)

Both current PDFs are placeholders so the download buttons work immediately.
The filenames are wired up in: src/lib/site.config.ts  (site.resumes)

OPTIONAL
- headshot.jpg   -> drop a square headshot here, then set photoUrl: "/headshot.jpg"
                    in src/lib/site.config.ts. Left blank, the site shows an "NB" monogram.
- favicon: add an app icon at src/app/icon.png (Next.js picks it up automatically).
