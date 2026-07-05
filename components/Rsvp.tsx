"use client";

import { useState, type FormEvent } from "react";
import Section from "@/components/ui/Section";

interface RsvpProps {
  /** Datos del invitado si entró con código válido */
  guestCode?: string;
  guestName?: string;
  /** Cuántas personas cubre la invitación (limita el select de acompañantes) */
  partySize?: number;
}

interface RsvpData {
  code: string | null;
  name: string;
  attending: boolean;
  companions: number;
  dietaryRestrictions: string;
}

type Status = "idle" | "sending" | "sent" | "error";

const inputClasses =
  "w-full rounded-lg border border-cream-200 bg-white px-4 py-2.5 text-ink-900 placeholder:text-ink-400 focus:border-olive-600 focus:outline-none";

export default function Rsvp({ guestCode, guestName, partySize = 1 }: RsvpProps) {
  const [name, setName] = useState(guestName ?? "");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [companions, setCompanions] = useState(0);
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const maxCompanions = Math.max(0, partySize - 1);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (attending === null) return;

    const data: RsvpData = {
      code: guestCode ?? null,
      name,
      attending,
      companions: attending ? companions : 0,
      dietaryRestrictions,
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
    } catch (err) {
      console.error("[RSVP] error al enviar:", err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <Section id="rsvp" title="Confirmá tu asistencia" className="bg-cream-100">
        <p className="text-olive-700 text-center text-lg">
          ¡Gracias por confirmar! Nos vemos el 12 de diciembre.
        </p>
      </Section>
    );
  }

  return (
    <Section id="rsvp" title="Confirmá tu asistencia" className="bg-cream-100">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-5">
        <div>
          <label htmlFor="rsvp-name" className="text-ink-600 mb-1.5 block text-sm">
            Nombre y apellido
          </label>
          <input
            id="rsvp-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className={inputClasses}
          />
        </div>

        <fieldset>
          <legend className="text-ink-600 mb-1.5 text-sm">¿Venís?</legend>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "¡Sí, obvio!", value: true },
              { label: "No puedo :(", value: false },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setAttending(option.value)}
                className={`rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                  attending === option.value
                    ? "border-olive-600 bg-olive-600 text-white"
                    : "border-cream-200 text-ink-600 bg-white hover:border-olive-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        {attending === true && maxCompanions > 0 && (
          <div>
            <label htmlFor="rsvp-companions" className="text-ink-600 mb-1.5 block text-sm">
              ¿Cuántos acompañantes?
            </label>
            <select
              id="rsvp-companions"
              value={companions}
              onChange={(e) => setCompanions(Number(e.target.value))}
              className={inputClasses}
            >
              {Array.from({ length: maxCompanions + 1 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        )}

        {attending === true && (
          <div>
            <label htmlFor="rsvp-diet" className="text-ink-600 mb-1.5 block text-sm">
              Alergias o restricciones alimentarias
            </label>
            <textarea
              id="rsvp-diet"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              placeholder="Celiaquía, vegetariano/a, etc. (opcional)"
              rows={3}
              className={inputClasses}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={attending === null || status === "sending"}
          className="bg-olive-600 hover:bg-olive-700 mt-2 rounded-lg px-6 py-3 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "Enviando..." : "Enviar confirmación"}
        </button>

        {status === "error" && (
          <p className="text-center text-sm text-red-600">
            Hubo un error al enviar. Probá de nuevo en un rato.
          </p>
        )}
      </form>
    </Section>
  );
}
