"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { categorias } from "@/data/cardapio";

export function CategoryBar({ atual }: { atual: string }) {
  const ativa = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    ativa.current?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [atual]);

  return (
    <nav aria-label="Categorias" className="sticky top-0 z-10 border-b border-marrom-terra/15 bg-creme/95 backdrop-blur-sm">
      <ul className="sem-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
        {categorias.map((c) => {
          const ok = c.slug === atual;
          return (
            <li key={c.slug} className="shrink-0">
              <Link
                ref={ok ? ativa : undefined}
                href={`/cardapio/${c.slug}`}
                aria-current={ok ? "page" : undefined}
                className={`flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ${
                  ok ? "bg-verde-musgo text-creme" : "bg-creme-escuro text-marrom-escuro"
                }`}
              >
                {c.nome}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
