import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "./Section";
import type { Destination, Article } from "@/lib/types";

const arrow = <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />;

export function DestinationTile({ d, className = "", sizes }: { d: Destination; className?: string; sizes: string }) {
  return (
    <article className={`group on-dark relative isolate overflow-hidden rounded-none bg-ink text-white ${className}`}>
      <Photo img={d.image} sizes={sizes} className="absolute inset-0 -z-10 transition-transform duration-[1400ms] ease-[var(--ease-lux)] group-hover:scale-[1.04]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <div className="flex h-full min-h-72 flex-col justify-end p-6 sm:p-8">
        <p className="eyebrow text-white/85">{d.kicker}</p>
        <h3 className="mt-2 flex items-center justify-between gap-3 !text-4xl">
          <Link href={`/destinations/${d.slug}`} className="after:absolute after:inset-0">{d.title}</Link>
          {arrow}
        </h3>
      </div>
    </article>
  );
}

export function ArticleCard({ a, sizes = "(min-width: 1024px) 33vw, 100vw" }: { a: Article; sizes?: string }) {
  return (
    <article className="group widget relative flex h-full flex-col p-3 pb-6">
      <div className="aspect-[3/2] overflow-hidden rounded-none">
        <Photo img={a.image} sizes={sizes} className="transition-transform duration-[1200ms] ease-[var(--ease-lux)] group-hover:scale-[1.03]" />
      </div>
      <p className="eyebrow mt-5 px-3 text-gold">{a.category} · {a.readingMinutes} min read</p>
      <h3 className="mt-2 line-clamp-2 px-3">
        <Link href={`/journal/${a.slug}`} className="after:absolute after:inset-0">{a.title}</Link>
      </h3>
      <p className="mt-3 line-clamp-3 px-3 text-ink-soft">{a.excerpt}</p>
      <p className="mt-auto inline-flex items-center gap-1.5 px-3 pt-5 text-sm font-semibold text-gold-deep">Read the guide <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></p>
    </article>
  );
}
