# React frontend

Mr.Look Photography is now a frontend-only React single-page application powered by Vite. All website content and images are bundled locally; no PHP server, database, admin dashboard, or API is required.

## Development

1. Install packages with `npm install`.
2. Start Vite with `npm run dev`.
3. Open `http://127.0.0.1:5173`.

## Production

Run `npm run build`. The optimized static website is generated in `dist/`.
Deploy the contents of `dist/` to a static host and configure SPA fallback to
`index.html` for client-side routes.

## Routes

- `/` — editorial homepage
- `/gallery` — project gallery
- `/albums` — album collection
- `/albums/:slug` — individual album
- `/about` — studio and services
- `/booking` — email-based booking request
- `/review` — email-based client review
- `/terms-and-conditions` — terms and conditions

## Content

Editable text and content collections are in `src/data.js`. Website images are
stored under `assets/`.
