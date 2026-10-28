import { images } from "@/content/images";
import { Container, Photo } from "./Section";
import { buttonClass } from "./Button";
import { TrackedLink } from "./TrackedLink";
import { WhatsAppButton } from "./ContactLinks";
import type { Img } from "@/lib/types";

export function CtaBand({
  title = "Your Morocco. Your Way.",
  text = "Tell us what inspires you, and let’s start shaping a journey around the Morocco you want to experience.",
  img = images.saharaGolden,
  source = "cta_band",
  cta = "Design Your Journey",
}: {
  title?: string;
  text?: string;
  img?: Img;
  source?: string;
  cta?: string;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink py-28 text-white lg:py-44">
      <div className="absolute inset-0 -z-10">
        <Photo img={img} sizes="100vw" decorative />
        <div className="absolute inset-0 bg-forest/70" />
        <div aria-hidden="true" className="zellige absolute inset-0" />
      </div>
      <Container className="text-center">
        <h2 className="mx-auto max-w-4xl text-balance">{title}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">{text}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <TrackedLink event="cta_click" label={source} href="/contact" className={buttonClass("primary")}>
            {cta}
          </TrackedLink>
          <WhatsAppButton variant="outline-light" />
        </div>
      </Container>
    </section>
  );
}
