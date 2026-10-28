"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { TourCard, type TourCardData } from "./TourCard";

export type Length = "any" | "short" | "week" | "long";
export interface Filters { start: string; length: Length; theme: string }

const lengths: { id: Length; label: string; test: (d: number) => boolean }[] = [
  { id: "any", label: "Any length", test: () => true },
  { id: "short", label: "3–5 days", test: (d) => d <= 5 },
  { id: "week", label: "6–8 days", test: (d) => d >= 6 && d <= 8 },
  { id: "long", label: "9+ days", test: (d) => d >= 9 },
];

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" className="chip chip-dark shrink-0" aria-pressed={on} onClick={onClick}>{children}</button>;
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="grid gap-3 border-t border-white/15 py-4 first:border-t-0 sm:grid-cols-[8rem_1fr] sm:items-center">
      <span className="eyebrow !text-[0.7rem] text-gold-light">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function TourExplorer({ tours, starts, themes, initial }: { tours: TourCardData[]; starts: string[]; themes: { id: string; label: string }[]; initial: Filters }) {
  const [f, setF] = useState<Filters>(initial);

  const set = (patch: Partial<Filters>) => {
    const next = { ...f, ...patch };
    setF(next);
    const q = new URLSearchParams();
    if (next.start !== "all") q.set("start", next.start);
    if (next.length !== "any") q.set("length", next.length);
    if (next.theme !== "all") q.set("theme", next.theme);
    window.history.replaceState(null, "", q.size ? `?${q}` : window.location.pathname);
  };

  const shown = useMemo(() => {
    const len = lengths.find((l) => l.id === f.length)!;
    return tours
      .filter((t) => (f.start === "all" || t.start === f.start) && len.test(t.days) && (f.theme === "all" || t.themes.includes(f.theme)))
      .sort((a, b) => a.days - b.days || a.title.localeCompare(b.title));
  }, [tours, f]);

  const active = f.start !== "all" || f.length !== "any" || f.theme !== "all";
  return (
    <div>
      <div className="on-dark zellige border-t-2 border-gold-bright bg-forest px-5 py-3 text-ivory sm:px-8">
        <Group label="Starting in">
          <Chip on={f.start === "all"} onClick={() => set({ start: "all" })}>Anywhere</Chip>
          {starts.map((s) => <Chip key={s} on={f.start === s} onClick={() => set({ start: s })}>{s}</Chip>)}
        </Group>
        <Group label="Length">
          {lengths.map((l) => <Chip key={l.id} on={f.length === l.id} onClick={() => set({ length: l.id })}>{l.label}</Chip>)}
        </Group>
        <Group label="Style">
          <Chip on={f.theme === "all"} onClick={() => set({ theme: "all" })}>All styles</Chip>
          {themes.map((x) => <Chip key={x.id} on={f.theme === x.id} onClick={() => set({ theme: x.id })}>{x.label}</Chip>)}
        </Group>
        <div className="flex items-center justify-between gap-4 border-t border-white/15 py-4">
          <p role="status" aria-live="polite" className="num text-white/90"><strong className="font-serif text-3xl text-gold-light">{shown.length}</strong> <span className="ml-1">{shown.length === 1 ? "itinerary" : "itineraries"}{active ? " match your filters" : " to explore"}</span></p>
          {active && (
            <button type="button" className="inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4" onClick={() => set({ start: "all", length: "any", theme: "all" })}>
              <RotateCcw className="size-4" aria-hidden="true" /> Reset
            </button>
          )}
        </div>
      </div>

      <div className="mt-10" />

      {shown.length ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t, i) => <li key={t.slug}><TourCard tour={t} priority={i < 3} /></li>)}
        </ul>
      ) : (
        <div className="surface p-10 text-center">
          <h3>Nothing matches that combination yet.</h3>
          <p className="mx-auto mt-3 max-w-md text-ink-soft">Every journey is tailored, so tell us what you have in mind and we&rsquo;ll shape one around it.</p>
        </div>
      )}
    </div>
  );
}
