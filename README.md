# AI Commit & PR Generator

A SvelteKit TypeScript application that demonstrates OpenCode-ready developer workflows with Git Worktrees, GitHub Actions, TypeScript, SvelteKit, and Tailwind CSS.

This foundation intentionally uses mock implementations only. OpenCode integration can be added later behind SvelteKit server routes.

## Features

- SvelteKit and Svelte 5 dashboard UI
- Responsive Tailwind CSS developer dashboard
- Reusable UI components for buttons, text areas, navigation, sidebar, and cards
- Typed client API service layer
- SvelteKit server routes for mock generation APIs
- Writable stores for loading state, history, and current generation
- Mock responses for commit, PR, review, and explanation generation
- ESLint, Prettier, TypeScript, and GitHub Actions CI

## Folder Structure

```text
ai-pr-generator/
├── client/
│   ├── src/
│   │   ├── routes/
│   │   │   └── api/
│   │   │       ├── commit/
│   │   │       ├── pr/
│   │   │       ├── review/
│   │   │       └── explain/
│   │   ├── lib/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── stores/
│   │   │   ├── utils/
│   │   │   ├── types/
│   │   │   └── assets/
│   │   ├── app.css
│   │   └── app.html
│   ├── static/
│   ├── package.json
│   └── tsconfig.json
├── .github/workflows/
├── README.md
└── package.json
```

## Tech Stack

- App: SvelteKit, Svelte 5, TypeScript, Tailwind CSS, Vite
- API: SvelteKit server routes
- Tooling: ESLint, Prettier, GitHub Actions

## Installation

```bash
npm install
```

## Development

Start the SvelteKit app:

```bash
npm run dev:client
```

Application: `http://localhost:5173`

## Quality Commands

```bash
npm run check
npm run lint
npm run build
npm run format
```

## Mock API Endpoints

- `POST /api/commit`
- `POST /api/pr`
- `POST /api/review`
- `POST /api/explain`

## Future Improvements

- Integrate OpenCode behind SvelteKit server routes
- Add authentication and per-user generation history
- Persist generation records in a database
- Add repository import and git diff parsing
- Add automated tests with Vitest
- Add request validation
- Add streaming generation responses for long explanations
