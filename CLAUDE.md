# Shelfy — project guide for Claude Code

Inventory + point-of-sale app for small shops. **This is a teaching project**:
the owner (Ahmad) is learning Node/Express, SQL and Vue from scratch. Claude
explains, writes the first example of each concept, then the owner writes the
next piece and Claude reviews. Do not build whole phases silently.

## Rules

1. **Everything must be free forever**: Node, Express, Vue, Vite, Postgres on
   Neon (free tier), Render free web service (API), Vercel hobby (web), GitHub.
   Never introduce a paid service or a free trial.
2. **Plain JavaScript** (ESM, `"type": "module"`). No TypeScript.
3. Node **22+**. No Docker until Phase 10, and then optional.
4. Every lesson file carries comments in Roman Urdu + English and ends with an
   `✍️ EXERCISE` the owner completes himself.
5. Never read, print or commit `.env*`. The Neon connection string lives only
   in `api/.env` (`DATABASE_URL`).
6. Keep this file current as phases land.

## Planned structure

```
phase-0/          Node fundamentals (modules, async, event loop, raw http)
api/              Express 5 REST API (Phase 1+)
  src/app.js      express() + middleware
  src/routes/     one file per resource
  src/controllers/ request → service → response
  src/services/   business logic
  src/db/         drizzle schema + migrations (Phase 2)
  src/middleware/ error-handler, validate (Zod), auth (Phase 3)
web/              Vue 3 + Vite SPA (Phase 4+): Vue Router, Pinia, TanStack Query,
                  shadcn-vue + Tailwind, vee-validate + Zod
```

## Phases

| # | Topic | Status |
|---|---|---|
| 0 | Node basics: modules, async/await, event loop, raw `http` | ✅ scripts pushed, exercises pending |
| 1 | Express: routing, middleware, errors, Zod validation, layered structure | |
| 2 | Postgres (Neon) + Drizzle: schema, migrations, relations, transactions | |
| 3 | Auth: JWT access/refresh, bcrypt, roles (owner/cashier), rate limit, helmet | |
| 4 | Vue 3: composition API, router, Pinia, TanStack Query, forms, tables | |
| 5 | POS screen: cart, keyboard-first, sale = one DB transaction | |
| 6 | Files: multer uploads (product images), receipt PDF (pdfkit) | |
| 7 | Reports: SQL aggregations, charts (vue-echarts), CSV export | |
| 8 | Realtime (Socket.IO) + jobs (node-cron) | |
| 9 | Offline-first PWA + sync queue, barcode (webcam), multi-branch | |
| 10 | Tests (Vitest, Supertest, Playwright), CI, deploy, README | |

## Commands (Phase 0)

```
npm run p0:modules   npm run p0:async   npm run p0:loop   npm run p0:http
```
