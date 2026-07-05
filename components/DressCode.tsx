import Section from "@/components/ui/Section";
import { WEDDING } from "@/lib/wedding-data";

export default function DressCode() {
  return (
    <Section id="dress-code" title="Dress code">
      <div className="text-center">
        <p className="font-serif text-olive-700 text-2xl">{WEDDING.dressCode.title}</p>
        <p className="text-ink-600 mx-auto mt-4 max-w-xl leading-relaxed">
          {WEDDING.dressCode.description}
        </p>
      </div>
    </Section>
  );
}
