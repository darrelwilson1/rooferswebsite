import { NextResponse } from "next/server";
// @ts-expect-error - db.js is a CommonJS module without type declarations
import client from "@/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SERVICES = ["New roof", "Replacement", "Restoration", "Storm repair"] as const;
type Service = (typeof SERVICES)[number];

type QuoteBody = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  service?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: QuoteBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const address = body.address?.trim();
  const service = body.service?.trim();
  const message = body.message?.trim();

  if (!name || !email || !phone || !address || !service || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!SERVICES.includes(service as Service)) {
    return NextResponse.json({ error: "Invalid service" }, { status: 400 });
  }

  try {
    const quotes = client.db().collection("quotes");
    const result = await quotes.insertOne({
      name,
      email,
      phone,
      address,
      service,
      message,
      createdAt: new Date(),
    });
    return NextResponse.json({ ok: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error("Quote insert failed:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
