export interface Venue {
  name: string;
  address: string;
  /** Hora en formato legible, ej. "11:30 h" */
  time: string;
  /** URL para el iframe de Google Maps. Vacío = mostrar placeholder */
  mapEmbedUrl: string;
}

export interface EntryInfo {
  /** Monto de la entrada por persona. null = todavía no definido */
  amount: number | null;
  alias: string;
  cbu: string;
  accountHolder: string;
}

export interface WeddingData {
  couple: { bride: string; groom: string; displayNames: string };
  dateLabel: string;
  dateLongLabel: string;
  ceremony: Venue;
  reception: Venue;
  dressCode: { title: string; description: string };
  entry: EntryInfo;
  contact: { whatsappNumber: string };
}

/** Fecha y hora de la ceremonia (hora Argentina). El countdown apunta acá. */
export const WEDDING_DATE_ISO = "2027-12-12T11:30:00-03:00";

export const WEDDING: WeddingData = {
  couple: {
    bride: "Mili Escudero",
    groom: "Guido Pérez Moro",
    /** Cómo se muestran en el Hero */
    displayNames: "Mili & Guido",
  },
  dateLabel: "12.12.2027",
  dateLongLabel: "12 de diciembre de 2027",

  ceremony: {
    // TODO: completar nombre y dirección reales de la iglesia
    name: "Nombre de la iglesia",
    address: "Dirección de la iglesia",
    time: "11:30 h",
    // TODO: pegar acá la URL de embed cuando esté confirmada la iglesia.
    // Formato: https://www.google.com/maps?q=<búsqueda>&output=embed
    mapEmbedUrl: "",
  },

  reception: {
    name: "Terra Oliva",
    address: "Videla Aranda 351, Cruz de Piedra, Maipú, Mendoza",
    time: "13:00 h",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Terra+Oliva,+Videla+Aranda+351,+Maip%C3%BA,+Mendoza&output=embed",
  },

  dressCode: {
    title: "Elegante",
    // TODO: texto real de dress code
    description:
      "Texto placeholder: contanos qué esperás que se pongan tus invitados. Por ejemplo: elegante, tener en cuenta que la fiesta es de día y al aire libre.",
  },

  entry: {
    // TODO: definir monto de la entrada
    amount: null,
    // Datos reales en .env.local (y en Vercel para producción). Ver .env.example.
    // Ojo: process.env solo funciona en server components — no importar WEDDING
    // desde componentes con "use client" (hoy ninguno lo hace).
    alias: process.env.WEDDING_BANK_ALIAS ?? "ALIAS.A.DEFINIR",
    cbu: process.env.WEDDING_BANK_CBU ?? "0000000000000000000000",
    accountHolder: "Guido Pérez Moro",
  },

  contact: {
    // Formato internacional sin "+", ej: 549261XXXXXXX
    whatsappNumber: process.env.WEDDING_WHATSAPP ?? "5492610000000",
  },
};
