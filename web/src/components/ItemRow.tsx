"use client";

import { brl, type Item } from "@/data/itens";
import { useBag } from "./BagProvider";
import { XicaraLatte } from "./Ilustracoes";

export function ItemRow({ item }: { item: Item }) {
  const { adicionar } = useBag();
  const esgotado = !item.disponivel;

  return (
    <li className={`flex gap-4 py-4 ${esgotado ? "opacity-55" : ""}`}>
      {/* quadro da foto; a ilustração sai quando a foto real entrar */}
      <div className="grid size-24 shrink-0 place-items-center rounded-2xl bg-creme-escuro text-marrom-terra">
        <XicaraLatte className="size-14" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="titulo text-xl leading-tight">{item.nome}</h3>
          {item.selo === "novo" && (
            <span className="rounded-full bg-vinho px-2 py-0.5 text-[11px] font-bold tracking-wide text-creme">NOVO</span>
          )}
          {item.selo === "favorito" && (
            <span className="rounded-full bg-verde-musgo px-2 py-0.5 text-[11px] font-bold tracking-wide text-creme">FAVORITO DA CASA</span>
          )}
        </div>
        {item.tamanho && <p className="text-sm font-medium text-marrom-terra">{item.tamanho}</p>}
        <p className="mt-1 text-sm leading-snug">{item.curta}</p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <span className="preco text-lg">{brl(item.preco)}</span>
          {esgotado ? (
            <span className="text-sm font-semibold text-vinho">Esgotado hoje</span>
          ) : (
            <button
              type="button"
              onClick={() => adicionar(item.preco)}
              aria-label={`Adicionar ${item.nome} à sacola`}
              className="grid size-11 place-items-center rounded-full bg-vinho text-2xl leading-none text-creme active:scale-95"
            >
              +
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
