# Fomi — AI generation workspace

Part A of the Fomi frontend assessment: the image/video generation page built from the mockup with Next.js, JavaScript and Tailwind CSS.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## How it's put together

```
src/
  app/
    page.js                 header + workspace
    api/generate/route.js   mocked generation API (fake delay, returns images/videos)
  components/
    header/                 logo, sliding nav tabs, theme toggle
    history/HistoryStrip    scrollable history bar (sticky)
    prompt/                 prompt panel: mode toggle, prompt box, selects, accordions
    gallery/                generation rows, image cards, loading + empty states
    Lightbox.js             full screen preview (loaded on demand)
    Workspace.js            page state: prompt, settings, generations, lightbox
  lib/
    data.js                 static/mock data
    mock-generator.js       builds a fake generation from a request
```

## Notes

- Colors live as CSS variables in `globals.css` and are exposed to Tailwind as `bg-cream`, `bg-blush`, `bg-salmon`, etc. Dark mode just swaps the variables.
- `Ctrl/Cmd + Enter` generates from the prompt box.
- Hovering a prompt card lets you reuse its prompt and settings or copy it.
- Images use `next/image`; the lightbox is code split with `next/dynamic`.
- The mock API has no real video files, so video results show a poster with a play badge.
