import Section from "@/components/ui/Section";
import { WEDDING } from "@/lib/wedding-data";

// Incluir que el piso es de pasto, para el calzado de las mujeres
export default function DressCode() {
  return (
    <Section id="dress-code" title="Dress code">
      <div className="text-center">
        <p className="font-serif text-2xl text-olive-700">{WEDDING.dressCode.title}</p>
        <p className="text-ink-600 mx-auto mt-4 max-w-xl leading-relaxed">
          {WEDDING.dressCode.description}
        </p>
      </div>
    </Section>
  );
}
