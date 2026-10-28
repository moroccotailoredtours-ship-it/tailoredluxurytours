import Image from "next/image";
import { Sparkle } from "lucide-react";
import type { Img } from "@/lib/types";

export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, children, className = "" }: { eyebrow?: string; title: React.ReactNode; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-4 flex items-center gap-2 text-gold"><Sparkle className="size-3.5 text-gold-bright" aria-hidden="true" />{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <div className="mt-5 text-ink-soft">{children}</div>}
    </div>
  );
}

/** Responsive photograph. `sizes` must reflect the real rendered width. */
export function Photo({
  img,
  sizes,
  priority = false,
  className = "",
  quality = 75,
  decorative = false,
}: {
  img: Img;
  sizes: string;
  priority?: boolean;
  className?: string;
  quality?: number;
  /** Purely decorative duplicate of nearby content: exposes alt="" to assistive tech and crawlers. */
  decorative?: boolean;
}) {
  return (
    <Image
      src={img.src}
      alt={decorative ? "" : img.alt}
      width={img.width}
      height={img.height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={`size-full object-cover ${className}`}
      style={{ objectPosition: img.focal }}
    />
  );
}

/** Header for text-only pages (contact, legal): deep green with the lattice, gold rule and the same type as the photo heroes. */
export function TextHero({ eyebrow, title, intro, children }: { eyebrow?: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section data-hero className="on-dark zellige relative isolate overflow-hidden bg-forest text-white">
      <Container className="pb-12 pt-36 lg:pb-16 lg:pt-44">
        {children && <div className="mb-8">{children}</div>}
        {eyebrow && <p className="eyebrow mb-6 inline-flex items-center gap-2 border border-gold-light/60 px-4 py-1.5 text-gold-light"><Sparkle className="size-3.5" aria-hidden="true" />{eyebrow}</p>}
        <h1 className="max-w-4xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl border-l-2 border-gold-light pl-5 text-lg text-white/90 sm:text-xl">{intro}</p>}
      </Container>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-bright via-gold-light to-transparent" />
    </section>
  );
}

export function PageHero({ eyebrow, title, intro, img, children }: { eyebrow?: string; title: string; intro?: string; img: Img; children?: React.ReactNode }) {
  return (
    <section data-hero className="on-dark relative isolate flex min-h-[64svh] items-end overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10">
        <Photo img={img} sizes="100vw" priority quality={75} />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-transparent via-50% to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/5 to-transparent" />
      </div>
      <Container className="pb-14 pt-40 lg:pb-20">
        {children}
        {eyebrow && <p className="eyebrow num mb-6 inline-flex items-center gap-2 border border-gold-light/60 bg-ink/30 px-4 py-1.5 text-gold-light backdrop-blur"><Sparkle className="size-3.5" aria-hidden="true" />{eyebrow}</p>}
        <h1 className="max-w-4xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl border-l-2 border-gold-light pl-5 text-lg text-white/95 sm:text-xl">{intro}</p>}
      </Container>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-bright via-gold-light to-transparent" />
    </section>
  );
}
