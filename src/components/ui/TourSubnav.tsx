"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonClass } from "./Button";
import { track } from "@/lib/analytics";

/** Sticky section tabs with scroll-spy, shown under the header on tour pages. */
export function TourSubnav({ items, title, slug }: { items: { id: string; label: string }[]; title: string; slug: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, [items]);

  return (
    <div aria-hidden={!show} inert={!show} className={`fixed inset-x-0 top-[5.1rem] z-40 hidden transition-all duration-500 md:block ${show ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}>
      <div className="mx-auto flex h-14 max-w-[78rem] items-center justify-between gap-6 rounded-none border border-ink/10 bg-paper/90 pl-6 pr-2 shadow-[0_8px_30px_-14px_rgb(10_28_24/0.35)] backdrop-blur-xl">
        <p className="hidden truncate font-serif text-xl lg:block">{title}</p>
        <nav aria-label="On this page" className="flex items-center gap-1">
          {items.map((i) => (
            <a key={i.id} href={`#${i.id}`} aria-current={active === i.id ? "true" : undefined} className="rounded-none px-4 py-2 text-sm font-semibold transition-colors hover:bg-ink/5 aria-[current=true]:bg-ink aria-[current=true]:text-ivory">
              {i.label}
            </a>
          ))}
        </nav>
        <Link href={`/contact?tour=${slug}`} onClick={() => track("tour_enquiry_click", { label: slug })} className={buttonClass("primary", "!min-h-10 !px-5 text-sm")}>
          Enquire
        </Link>
      </div>
    </div>
  );
}
