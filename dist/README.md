# Muhammad Ali Abeer Khan — Portfolio

🔗 **Live site:** [ctrl-shift-ali.github.io/My-Portfolio](https://ctrl-shift-ali.github.io/My-Portfolio/)

This is my personal portfolio — built as a cinematic, 3D-flavored space to show off
what I do rather than just list it. Instead of a static "about me" page, I wanted
something that feels a bit more alive: motion, depth, and a scene you actually move
through instead of scroll past.

## What's on it

- **Hero section with a 3D scene** — the first thing you see isn't a headshot and a
  tagline, it's an interactive spatial intro.
- **Projects grid** — a clean rundown of the things I've built.
- **Timeline** — a quick walk through my journey so far.
- **Contact footer** — the easiest way to reach me.

## Why it's built this way

I wanted the portfolio itself to be a demo of the kind of frontend work I enjoy —
smooth, intentional, and a little more "designed" than the average dev portfolio.
At the same time, I didn't want it to get in anyone's way, so there's a reduced-motion
mode built in for anyone who prefers (or needs) less animation.

## Tech stack

- **React** — component structure and UI logic
- **Vite** — dev server and build tooling
- **Tailwind CSS** — styling

## Running it locally

```bash
git clone https://github.com/ctrl-shift-ali/My-Portfolio.git
cd My-Portfolio
npm install
npm run dev
```

Then open `http://localhost:5173` (Vite's default port) in your browser.

To build for production:

```bash
npm run build
```

## Project structure

```
src/
├── components/
│   ├── Hero.jsx           # Landing section
│   ├── HeroScene.jsx      # The 3D/animated scene in the hero
│   ├── Navigation.jsx     # Site nav
│   ├── ProjectsGrid.jsx   # Project showcase
│   ├── Timeline.jsx       # Journey/experience timeline
│   └── ContactFooter.jsx  # Contact section
├── hooks/
│   └── useReducedMotion.js
├── App.jsx
├── main.jsx
└── index.css
```

## Feedback

If you spot a bug, have a suggestion, or just want to say hi about the design —
feel free to open an issue or reach out through the contact section on the site.

---

Built and maintained by **Muhammad Ali Abeer Khan**.
