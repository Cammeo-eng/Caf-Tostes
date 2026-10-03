import Link from "next/link";
import { Header } from "@/components/Header";
import { Caneca } from "@/components/Ilustracoes";

export const metadata = { title: "Pedido — TOSTES&CO" };

// Provisório: a sacola e o pedido pelo WhatsApp entram na Fase 4.
export default function Pedido() {
  return (
    <>
      <div className="listras" aria-hidden="true" />
      <Header />
      <main className="miolo flex min-h-[60svh] flex-col items-center justify-center gap-4 text-center">
        <Caneca className="w-16 text-marrom-terra" />
        <h1 className="text-h2">Seu pedido aparece aqui</h1>
        <p className="max-w-xs text-body">Escolha o que quiser no cardápio e a gente monta o resto com você.</p>
        <Link href="/cardapio/espresso-bar" className="botao botao-vinho">Ver cardápio</Link>
      </main>
    </>
  );
}
