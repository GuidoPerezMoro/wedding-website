"use client";

import { useState } from "react";

interface CopyButtonProps {
  value: string;
  label: string;
}

export default function CopyButton({ value, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard puede fallar en contextos no seguros; no rompemos nada
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="border-olive-600 text-olive-700 hover:bg-olive-600 rounded-full border px-4 py-1.5 text-sm transition-colors hover:text-white"
    >
      {copied ? "¡Copiado!" : label}
    </button>
  );
}
