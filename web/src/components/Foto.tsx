import type { ReactNode } from "react";
import fotos from "@/data/fotos-geradas.json";
import { asset } from "@/lib/base";

type Razao = "1x1" | "4x5" | "livre";
type Variante = { larguras: number[]; altura: number };
type Info = { largura: number; altura: number; foco: [number, number] } & Record<Razao, Variante>;

const manifesto = fotos as unknown as Record<string, Info>;

export const temFoto = (nome: string) => nome in manifesto;

const aspecto: Record<Razao, string> = { "1x1": "aspect-square", "4x5": "aspect-[4/5]", livre: "" };

// Foto otimizada (AVIF e WebP, vários tamanhos), gerada por scripts/gerar-imagens.mjs a partir de
// fotos-originais/<nome>.jpg. Sem a foto, mostra o `fallback` (o quadro com o desenho).
export function Foto({
  nome,
  razao = "1x1",
  alt,
  sizes = "100vw",
  prioridade = false,
  className = "",
  fallback = null,
}: {
  nome: string;
  razao?: Razao;
  alt: string;
  sizes?: string;
  prioridade?: boolean;
  className?: string;
  fallback?: ReactNode;
}) {
  const info = manifesto[nome];
  if (!info) return <>{fallback}</>;

  const { larguras, altura } = info[razao];
  const maior = larguras[larguras.length - 1];
  const caminho = (w: number, ext: string) => asset(`/img/${nome}-${razao}-${w}.${ext}`);
  const srcSet = (ext: string) => larguras.map((w) => `${caminho(w, ext)} ${w}w`).join(", ");
  const foco = razao === "livre" ? `${info.foco[0] * 100}% ${info.foco[1] * 100}%` : undefined;

  return (
    <div className={`relative overflow-hidden rounded-lg bg-creme-escuro ${aspecto[razao]} ${className}`}>
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
        <img
          src={caminho(maior, "webp")}
          srcSet={srcSet("webp")}
          sizes={sizes}
          width={maior}
          height={altura}
          alt={alt}
          loading={prioridade ? "eager" : "lazy"}
          fetchPriority={prioridade ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 size-full animate-aparece object-cover"
          style={foco ? { objectPosition: foco } : undefined}
        />
      </picture>
    </div>
  );
}
