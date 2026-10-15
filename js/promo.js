/* TOSTES café — Promoção do dia e O pedido favorito.
   O sorteio usa a data (America/Sao_Paulo) como semente. Nunca usa Math.random(). */
"use strict";

function _xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}
function _mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function _embaralha(lista, rnd) {
  const a = lista.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* Um "pedaço" de combo: item, tamanho recomendado (ou o indicado), opções padrão */
T.parte = (id, tamRotulo) => {
  const item = T.item(id);
  let tam = T.tamRec(item);                       // tamanho recomendado (M); sem ele, o primeiro
  if (tamRotulo) { const k = item.tamanhos.findIndex((t) => t.rotulo === tamRotulo); if (k >= 0) tam = k; }
  const sel = T.padroes(item);
  return { id, tam, sel, preco: T.precoUnit(item, tam, sel) };
};
T.nomeParte = (p, lang) => T.nomeComTam(T.item(p.id), p.tam, lang);

T.combosDoDia = (chave) => {
  const cfg = CONFIG.promocao;
  const elegivel = (i) => i.promocaoElegivel && T.pedivel(i) && T.faltando(i, T.padroes(i)).length === 0;
  const bebidas = MENU.filter((i) => i.grupo === "bebidas" && elegivel(i));
  const comidas = MENU.filter((i) => i.grupo === "comidas" && elegivel(i));
  const rnd = _mulberry32(_xmur3(chave || T.chaveData(0))());
  const b = _embaralha(bebidas, rnd);
  const c = _embaralha(comidas, rnd);
  const n = Math.min(cfg.combos, b.length, c.length);
  const out = [];
  for (let k = 0; k < n; k++) {
    const partes = [T.parte(b[k].id), T.parte(c[k].id)];
    const original = T.r2(partes[0].preco + partes[1].preco);
    out.push({ prefixo: "Combo do dia", partes, original, preco: T.r2(original * (1 - cfg.desconto)) });
  }
  return out;
};

T.favorito = () => {
  const f = CONFIG.favorito;
  const partes = f.itens.map((x) => T.parte(x.id, x.tamanho));
  const soma = T.r2(partes.reduce((s, p) => s + p.preco, 0));
  const preco = f.preco == null ? soma : f.preco;
  return { prefixo: "O pedido favorito", partes, original: Math.max(soma, preco), preco };
};

/* Console: previaCombos(7) lista os combos dos próximos 7 dias */
window.previaCombos = function (dias) {
  const n = dias == null ? 7 : dias;
  const linhas = [];
  for (let d = 0; d < n; d++) {
    const chave = T.chaveData(d);
    T.combosDoDia(chave).forEach((c, k) => {
      linhas.push({ data: chave, combo: k + 1, bebida: T.nomeParte(c.partes[0]), comida: T.nomeParte(c.partes[1]), original: c.original, comDesconto: c.preco });
    });
  }
  console.table(linhas);
  return linhas;
};
