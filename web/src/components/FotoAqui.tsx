import type { ReactNode } from "react";

// Marca o lugar de uma foto. Quando a foto real chegar, este quadro vira <Image />
// com as mesmas medidas, e o rótulo some.
// Proporções fixas: 1:1 nas listas, 4:5 nos combos e na página do item.
const proporcoes = { "1:1": "aspect-square", "4:5": "aspect-[4/5]", "4:3": "aspect-[4/3]", livre: "" } as const;

export function FotoAqui({
  rotulo,
  desenho,
  proporcao = "1:1",
  className = "",
  fundo = "bg-creme-escuro",
  cor = "text-marrom-terra",
}: {
  rotulo: string;
  desenho: ReactNode;
  proporcao?: keyof typeof proporcoes;
  className?: string;
  fundo?: string;
  cor?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Espaço para foto: ${rotulo}`}
      className={`relative grid animate-aparece place-items-center overflow-hidden rounded-lg border border-dashed border-current/40 ${proporcoes[proporcao]} ${fundo} ${cor} ${className}`}
    >
      {desenho}
      <span className="absolute inset-x-2 bottom-2 rounded-full bg-creme-claro/90 px-2 py-1 text-center text-label font-bold uppercase tracking-wide text-marrom-escuro">
        Foto: {rotulo}
      </span>
    </div>
  );
}
