import type { MetadataRoute } from "next";
import { BASE } from "@/lib/base";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TOSTES&CO — Cafeteria",
    short_name: "TOSTES&CO",
    description: "Seu refúgio de café em Fazenda Rio Grande.",
    start_url: BASE + "/",
    scope: BASE + "/",
    display: "standalone",
    background_color: "#f3ebdd",
    theme_color: "#f3ebdd",
    lang: "pt-BR",
    icons: [
      { src: BASE + "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: BASE + "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: BASE + "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
