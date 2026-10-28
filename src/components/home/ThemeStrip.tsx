import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Section";
import type { Img } from "@/lib/types";

export interface ThemeTile { id: string; label: string; blurb: string; img: Img; count: number; minDays: number; maxDays: number }

/** Captioned style cards: photograph above, real itinerary count and length range below. */
export function ThemeStrip({ items }: { items: ThemeTile[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
      {items.map((t, i) => (
        <li key={t.id}>
          <Link href={`/tours?theme=${t.id}`} className="group block">
            <span className="relative block aspect-[3/2] overflow-hidden bg-ink">
              <Photo img={t.img} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="transition-transform duration-[1400ms] group-hover:scale-[1.05]" />
              <span className="num absolute left-0 top-0 bg-forest px-3.5 py-2 font-serif text-xl text-gold-light" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            </span>
            <span className="mt-5 flex items-start justify-between gap-4">
              <span className="font-serif text-3xl leading-tight sm:text-4xl">{t.label}</span>
              <ArrowUpRight className="mt-2 size-6 shrink-0 text-gold transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </span>
            <span className="mt-2 block text-ink-soft">{t.blurb}</span>
            <span className="eyebrow mt-4 block border-t border-ink/20 pt-3 !text-[0.7rem] text-gold-deep">
              <span className="num">{t.count}</span> itineraries · <span className="num">{t.minDays === t.maxDays ? t.minDays : `${t.minDays}–${t.maxDays}`}</span> days
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
