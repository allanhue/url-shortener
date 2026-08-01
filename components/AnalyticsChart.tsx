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
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="clickGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
        <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 12 }} />
        <Tooltip
          cursor={{ stroke: "#111827", strokeDasharray: "3 3", strokeWidth: 1 }}
          contentStyle={{
            borderRadius: 16,
            borderColor: "#e2e8f0",
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.12)",
            background: "#ffffff",
            color: "#0f172a",
          }}
        />
        <Line
          type="monotone"
          dataKey="clicks"
          stroke="#0f172a"
          strokeWidth={3}
          dot={{ r: 4, fill: "#0f172a" }}
          activeDot={{ r: 6, fill: "#0f172a" }}
          fill="url(#clickGradient)"
          fillOpacity={1}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
