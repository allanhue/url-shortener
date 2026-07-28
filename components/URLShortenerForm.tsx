"use client";

import { useState } from "react";

export default function URLShortenerForm({ onCreated }: { onCreated: () => void }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setResult(data.shortUrl);
    setUrl("");
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste a long URL..."
        className="border rounded-md px-3 py-2"
        required
      />
      <button type="submit" className="bg-black text-white rounded-md py-2">
        Shorten
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {result && (
        <p className="text-sm">
          Short link:{" "}
          <a href={result} target="_blank" className="text-blue-600 underline">
            {result}
          </a>
        </p>
      )}
    </form>
  );
}
