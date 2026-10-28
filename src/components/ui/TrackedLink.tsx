"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";

type EventName = Parameters<typeof track>[0];

/** Internal link that reports an analytics event (no personal data) on click. */
export function TrackedLink({ event, label, onClick, ...props }: ComponentProps<typeof Link> & { event: EventName; label: string }) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, { label });
        onClick?.(e);
      }}
    />
  );
}

/** External/mailto link with the same tracking behaviour. */
export function TrackedAnchor({ event, label, onClick, ...props }: ComponentProps<"a"> & { event: EventName; label: string }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, { label });
        onClick?.(e);
      }}
    />
  );
}
