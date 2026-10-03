"use client";

import type { ReactNode } from "react";
import { brl } from "@/data/itens";
import { useBag } from "./BagProvider";
import { FotoAqui } from "./FotoAqui";
import { Croissant, Sanduiche } from "./Ilustracoes";

// Provisório: 6 itens com selo Favorito da casa, a confirmar pelo dono.
const favoritos: { nome: string; tipo: string; preco: number; desenho: ReactNode; fundo: string; cor: string }[] = [
  { nome: "Frango com requeijão e queijo", tipo: "Croissant · Salgado", preco: 14, desenho: <Croissant className="w-2/5" />, fundo: "bg-vinho-claro", cor: "text-vinho" },
  { nome: "2 queijos gratinado", tipo: "Croissant · Salgado", preco: 14, desenho: <Croissant className="w-2/5" />, fundo: "bg-vinho-claro", cor: "text-vinho" },
  { nome: "Creme de avelã", tipo: "Croissant · Doce", preco: 16, desenho: <Croissant className="w-2/5" />, fundo: "bg-vinho-claro", cor: "text-vinho" },
  { nome: "Frango cremoso", tipo: "Gratinado · Salgado", preco: 14, desenho: <Sanduiche className="w-2/5" />, fundo: "bg-salvia/60", cor: "text-verde-musgo" },
  { nome: "Croque monsieur", tipo: "Gratinado · Salgado", preco: 13, desenho: <Sanduiche className="w-2/5" />, fundo: "bg-salvia/60", cor: "text-verde-musgo" },
  { nome: "Bauru gratinado", tipo: "Gratinado · Salgado", preco: 14, desenho: <Sanduiche className="w-2/5" />, fundo: "bg-salvia/60", cor: "text-verde-musgo" },
];

export function FavoritosCarrossel() {
  const { adicionar } = useBag();
  return (
    <ul
      className="sem-scrollbar -mx-5 flex scroll-px-5 snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:-mx-6 md:scroll-px-6 md:px-6"
      aria-label="Favoritos da casa"
    >
      {favoritos.map((f) => (
        <li key={f.nome} className="w-[68%] shrink-0 snap-start sm:w-64">
          <article className="cartao p-2">
            <FotoAqui rotulo={f.nome.toLowerCase()} desenho={f.desenho} fundo={f.fundo} cor={f.cor} />
            <div className="px-2 pt-4 pb-2">
              <p className="rotulo text-verde-musgo">{f.tipo}</p>
              <h3 className="mt-1 text-h3">{f.nome}</h3>
              <div className="mt-4 flex items-center justify-between">
                <span className="preco text-h3">{brl(f.preco)}</span>
                <button
                  type="button"
                  onClick={() => adicionar(f.preco)}
                  aria-label={`Adicionar ${f.nome} ao pedido`}
                  className="grid size-11 place-items-center rounded-full bg-vinho text-h3 leading-none text-creme transition-transform active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
