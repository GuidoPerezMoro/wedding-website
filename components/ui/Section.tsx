import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

/** Wrapper común de sección: padding, ancho máximo y título consistentes. */
export default function Section({ id, title, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`px-6 py-16 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-3xl">
        {title && (
          <h2 className="font-serif text-ink-900 mb-10 text-center text-3xl sm:text-4xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
