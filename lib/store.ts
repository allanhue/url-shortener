export interface LinkRecord {
  shortCode: string;
  originalUrl: string;
  createdAt: string;
  clicks: ClickEvent[];
}

export interface ClickEvent {
  timestamp: string;
  userAgent: string;
  referrer: string;
}

// In-memory store (resets on server restart — swap for Postgres/Redis for production)
const links = new Map<string, LinkRecord>();

export const db = {
  create(shortCode: string, originalUrl: string) {
    const record: LinkRecord = {
      shortCode,
      originalUrl,
      createdAt: new Date().toISOString(),
      clicks: [],
    };
    links.set(shortCode, record);
    return record;
  },
  get(shortCode: string) {
    return links.get(shortCode);
  },
  getAll() {
    return Array.from(links.values());
  },
  recordClick(shortCode: string, event: ClickEvent) {
    const record = links.get(shortCode);
    if (record) record.clicks.push(event);
  },
};
