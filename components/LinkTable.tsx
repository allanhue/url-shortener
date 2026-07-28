import { LinkRecord } from "@/lib/store";

export default function LinkTable({ links }: { links: LinkRecord[] }) {
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2">Short Code</th>
          <th>Original URL</th>
          <th>Clicks</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link) => (
          <tr key={link.shortCode} className="border-b">
            <td className="py-2 font-mono">{link.shortCode}</td>
            <td className="truncate max-w-xs">{link.originalUrl}</td>
            <td>{link.clicks.length}</td>
            <td>{new Date(link.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
