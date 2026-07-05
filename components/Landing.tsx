import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Location from "@/components/Location";
import DressCode from "@/components/DressCode";
import Rsvp from "@/components/Rsvp";
import Entry from "@/components/Entry";
import Gallery from "@/components/Gallery";
import Section from "@/components/ui/Section";
import { WEDDING, WEDDING_DATE_ISO } from "@/lib/wedding-data";
import type { Guest } from "@/lib/guests";

interface LandingProps {
  guest?: Guest;
}

/** Página completa. Recibe el invitado (opcional) y personaliza Hero, RSVP y Entrada. */
export default function Landing({ guest }: LandingProps) {
  return (
    <main>
      <Hero guestName={guest?.name} />

      <Section id="countdown" title="Falta cada vez menos">
        <Countdown targetIso={WEDDING_DATE_ISO} />
      </Section>

      <Location />
      <DressCode />
      <Rsvp guestCode={guest?.code} guestName={guest?.name} partySize={guest?.partySize} />
      <Entry guestCode={guest?.code} guestName={guest?.name} />
      <Gallery />

      <footer className="text-ink-400 px-6 py-10 text-center text-sm">
        {WEDDING.couple.displayNames} · {WEDDING.dateLabel}
      </footer>
    </main>
  );
}
