"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/Button";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header data-top={atTop && !open} className="site-header on-dark fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="bar mx-auto flex h-16 max-w-[82rem] items-center justify-between rounded-none pl-5 pr-2.5 sm:pl-6">
          <Link href="/" aria-label="Tailored Luxury Tours" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="rounded-none px-2.5 py-2 text-[0.92rem] xl:px-4 font-medium transition-colors hover:bg-white/10 aria-[current=page]:bg-gold-bright/20 aria-[current=page]:text-gold-light"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <TrackedLink event="cta_click" label="header" href="/contact" className={buttonClass("primary", "!min-h-11 !px-5 text-sm whitespace-nowrap")}>
                Design Your Journey <ArrowUpRight className="size-4" aria-hidden="true" />
              </TrackedLink>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-current/10 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="on-dark zellige fixed inset-0 z-[60] flex flex-col bg-ink px-5 pb-8 pt-5 text-ivory sm:px-8">
          <div className="flex h-12 items-center justify-between">
            <Logo />
            <button ref={closeRef} type="button" className="inline-flex size-11 items-center justify-center rounded-full border border-white/25" aria-label="Close menu" onClick={() => { setOpen(false); toggleRef.current?.focus(); }}>
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex flex-1 flex-col overflow-y-auto">
            {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact" }].map((item, i) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="mb-2 flex items-baseline gap-4 rounded-none border border-white/10 bg-white/5 px-5 py-4 font-serif text-3xl active:scale-[0.98] aria-[current=page]:border-gold-bright/60 aria-[current=page]:bg-gold-bright/15" aria-current={pathname === item.href ? "page" : undefined}>
                <span className="num text-sm text-gold-light">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" onClick={() => setOpen(false)} className={buttonClass("primary", "mt-6 w-full")}>
            Design Your Journey
          </Link>
        </div>
      )}
    </>
  );
}
