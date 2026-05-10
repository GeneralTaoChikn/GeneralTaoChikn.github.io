# Christopher Diasanta Resume Site

A one-page resume website built with Next.js, TypeScript, Tailwind CSS, local shadcn/ui-style components, and Framer Motion.

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
