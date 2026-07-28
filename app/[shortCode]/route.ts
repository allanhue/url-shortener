import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  const record = db.get(params.shortCode);

  if (!record) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  db.recordClick(record.shortCode, {
    timestamp: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") || "unknown",
    referrer: req.headers.get("referer") || "direct",
  });

  return NextResponse.redirect(record.originalUrl);
}
