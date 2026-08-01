"use client";

import { useEffect, useMemo, useState } from "react";
import LinkTable from "@/components/LinkTable";
import AnalyticsChart from "@/components/AnalyticsChart";
import { LinkRecord } from "@/lib/store";

export default function Dashboard() {
  const [links, setLinks] = useState<LinkRecord[]>([]);

  useEffect(() => {
    fetch("/api/shorten")
      .then((res) => res.json())
      .then(setLinks)
      .catch(() => setLinks([]));
  }, []);

  const totalClicks = useMemo(
    () => links.reduce((sum, link) => sum + link.clicks.length, 0),
    [links]
  );

  const topLink = useMemo(() => {
    return links.reduce((best, link) => {
      if (!best || link.clicks.length > best.clicks.length) return link;
      return best;
    }, links[0] as LinkRecord | undefined);
  }, [links]);

  const daysOfHistory = useMemo(() => {
    const daySet = new Set<string>();
    links.forEach((link) => {
      link.clicks.forEach((click) => {
        daySet.add(click.timestamp.split("T")[0]);
      });
    });
    return daySet.size;
  }, [links]);

  return (
    <main className="max-w-6xl mx-auto py-16 px-4">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-lg">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-950">Analytics Dashboard</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Review your most recently shortened links, click performance, and overall traffic trends.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Connected data</p>
            <p className="mt-2 text-3xl font-semibold">{links.length} links</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Links</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">{links.length}</p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total clicks</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950">{totalClicks}</p>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Top link</p>
            <p className="mt-4 text-base font-semibold text-slate-700">{topLink ? `/${topLink.shortCode}` : "No data yet"}</p>
          </div>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Click activity</h2>
              <p className="mt-2 text-sm text-slate-600">
                Track click volume by day and understand how your links are performing over time.
              </p>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              {daysOfHistory} days of history
            </div>
          </div>
          <div className="mt-6 h-[320px] rounded-[1.5rem] bg-slate-50 p-4">
            <AnalyticsChart links={links} />
          </div>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-950">Link history</h2>
          <p className="mt-2 text-sm text-slate-600">Browse every shortened link and the clicks recorded for each entry.</p>
          <div className="mt-6">
            <LinkTable links={links} />
          </div>
        </div>
      </div>
    </main>
  );
}
