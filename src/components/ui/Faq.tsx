import { JsonLd } from "@/components/seo/JsonLd";

/** Visible FAQ list. The FAQPage JSON-LD is emitted only because every answer is shown on the page. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      {items.map((f) => (
        <details key={f.q} className="group widget mb-3 px-5 py-4 sm:px-7 sm:py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-gold/10 font-sans text-xl text-gold-deep transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-3xl text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
