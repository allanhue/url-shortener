"use client";

import { useEffect, useState } from "react";
import LinkTable from "@/components/LinkTable";
import AnalyticsChart from "@/components/AnalyticsChart";
import { LinkRecord } from "@/lib/store";

export default function Dashboard() {
  const [links, setLinks] = useState<LinkRecord[]>([]);

  useEffect(() => {
    fetch("/api/shorten")
      .then((res) => res.json())
      .then(setLinks);
  }, []);

  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-2xl font-semibold mb-6">Analytics Dashboard</h1>
      <AnalyticsChart links={links} />
      <div className="mt-10">
        <LinkTable links={links} />
      </div>
    </main>
  );
}
