import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";
import { generateShortCode, isValidUrl } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const shortCode = generateShortCode();
  const record = db.create(shortCode, url);

  return NextResponse.json({
    shortCode: record.shortCode,
    shortUrl: `${req.nextUrl.origin}/${record.shortCode}`,
    originalUrl: record.originalUrl,
  });
}

export async function GET() {
  return NextResponse.json(db.getAll());
}
