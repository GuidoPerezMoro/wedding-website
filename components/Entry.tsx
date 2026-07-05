import Section from "@/components/ui/Section";
import CopyButton from "@/components/ui/CopyButton";
import { WEDDING } from "@/lib/wedding-data";

interface EntryProps {
  /** Código del invitado, para identificar el comprobante en WhatsApp */
  guestCode?: string;
  guestName?: string;
}

export default function Entry({ guestCode, guestName }: EntryProps) {
  const { entry, contact } = WEDDING;

  const amountLabel =
    entry.amount !== null ? `$${entry.amount.toLocaleString("es-AR")} por persona` : "Monto a confirmar";

  const whatsappText = encodeURIComponent(
    `Hola! Les mando el comprobante de la entrada 💌${guestName ? ` — ${guestName}` : ""}${guestCode ? ` (código ${guestCode})` : ""}`,
  );
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${whatsappText}`;

  return (
    <Section id="entrada" title="Entrada">
      <div className="mx-auto max-w-md text-center">
        <p className="text-ink-600 leading-relaxed">
          Para reservar tu lugar, te pedimos que transfieras el valor de la entrada al alias de
          abajo. Y si querés hacernos un regalo, el mismo alias es el lugar — sin ningún
          compromiso, tu compañía es lo más importante.
        </p>

        <div className="border-cream-200 mt-8 rounded-xl border bg-white p-6">
          <p className="text-ink-400 text-xs tracking-widest uppercase">Entrada</p>
          <p className="font-serif text-ink-900 mt-1 text-2xl">{amountLabel}</p>

          <div className="bg-cream-50 mt-5 rounded-lg p-4">
            <p className="text-ink-400 text-xs uppercase">Alias</p>
            <p className="text-ink-900 mt-1 font-mono text-lg">{entry.alias}</p>
            <p className="text-ink-400 mt-3 text-xs uppercase">CBU</p>
            <p className="text-ink-600 mt-1 font-mono text-sm break-all">{entry.cbu}</p>
            <p className="text-ink-400 mt-3 text-xs">Titular: {entry.accountHolder}</p>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <CopyButton value={entry.alias} label="Copiar alias" />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-olive-600 hover:bg-olive-700 rounded-full px-4 py-1.5 text-sm text-white transition-colors"
            >
              Enviar comprobante por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
