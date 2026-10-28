import type { ItineraryDay } from "@/lib/types";

/** Day-by-day timeline. Every day is always open, so all the text is visible without any clicks. */
export function Itinerary({ days }: { days: ItineraryDay[] }) {
  return (
    <div>
      <p className="num mb-6 text-ink-soft">{days.length} days · {days.length - 1} nights</p>
      <ol className="relative">
        <span aria-hidden="true" className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-ink/20" />
        {days.map((d) => (
          <li key={d.day} className="relative pb-3">
            <div className="flex items-center gap-4 p-1 pr-4">
              <span className="num relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-gold bg-gold font-sans text-sm font-bold text-white">
                {d.day}
              </span>
              <h3 className="flex-1 !text-base">
                <span className="eyebrow block !text-[0.66rem] text-gold">Day {d.day}</span>
                <span className="block font-serif text-[1.35rem] leading-tight sm:text-2xl">{d.title}</span>
              </h3>
            </div>
            <p className="my-2 ml-[3.75rem] max-w-2xl rounded-none border border-gold-bright/20 bg-paper p-4 text-ink-soft sm:p-5">{d.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
