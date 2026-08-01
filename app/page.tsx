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
    <main className="max-w-7xl mx-auto py-16 px-4">
      <section className="grid gap-10 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[1.2fr_0.9fr]">
        <div className="space-y-6 text-slate-950">
        
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold tracking-tight">
              Sharp professional short links with built-in sharing.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Generate polished short URLs, monitor performance and instantly share via QR code from the same beautiful interface.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Links created</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{links.length}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Total clicks</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{links.reduce((sum, link) => sum + link.clicks.length, 0)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">Shorten a link</h2>
          <p className="mt-2 text-sm text-slate-600">
            Create a short link and get a share-ready QR code immediately after shortening.
          </p>
          <div className="mt-6">
            <URLShortenerForm onCreated={fetchLinks} />
          </div>
        </div>
      </section>

      <section className="mt-14 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">Recent links</h2>
            <p className="mt-2 text-sm text-slate-600">
              Quickly access your latest shortened URLs and view click activity at a glance.
            </p>
          </div>
          <a href="/dashboard" className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
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
