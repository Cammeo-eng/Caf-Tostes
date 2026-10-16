/* TOSTES café — idiomas (português, español, English).
   O português é o original (menu.js, quiz.js, aulas.js, config.js). Os arquivos de data/i18n/ só trazem os textos
   traduzidos, pelos mesmos ids. Sem tradução, o site mostra o português. */
"use strict";

T.IDIOMAS = [
  { id: "pt", curto: "PT", nome: "Português", html: "pt-BR", cliente: "Português" },
  { id: "es", curto: "ES", nome: "Español", html: "es", cliente: "Español" },
  { id: "en", curto: "EN", nome: "English", html: "en", cliente: "English" }
];
T.lang = "pt";

const _I = (l) => (window.I18N && window.I18N[l]) || {};

/* Texto da interface: t("chave", { n: 3 }). Se faltar no idioma, usa o português; se faltar lá também, devolve a chave. */
T.t = (chave, vars, lang) => {
  const l = lang || T.lang;
  let s = (_I(l).ui || {})[chave];
  if (s == null) s = (_I("pt").ui || {})[chave];
  if (s == null) return chave;
  if (typeof s === "string" && vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
  return s;
};

/* Textos do config.js: T.cfg("fidelidade.titulo", CONFIG.fidelidade.titulo) */
T.cfg = (chave, original) => {
  if (T.lang === "pt") return original;
  const v = (_I(T.lang).config || {})[chave];
  return v != null ? v : original;
};

/* Categoria: { nome, nota, sobre } */
T.catTxt = (c) => {
  const tr = T.lang === "pt" ? null : (_I(T.lang).categorias || {})[c.id];
  return { nome: (tr && tr.nome) || c.nome, nota: tr && tr.nota != null ? tr.nota : c.nota, sobre: tr && tr.sobre ? tr.sobre : c.sobre || "" };
};

/* Item: nome, nomeCompleto, descricaoCurta, ingredientes (no idioma pedido; padrão: idioma atual) */
T.itemTxt = (i, lang) => {
  const l = lang || T.lang;
  const tr = l === "pt" ? null : (_I(l).itens || {})[i.id];
  const nome = (tr && tr.nome) || i.nome;
  return {
    nome,
    nomeCompleto: i.nomeCompleto ? (tr && tr.nomeCompleto) || i.nomeCompleto : nome,
    descricaoCurta: (tr && tr.descricaoCurta) || i.descricaoCurta,
    ingredientes: tr && Array.isArray(tr.ingredientes) && tr.ingredientes.length === i.ingredientes.length ? tr.ingredientes : i.ingredientes
  };
};

/* Opções (leite, extras, ...): título do grupo e nome de cada opção */
T.opTitulo = (g, lang) => {
  const l = lang || T.lang;
  const tr = l === "pt" ? null : (_I(l).opcoes || {})[g];
  return (tr && tr.titulo) || OPCOES[g].titulo;
};
T.opNome = (g, id, lang) => {
  const l = lang || T.lang;
  const tr = l === "pt" ? null : ((_I(l).opcoes || {})[g] || {}).itens;
  const o = OPCOES[g].itens.find((x) => x.id === id);
  return (tr && tr[id]) || (o ? o.nome : id);
};

/* Rótulo do tamanho (P/M/G/Gelado/Único). Na mensagem do WhatsApp usa-se sempre o original em português. */
T.rot = (rotulo, lang) => {
  const l = lang || T.lang;
  const tr = l === "pt" ? null : (_I(l).tamanhos || {})[rotulo];
  return tr || rotulo;
};

/* Aulas (fase 2): I18N[idioma].aulas { trilhas, aulas }. Sem tradução, o português. */
T.aulaTrilhaTxt = (t) => {
  const tr = T.lang === "pt" ? null : (((_I(T.lang).aulas || {}).trilhas) || {})[t.id];
  return { nome: (tr && tr.nome) || t.nome, descricao: (tr && tr.descricao) || t.descricao };
};
T.aulaTxt = (a) => {
  const tr = T.lang === "pt" ? null : (((_I(T.lang).aulas || {}).aulas) || {})[a.id];
  return {
    titulo: (tr && tr.titulo) || a.titulo,
    leitura: (tr && tr.leitura) || a.leitura,
    slide: (i) => {
      const s = a.slides[i], ts = tr && tr.slides && tr.slides[i];
      if (!ts) return s;
      return Object.assign({}, s, { titulo: ts.titulo || s.titulo, texto: ts.texto || s.texto, destaque: ts.destaque || s.destaque });
    }
  };
};

/* Quiz: textos no idioma atual (as regras, os pesos e a ordem das respostas vêm sempre do quiz.js) */
T.qTxt = {
  _p: (p) => (T.lang === "pt" ? null : ((_I(T.lang).quiz || {}).perguntas || {})[p.id]),
  pergunta(p) { const t = this._p(p); return (t && t.pergunta) || p.pergunta; },
  apoio(p) { const t = this._p(p); return (t && t.apoio) || p.apoio; },
  resposta(p, k) { const t = this._p(p), r = t && t.respostas && t.respostas[k]; return (r && r.texto) || p.respostas[k].texto; },
  motivo(p, k) { const t = this._p(p), r = t && t.respostas && t.respostas[k]; return (r && r.motivo) || p.respostas[k].motivo; },
  textos(k) {
    if (T.lang !== "pt") { const v = ((_I(T.lang).quiz || {}).textos || {})[k]; if (v) return v; }
    return k === "porque" ? "Porque você" : k === "e" ? "e" : QUIZ_TEXTOS[k];
  },
  harmonizacao(idx) {                          // idx = posição em HARMONIZACAO; -1 = padrão
    const q = T.lang === "pt" ? {} : (_I(T.lang).quiz || {});
    if (idx < 0) return q.harmonizacaoPadrao || HARMONIZACAO_PADRAO.texto;
    return (q.harmonizacao || [])[idx] || HARMONIZACAO[idx].texto;
  }
};

/* ---------- idioma inicial: ?lang= → escolha salva → idioma do celular ---------- */
T.idiomaValido = (l) => T.IDIOMAS.some((x) => x.id === l);
T.detectaIdioma = () => {
  try { const q = new URLSearchParams(location.search).get("lang"); if (q && T.idiomaValido(q.toLowerCase())) return q.toLowerCase(); } catch (e) { /* sem URL */ }
  try { const s = localStorage.getItem("tostes-idioma"); if (s && T.idiomaValido(s)) return s; } catch (e) { /* sem storage */ }
  const cel = ((navigator.languages && navigator.languages[0]) || navigator.language || "").toLowerCase();
  if (cel.startsWith("es")) return "es";
  if (cel.startsWith("pt")) return "pt";
  return "en";                                      // qualquer outro idioma (inglês, coreano...) → inglês
};
T.lang = T.detectaIdioma();
document.documentElement.lang = T.IDIOMAS.find((x) => x.id === T.lang).html;

/* Troca de idioma na hora, sem recarregar (T.aplicaIdioma redesenha a tela; definido em app.js) */
T.setLang = (l) => {
  if (!T.idiomaValido(l) || l === T.lang) return;
  T.lang = l;
  document.documentElement.lang = T.IDIOMAS.find((x) => x.id === l).html;
  try { localStorage.setItem("tostes-idioma", l); } catch (e) { /* sem storage */ }
  if (T.aplicaIdioma) T.aplicaIdioma();
};

/* Console: i18nFaltando() lista o que falta traduzir em en e es */
window.i18nFaltando = function () {
  const out = {};
  const pt = _I("pt");
  ["en", "es"].forEach((l) => {
    const I = _I(l), f = [];
    Object.keys(pt.ui || {}).forEach((k) => { if (I.ui == null || I.ui[k] == null || I.ui[k] === "") f.push("ui." + k); });
    ["marquee", "fidelidade.gancho", "fidelidade.titulo", "fidelidade.texto", "fidelidade.rodape", "instagramConvite.titulo", "instagramConvite.texto", "instagramConvite.botao", "instagramConvite.aposPedido", "favorito.titulo"]
      .forEach((k) => { if (!(I.config || {})[k]) f.push("config." + k); });
    ["P", "M", "G", "Gelado", "Único"].forEach((r) => { if (!(I.tamanhos || {})[r]) f.push("tamanhos." + r); });
    CATEGORIAS.forEach((c) => {
      const tr = (I.categorias || {})[c.id];
      if (!tr || !tr.nome) f.push("categorias." + c.id + ".nome");
      if (c.nota && (!tr || !tr.nota)) f.push("categorias." + c.id + ".nota");
      if (c.sobre && (!tr || !tr.sobre)) f.push("categorias." + c.id + ".sobre");
    });
    Object.keys(OPCOES).forEach((g) => {
      const tr = (I.opcoes || {})[g];
      if (!tr || !tr.titulo) f.push("opcoes." + g + ".titulo");
      OPCOES[g].itens.forEach((o) => { if (!tr || !tr.itens || !tr.itens[o.id]) f.push("opcoes." + g + "." + o.id); });
    });
    MENU.forEach((i) => {
      const tr = (I.itens || {})[i.id];
      if (!tr) { f.push("itens." + i.id); return; }
      if (!tr.nome) f.push("itens." + i.id + ".nome");
      if (i.nomeCompleto && !tr.nomeCompleto) f.push("itens." + i.id + ".nomeCompleto");
      if (!tr.descricaoCurta) f.push("itens." + i.id + ".descricaoCurta");
      if (!Array.isArray(tr.ingredientes) || tr.ingredientes.length !== i.ingredientes.length) f.push("itens." + i.id + ".ingredientes");
    });
    const q = I.quiz || {};
    QUIZ_PERGUNTAS.forEach((p) => {
      const tr = (q.perguntas || {})[p.id];
      if (!tr || !tr.pergunta) f.push("quiz." + p.id + ".pergunta");
      if (!tr || !tr.apoio) f.push("quiz." + p.id + ".apoio");
      p.respostas.forEach((r, k) => {
        const tx = tr && tr.respostas && tr.respostas[k];
        if (!tx || !tx.texto) f.push("quiz." + p.id + ".respostas[" + k + "].texto");
        if (r.motivo && (!tx || !tx.motivo)) f.push("quiz." + p.id + ".respostas[" + k + "].motivo");
      });
    });
    Object.keys(QUIZ_TEXTOS).concat(["porque", "e"]).forEach((k) => { if (!(q.textos || {})[k]) f.push("quiz.textos." + k); });
    HARMONIZACAO.forEach((h, k) => { if (!(q.harmonizacao || [])[k]) f.push("quiz.harmonizacao[" + k + "]"); });
    if (!q.harmonizacaoPadrao) f.push("quiz.harmonizacaoPadrao");
    out[l] = f;
    const aulas = (I.aulas && I.aulas.aulas) || {};
    out[l + "_aulas_pendentes"] = AULAS.filter((a) => !aulas[a.id]).length + " de " + AULAS.length + " aulas sem tradução (fase 2)";
  });
  console.info("[TOSTES] i18nFaltando:", JSON.stringify(out, null, 1));
  return out;
};
