"use client";

import { useEffect, useState } from "react";
import URLShortenerForm from "@/components/URLShortenerForm";
import { LinkRecord } from "@/lib/store";

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

  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-2xl font-semibold mb-6">URL Shortener</h1>
      <URLShortenerForm onCreated={fetchLinks} />
      <div className="mt-10">
        <h2 className="text-lg font-medium mb-3">Recent Links ({links.length})</h2>
        <ul className="text-sm space-y-1">
          {links.map((l) => (
            <li key={l.shortCode}>
              /{l.shortCode} → {l.originalUrl} ({l.clicks.length} clicks)
            </li>
          ))}
        </ul>
      </div>
      <a href="/dashboard" className="inline-block mt-8 text-blue-600 underline">
        View Analytics Dashboard →
      </a>
    </main>
  );
}
