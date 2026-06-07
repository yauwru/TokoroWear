import { NextRequest, NextResponse } from "next/server";
import { getOrders, updateOrderStatus } from "@/lib/store";
import type { OrderStatus } from "@/lib/store";

export async function GET() {
  const orders = getOrders();
  return NextResponse.json(orders);
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const ok = updateOrderStatus(id, status as OrderStatus);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
