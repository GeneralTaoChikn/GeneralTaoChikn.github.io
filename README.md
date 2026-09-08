# Christopher Diasanta Resume Site

A one-page resume website built with Next.js, TypeScript, Radix Themes, and Lucide icons.

## Design system

The portfolio uses Radix Themes for cards, buttons, badges, and the accessible mobile navigation menu. The root theme in `app/layout.tsx` defines the indigo accent, slate neutrals, and rounded corners. `app/globals.css` defines responsive layouts and typography; Tailwind remains available for utilities and legacy local components.

Light and dark appearances follow the system preference on first visit. The header toggle saves a preference when browser storage is available. Reduced-motion preferences, visible keyboard focus, and a skip link are supported.

Résumé content and personal interests live in `lib/resumeData.ts`, with selected-work summaries in `app/page.tsx`. Keep metrics grounded in the résumé when editing. The résumé buttons download `public/Diasanta_Resume.pdf`.

## Browser résumé assistant

The “Ask my résumé” section searches the shared portfolio data locally and displays matching résumé excerpts with section links. It does not generate answers or download an AI model, and works with the GitHub Pages static export.

- **Results:** `lib/resume-chat-context.ts` ranks excerpts by keyword and alias matches, then returns up to three. Experience descriptions come directly from `lib/resumeData.ts`; structured profile, skill, education, and contact fields use fixed formatting. No model rewrites or invents résumé claims.
- **Matching:** Short follow-ups can reuse the previous question. Results are labeled as related excerpts, not assertions that the question’s premise is true. Search may miss paraphrases or return a related excerpt that does not fully answer the question. No matches produce a fixed fallback with a contact suggestion.
- **Privacy and loading:** Search is ready immediately. Questions and history stay in browser memory; no inference service, model host, worker, API key, or account is involved. Clear chat removes the conversation; reloading also clears it.
- **Bounds:** Search questions and previous-question context are limited to 500 characters.

`components/resume-chat/resume-chat.tsx` owns the search interface and conversation display. Update résumé facts in `lib/resumeData.ts`; update site implementation facts in the context module if the stack changes.

Run retrieval tests with `npm test`. Build the static deployment with `DEPLOY_TARGET=github-pages npm run build`.

## Getting Started

Install dependencies and run the local server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Docker

Run the Dockerized dev server with hot reload:

```bash
./rundocker.sh
```

Then open `http://localhost:3000`.

To use a different host port:

```bash
PORT=8080 ./rundocker.sh
```

Build the production image:

```bash
./build.sh
```

You can also run the production image with Compose using `docker compose up --build`.

## GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-github-pages.yml`.

To deploy:

1. Push the project to a GitHub repository named `React_Resume`.
2. In GitHub, open the repository settings.
3. Go to `Pages`.
4. Set `Build and deployment` source to `GitHub Actions`.
5. Push to the `main` branch.

The site will deploy to:

```text
https://<your-github-username>.github.io/React_Resume/
```

If your repository name is different, update `NEXT_PUBLIC_BASE_PATH` in `.github/workflows/deploy-github-pages.yml` to match it. For example, a repo named `resume` should use `/resume`.

If you deploy to a user site repository named `<your-github-username>.github.io`, set `NEXT_PUBLIC_BASE_PATH` to an empty string.

## Resume Assets

The source PDF is available at `public/Diasanta_Resume.pdf`.
