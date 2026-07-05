import { NextResponse } from "next/server";
import { findGuest } from "@/lib/guests";

interface RsvpPayload {
  code: string | null;
  name: string;
  attending: boolean;
  companions: number;
  dietaryRestrictions: string;
}

function isValidPayload(body: unknown): body is RsvpPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    (typeof b.code === "string" || b.code === null) &&
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.attending === "boolean" &&
    typeof b.companions === "number" &&
    typeof b.dietaryRestrictions === "string"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  const guest = body.code ? findGuest(body.code) : undefined;

  const record = {
    ...body,
    guestName: guest?.name ?? null,
    receivedAt: new Date().toISOString(),
  };

  // TODO: escribir en Google Sheets vía service account (próximo paso).
  // Por ahora solo lo logueamos del lado del servidor.
  console.log("[RSVP]", JSON.stringify(record, null, 2));

  return NextResponse.json({ ok: true });
}
