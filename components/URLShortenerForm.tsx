"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function URLShortenerForm({ onCreated }: { onCreated: () => void }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setCopied(false);
    setIsLoading(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unable to shorten the link.");
        return;
      }

      setResult(data.shortUrl);
      setUrl("");
      onCreated();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyLink = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Unable to copy the link. Please copy it manually.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <label className="sr-only" htmlFor="url-input">
        Long URL
      </label>
      <input
        id="url-input"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste a long URL..."
        className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
        required
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={!url || isLoading}
          className="inline-flex min-w-[140px] items-center justify-center rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>
        {result && (
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex min-w-[140px] items-center justify-center rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-950"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result && (
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Shareable link</p>
              <a
                href={result}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-base font-semibold text-slate-950 underline"
              >
                {result}
              </a>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <QRCodeSVG value={result} size={120} level="M" includeMargin />
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Scan or copy the QR code to share this link instantly.
          </p>
        </div>
      )}
    </form>
  );
}
