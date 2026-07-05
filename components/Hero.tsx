import { WEDDING } from "@/lib/wedding-data";

interface HeroProps {
  /** Nombre del invitado si entró con código válido */
  guestName?: string;
}

export default function Hero({ guestName }: HeroProps) {
  return (
    <section
      id="inicio"
      // TODO: reemplazar el gradiente por una foto de fondo cuando la tengan
      className="from-cream-100 via-cream-50 to-cream-200 flex min-h-svh flex-col items-center justify-center bg-gradient-to-b px-6 text-center"
    >
      {guestName && (
        <p className="text-olive-700 mb-6 text-lg">
          Hola, <span className="font-medium">{guestName}</span>. ¡Te esperamos!
        </p>
      )}
      <p className="text-ink-600 mb-4 text-sm tracking-[0.3em] uppercase">Nos casamos</p>
      <h1 className="font-serif text-ink-900 text-5xl leading-tight sm:text-7xl">
        {WEDDING.couple.displayNames}
      </h1>
      <p className="font-serif text-ink-600 mt-6 text-2xl tracking-widest sm:text-3xl">
        {WEDDING.dateLabel}
      </p>
      <p className="text-ink-400 mt-2 text-sm">Mendoza, Argentina</p>
    </section>
  );
}
