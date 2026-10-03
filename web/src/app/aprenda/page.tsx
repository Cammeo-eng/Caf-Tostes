import Link from "next/link";
import { Header } from "@/components/Header";
import { Graos } from "@/components/Ilustracoes";

export const metadata = { title: "Aprenda — TOSTES&CO" };

// Provisório: os textos sobre café entram na Fase 6.
export default function Aprenda() {
  return (
    <>
      <div className="listras" aria-hidden="true" />
      <Header />
      <main className="miolo flex min-h-[60svh] flex-col items-center justify-center gap-4 text-center">
        <Graos className="w-16 text-marrom-terra" />
        <h1 className="text-h2">Enquanto você espera</h1>
        <p className="max-w-xs text-body">As leituras sobre café estão no forno. Voltam já, já.</p>
        <Link href="/" className="botao botao-vinho">Voltar ao início</Link>
      </main>
    </>
  );
}
