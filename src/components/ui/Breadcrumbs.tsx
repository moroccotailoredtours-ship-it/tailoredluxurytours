import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export function Breadcrumbs({ items, light = false }: { items: { name: string; path: string }[]; light?: boolean }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={`inline-flex rounded-none px-4 py-1.5 text-sm ${light ? "glass-dark text-white" : "border border-ink/10 bg-paper text-ink-soft"}`}>
      <JsonLd data={breadcrumbLd(all)} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page">{it.name}</span>
            ) : (
              <Link href={it.path} className="underline-offset-4 hover:underline">
                {it.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
