import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = {
    ...body,
    id: uuidv4(),
    slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    createdAt: new Date().toISOString(),
  };
  createProduct(product);
  return NextResponse.json(product, { status: 201 });
}
