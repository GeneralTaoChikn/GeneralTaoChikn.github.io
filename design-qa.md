# Portfolio design verification

Verified September 7, 2026 against the production GitHub Pages export.

## Design system

- Radix Themes 3.3 supplies the shared theme, cards, buttons, badges, icon buttons, and mobile dropdown navigation.
- Indigo accents, slate neutrals, consistent Lucide stroke icons, and rounded surfaces establish the visual language.
- Career impact, résumé download, and contact actions are prominent. All eight experience contributions remain available through the expandable experience section.
- The existing profile portrait, hobby images, résumé, contact details, and education are retained.
- Radix styles are imported through `app/globals.css` before application overrides to keep production stylesheet ordering predictable.

## Verification results

- `DEPLOY_TARGET=github-pages npm run build`: passed compilation, type validation, and static export.
- Chromium overflow checks: passed at 320, 390, 768, 1024, and 1440 CSS pixels.
- Desktop and mobile screenshots reviewed for hierarchy, wrapping, portrait placement, and responsive spacing.
- Theme toggle, persistence after reload, and toggling with unavailable local storage: passed.
- Experience expansion: all eight contributions visible after opening.
- Desktop section navigation updates `aria-current` as the page scrolls.
- Mobile menu opens, navigates to Skills, closes after selection, and restores trigger focus on Escape.
- Résumé action downloads `Diasanta_Resume.pdf`.
- No browser runtime errors during interaction checks.
- Axe WCAG 2 A/AA and WCAG 2.1 AA checks: zero reported violations on desktop light, desktop dark, and mobile light states. Automated checks do not replace a manual screen-reader assessment.

## Local review artifacts

Temporary verification tooling is in `/tmp/portfolio-qa`; it is not a project dependency.

- `/tmp/portfolio-desktop-light.png`
- `/tmp/portfolio-desktop-dark.png`
- `/tmp/portfolio-mobile-light.png`
- `/tmp/portfolio-mobile-dark.png`
- `/tmp/portfolio-desktop-detail.png`
- `/tmp/portfolio-mobile-detail.png`

To reproduce the browser checks while the temporary tooling remains available, serve `out` on localhost port 3100, then run:

```bash
PLAYWRIGHT_BROWSERS_PATH=/tmp/portfolio-browsers node /tmp/portfolio-qa/check.cjs
```
