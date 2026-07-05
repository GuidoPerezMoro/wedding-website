import { redirect } from "next/navigation";
import Landing from "@/components/Landing";
import { GUESTS, findGuest } from "@/lib/guests";

interface PageProps {
  // En Next 15 params es una Promise
  params: Promise<{ code: string }>;
}

/** Pre-renderiza una página estática por cada código de invitado. */
export function generateStaticParams() {
  return GUESTS.map((guest) => ({ code: guest.code }));
}

export default async function GuestPage({ params }: PageProps) {
  const { code } = await params;
  const guest = findGuest(code);

  // Código inválido → a la página general, sin drama
  if (!guest) {
    redirect("/");
  }

  return <Landing guest={guest} />;
}
