# Personal Website

My personal portfolio website showcasing my projects, talks, and professional journey.

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Storybook** - Component development & documentation

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Footer, PageShell, Links)
│   └── sections/        # Page sections (Hero, About, Projects, Talks, Contact)
├── data/                # Content data (projects, talks)
├── ui/                  # Design system (Button, tokens, theme)
└── stories/             # Storybook stories
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run Storybook

```bash
npm run storybook
```

## Sections

- **Hero** - Introduction and headline
- **About** - Background and skills
- **Projects** - Portfolio of work
- **Talks** - Conference presentations and speaking engagements
- **Contact** - Get in touch

## Observability

The production build starts Grafana Faro after a visitor accepts optional telemetry. Faro sends browser performance, errors, traces and named navigation events to Grafana Cloud Frontend Observability. Declining consent keeps telemetry off. The site's React components do not use React Router, so router instrumentation is not configured.

For the local talk demo, `npm run dev:faro-oss` sends Faro to the local Alloy receiver instead. `npm run dev:faro-cloud` exercises the Cloud route from localhost if that origin is allowed in the Grafana Frontend App. Ordinary `npm run dev` retains the older OpenTelemetry development path. The older Tempo setup is preserved in `src/telemetry.ts` and the documentation below but is not started by the production build.
