"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Appears after the visitor has scrolled a screen or so; sits above the mobile tab bar. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const up = () => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={up}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-24 left-4 z-40 hidden lg:inline-flex size-12 items-center justify-center border border-gold-light/60 bg-forest text-gold-light shadow-[0_12px_30px_-12px_rgb(10_28_24/0.7)] transition duration-300 hover:bg-gold hover:text-white lg:bottom-8 lg:left-8 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
