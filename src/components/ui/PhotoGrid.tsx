"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { track } from "@/lib/analytics";

export interface GridPhoto { id: number; file: string; alt: string; width: number; height: number }

/** Masonry photo grid with an accessible lightbox (native <dialog>: focus trap, Esc to close, arrow-key navigation). */
export function PhotoGrid({ photos, placeName }: { photos: GridPhoto[]; placeName: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const show = (i: number, el?: HTMLElement) => {
    if (el) opener.current = el;
    setOpen(i);
  };
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const current = open !== null ? photos[open] : null;
  const btn = "inline-flex size-11 items-center justify-center rounded-full border border-white/35 bg-black/30 text-white backdrop-blur transition-colors hover:bg-white/20";

  return (
    <>
      <ul className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>li]:mb-3 [&>li]:break-inside-avoid">
        {photos.map((p, i) => (
          <li key={p.id}>
            <button type="button" onClick={(e) => show(i, e.currentTarget)} className="group relative block w-full overflow-hidden rounded-none bg-sand" aria-label={`Enlarge: ${p.alt}`}>
              <Image
                src={p.file}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                quality={70}
                loading={i < 8 ? "eager" : "lazy"}
                className="h-auto w-full transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={`${placeName} photo viewer`}
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink/95"
        onClose={() => { setOpen(null); opener.current?.focus(); }}
        onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
      >
        {current && (
          <div className="on-dark flex h-full flex-col text-white">
            <div className="flex items-center justify-between p-4">
              <p className="num text-sm text-white/70" aria-live="polite">{(open ?? 0) + 1} / {photos.length}</p>
              <button type="button" className={btn} aria-label="Close viewer" onClick={() => setOpen(null)} autoFocus><X className="size-5" aria-hidden="true" /></button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
              <button type="button" className={`${btn} absolute left-2 z-10 sm:left-4`} aria-label="Previous photo" onClick={() => step(-1)}><ChevronLeft className="size-5" aria-hidden="true" /></button>
              <Image key={current.id} src={current.file} alt={current.alt} width={current.width} height={current.height} sizes="100vw" quality={82} priority className="max-h-full w-auto max-w-full rounded-none object-contain" />
              <button type="button" className={`${btn} absolute right-2 z-10 sm:right-4`} aria-label="Next photo" onClick={() => step(1)}><ChevronRight className="size-5" aria-hidden="true" /></button>
            </div>
            <div className="flex flex-col items-center gap-3 p-5 text-center sm:flex-row sm:justify-between sm:text-left">
              <p className="max-w-2xl text-[0.95rem] text-white/90">{current.alt}</p>
              <Link href="/contact" onClick={() => track("cta_click", { label: "gallery_lightbox" })} className="inline-flex min-h-11 shrink-0 items-center rounded-none btn-gold px-6 text-sm font-semibold">
                Plan a journey like this
              </Link>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
