import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Tailored Tours",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7f0",
    theme_color: "#fbf7f0",
    icons: [{ src: "/logo/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" }],
  };
}
