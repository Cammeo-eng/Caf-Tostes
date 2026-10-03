import type { NextConfig } from "next";

// Site 100% estático no GitHub Pages: https://cammeo-eng.github.io/Caf-Tostes/
// Em desenvolvimento (npm run dev) o site roda na raiz, sem o prefixo.
const basePath = process.env.NODE_ENV === "production" ? "/Caf-Tostes" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
