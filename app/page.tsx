"use client";

import { useEffect, useState } from "react";
import URLShortenerForm from "@/components/URLShortenerForm";
import { LinkRecord } from "@/lib/store";
import LinkTable from "@/components/LinkTable";

export default function Home() {
  const [links, setLinks] = useState<LinkRecord[]>([]);

  const fetchLinks = async () => {
    const res = await fetch("/api/shorten");
    const data = await res.json();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const recentLinks = links.slice(0, 5);

  return (
    <main className="max-w-6xl mx-auto py-16 px-4">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-lg">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-6 text-slate-950">
            <p className="inline-flex rounded-full bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-700">
              Fast, secure, and data-driven
            </p>
            <div>
              <h1 className="text-4xl font-semibold sm:text-5xl">
                Shorten links, track clicks, and grow with confidence.
              </h1>
              <p className="mt-4 text-slate-600 sm:text-lg">
                Create branded short URLs instantly and see real-time analytics on your most popular links.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-3xl font-semibold text-slate-950">{links.length}</p>
                <p className="mt-2 text-sm text-slate-500">Links created</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-3xl font-semibold text-slate-950">{links.reduce((sum, link) => sum + link.clicks.length, 0)}</p>
                <p className="mt-2 text-sm text-slate-500">Total clicks</p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-md rounded-[2rem] bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-950">Shorten your first URL</h2>
            <p className="mt-2 text-sm text-slate-600">
              Paste any link to generate a short URL with analytics tracking and fast redirect routing.
            </p>
            <div className="mt-6">
              <URLShortenerForm onCreated={fetchLinks} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">Recent links</h2>
            <p className="mt-2 text-sm text-slate-600">
              A quick view of the latest URLs you've shortened with usage data.
            </p>
          </div>
          <a href="/dashboard" className="inline-flex items-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
            View full analytics
          </a>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          {recentLinks.length > 0 ? (
            <div className="overflow-x-auto p-4">
              <LinkTable links={recentLinks} />
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
              No links yet — shorten one to see analytics and saved entries here.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
