# μCR website

## Gallery

The gallery reads photos live from public Google Drive folders.

**Setup:** copy `.env.example` to `.env.local` and add a Google Drive API key. For the live site, add the same variable in Vercel and redeploy. The key is visible in the public site code, so restrict it as described in `.env.example`.

**Add an event:**

1. Share the Drive folder as "Anyone with the link".
2. Add its folder ID and a cover photo ID to `src/data/events.ts`.

Subfolders become albums, and folders starting with `_` stay hidden. Only folders inside an event listed in `src/data/events.ts` can be opened.

Run `npm run typecheck` to type check the gallery code.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
