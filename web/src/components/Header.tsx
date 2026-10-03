"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { statusDaLoja } from "@/lib/horario";
import { asset } from "@/lib/base";
import { useBag } from "./BagProvider";

// claro = no celular, flutua sobre a foto do hero (o estado da loja vira uma pílula creme);
// no desktop fica em linha normal sobre o fundo creme.
export function Header({ claro = false }: { claro?: boolean }) {
  const { quantidade } = useBag();
  const [status, setStatus] = useState<{ aberto: boolean; texto: string } | null>(null);

  useEffect(() => {
    const atualizar = () => setStatus(statusDaLoja());
    atualizar();
    const id = setInterval(atualizar, 60_000);
    return () => clearInterval(id);
  }, []);

  const conteudo = (
    <header className="mx-auto flex max-w-6xl items-center gap-4 px-5 pt-4 pb-2 md:px-6">
      <Link href="/" aria-label="TOSTES&CO, início" className="shrink-0 overflow-hidden rounded-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/logo.jpg")} alt="TOSTES&CO Cafeteria, desde 2024" width={56} height={56} className="mix-blend-multiply" />
      </Link>
      <nav aria-label="Principal" className="hidden flex-1 justify-center gap-8 text-small font-semibold md:flex">
        <Link href="/cardapio/espresso-bar" className="py-3">Cardápio</Link>
        <Link href="/#promocao" className="py-3">Combos do dia</Link>
        <Link href="/#por-que" className="py-3">Por que a Tostes</Link>
        <Link href="/aprenda" className="py-3">Aprenda</Link>
      </nav>
      <p className="min-h-6 flex-1 text-small font-semibold md:flex-none">
        {status && (
          <span
            className={`inline-flex items-center ${
              claro ? "max-md:rounded-full max-md:bg-creme-claro/90 max-md:px-3 max-md:py-1" : ""
            }`}
          >
            <span
              aria-hidden="true"
              className={`mr-2 inline-block size-2 rounded-full ${status.aberto ? "bg-verde-musgo" : "bg-vinho"}`}
            />
            {status.texto}
          </span>
        )}
      </p>
      {/* no celular a sacola fica na barra inferior */}
      <Link
        href="/pedido"
        className="relative hidden size-11 place-items-center rounded-full border border-current/40 md:grid"
        aria-label={`Pedido, ${quantidade} ${quantidade === 1 ? "item" : "itens"}`}
      >
        <svg viewBox="0 0 24 24" className="ilu size-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 8h14l-1 12H6L5 8z" />
          <path d="M9 8V6a3 3 0 016 0v2" />
        </svg>
        {quantidade > 0 && (
          <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-vinho px-1 text-label font-bold text-creme">
            {quantidade}
          </span>
        )}
      </Link>
    </header>
  );

  return claro ? <div className="absolute inset-x-0 top-0 z-20 md:static">{conteudo}</div> : conteudo;
}
