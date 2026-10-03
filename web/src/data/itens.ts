export type Selo = "novo" | "favorito";

export type Item = {
  slug: string;
  categoria: string;
  nome: string;
  tamanho?: string;
  preco: number;
  curta: string;
  selo?: Selo;
  disponivel: boolean;
};

// Tela de amostra: só o Espresso Bar. Os demais entram na Fase 2 (Supabase).
export const itens: Item[] = [
  { slug: "espresso", categoria: "espresso-bar", nome: "Espresso", tamanho: "30 ml", preco: 8, curta: "Café puro e intenso, extraído na hora com o grão da casa.", disponivel: true },
  { slug: "ristretto", categoria: "espresso-bar", nome: "Ristretto", tamanho: "20 ml", preco: 8, curta: "Extração mais curta: mais doce, concentrado e aromático.", selo: "novo", disponivel: true },
  { slug: "espresso-duplo", categoria: "espresso-bar", nome: "Espresso Duplo (Doppio)", tamanho: "60 ml", preco: 12, curta: "Duas doses de espresso para quem precisa de energia extra.", selo: "novo", disponivel: true },
  { slug: "americano", categoria: "espresso-bar", nome: "Americano", tamanho: "160 ml", preco: 8, curta: "Espresso alongado com água quente. Suave e encorpado.", disponivel: true },
  { slug: "macchiato", categoria: "espresso-bar", nome: "Macchiato", tamanho: "90 ml", preco: 10, curta: "Espresso \"manchado\" com um toque de espuma de leite.", disponivel: true },
  { slug: "cortado", categoria: "espresso-bar", nome: "Cortado", tamanho: "120 ml", preco: 10, curta: "Espresso com a mesma quantidade de leite vaporizado. Equilibrado.", selo: "novo", disponivel: true },
  { slug: "cappuccino", categoria: "espresso-bar", nome: "Cappuccino", tamanho: "200 ml", preco: 12, curta: "Espresso, leite vaporizado e uma camada generosa de espuma.", disponivel: true },
  { slug: "flat-white", categoria: "espresso-bar", nome: "Flat White", tamanho: "200 ml", preco: 12, curta: "Leite aveludado e pouca espuma: mais café, menos leite.", disponivel: true },
  { slug: "cafe-latte", categoria: "espresso-bar", nome: "Café Latte", tamanho: "250 ml", preco: 13, curta: "Espresso com bastante leite vaporizado. Cremoso e suave.", disponivel: true },
  { slug: "marroquino", categoria: "espresso-bar", nome: "Marroquino", tamanho: "200 ml", preco: 12, curta: "Chocolate, espresso e espuma de leite, em camadas, finalizado com cacau.", disponivel: true },
];

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
