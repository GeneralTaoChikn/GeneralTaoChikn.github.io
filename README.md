# Christopher Diasanta Résumé Site

A one-page résumé website built with Next.js, TypeScript, Radix Themes, and Lucide icons.

## Content and design

The site leads with role, core technologies, and engineering outcomes. Experience includes the promotion timeline and optional additional bullets; selected work explains scope, contribution, and results. Secondary skills and résumé search expand on demand. Interests stay compact, and email, LinkedIn, and the downloadable résumé are accessible near the top.

`lib/resumeData.ts` contains résumé facts, shared performance metrics, selected-work summaries, skills, and education. Keep claims grounded in verified experience. The simulation result currently follows the existing résumé baseline: approximately 100 to 2,000 concurrent entities (20×). Work-location preferences remain unspecified.

`app/page.tsx` renders the page. `app/globals.css` defines responsive layouts and typography. Light and dark appearances follow system preference on first visit, with a saved manual override. Reduced motion, visible control focus, a skip link, and mobile section navigation are supported.

## Development

```sh
npm install
npm run dev
```

The development site runs at `http://localhost:3000`.

## Updating the downloadable résumé

The checked-in PDF is generated from the same data as the page and résumé search. After editing facts in `lib/resumeData.ts`, regenerate it:

```sh
npx playwright install chromium
npm run resume:pdf
```

`scripts/generate-resume.ts` produces a single-column, tagged PDF at `public/Diasanta_Resume.pdf`. Inspect its text and pagination after substantial content changes. Commit the regenerated PDF with the content edit. The static site does not need a browser at runtime or during deployment.

If Chromium is already installed, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable. Systems with additional browser runtime requirements may need their own font or library configuration.

## Résumé search

`components/resume-chat/resume-chat.tsx` provides an optional, collapsed search panel. Suggested searches execute immediately. `lib/resume-chat-context.ts` ranks shared résumé excerpts by keywords and aliases and returns up to three section-linked results. It does not generate answers or download a model.

Questions and history stay in browser memory. Clear searches or reload to remove them. Questions and follow-up context are limited to 500 characters. Related excerpts may not answer every part of a question; unknown facts are not invented.

## Checks

```sh
npm test
npx tsc --noEmit
```

With the development server running and Chromium available:

```sh
npm run test:browser
```

Browser regressions cover mobile section navigation, focus after menu dismissal, keyboard selection, and one-click suggested searches. `TEST_SITE_URL` can override the default `http://localhost:3000`.

## GitHub Pages

```sh
DEPLOY_TARGET=github-pages npm run build
```

The workflow at `.github/workflows/deploy-github-pages.yml` builds and deploys the static export. Use an empty `NEXT_PUBLIC_BASE_PATH` for a user-site repository, or the repository path for a project site. The custom domain is configured in `CNAME`.
