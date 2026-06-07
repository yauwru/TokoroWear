import { NextRequest, NextResponse } from "next/server";
import { updateShippingMethod } from "@/lib/store";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const ok = updateShippingMethod(id, body);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
