import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "outline-light" | "text";

const base =
  "inline-flex items-center justify-center gap-2 text-[0.95rem] font-semibold tracking-wide transition-colors duration-300 min-h-12 px-7 rounded-none active:scale-[0.97]";
const variants: Record<Variant, string> = {
  primary: "btn-gold text-white",
  outline: "border border-ink/70 text-ink hover:bg-ink hover:text-ivory",
  "outline-light": "border border-white/80 text-white hover:bg-white hover:text-ink",
  text: "px-0 min-h-0 rounded-none underline underline-offset-[6px] decoration-1 hover:decoration-2",
};

export const buttonClass = (variant: Variant = "primary", extra = "") => `${base} ${variants[variant]} ${extra}`;

export function ButtonLink({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}
