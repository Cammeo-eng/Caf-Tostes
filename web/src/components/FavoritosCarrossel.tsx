"use client";

import { categorias, itens } from "@/data/cardapio";
import { config } from "@/data/config";
import { brl } from "@/lib/formato";
import { useBag } from "./BagProvider";
import { Foto } from "./Foto";
import { IlustracaoDaCategoria } from "./Ilustracoes";

// Quais itens aparecem aqui: config.favoritosDaHome (data/config.ts). Provisório até o dono confirmar os 6.
const favoritos = config.favoritosDaHome.flatMap((slug) => itens.find((i) => i.slug === slug) ?? []);
const nomeDaCategoria = Object.fromEntries(categorias.map((c) => [c.slug, c.nome]));

export function FavoritosCarrossel() {
  const { adicionar } = useBag();
  return (
    <ul
      className="sem-scrollbar -mx-5 flex scroll-px-5 snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:-mx-6 md:scroll-px-6 md:px-6"
      aria-label="Favoritos da casa"
    >
      {favoritos.map((f) => (
        <li key={f.slug} className="w-[68%] shrink-0 snap-start sm:w-64">
          <article className="cartao p-2">
            <Foto
              nome={f.slug}
              razao="1x1"
              alt={f.nome}
              sizes="(min-width: 640px) 256px, 68vw"
              fallback={
                <div className="grid aspect-square place-items-center rounded-lg bg-vinho-claro text-vinho">
                  <IlustracaoDaCategoria slug={f.categoria} className="h-20 w-auto" />
                </div>
              }
            />
            <div className="px-2 pt-4 pb-2">
              <p className="rotulo text-verde-musgo">
                {nomeDaCategoria[f.categoria]}
                {f.subcategoria ? ` · ${f.subcategoria}` : ""}
              </p>
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
