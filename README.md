# URL Shortener + Analytics Dashboard

A Next.js 14 (App Router) URL shortener with a click-analytics dashboard.

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

## Next steps (data science ideas)

- Add a `predictive/` module for fraud/spam link detection using click patterns.
- Stream click events into Kafka/Spark for real-time dashboards at scale.
- Add geo-IP lookups on click events for location-based analytics.
