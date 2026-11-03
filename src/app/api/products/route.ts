import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

/** Read-only product catalogue endpoint (showcase only — no commerce). */
export async function GET() {
  const items = await getProducts();
  return NextResponse.json({ count: items.length, products: items });
}
