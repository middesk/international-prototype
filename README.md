# International KYB Prototype

Interactive prototype for Middesk's International Know Your Business (KYB) verification product. This is a **prototype only** — it uses mock data and is intended for internal demos and design exploration, not production use.

## What this covers

- **Order flow** — Full-page order creation matching the Middesk dashboard, with region/geography selection and jurisdiction-specific form fields
- **Business selection** — Intermediate page for selecting from multiple registry matches, with confidence scoring and ranked results
- **Auto-select threshold** — Configurable setting that automatically picks the top match when it exceeds a confidence score
- **Registration number guidance** — Contextual hints per jurisdiction (e.g. "don't use GST/HST") to help users provide the correct registry identifier
- **Settings** — Toggle for enabling/disabling International Search, plus the auto-select confidence threshold slider
- **Regions** — Canada (provincial jurisdictions), Core Europe, Extended Europe, APAC, Australia

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/`.

> **Note:** This project depends on `@middesk/components` as a local file dependency (`../components`). Make sure the components repo is cloned as a sibling directory.

## Stack

- React 19 + Vite
- styled-components
- react-router-dom v7
- Mock data (no backend)

## This is a prototype

Everything here is hardcoded mock data. There are no API calls, no auth, no persistence. The goal is to explore UX patterns for international business verification before building the real thing.
