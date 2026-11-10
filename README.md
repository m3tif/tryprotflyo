# Mohamed Atif — Portfolio

## Visual direction (v3 — "Midnight Exhibition")

Deep midnight navy (#080B14) and rich charcoal (#10141F) for the rooms, soft ivory (#F2F0E9) for type, muted silver (#A6A9B2) for secondary text, electric blue (#7189FF) only for things you can act on, and soft champagne (#D6C6A5) for small editorial marks (project numbers, the italic surname). The About section is a light "gallery room" (`.room-light` in `index.css` inverts the palette for everything inside it).

- **Hero:** a layered "living photograph" — graded landscape, mist, your portrait as a floating print, and frame marks. On desktop each layer follows the pointer at its own depth (`gsap.quickTo`), the stage tilts slightly in 3D and a soft light follows the cursor. On phones and tablets it breathes slowly and drifts with scroll instead. The name sits on its own layer and is unmasked after the entrance, so it can never be clipped.
- **No custom cursor**, no WebGL, no canvas grain: the film grain is one static CSS layer.
- **Images:** every stock visual is listed in `src/data/images.js` (Unsplash, credited on screen, free under the Unsplash License). They load from Unsplash's CDN at the size each device needs; each has a local fallback so a slot is never empty. Replace any entry with a local path to use your own image.


A cinematic personal portfolio built with **React (Vite)**, **GSAP**, **Lenis** and components from **React Bits**, styled with **Tailwind CSS v4**.

The visual idea is a photographer's darkroom: carbon-black paper, silver-gelatin whites, a safelight amber for anything you can act on, and a selenium violet for atmosphere. Images "develop" as they enter the screen — the frame opens and the picture comes up from a flat grey to full tone. Type is Bodoni Moda (display) with Schibsted Grotesk (text), both self-hosted.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

Requires Node 20.19+ (Vite 8).

## Arabic / English

The site is fully bilingual. The language switch sits in the header; the choice is remembered, and first-time visitors get English if their browser is set to English, Arabic otherwise (`?lang=en` or `?lang=ar` in the URL also works).

- Every text field in `src/data/` is written as `{ en: '…', ar: '…' }`. Interface wording (buttons, labels) lives in `src/i18n/ui.js`.
- Arabic switches the whole layout to right-to-left, uses Amiri for headings and IBM Plex Sans Arabic for text, and animates by word instead of by letter so letters stay joined.
- Latin terms inside Arabic sentences (.NET, C#, ASP.NET Core) are isolated automatically so they never come out reversed.
- The résumé lives at `/cv` in both languages, built from the same data. "Save as PDF" prints a clean A4 version.

## Still to fill in (marked TODO / CONFIRM in the data files)

- Your real photos: `public/images/profile/portrait.webp` and `about.webp`.
- Years for each project and each milestone in the journey.
- One-line descriptions for Sakansa, Lilies Co and Motaqsa, and the details of Ghamer CRM.
- GitHub and LinkedIn URLs in `src/data/socials.js` (they stay hidden until filled).
- Your domain in `site.url` (`src/data/profile.js`).
- Screenshots: the project covers are title cards; drop real screenshots into `public/images/projects/` with the same names.

## Replace the placeholders

Everything you'll edit lives in `src/data/` and `public/images/`. Every placeholder is labelled `PLACEHOLDER` in the data files, and every placeholder image carries a small "Placeholder" caption burned into it.

| What | File |
| --- | --- |
| Name, title, intro, bio, interests, approach, details, email, time zone | `src/data/profile.js` |
| Projects (title, category, year, description, tech, live + source links, case-study text, images) | `src/data/projects.js` |
| Photography (image, size, title, place, year, layout span) | `src/data/photography.js` |
| Skill categories and skills | `src/data/skills.js` |
| Journey / timeline milestones | `src/data/experience.js` |
| Social links and navigation | `src/data/socials.js` |
| SEO title, description, Open Graph tags | `index.html` (+ `site` in `profile.js`) |

**Images.** Drop files into `public/images/profile`, `public/images/projects` and `public/images/gallery`, then point the data at them. WebP or AVIF around 1600px on the long edge is plenty. For photos, set `width` and `height` to the real pixel size so the page reserves the right space while loading. Replace `public/images/og-image.webp` with a 1200×630 share image.

**Projects.** `slug` becomes the URL (`/work/<slug>`). Leave `sourceUrl: ''` to hide the source link. `layout` (`wide`, `tall`, `offset`) sets the image proportions in the asymmetric grid; the grid placement repeats every six projects.

**Photography.** `span: 'feature'` makes a plate span the whole exhibition wall — use it once or twice for your strongest image.

## Structure

```
src/
  App.jsx                    Router + providers + global layers (grain, cursor)
  data/                      All editable content
  context/
    SmoothScroll.jsx         Lenis, synced to GSAP's ticker + ScrollTrigger
    PageTransition.jsx       Curtain transition between routes, <TransitionLink>
  lib/
    gsap.js                  Plugin registration, shared media queries
    asset.js                 Resolves /public paths against Vite's base URL
  components/
    layout/                  Navbar, Footer, Preloader
    sections/                Hero, Works, About, Photography (+ Lightbox), Skills, Journey, Contact
    ui/                      Print (image reveal), MagneticButton, Marquee, Cursor, SectionHeading, SocialIcon
    reactbits/               Components from React Bits (see below)
  pages/                     Home, ProjectPage (case study), NotFound
  styles/index.css           Design tokens (Tailwind @theme) and global styles
```

## How the motion is wired

- **Lenis + ScrollTrigger.** One Lenis instance is driven by `gsap.ticker` (no separate rAF loop), `lenis.on('scroll', ScrollTrigger.update)` keeps triggers in sync, and lag smoothing is off so the two never disagree. Everything is torn down on unmount.
- **Cleanup.** Every animation lives inside `useGSAP()` (or a `gsap.matchMedia()` inside it), so tweens, ScrollTriggers and SplitText instances are reverted automatically.
- **Reduced motion.** With `prefers-reduced-motion: reduce`, smooth scrolling, the preloader, reveals, parallax, the pinned timeline and the custom cursor are all skipped; content is simply shown.
- **Touch devices.** The custom cursor and magnetic pull only run on fine pointers. Parallax and the horizontal timeline are desktop-only; mobile gets a vertical timeline that draws itself.
- **Performance.** Only `transform`, `opacity`, `clip-path` and `filter` are animated. The WebGL background and grain pause when off-screen. Images are lazy-loaded with explicit dimensions; GSAP/Lenis and React ship as separate cacheable chunks.

## React Bits components used

Copied from [reactbits.dev](https://reactbits.dev) (MIT + Commons Clause, © David Haz) into `src/components/reactbits/`:

- **SplitText** — section headings, project titles, contact headline
- **ScrollReveal** — the About statement, which brightens word by word as you scroll (small edit: an `as` prop for the wrapper tag)
- **Grainient** — the slow, grainy WebGL glow behind the hero
- **Noise** — film grain over the whole site
- **Magnet** — magnetic pull on the main buttons
- **CurvedLoop** — the curved "Let's work together" banner (small edit: removed its full-screen min-height)

## Deploying

The site uses clean URLs (`/work/project-one`), so your host needs an SPA fallback to `index.html`:

- **Vercel:** add `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`
- **Netlify:** add `public/_redirects` with `/*  /index.html  200`

If your host can't do rewrites (e.g. GitHub Pages), build with hash URLs instead:

```bash
VITE_HASH_ROUTER=true npx vite build --base=./
```
