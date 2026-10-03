"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brl } from "@/lib/formato";
import { useBag } from "./BagProvider";

// Faixa fixa acima da barra inferior (celular) com o resumo do pedido.
export function BagBar() {
  const { quantidade, total } = useBag();
  const path = usePathname();
  if (quantidade === 0 || path.startsWith("/pedido")) return null;
  return (
    <div className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom))] z-20 animate-sobe px-5 pb-2 md:bottom-0 md:pb-6">
      <Link
        href="/pedido"
        className="mx-auto flex min-h-12 w-full max-w-xl items-center justify-between rounded-full bg-vinho px-6 text-small font-semibold text-creme shadow-[0_1px_4px_rgba(59,42,30,0.14)]"
      >
        <span className="[font-variant-numeric:tabular-nums]">
          {quantidade} {quantidade === 1 ? "item" : "itens"} · {brl(total)}
        </span>
        <span>Ver pedido →</span>
      </Link>
    </div>
  );
}
