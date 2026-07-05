"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  /** Fecha objetivo en formato ISO, viene de WEDDING_DATE_ISO */
  targetIso: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

export default function Countdown({ targetIso }: CountdownProps) {
  // Arranca en null para evitar mismatch de hidratación (el server no sabe la hora del cliente)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(targetIso);
    setTimeLeft(getTimeLeft(target));
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [targetIso]);

  const units: { label: string; value: number | null }[] = [
    { label: "días", value: timeLeft?.days ?? null },
    { label: "horas", value: timeLeft?.hours ?? null },
    { label: "min", value: timeLeft?.minutes ?? null },
    { label: "seg", value: timeLeft?.seconds ?? null },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      {units.map((unit) => (
        <div key={unit.label} className="flex w-16 flex-col items-center sm:w-20">
          <span className="font-serif text-ink-900 text-4xl tabular-nums sm:text-5xl">
            {unit.value !== null ? unit.value : "–"}
          </span>
          <span className="text-ink-400 mt-1 text-xs tracking-widest uppercase">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
