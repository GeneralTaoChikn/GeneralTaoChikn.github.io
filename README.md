# Christopher Diasanta Resume Site

A one-page resume website built with Next.js, TypeScript, Radix Themes, and Lucide icons.

## Design system

The portfolio uses Radix Themes for cards, buttons, badges, and the accessible mobile navigation menu. The root theme in `app/layout.tsx` defines the indigo accent, slate neutrals, and rounded corners. `app/globals.css` defines responsive layouts and typography; Tailwind remains available for utilities and legacy local components.

Light and dark appearances follow the system preference on first visit. The header toggle saves a preference when browser storage is available. Reduced-motion preferences, visible keyboard focus, and a skip link are supported.

Résumé content and personal interests live in `lib/resumeData.ts`, with selected-work summaries in `app/page.tsx`. Keep metrics grounded in the résumé when editing. The résumé buttons download `public/Diasanta_Resume.pdf`.

## Browser résumé assistant

The “Ask my résumé” section uses `@huggingface/transformers` entirely in a Web Worker. It needs no API key, inference server, or Next.js API route and works with the GitHub Pages static export.

- **Model:** [SmolLM2-360M-Instruct](https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct), Apache-2.0, `q4` ONNX weights, pinned to revision `a10cc1512eabd3dde888204e902eca88bddb4951` in `components/resume-chat/chat.worker.ts`. The initial model download is approximately 400 MB, plus the inference runtime.
- **Loading:** No worker or model download begins until the visitor selects Start assistant. Model files come from Hugging Face; Transformers.js resolves its versioned WASM runtime from jsDelivr. Browser Cache Storage is used when available. Downloads require a connection; cache availability depends on browser storage policy.
- **Execution:** WebGPU is preferred when an adapter is available, with a single-threaded WASM CPU fallback. CPU inference can be slow on phones or older devices. HTTPS or localhost is recommended for browser capabilities. No cross-origin isolation headers or SharedArrayBuffer are required.
- **Grounding:** `lib/resume-chat-context.ts` ranks relevant excerpts from the shared résumé data and adds them to the model prompt. Unknown topics receive a fixed fallback. Generated answers include the actual context excerpts and section links, but a small model can still make mistakes; these links are context, not proof that every generated claim is correct.
- **Privacy:** Questions and conversation history stay in browser memory and are never submitted to an inference service. The download hosts receive ordinary asset requests. Clear chat clears the visible conversation, not cached model files. Reloading the page clears the conversation. Stop and Cancel terminate the worker; restarting reuses cached files when available.
- **Bounds:** Questions are limited to 500 characters, model history to six turns (starting with a user turn), and responses to 160 new tokens. Loading and generation have timeouts with recovery actions.

`components/resume-chat/resume-chat.tsx` owns the chat interface and worker lifecycle; `lib/resume-chat-types.ts` defines their message protocol. Update résumé facts in `lib/resumeData.ts`; update site implementation facts in the context module if the stack changes.

Run retrieval and context tests with `npm test`. Build the static deployment with `DEPLOY_TARGET=github-pages npm run build`.

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
