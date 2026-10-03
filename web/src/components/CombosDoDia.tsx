"use client";

import { useEffect, useState } from "react";
import { categorias, itens } from "@/data/cardapio";
import { combosFixos } from "@/data/combos-fixos";
import { combosDoDia, type Combo } from "@/lib/combos";
import { brl, nomeCompleto } from "@/lib/formato";
import { agoraEmBrasilia } from "@/lib/horario";
import { useBag } from "./BagProvider";
import { Foto } from "./Foto";
import { IlustracaoDaCategoria } from "./Ilustracoes";

const tipo = Object.fromEntries(categorias.map((c) => [c.slug, c.tipo]));

/** Os combos de hoje, calculados no navegador pela data de Brasília (iguais para todo mundo). */
export function useCombosDoDia() {
  const [estado, setEstado] = useState<{ data: string; combos: Combo[] } | null>(null);
  useEffect(() => {
    const calcular = () => {
      const { data } = agoraEmBrasilia();
      setEstado((atual) => (atual?.data === data ? atual : { data, combos: combosDoDia(data, itens, tipo, combosFixos) }));
    };
    calcular();
    // vira o dia à meia-noite com a página aberta
    const id = setInterval(calcular, 60_000);
    return () => clearInterval(id);
  }, []);
  return estado;
}

function FotoDoItem({ slug, nome, categoria, fundo, cor }: { slug: string; nome: string; categoria: string; fundo: string; cor: string }) {
  return (
    <Foto
      nome={slug}
      razao="4x5"
      alt={nome}
      sizes="(min-width: 768px) 280px, 45vw"
      fallback={
        <div className={`grid aspect-[4/5] place-items-center rounded-lg ${fundo} ${cor}`}>
          <IlustracaoDaCategoria slug={categoria} className="h-16 w-auto" />
        </div>
      }
    />
  );
}

export function CombosDoDia() {
  const estado = useCombosDoDia();
  const { adicionar } = useBag();

  if (!estado) {
    return (
      <div className="grid animate-pulse gap-6 md:grid-cols-2" aria-busy="true" aria-label="Carregando os combos de hoje">
        {[0, 1].map((i) => (
          <div key={i} className="cartao h-[28rem] p-4" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {estado.combos.map((c) => (
        <article key={c.bebida.slug} className="cartao animate-aparece p-4 text-marrom-escuro">
          <div className="grid grid-cols-2 gap-2">
            <FotoDoItem slug={c.bebida.slug} nome={nomeCompleto(c.bebida)} categoria={c.bebida.categoria} fundo="bg-salvia/60" cor="text-verde-musgo" />
            <FotoDoItem slug={c.comida.slug} nome={nomeCompleto(c.comida)} categoria={c.comida.categoria} fundo="bg-vinho-claro" cor="text-vinho" />
          </div>
          <h3 className="mt-4 text-h3">{nomeCompleto(c.bebida)} + {nomeCompleto(c.comida)}</h3>
          <p className="mt-2 text-small">
            de <s className="[font-variant-numeric:tabular-nums]">{brl(c.cheio)}</s> por{" "}
            <span className="preco text-h2">{brl(c.final)}</span>
          </p>
          <p className="text-small font-semibold text-verde-musgo">Você economiza {brl(c.economiza)}</p>
          <button type="button" onClick={() => adicionar(c.final)} className="botao botao-vinho mt-4 w-full">
            Quero esse combo
          </button>
        </article>
      ))}
    </div>
  );
}
