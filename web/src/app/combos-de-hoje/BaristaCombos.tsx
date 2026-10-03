"use client";

import { useCombosDoDia } from "@/components/CombosDoDia";
import { brl, nomeCompleto } from "@/lib/formato";

const dataBonita = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

export function BaristaCombos() {
  const estado = useCombosDoDia();
  if (!estado) return <p className="mt-6 text-body">Calculando…</p>;

  return (
    <>
      <p className="mt-2 text-body capitalize">{dataBonita(estado.data)}</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {estado.combos.map((c, i) => (
          <li key={c.bebida.slug} className="cartao p-6">
            <p className="rotulo text-verde-musgo">Combo {i + 1}</p>
            <p className="mt-2 text-h3">{nomeCompleto(c.bebida)}</p>
            <p className="text-h3">+ {nomeCompleto(c.comida)}</p>
            <dl className="mt-4 space-y-1 text-body [font-variant-numeric:tabular-nums]">
              <div className="flex justify-between"><dt>{nomeCompleto(c.bebida)}</dt><dd>{brl(c.bebida.preco)}</dd></div>
              <div className="flex justify-between"><dt>{nomeCompleto(c.comida)}</dt><dd>{brl(c.comida.preco)}</dd></div>
              <div className="flex justify-between"><dt>Soma</dt><dd>{brl(c.cheio)}</dd></div>
              <div className="flex justify-between"><dt>Desconto de 10%</dt><dd>− {brl(c.economiza)}</dd></div>
            </dl>
            <p className="mt-4 text-small font-semibold">Cobrar</p>
            <p className="preco text-h1">{brl(c.final)}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-md text-small">Os combos trocam todo dia à meia-noite (horário de Brasília) e são iguais para todos os clientes.</p>
    </>
  );
}
