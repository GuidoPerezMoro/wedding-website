import "server-only";

// Este archivo solo se importa desde server components / API routes.
// El paquete "server-only" hace que el build falle si alguien lo importa
// desde un client component, así los nombres nunca viajan al bundle del cliente.
//
// La lista real vive en la variable de entorno GUESTS_JSON (.env.local en dev,
// Settings → Environment Variables en Vercel) para no versionar nombres reales
// en un repo público. Se genera con: npm run generate-codes

export interface Guest {
  /** Código de 4 dígitos hex, siempre en minúscula */
  code: string;
  /** Nombre a mostrar: persona o pareja ("Juan y Ana") */
  name: string;
  /** Cantidad de personas que cubre esta invitación (pareja = 2) */
  partySize: number;
}

/** Datos de prueba (nombres ficticios). Se usan si GUESTS_JSON no está definida. */
const FALLBACK_GUESTS: Guest[] = [
  { code: "a3f9", name: "Juan Pérez", partySize: 1 },
  { code: "7c21", name: "Ana y Martín", partySize: 2 },
  { code: "e04b", name: "Familia Rodríguez", partySize: 4 },
  { code: "1d8e", name: "Sofía González", partySize: 1 },
  { code: "b652", name: "Caro y Lucas", partySize: 2 },
];

function isGuest(g: unknown): g is Guest {
  if (typeof g !== "object" || g === null) return false;
  const guest = g as Record<string, unknown>;
  return (
    typeof guest.code === "string" &&
    /^[0-9a-f]{4}$/.test(guest.code) &&
    typeof guest.name === "string" &&
    typeof guest.partySize === "number"
  );
}

function loadGuests(): Guest[] {
  const raw = process.env.GUESTS_JSON;
  if (!raw) return FALLBACK_GUESTS;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isGuest)) {
      throw new Error("formato inválido");
    }
    return parsed;
  } catch (err) {
    // Mejor fallar el build que deployar con la lista rota sin darse cuenta
    throw new Error(`GUESTS_JSON no se pudo parsear: ${err}`);
  }
}

export const GUESTS: Guest[] = loadGuests();

export function findGuest(code: string): Guest | undefined {
  const normalized = code.trim().toLowerCase();
  return GUESTS.find((g) => g.code === normalized);
}
