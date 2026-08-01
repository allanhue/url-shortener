import { Pool } from "pg";

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

declare global {
  var pgPool: Pool | undefined;
}

const DATABASE_URL = process.env.DATABASE_URL;
const pool = DATABASE_URL
  ? globalThis.pgPool ?? new Pool({ connectionString: DATABASE_URL })
  : undefined;

if (DATABASE_URL && !globalThis.pgPool && pool) {
  globalThis.pgPool = pool;
}

let initialized = false;

async function initDb() {
  if (!pool || initialized) return;

  await pool.query(
    `CREATE TABLE IF NOT EXISTS links (
      short_code TEXT PRIMARY KEY,
      original_url TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL
    )`
  );

  await pool.query(
    `CREATE TABLE IF NOT EXISTS clicks (
      id SERIAL PRIMARY KEY,
      short_code TEXT REFERENCES links(short_code) ON DELETE CASCADE,
      timestamp TIMESTAMPTZ NOT NULL,
      user_agent TEXT,
      referrer TEXT
    )`
  );

  initialized = true;
}

const links = new Map<string, LinkRecord>();

type LinkRow = {
  short_code: string;
  original_url: string;
  created_at: Date | string;
  timestamp?: Date | string | null;
  user_agent?: string | null;
  referrer?: string | null;
};

function mapLinkRows(rows: Array<LinkRow>): LinkRecord[] {
  const grouped = new Map<string, LinkRecord>();

  rows.forEach((row) => {
    const shortCode = row.short_code;
    if (!grouped.has(shortCode)) {
      grouped.set(shortCode, {
        shortCode,
        originalUrl: row.original_url,
        createdAt:
          row.created_at instanceof Date
            ? row.created_at.toISOString()
            : new Date(row.created_at).toISOString(),
        clicks: [],
      });
    }

    const record = grouped.get(shortCode)!;
    if (row.timestamp) {
      const timestamp =
        row.timestamp instanceof Date
          ? row.timestamp.toISOString()
          : new Date(row.timestamp).toISOString();
      record.clicks.push({
        timestamp,
        userAgent: row.user_agent || "unknown",
        referrer: row.referrer || "direct",
      });
    }
  });

  return Array.from(grouped.values());
}

export const db = {
  async create(shortCode: string, originalUrl: string) {
    if (pool) {
      await initDb();
      const createdAt = new Date().toISOString();
      await pool.query(
        "INSERT INTO links (short_code, original_url, created_at) VALUES ($1, $2, $3)",
        [shortCode, originalUrl, createdAt]
      );
      return {
        shortCode,
        originalUrl,
        createdAt,
        clicks: [],
      };
    }

    const record: LinkRecord = {
      shortCode,
      originalUrl,
      createdAt: new Date().toISOString(),
      clicks: [],
    };
    links.set(shortCode, record);
    return record;
  },

  async get(shortCode: string) {
    if (pool) {
      await initDb();
      const linkResult = await pool.query<{
        short_code: string;
        original_url: string;
        created_at: Date;
      }>("SELECT short_code, original_url, created_at FROM links WHERE short_code = $1", [shortCode]);
      if (linkResult.rowCount === 0) return undefined;

      const clickResult = await pool.query<{
        timestamp: Date;
        user_agent: string | null;
        referrer: string | null;
      }>(
        "SELECT timestamp, user_agent, referrer FROM clicks WHERE short_code = $1 ORDER BY timestamp ASC",
        [shortCode]
      );

      return {
        shortCode: linkResult.rows[0].short_code,
        originalUrl: linkResult.rows[0].original_url,
        createdAt: linkResult.rows[0].created_at.toISOString(),
        clicks: clickResult.rows.map((click) => ({
          timestamp: click.timestamp.toISOString(),
          userAgent: click.user_agent || "unknown",
          referrer: click.referrer || "direct",
        })),
      };
    }

    return links.get(shortCode);
  },

  async getAll() {
    if (pool) {
      await initDb();
      const result = await pool.query(
        `SELECT l.short_code, l.original_url, l.created_at,
                c.timestamp, c.user_agent, c.referrer
         FROM links l
         LEFT JOIN clicks c ON c.short_code = l.short_code
         ORDER BY l.created_at DESC, c.timestamp ASC`
      );
      return mapLinkRows(result.rows);
    }

    return Array.from(links.values());
  },

  async recordClick(shortCode: string, event: ClickEvent) {
    if (pool) {
      await initDb();
      await pool.query(
        "INSERT INTO clicks (short_code, timestamp, user_agent, referrer) VALUES ($1, $2, $3, $4)",
        [shortCode, event.timestamp, event.userAgent, event.referrer]
      );
      return;
    }

    const record = links.get(shortCode);
    if (record) record.clicks.push(event);
  },
};
