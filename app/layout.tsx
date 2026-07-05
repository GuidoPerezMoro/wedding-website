import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { WEDDING } from "@/lib/wedding-data";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${WEDDING.couple.displayNames} — ${WEDDING.dateLabel}`,
  description: `Nos casamos el ${WEDDING.dateLongLabel} en Mendoza. ¡Te esperamos!`,
  openGraph: {
    title: `${WEDDING.couple.displayNames} — ${WEDDING.dateLabel}`,
    description: `Nos casamos el ${WEDDING.dateLongLabel} en Mendoza. ¡Te esperamos!`,
    // TODO: agregar imagen OG (aparece en la preview del link de WhatsApp)
    // images: ["/images/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
