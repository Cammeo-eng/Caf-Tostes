"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useBag } from "./BagProvider";

const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const abas: { href: string; rotulo: string; ativa: (path: string) => boolean; icone: ReactNode }[] = [
  {
    href: "/",
    rotulo: "Início",
    ativa: (path) => path === "/",
    icone: (
      <svg viewBox="0 0 24 24" className="ilu size-6" {...p}>
        <path d="M4 11l8-7 8 7" />
        <path d="M6 10v10h12V10" />
        <path d="M10 20v-6h4v6" />
      </svg>
    ),
  },
  {
    href: "/cardapio/espresso-bar",
    rotulo: "Cardápio",
    ativa: (path) => path.startsWith("/cardapio") || path.startsWith("/item"),
    icone: (
      <svg viewBox="0 0 24 24" className="ilu size-6" {...p}>
        <path d="M4 9h13v5a5 5 0 01-5 5H9a5 5 0 01-5-5V9z" />
        <path d="M17 11h1.5a2.5 2.5 0 010 5H16" />
        <path d="M8 5c-1-1 1-2 0-3M12 5c-1-1 1-2 0-3" />
      </svg>
    ),
  },
  {
    href: "/pedido",
    rotulo: "Pedido",
    ativa: (path) => path.startsWith("/pedido"),
    icone: (
      <svg viewBox="0 0 24 24" className="ilu size-6" {...p}>
        <path d="M5 8h14l-1 12H6L5 8z" />
        <path d="M9 8V6a3 3 0 016 0v2" />
      </svg>
    ),
  },
  {
    href: "/aprenda",
    rotulo: "Aprenda",
    ativa: (path) => path.startsWith("/aprenda"),
    icone: (
      <svg viewBox="0 0 24 24" className="ilu size-6" {...p}>
        <path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v13c-3-1-6-1-8 1-2-2-5-2-8-1V5z" />
        <path d="M12 6v13" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const path = usePathname();
  const { quantidade, pulso } = useBag();
  const indice = Math.max(0, abas.findIndex((a) => a.ativa(path)));
  const nenhuma = !abas.some((a) => a.ativa(path));

  return (
    <nav
      aria-label="Navegação do app"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-marrom-terra/15 bg-creme-claro pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="relative mx-auto grid max-w-xl grid-cols-4">
        {/* indicador que desliza até a aba ativa */}
        {!nenhuma && (
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 h-0.5 w-1/4 transition-transform duration-200 ease-out"
            style={{ transform: `translateX(${indice * 100}%)` }}
          >
            <span className="mx-auto block h-full w-8 rounded-full bg-vinho" />
          </span>
        )}
        {abas.map((a) => {
          const ok = a.ativa(path);
          const ehPedido = a.href === "/pedido";
          return (
            <Link
              key={a.href}
              href={a.href}
              aria-current={ok ? "page" : undefined}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 text-label font-semibold ${
                ok ? "text-vinho" : "text-marrom-terra"
              }`}
            >
              <span key={ehPedido ? pulso : 0} className={`relative ${ehPedido && pulso > 0 ? "animate-pula" : ""}`}>
                {a.icone}
                {ehPedido && quantidade > 0 && (
                  <span
                    key={pulso}
                    className="absolute -top-1 -right-2 grid h-4 min-w-4 animate-sobe place-items-center rounded-full bg-vinho px-1 text-[10px] font-bold text-creme"
                  >
                    {quantidade}
                  </span>
                )}
              </span>
              {a.rotulo}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
