# URL Shortener + Analytics Dashboard

A Next.js 14 (App Router) URL shortener with a click-analytics dashboard.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Structure

- `app/page.tsx` — home page, form to shorten a URL, list of recent links
- `app/dashboard/page.tsx` — analytics dashboard (chart + table)
- `app/[shortCode]/route.ts` — redirect handler, logs each click
- `app/api/shorten/route.ts` — POST to create a link, GET to list all links
- `app/api/analytics/[shortCode]/route.ts` — GET details/clicks for one link
- `lib/store.ts` — in-memory data store (swap for Postgres/Redis for production)
- `lib/utils.ts` — short code generator + URL validator
- `components/` — UI pieces (form, table, chart)

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
