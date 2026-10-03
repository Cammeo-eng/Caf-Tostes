import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TOSTES&CO — Cafeteria",
    short_name: "TOSTES&CO",
    description: "Seu refúgio de café em Fazenda Rio Grande.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3ebdd",
    theme_color: "#f3ebdd",
    lang: "pt-BR",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
