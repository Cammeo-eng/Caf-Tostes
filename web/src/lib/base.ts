// Caminho base do site (no GitHub Pages fica em /Caf-Tostes). Definido em next.config.ts.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixa o caminho de um arquivo de public/ (imagens em <img> não recebem o basePath sozinhas). */
export const asset = (caminho: string) => BASE + caminho;
