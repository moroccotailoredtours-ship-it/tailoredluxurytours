"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Section";
import { buttonClass } from "@/components/ui/Button";
import type { Destination } from "@/lib/types";

/** Tabbed spotlight: pick a place on the left, see its photograph, summary and two actions on the right. */
export function DestinationSpotlight({ items }: { items: Destination[] }) {
  const [active, setActive] = useState(0);
  const d = items[active]!;

  const onKey = (e: React.KeyboardEvent) => {
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!next) return;
    e.preventDefault();
    const i = (active + next + items.length) % items.length;
    setActive(i);
    document.getElementById(`dest-tab-${items[i]!.slug}`)?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      <div role="tablist" aria-label="Destinations" onKeyDown={onKey} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:col-span-4 lg:mx-0 lg:block lg:overflow-visible lg:border-t lg:border-white/25 lg:px-0 lg:pb-0">
        {items.map((it, i) => (
          <button
            key={it.slug}
            id={`dest-tab-${it.slug}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls="dest-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`group flex shrink-0 items-center gap-4 whitespace-nowrap border border-white/30 px-4 py-2.5 text-left transition lg:w-full lg:whitespace-normal lg:border-0 lg:border-b lg:border-white/25 lg:px-0 lg:py-4 ${active === i ? "bg-gold-bright/20 text-white lg:bg-transparent" : "text-white/60 hover:text-white"}`}
          >
            <span className={`num hidden w-8 font-serif text-xl lg:block ${active === i ? "text-gold-light" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
            <span className="font-serif text-2xl lg:text-4xl">{it.title}</span>
            <ArrowUpRight className={`ml-auto hidden size-5 text-gold-light transition lg:block ${active === i ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div id="dest-panel" role="tabpanel" aria-labelledby={`dest-tab-${d.slug}`} className="lg:col-span-8">
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          {items.map((it, i) => (
            <div key={it.slug} aria-hidden="true" className={`absolute inset-0 transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-0"}`}>
              <Photo img={it.image} sizes="(min-width: 1024px) 60vw, 100vw" decorative />
            </div>
          ))}
        </div>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow !text-xs text-gold-light">{d.kicker}</p>
            <h3 className="mt-1 !text-3xl sm:!text-4xl">{d.title}</h3>
            <p className="mt-3 max-w-2xl text-white/85">{d.summary}</p>
            {d.bestFor.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Best for in ${d.title}`}>
                {d.bestFor.slice(0, 4).map((b) => <li key={b} className="border border-white/30 px-3 py-1 text-[0.8rem] font-semibold text-white/90">{b}</li>)}
              </ul>
            )}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href={`/destinations/${d.slug}`} className={buttonClass("primary")}>Explore {d.title}</Link>
            <Link href="/contact" className={buttonClass("outline-light")}>Contact us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
