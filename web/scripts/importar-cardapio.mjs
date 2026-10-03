// Uso único: lê ../cardapio-dados.md e escreve src/data/cardapio.ts.
// Depois de gerado, o cardapio.ts passa a ser a fonte editável; este script só serve para refazer do zero.
import { readFileSync, writeFileSync } from "node:fs";

const md = readFileSync(new URL("../../cardapio-dados.md", import.meta.url), "utf8").replace(/\r/g, "");
const linhas = md.split("\n");

const slugify = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " e ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const preco = (t) => {
  const m = t.match(/R\$\s*([\d.]+,\d{2})/);
  return m ? Number(m[1].replace(".", "").replace(",", ".")) : undefined;
};

const adicionaisPorTexto = [
  [/shot extra/i, "shot-extra"],
  [/sem lactose/i, "leite-sem-lactose"],
  [/aveia/i, "leite-aveia"],
  [/calda/i, "calda"],
  [/chantilly/i, "chantilly"],
  [/marshmallow/i, "marshmallows"],
  [/canela ou chocolate/i, "canela-ou-chocolate"],
];

function personalizar(txt) {
  if (!txt || txt === "—") return { adicionais: [], opcoes: undefined };
  const ids = new Set();
  let opcoes;
  for (const parte of txt.replace(/\.$/, "").split(";").map((p) => p.trim())) {
    let achou = false;
    for (const [re, id] of adicionaisPorTexto) if (re.test(parte)) { ids.add(id); achou = true; }
    if (!achou && /^leite$/i.test(parte)) { ids.add("leite-sem-lactose"); ids.add("leite-aveia"); achou = true; }
    if (!achou && /gelo/i.test(parte)) { opcoes = parte; achou = true; }
    if (!achou) throw new Error("Personalize não reconhecido: " + parte);
  }
  return { adicionais: [...ids], opcoes };
}

const semCombo = new Set(["cha", "pao-na-chapa-com-requeijao", "metodo-v60", "prensa-francesa"]);
const categorias = [];
const itens = [];
let cat = null, sub = null, item = null, wafGrupo = null;

const lista = (s) => s.split(/,| e /).map((x) => x.trim()).filter((x) => x && x !== "—");

function fecha() {
  if (!item) return;
  itens.push(item);
  item = null;
}

for (let i = 0; i < linhas.length; i++) {
  const l = linhas[i].trimEnd();
  const mCat = l.match(/^## (\d+)\. (.+)$/);
  if (mCat) {
    fecha();
    let nome = mCat[2];
    const favorito = /FAVORITO DA CASA/.test(nome);
    nome = nome.replace(/\s*·\s*FAVORITO DA CASA/, "").trim();
    const n = Number(mCat[1]);
    cat = { slug: slugify(nome), nome, tipo: n <= 7 ? "bebida" : "comida", favorito, contem: [] };
    categorias.push(cat);
    sub = null; wafGrupo = null;
    continue;
  }
  if (!cat) continue;
  if (l.startsWith("---") && itens.length) { fecha(); cat = null; continue; }

  // subtítulo da categoria
  const mSub = l.match(/^\*(?:Subtítulo: )?"(.+?)"\.?\*|^\*(.+?)\*$/);
  if (mSub && !item && !cat.subtitulo && !l.startsWith("**")) {
    const t = (mSub[1] ?? mSub[2]).replace(/^Subtítulo: /, "");
    if (/^\d+ ml$/.test(t)) cat.tamanhoPadrao = t; else cat.subtitulo = t.replace(/"/g, "");
    continue;
  }
  const mContem = l.match(/^Todos contêm: (.+)\.$/);
  if (mContem) { cat.contem = lista(mContem[1]); continue; }
  if (/^\(o pão é uma opção obrigatória/.test(l)) continue;

  // Waffles: grupo de massa
  const mWaf = l.match(/^\*\*(Waffle [^*]+)\*\*((?!.*R\$).*)$/);
  if (mWaf && cat.slug === "waffles") {
    fecha();
    wafGrupo = { nome: mWaf[1].trim(), novo: /NOVO/.test(mWaf[2]), tagline: (mWaf[2].match(/\*"(.+?)"\*/) ?? [])[1], contem: [] };
    continue;
  }
  if (wafGrupo && l.startsWith("Massa:")) {
    wafGrupo.massa = l.match(/Massa: (.+?)\. Contém:/)[1];
    wafGrupo.contem = lista(l.match(/Contém: (.+?)\.$/)[1]);
    continue;
  }
  const mWafItem = l.match(/^\*\*(.+?)\*\* · R\$ ([\d,]+)(?: \(sugerido\))? — (.+)$/);
  if (mWafItem && wafGrupo) {
    let desc = mWafItem[3];
    const contem = [...wafGrupo.contem];
    if (/\(contém avelã\)/.test(desc)) { contem.push("avelã"); desc = desc.replace(/\s*\(contém avelã\)/, ""); }
    const nota = (desc.match(/\*Nota especial: "(.+?)"\*/) ?? [])[1];
    desc = desc.replace(/\s*\*Nota especial:.+\*/, "").trim();
    item = {
      nome: mWafItem[1], grupo: wafGrupo.nome, categoria: cat.slug, preco: Number(mWafItem[2].replace(",", ".")),
      curta: desc, contem, selo: wafGrupo.novo ? "novo" : cat.favorito ? "favorito" : undefined, nota,
      oQueVai: wafGrupo.massa.split(/,| e /).map((x) => x.trim()).filter(Boolean).map((x, k) => (k === 0 ? x.replace(/^./, (c) => c.toUpperCase()) : x)),
    };
    fecha();
    continue;
  }

  // subgrupo (Salgados / Doces)
  const mSubg = l.match(/^\*\*([^*·]+)\*\*$/);
  if (mSubg) { fecha(); sub = mSubg[1].trim(); continue; }

  // item
  const mItem = l.match(/^\*\*(.+?)\*\* · (.+)$/);
  if (mItem && !wafGrupo) {
    fecha();
    const resto = mItem[2];
    const partes = resto.split(" · ");
    let tamanho, selo;
    for (const p of partes) {
      if (/^\d+\s?ml$/.test(p.trim())) tamanho = p.trim();
      else if (/NOVO/.test(p)) selo = "novo";
    }
    const nome = mItem[1];
    item = {
      nome, categoria: cat.slug, subcategoria: sub ?? undefined, tamanho: tamanho ?? cat.tamanhoPadrao,
      preco: preco(resto), selo: selo ?? (cat.favorito ? "favorito" : undefined), contem: [...cat.contem],
    };
    if (cat.slug === "sanduiches") item.escolha = { titulo: "Pão", opcoes: ["Pão de forma", "Baguete"] };
    continue;
  }

  // campos do item
  const mCampo = l.match(/^- (Curta|O que vai|Como é feito|Sabor|Personalize|Contém também|Contém|Entra no sorteio dos combos): ?(.*)$/);
  if (mCampo && item) {
    const [, k, v] = mCampo;
    if (k === "Curta") item.curta = v;
    else if (k === "O que vai") item.oQueVai = v.replace(/\.$/, "").split(" · ").map((x) => x.trim());
    else if (k === "Como é feito") item.comoEFeito = v;
    else if (k === "Sabor") item.sabor = v;
    else if (k === "Personalize") Object.assign(item, personalizar(v));
    else if (k === "Contém") item.contem = lista(v.replace(/\.$/, ""));
    else if (k === "Contém também") item.contem = [...new Set([...item.contem, ...lista(v.replace(/\.$/, "").replace(/\s*\(oleaginosa\)/, ""))])];
    continue;
  }
}
fecha();

// slugs únicos
const usados = new Map();
for (const it of itens) {
  let s = slugify(it.nome);
  if (it.grupo) s = slugify(it.grupo) + "-" + s;
  usados.set(s, (usados.get(s) ?? 0) + 1);
  it.slug = s;
}
for (const it of itens) {
  if (usados.get(it.slug) > 1) it.slug = (it.subcategoria ? slugify(it.subcategoria) : it.categoria) + "-" + it.slug;
  it.combo = !semCombo.has(it.slug);
  it.disponivel = true;
}
const finalUsados = new Set();
for (const it of itens) {
  if (finalUsados.has(it.slug)) throw new Error("slug duplicado: " + it.slug);
  finalUsados.add(it.slug);
}

const ordemCampos = ["slug", "categoria", "subcategoria", "grupo", "nome", "tamanho", "preco", "selo", "curta", "oQueVai", "comoEFeito", "sabor", "adicionais", "opcoes", "escolha", "contem", "nota", "combo", "disponivel"];
const limpa = (o) => Object.fromEntries(ordemCampos.filter((k) => o[k] !== undefined && !(Array.isArray(o[k]) && o[k].length === 0 && k !== "contem")).map((k) => [k, o[k]]));

const saida = `// CARDÁPIO — edite aqui: preços, descrições, selos, disponibilidade.
// Gerado a partir de cardapio-dados.md na migração para o GitHub Pages; agora este arquivo é a fonte.
// Campos opcionais por item: escalas (corpo, doçura, intensidade, acidez, docesalgado: 1 a 5) e notas (chips de sabor).

export type Selo = "novo" | "favorito";

export type Categoria = {
  slug: string;
  nome: string;
  tipo: "bebida" | "comida";
  subtitulo?: string;
};

export type Adicional = { id: string; nome: string; preco: number };

export type Item = {
  slug: string;
  categoria: string;
  subcategoria?: string;
  grupo?: string;
  nome: string;
  tamanho?: string;
  preco: number;
  selo?: Selo;
  curta: string;
  oQueVai?: string[];
  comoEFeito?: string;
  sabor?: string;
  /** ids de \`adicionais\` que o cliente pode escolher em "Personalize" */
  adicionais?: string[];
  /** opção sem preço, só informativa (ex.: com ou sem gelo) */
  opcoes?: string;
  /** escolha obrigatória no pedido (ex.: tipo de pão) */
  escolha?: { titulo: string; opcoes: string[] };
  contem: string[];
  nota?: string;
  escalas?: { corpo?: number; docura?: number; intensidade?: number; acidez?: number; docesalgado?: number };
  notas?: string[];
  /** pode entrar no sorteio dos combos do dia */
  combo: boolean;
  /** false = aparece esmaecido com "Esgotado hoje" */
  disponivel: boolean;
};

export const avisoAlergenos = "Podemos ter traços de leite, glúten e oleaginosas em todos os preparos.";

export const adicionais: Adicional[] = [
  { id: "shot-extra", nome: "Shot extra de espresso", preco: 4 },
  { id: "leite-sem-lactose", nome: "Leite sem lactose", preco: 3 },
  { id: "leite-aveia", nome: "Leite vegetal de aveia", preco: 5 },
  { id: "calda", nome: "Calda de caramelo, baunilha ou avelã", preco: 2 },
  { id: "chantilly", nome: "Chantilly", preco: 2 },
  { id: "marshmallows", nome: "Marshmallows", preco: 2 },
  { id: "canela-ou-chocolate", nome: "Canela ou chocolate em pó por cima", preco: 0 },
];

export const categorias: Categoria[] = ${JSON.stringify(categorias.map((c) => ({ slug: c.slug, nome: c.nome, tipo: c.tipo, subtitulo: c.subtitulo })), null, 2)};

export const itens: Item[] = ${JSON.stringify(itens.map(limpa), null, 2)};
`;
// deixa listas curtas numa linha só e tira as aspas das chaves, para ficar fácil de editar à mão
const bonito = (t) =>
  t
    .replace(/\[\s*((?:"(?:[^"\\\n]|\\.)*",?\s*)+)\]/g, (m, g) => "[" + g.trim().replace(/,\s+/g, ", ") + "]")
    .replace(/^(\s+)"(\w+)":/gm, "$1$2:");
writeFileSync(new URL("../src/data/cardapio.ts", import.meta.url), bonito(saida));
console.log("categorias:", categorias.length, "itens:", itens.length);
for (const c of categorias) console.log(" ", c.nome, itens.filter((i) => i.categoria === c.slug).length);
