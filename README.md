# URL Shortener with Analytics Dashboard

A Next.js  URL shortener with a click-analytics dashboard.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Notes

- Data is stored in memory and resets when the dev server restarts. For production,
  replace `lib/store.ts` with a real database (Postgres via Prisma, or Redis for
  high-throughput lookups).
- Styling uses Tailwind CSS (already configured).
- Charting uses Recharts (already in package.json).


