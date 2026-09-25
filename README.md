# Iron Pulse — Gym Demo Website

A bilingual (Arabic / English) fitness club website that works on mobile. It was built as a portfolio demo.
It's plain HTML, CSS and JavaScript: no build step and no framework, so it runs on any hosting.

## Design
An editorial, magazine-style direction: warm paper background, deep ink, one terracotta accent,
oversized type with a serif accent word, and restrained motion:
- headlines rise line by line, and images reveal with a clip-mask
- the about paragraph lights up word by word as you scroll
- program rows show a floating photo that follows the cursor (desktop)
- slow marquee, a rotating badge, a light parallax on the hero image, and a navbar that hides on scroll
- all motion is disabled for users with `prefers-reduced-motion`

## Features
- **Arabic (RTL) and English (LTR)** with a single toggle. The chosen language is remembered.
- Programs index (6 programs)
- **Interactive class schedule**: day tabs, available spots and booking
- **Live BMI calculator** with sliders and a scale
- Trainers team, shown in a staggered grid
- **Pricing** with a monthly/yearly toggle and animated prices
- Testimonials with previous/next controls and autoplay
- Free-trial form with goal chips and validation
- Floating WhatsApp button and toast notifications
- Responsive layout (desktop, tablet, mobile)

## Project structure
```
index.html      page markup
css/style.css   all styles (brand colors are variables at the top)
js/i18n.js      every static text in Arabic and English
js/data.js      content: programs, schedule, trainers, plans, reviews, images
js/main.js      rendering and interactions
```

## Customizing for a client
| What | Where |
|---|---|
| Brand colors & fonts | `:root` variables at the top of `css/style.css` (`--accent` is the highlight color) |
| Texts / translations | `js/i18n.js` |
| Programs, classes, trainers, prices, reviews | `js/data.js` |
| Photos | Replace the `img("photo-…")` URLs in `js/data.js` and the hero image URL in `index.html` with your own files (e.g. `images/hero.jpg`) |
| Phone / WhatsApp | Search `201000000000` in `index.html` |

## Running locally
Open `index.html` in a browser, or serve the folder:
```bash
npx serve .
```

## Deploying
Upload all files as they are to your hosting's `public_html` (or any static host such as Netlify, Vercel or GitHub Pages).

> The contact and booking forms are front-end demos only. They show a success message but don't send data anywhere.
