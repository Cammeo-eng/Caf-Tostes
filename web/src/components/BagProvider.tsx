"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Bag = {
  quantidade: number;
  total: number;
  /** sobe a cada item adicionado; serve para reiniciar as animações de feedback */
  pulso: number;
  adicionar: (preco: number) => void;
};

const BagContext = createContext<Bag | null>(null);

// Amostra: só conta itens e soma. A sacola completa (localStorage, adicionais) é a Fase 4.
export function BagProvider({ children }: { children: ReactNode }) {
  const [quantidade, setQuantidade] = useState(0);
  const [total, setTotal] = useState(0);
  const [pulso, setPulso] = useState(0);
  const adicionar = (preco: number) => {
    setQuantidade((q) => q + 1);
    setTotal((t) => t + preco);
    setPulso((p) => p + 1);
  };
  return <BagContext.Provider value={{ quantidade, total, pulso, adicionar }}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag fora do BagProvider");
  return ctx;
}
