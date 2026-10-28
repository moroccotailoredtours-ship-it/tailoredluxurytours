"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkle } from "lucide-react";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { TrackedLink } from "@/components/ui/TrackedLink";
import type { Img } from "@/lib/types";

export interface HeroSlide {
  img: Img;
  label: string;
  blurb: string;
  /** Zoom anchored at the bottom edge, to lift the subject clear of the headline. */
  zoom?: number;
}

const INTERVAL = 8000;
const pad = (n: number) => String(n).padStart(2, "0");

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));

  const go = useCallback(
    (i: number) => {
      const n = (i + slides.length) % slides.length;
      setIndex((cur) => {
        if (cur !== n) setPrev(cur);
        return n;
      });
      setLoaded((s) => new Set(s).add(n).add((n + 1) % slides.length));
    },
    [slides.length],
  );

  // Autoplay starts after a pause, and never when the visitor prefers reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      setLoaded((s) => new Set(s).add(1));
      setPlaying(true);
    }, 4000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [playing, index, go]);

  const manual = (i: number) => {
    setPlaying(false);
    go(i);
  };

  const ctl = "inline-flex size-11 items-center justify-center rounded-full border border-white/60 bg-ink/40 backdrop-blur transition active:scale-95 hover:bg-white/25";
  const current = slides[index]!;

  return (
    <section
      data-hero
      aria-roledescription="carousel"
      aria-label="Morocco highlights"
      className="on-dark bg-ink text-white"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") manual(index + 1);
        if (e.key === "ArrowLeft") manual(index - 1);
      }}
    >
      <div className="relative isolate overflow-hidden">
        {/* Photographs: the next one is revealed by a wipe, with a slow push-in */}
        <div className="absolute inset-0 -z-10">
          {slides.map((s, i) => (
            <div key={s.img.src} data-state={i === index ? "active" : i === prev ? "prev" : "idle"} aria-hidden={i !== index} className="hslide absolute inset-0">
              {loaded.has(i) && (
                <div className="size-full origin-bottom" style={s.zoom ? { transform: `scale(${s.zoom})` } : undefined}>
                <Image
                  src={s.img.src}
                  alt={i === index ? s.img.alt : ""}
                  width={s.img.width}
                  height={s.img.height}
                  sizes="100vw"
                  quality={75}
                  priority={i === 0}
                  className="size-full object-cover"
                  style={{ objectPosition: s.img.focal }}
                />
                </div>
              )}
            </div>
          ))}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-forest/80 via-transparent via-45% to-ink/20" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink/45 via-ink/5 to-transparent" />
        </div>

        {/* Oversized outlined slide number */}
        <p aria-hidden="true" className="outline-num pointer-events-none absolute right-6 top-24 hidden select-none font-serif text-[14rem] leading-none lg:block xl:right-16">{pad(index + 1)}</p>

        <div className="mx-auto flex min-h-[100svh] max-w-page flex-col justify-end gap-8 px-5 pb-28 pt-36 sm:px-8 sm:pb-10 lg:px-12">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow reveal mb-6 inline-flex items-center gap-2 border border-gold-light/60 bg-ink/30 px-4 py-1.5 text-gold-light backdrop-blur">
                <Sparkle className="size-3.5" aria-hidden="true" /> Private, tailor-made travel in Morocco
              </p>
              <h1 className="reveal [animation-delay:80ms]">Morocco, Beyond the <em className="text-gold-light">Expected.</em></h1>

              {/* Caption that changes with the slide */}
              <div key={index} className="reveal mt-7 max-w-xl border-l-2 border-gold-light pl-5" aria-live={playing ? "off" : "polite"}>
                <p className="eyebrow !text-xs text-gold-light"><span className="num">{pad(index + 1)}</span> · {current.label}</p>
                <p className="mt-2 text-lg text-white/95 sm:text-xl">{current.blurb}</p>
              </div>

              <div className="reveal mt-9 flex flex-col gap-4 [animation-delay:240ms] sm:flex-row">
                <TrackedLink event="cta_click" label="hero_primary" href="/contact" className={buttonClass("primary")}>
                  Design Your Journey
                </TrackedLink>
                <ButtonLink href="/tours" variant="outline-light">Explore Morocco</ButtonLink>
              </div>
            </div>

            <div className="reveal [animation-delay:320ms]">
              <div role="group" aria-label="Choose slide" className="flex gap-2 lg:gap-3">
                {slides.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => manual(i)}
                    aria-label={`Show slide ${i + 1}: ${s.label}`}
                    aria-current={i === index}
                    className={`group relative block flex-1 overflow-hidden border text-left transition lg:w-44 lg:flex-none ${i === index ? "border-gold-light" : "border-white/30 hover:border-white"}`}
                  >
                    <span className="relative block aspect-[4/3] lg:aspect-[3/4]">
                      <Image src={s.img.src} alt="" width={240} height={320} sizes="(min-width: 1024px) 176px, 25vw" quality={60} className={`size-full object-cover transition duration-500 ${i === index ? "" : "brightness-[0.55] group-hover:brightness-90"}`} style={{ objectPosition: s.img.focal }} />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-2 pt-8 lg:p-3">
                        <span className="num block text-[0.7rem] font-bold text-gold-light">{pad(i + 1)}</span>
                        <span className="hidden text-[0.8rem] font-semibold leading-tight lg:block">{s.label}</span>
                      </span>
                    </span>
                    {i === index && <span key={`${index}-${playing}`} aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-1 origin-left bg-gold-light ${playing ? "seg-fill" : ""}`} />}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="num font-serif text-xl" aria-hidden="true">{pad(index + 1)}<span className="text-white/60"> / {pad(slides.length)}</span></span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setPlaying((p) => !p)} className={ctl} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>
                    {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
                  </button>
                  <button type="button" onClick={() => manual(index - 1)} className={ctl} aria-label="Previous slide"><ChevronLeft className="size-5" aria-hidden="true" /></button>
                  <button type="button" onClick={() => manual(index + 1)} className={ctl} aria-label="Next slide"><ChevronRight className="size-5" aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
