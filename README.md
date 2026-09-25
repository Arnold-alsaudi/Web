# Iron Pulse — Gym Demo Website

A bilingual (Arabic / English) fitness club website that works on mobile. It was built as a portfolio demo.
It's plain HTML, CSS and JavaScript: no build step and no framework, so it runs on any hosting.

## Features
- **Arabic (RTL) and English (LTR)** with a single toggle. The chosen language is remembered.
- Hero section with animated counters
- "Why us" features
- Programs grid
- **Interactive class schedule**: day tabs, available spots and booking
- **BMI calculator** with a color-coded result bar
- Trainers team
- **Pricing** with a monthly/yearly toggle (20% yearly discount)
- Testimonials slider (auto-play, dots, swipe on mobile)
- Free-trial booking form with validation
- Floating WhatsApp button, toast notifications and reveal-on-scroll animations
- Responsive layout (desktop, tablet, mobile) that respects `prefers-reduced-motion`

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
| Brand colors | `:root` variables at the top of `css/style.css` (`--accent` is the main color) |
| Texts / translations | `js/i18n.js` |
| Programs, classes, trainers, prices, reviews | `js/data.js` |
| Photos | Replace the `img("photo-…")` URLs in `js/data.js` and the hero URL in `css/style.css` with your own files (e.g. `images/hero.jpg`) |
| Phone / WhatsApp | Search `201000000000` in `index.html` |

## Running locally
Open `index.html` in a browser, or serve the folder:
```bash
npx serve .
```

## Deploying
Upload all files as they are to your hosting's `public_html` (or any static host such as Netlify, Vercel or GitHub Pages).

> The contact and booking forms are front-end demos only. They show a success message but don't send data anywhere.
