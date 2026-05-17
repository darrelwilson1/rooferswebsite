import { NextResponse } from "next/server";
import client from "@/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Temporary diagnostic. Returns sanitized info about MONGODB_URI so we can
// verify Hostinger picked up env-var changes. No credentials are exposed.
export async function GET() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return NextResponse.json({ uriPresent: false });
  }
  let host: string | null = null;
  let dbName: string | null = null;
  try {
    const url = new URL(uri);
    host = url.host;
    dbName = url.pathname.replace(/^\//, "") || null;
  } catch {
    // ignore
  }
  return NextResponse.json({
    uriPresent: true,
    length: uri.length,
    startsWith: uri.slice(0, 14),
    endsWithLast4: uri.slice(-4),
    host,
    dbName,
  });
}

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
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Database error", detail }, { status: 500 });
  }
}
