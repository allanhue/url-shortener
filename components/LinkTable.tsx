import { LinkRecord } from "@/lib/store";

export default function LinkTable({ links }: { links: LinkRecord[] }) {
  return (
    <div className="min-w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3 text-sm">
        <thead>
          <tr className="text-left text-slate-600">
            <th className="px-4 pb-3">Short Code</th>
            <th className="px-4 pb-3">Original URL</th>
            <th className="px-4 pb-3">Clicks</th>
            <th className="px-4 pb-3">Created</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.shortCode} className="rounded-3xl border border-slate-200 bg-white text-slate-950 shadow-sm">
              <td className="px-4 py-4 font-mono text-slate-900">{link.shortCode}</td>
              <td className="px-4 py-4 max-w-xs truncate text-slate-700">{link.originalUrl}</td>
              <td className="px-4 py-4 text-slate-700">{link.clicks.length}</td>
              <td className="px-4 py-4 text-slate-500">{new Date(link.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
