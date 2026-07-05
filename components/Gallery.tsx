import Image from "next/image";
import Section from "@/components/ui/Section";

// Placeholders de picsum con seed fija para que no cambien en cada render.
// TODO: reemplazar por fotos reales en public/images
const PHOTOS = Array.from({ length: 6 }, (_, i) => ({
  src: `https://picsum.photos/seed/boda-${i + 1}/600/600`,
  alt: `Foto ${i + 1}`,
}));

export default function Gallery() {
  return (
    <Section id="galeria" title="Nosotros" className="bg-cream-100">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {PHOTOS.map((photo) => (
          <div key={photo.src} className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
