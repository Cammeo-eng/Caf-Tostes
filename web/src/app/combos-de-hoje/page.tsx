import type { Metadata } from "next";
import { BaristaCombos } from "./BaristaCombos";

export const metadata: Metadata = {
  title: "Combos de hoje — TOSTES&CO",
  robots: { index: false, follow: false },
};

// Página aberta e só de leitura, para o barista registrar o combo do dia no Loyverse.
export default function CombosDeHoje() {
  return (
    <main className="miolo py-12">
      <p className="rotulo text-vinho">Para o balcão</p>
      <h1 className="mt-2 text-h1">Combos de hoje</h1>
      <BaristaCombos />
    </main>
  );
}
