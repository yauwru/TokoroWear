import { NextResponse } from "next/server";
import { getProducts } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getProducts());
}
