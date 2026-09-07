# Christopher Diasanta Resume Site

A one-page resume website built with Next.js, TypeScript, Radix Themes, and Lucide icons.

## Design system

The portfolio uses Radix Themes for cards, buttons, badges, and the accessible mobile navigation menu. The root theme in `app/layout.tsx` defines the indigo accent, slate neutrals, and rounded corners. `app/globals.css` defines responsive layouts and typography; Tailwind remains available for utilities and legacy local components.

Light and dark appearances follow the system preference on first visit. The header toggle saves a preference when browser storage is available. Reduced-motion preferences, visible keyboard focus, and a skip link are supported.

Résumé content lives in `lib/resumeData.ts`, with selected-work summaries and personal interests in `app/page.tsx`. Keep metrics grounded in the résumé when editing. The résumé buttons download `public/Diasanta_Resume.pdf`.

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
