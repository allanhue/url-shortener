"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LinkRecord } from "@/lib/store";

export default function AnalyticsChart({ links }: { links: LinkRecord[] }) {
  const clicksByDay: Record<string, number> = {};

  links.forEach((link) => {
    link.clicks.forEach((click) => {
      const day = click.timestamp.split("T")[0];
      clicksByDay[day] = (clicksByDay[day] || 0) + 1;
    });
  });

  const data = Object.entries(clicksByDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, clicks]) => ({ date, clicks }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="clicks" stroke="#000" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
