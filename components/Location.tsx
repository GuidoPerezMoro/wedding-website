import Section from "@/components/ui/Section";
import { WEDDING, type Venue } from "@/lib/wedding-data";

function LocationCard({ label, venue }: { label: string; venue: Venue }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="p-6 text-center">
        <p className="text-olive-700 text-xs tracking-[0.25em] uppercase">{label}</p>
        <h3 className="font-serif text-ink-900 mt-2 text-2xl">{venue.name}</h3>
        <p className="text-ink-600 mt-1 text-sm">{venue.address}</p>
        <p className="text-ink-900 mt-3 text-lg font-medium">{venue.time}</p>
      </div>
      {venue.mapEmbedUrl ? (
        <iframe
          src={venue.mapEmbedUrl}
          title={`Mapa: ${venue.name}`}
          className="h-64 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="border-cream-200 text-ink-400 flex h-64 items-center justify-center border-t border-dashed text-sm">
          Mapa a confirmar
        </div>
      )}
    </div>
  );
}

export default function Location() {
  return (
    <Section id="ubicacion" title="¿Dónde?" className="bg-cream-100">
      <div className="grid gap-8 sm:grid-cols-2">
        <LocationCard label="Ceremonia" venue={WEDDING.ceremony} />
        <LocationCard label="Fiesta" venue={WEDDING.reception} />
      </div>
    </Section>
  );
}
