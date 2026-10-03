import Link from "next/link";
import { Header } from "@/components/Header";
import { Caneca } from "@/components/Ilustracoes";

export default function NotFound() {
  return (
    <>
      <div className="listras" aria-hidden="true" />
      <Header />
      <main className="miolo flex min-h-[60svh] flex-col items-center justify-center gap-4 text-center">
        {/* caneca sem vapor: o café esfriou */}
        <Caneca className="w-20 text-marrom-terra [&_path:last-child]:hidden" />
        <p className="rotulo text-vinho">Erro 404</p>
        <h1 className="text-h1">Esse café esfriou…</h1>
        <p className="max-w-xs text-body">A página que você procurou não está aqui. Volte ao cardápio que a gente esquenta outro.</p>
        <Link href="/cardapio/espresso-bar" className="botao botao-vinho">Voltar ao cardápio</Link>
      </main>
    </>
  );
}
