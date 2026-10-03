// Combos do dia: 2 combos (1 bebida + 1 comida), sorteados pela data, iguais para todos os clientes.
// Funciona no navegador e nos testes; não depende de servidor. Valores em centavos para o desconto sair exato.
import type { Item } from "../data/cardapio.ts";

export type TipoDaCategoria = Record<string, "bebida" | "comida">;
export type CombosFixos = Record<string, [string, string][]>;

export type Combo = {
  bebida: Item;
  comida: Item;
  /** soma dos preços originais */
  cheio: number;
  /** com 10% de desconto, sem arredondamento */
  final: number;
  economiza: number;
};

/** A primeira data do sorteio. Antes dela o histórico é vazio. */
export const INICIO_DO_SORTEIO = "2026-01-01";
export const DIAS_SEM_REPETIR = 3;
export const COMBOS_POR_DIA = 2;

const reais = (centavos: number) => centavos / 100;
const emCentavos = (v: number) => Math.round(v * 100);

export function montarCombo(bebida: Item, comida: Item): Combo {
  const cheio = emCentavos(bebida.preco) + emCentavos(comida.preco);
  const final = (cheio * 90) / 100;
  return { bebida, comida, cheio: reais(cheio), final: reais(final), economiza: reais(cheio - final) };
}

// gerador pseudoaleatório determinístico: a mesma data sempre dá a mesma sequência
function semente(texto: string) {
  let h = 1779033703 ^ texto.length;
  for (let i = 0; i < texto.length; i++) {
    h = Math.imul(h ^ texto.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

function gerador(data: string) {
  let a = semente(data);
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function embaralhar<T>(lista: T[], rand: () => number) {
  const r = [...lista];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

function somaDias(dataISO: string, n: number) {
  const d = new Date(`${dataISO}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Pares [bebida, comida] de um dia, em slugs. */
function sortearDia(
  data: string,
  itens: Item[],
  tipo: TipoDaCategoria,
  recentes: string[][],
): [string, string][] {
  const rand = gerador(data);
  const candidatos = itens.filter((i) => i.combo && i.disponivel);
  const bebidas = candidatos.filter((i) => tipo[i.categoria] === "bebida").map((i) => i.slug);
  const comidas = candidatos.filter((i) => tipo[i.categoria] === "comida").map((i) => i.slug);

  // evita o que apareceu nos últimos dias; se faltar item, vai relaxando a regra (nunca trava)
  for (let dias = Math.min(DIAS_SEM_REPETIR, recentes.length); dias >= 0; dias--) {
    const vetados = new Set(recentes.slice(recentes.length - dias).flat());
    const b = embaralhar(bebidas.filter((s) => !vetados.has(s)), rand);
    const c = embaralhar(comidas.filter((s) => !vetados.has(s)), rand);
    if (b.length >= COMBOS_POR_DIA && c.length >= COMBOS_POR_DIA) {
      return Array.from({ length: COMBOS_POR_DIA }, (_, k) => [b[k], c[k]] as [string, string]);
    }
  }
  return [];
}

export function combosDoDia(
  data: string,
  itens: Item[],
  tipo: TipoDaCategoria,
  fixos: CombosFixos = {},
): Combo[] {
  const porSlug = new Map(itens.map((i) => [i.slug, i]));
  // o sorteio de cada dia depende dos 3 anteriores, então refaz o histórico desde o início (rápido)
  const historico: string[][] = [];
  let pares: [string, string][] = [];
  for (let d = INICIO_DO_SORTEIO; d <= data; d = somaDias(d, 1)) {
    const fixo = fixos[d];
    pares = fixo && fixo.length > 0 ? fixo : sortearDia(d, itens, tipo, historico);
    historico.push(pares.flat());
    if (historico.length > DIAS_SEM_REPETIR) historico.shift();
  }
  return pares.flatMap(([b, c]) => {
    const bebida = porSlug.get(b);
    const comida = porSlug.get(c);
    return bebida && comida ? [montarCombo(bebida, comida)] : [];
  });
}
