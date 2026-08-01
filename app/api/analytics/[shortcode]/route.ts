import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  const record = await db.get(params.shortCode);
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(record);
}
