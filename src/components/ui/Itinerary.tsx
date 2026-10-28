"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ItineraryDay } from "@/lib/types";

/** Day-by-day timeline. All text stays in the DOM (collapsed days use the hidden grid trick, not unmounting). */
export function Itinerary({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([1]));
  const all = open.size === days.length;
  const toggle = (n: number) => setOpen((s) => { const x = new Set(s); if (x.has(n)) x.delete(n); else x.add(n); return x; });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="num text-ink-soft">{days.length} days · {days.length - 1} nights</p>
        <button type="button" className="chip" onClick={() => setOpen(all ? new Set() : new Set(days.map((d) => d.day)))}>
          {all ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ol className="relative">
        <span aria-hidden="true" className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-ink/20" />
        {days.map((d) => {
          const isOpen = open.has(d.day);
          return (
            <li key={d.day} className="relative pb-3">
              <h3 className="!text-base">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`day-${d.day}`}
                  onClick={() => toggle(d.day)}
                  className="group flex w-full items-center gap-4 rounded-none p-1 pr-4 text-left transition-colors hover:bg-sand/40"
                >
                  <span className={`num relative z-10 grid size-11 shrink-0 place-items-center rounded-full border font-sans text-sm font-bold transition-colors ${isOpen ? "border-gold bg-gold text-white" : "border-ink/30 bg-ivory"}`}>
                    {d.day}
                  </span>
                  <span className="flex-1">
                    <span className="eyebrow block !text-[0.66rem] text-gold">Day {d.day}</span>
                    <span className="block font-serif text-[1.35rem] leading-tight sm:text-2xl">{d.title}</span>
                  </span>
                  <ChevronDown className={`size-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
              </h3>
              <div id={`day-${d.day}`} role="region" aria-label={`Day ${d.day}`} className={`grid pl-[3.75rem] transition-[grid-template-rows] duration-500 ease-[var(--ease-lux)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden" inert={!isOpen}>
                  <p className="my-2 max-w-2xl rounded-none border border-gold-bright/20 bg-paper p-4 text-ink-soft sm:p-5">{d.body}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
