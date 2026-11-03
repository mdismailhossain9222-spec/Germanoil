import { NextResponse } from "next/server";
import { db } from "@/db";
import { enquiries } from "@/db/schema";

export const dynamic = "force-dynamic";

/** Distribution / information enquiry (no orders, no payments). */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || message.length < 5) {
      return NextResponse.json(
        { error: "Please provide a valid name, email address and message." },
        { status: 400 },
      );
    }

    const [row] = await db
      .insert(enquiries)
      .values({
        name: name.slice(0, 120),
        email: email.slice(0, 160),
        company: company ? company.slice(0, 160) : null,
        message: message.slice(0, 4000),
      })
      .returning({ id: enquiries.id });

    return NextResponse.json({ ok: true, id: row?.id ?? null }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "We could not record your enquiry. Please try again." },
      { status: 500 },
    );
  }
}
