import { NextRequest, NextResponse } from "next/server";
import { updatePaymentMethod } from "@/lib/store";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const ok = updatePaymentMethod(id, body);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
