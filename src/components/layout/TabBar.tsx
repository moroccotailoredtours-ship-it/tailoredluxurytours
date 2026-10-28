"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, Images, MapPin, Send } from "lucide-react";
import { track } from "@/lib/analytics";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tours", label: "Tours", icon: Compass },
  { href: "/contact", label: "Enquire", icon: Send, primary: true },
  { href: "/destinations", label: "Places", icon: MapPin },
  { href: "/gallery", label: "Gallery", icon: Images },
] as const;

/** App-style bottom tab bar on small screens: the five places a visitor most often wants, with the enquiry as the raised centre action. */
export function TabBar() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <nav aria-label="App navigation" className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] md:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5 items-end rounded-none border border-ink/10 bg-paper/90 px-1.5 pb-1.5 pt-1.5 shadow-[0_14px_44px_-14px_rgb(10_28_24/0.55)] backdrop-blur-xl">
        {tabs.map(({ href, label, icon: Icon, ...rest }) => {
          const active = isActive(href);
          const primary = "primary" in rest;
          return (
            <li key={href} className="flex justify-center">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => primary && track("cta_click", { label: "tabbar" })}
                className={
                  primary
                    ? "-mt-7 flex flex-col items-center gap-1 text-[0.68rem] font-bold tracking-wide text-gold-deep active:scale-95"
                    : `flex min-h-14 w-full flex-col items-center justify-center gap-1 rounded-none text-[0.68rem] font-semibold tracking-wide transition active:scale-95 ${active ? "bg-gold/10 text-gold-deep" : "text-ink-soft"}`
                }
              >
                {primary ? (
                  <span className="btn-gold inline-flex size-14 items-center justify-center rounded-full text-white ring-4 ring-ivory">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                ) : (
                  <Icon className={`size-[1.35rem] ${active ? "stroke-[2.25]" : ""}`} aria-hidden="true" />
                )}
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
