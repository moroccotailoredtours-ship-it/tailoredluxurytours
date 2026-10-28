import Image from "next/image";
import { site } from "@/lib/site";

/** The emblem from the supplied logo, shown as a round cream badge so it sits cleanly on photos, glass and dark backgrounds. */
export function LogoMark({ className = "size-12" }: { className?: string }) {
  return (
    <span className={`inline-flex shrink-0 overflow-hidden rounded-full bg-[#fbf7f0] ring-1 ring-gold-bright/60 ${className}`}>
      <Image src="/logo/emblem.webp" alt="" width={360} height={360} sizes="48px" className="size-full scale-[0.92] object-cover" />
    </span>
  );
}

export function Logo({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark />
      {compact ? (
        <span className="sr-only">{site.name}</span>
      ) : (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[1.55rem] tracking-tight">Tailored</span>
          <span className="eyebrow mt-1 !text-[0.6rem] !tracking-[0.32em]">Luxury Tours</span>
        </span>
      )}
    </span>
  );
}
