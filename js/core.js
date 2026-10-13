/* TOSTES café — núcleo: formatação, dados, regras de item, tempo.
   Tudo fica no objeto global T. Não há dependências externas. */
"use strict";

const T = {};

/* ---------- formatação ---------- */
const _brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
T.money = (v) => _brl.format(v);
T.moneyWA = (v) => _brl.format(v).replace(/ /g, " ");   // espaço normal para o WhatsApp
T.r2 = (v) => Math.round((v + Number.EPSILON) * 100) / 100;
T.esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- sessionStorage com proteção ---------- */
T.store = {
  get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sem storage: segue sem salvar */ } }
};

T.reduzMovimento = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- dados ---------- */
T.itens = {};
MENU.forEach((i) => { T.itens[i.id] = i; });
T.cats = {};
CATEGORIAS.forEach((c) => { T.cats[c.id] = c; });
T.item = (id) => T.itens[id];
T.nome = (i) => i.nomeCompleto || i.nome;
T.pedivel = (i) => i.pedido !== false && i.tamanhos.length > 0;

/* ---------- data e hora em America/Sao_Paulo ---------- */
const DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
const DIAS_NOME = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
T.DIAS = DIAS;
T.DIAS_NOME = DIAS_NOME;

T.agoraSP = (data) => {
  const f = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false, weekday: "short"
  });
  const p = {};
  f.formatToParts(data || new Date()).forEach((x) => { p[x.type] = x.value; });
  const wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday];
  return { y: +p.year, m: +p.month, d: +p.day, wd, min: (+p.hour % 24) * 60 + +p.minute };
};
T.chaveData = (n) => {                       // "2026-10-12", com deslocamento de n dias
  const a = T.agoraSP();
  const dt = new Date(Date.UTC(a.y, a.m - 1, a.d + (n || 0)));
  return dt.toISOString().slice(0, 10);
};
T.diaSemanaDe = (n) => (T.agoraSP().wd + (n || 0)) % 7;

const paraMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
T.hora = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`; };

T.statusLoja = () => {
  const a = T.agoraSP();
  const hoje = CONFIG.horarios[DIAS[a.wd]];
  if (hoje && a.min >= paraMin(hoje[0]) && a.min < paraMin(hoje[1])) return { aberto: true, texto: "Aberto agora" };
  for (let n = 0; n < 8; n++) {
    const dia = (a.wd + n) % 7;
    const h = CONFIG.horarios[DIAS[dia]];
    if (!h) continue;
    if (n === 0 && a.min >= paraMin(h[0])) continue;       // hoje já passou do horário de abrir
    const quando = n === 0 ? "hoje" : n === 1 ? "amanhã" : DIAS_NOME[dia];
    return { aberto: false, texto: `Fechado · abre ${quando} às ${T.hora(h[0])}` };
  }
  return { aberto: false, texto: "Fechado" };
};

/* Agrupa dias seguidos com o mesmo horário: "Segunda a sexta, 9h às 19h30" */
T.horariosTexto = () => {
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  const grupos = [];
  ordem.forEach((d) => {
    const h = CONFIG.horarios[DIAS[d]];
    const chave = h ? h.join("-") : "fechado";
    const ult = grupos[grupos.length - 1];
    if (ult && ult.chave === chave) ult.dias.push(d); else grupos.push({ chave, h, dias: [d] });
  });
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  return grupos.map((g) => {
    const nomes = g.dias.length > 1 ? `${cap(DIAS_NOME[g.dias[0]])} a ${DIAS_NOME[g.dias[g.dias.length - 1]]}` : cap(DIAS_NOME[g.dias[0]]);
    return { dias: nomes, horas: g.h ? `${T.hora(g.h[0])} às ${T.hora(g.h[1])}` : "fechado" };
  });
};

/* ---------- regras de item ---------- */
T.opcao = (id) => OPCOES[id];

T.padroes = (item) => {                       // seleção padrão: leite integral, pão de forma...
  const sel = {};
  item.opcoes.forEach((g) => {
    const grupo = OPCOES[g];
    sel[g] = grupo.tipo === "unica" ? grupo.itens.filter((o) => o.padrao).map((o) => o.id) : [];
  });
  return sel;
};

T.minimo = (g) => (g.tipo === "multipla" ? (g.min != null ? g.min : g.obrigatoria ? 1 : 0) : g.obrigatoria ? 1 : 0);
T.maximo = (g) => (g.tipo === "multipla" ? (g.max != null ? g.max : Infinity) : 1);

T.faltando = (item, sel) => {                 // nomes dos grupos obrigatórios não preenchidos
  const f = [];
  item.opcoes.forEach((g) => {
    const grupo = OPCOES[g];
    if ((sel[g] || []).length < T.minimo(grupo)) f.push(grupo.titulo.replace(/\s*\(.*\)/, ""));
  });
  return f;
};

T.adicionaDireto = (item) => T.pedivel(item) && item.tamanhos.length === 1 && T.faltando(item, T.padroes(item)).length === 0;

T.precoUnit = (item, tam, sel) => {
  let v = item.tamanhos[tam].preco;
  item.opcoes.forEach((g) => {
    (sel[g] || []).forEach((id) => {
      const o = OPCOES[g].itens.find((x) => x.id === id);
      if (o) v += o.valor;
    });
  });
  return T.r2(v);
};

T.menorPreco = (item) => Math.min(...item.tamanhos.map((t) => t.preco));

// Tamanho recomendado (CONFIG.tamanhoRecomendado, "M"); sem ele, o primeiro da lista
T.tamRec = (item) => { const k = item.tamanhos.findIndex((t) => t.rotulo === CONFIG.tamanhoRecomendado); return k >= 0 ? k : 0; };
T.temRec = (item) => item.tamanhos.length > 1 && item.tamanhos.some((t) => t.rotulo === CONFIG.tamanhoRecomendado);

// Frase curta do que falta escolher (botão de adicionar desabilitado)
T.faltaTexto = (item, sel) => {
  const f = [];
  item.opcoes.forEach((g) => {
    const grupo = OPCOES[g];
    if ((sel[g] || []).length >= T.minimo(grupo)) return;
    if (g === "complementos-cappuccino") f.push("Escolha pelo menos 1 complemento");
    else f.push("Falta escolher: " + grupo.titulo.replace(/\s*\(.*\)/, ""));
  });
  return f;
};

// Opções escolhidas, na ordem dos grupos e, dentro de cada grupo, na ordem em que a pessoa tocou.
// semPadrao = true omite as opções padrão (usado nos combos, que sempre levam o padrão).
T.textoOpcoes = (item, sel, semPadrao) => {
  const out = [];
  item.opcoes.forEach((g) => {
    const grupo = OPCOES[g];
    (sel[g] || []).forEach((id) => {
      const o = grupo.itens.find((x) => x.id === id);
      if (o && !(semPadrao && grupo.tipo === "unica" && o.padrao)) out.push(o.nome);
    });
  });
  return out;
};

T.rotuloTam = (item, tam) => (item.tamanhos.length > 1 ? item.tamanhos[tam].rotulo : "");
T.nomeComTam = (item, tam) => { const r = T.rotuloTam(item, tam); return r ? `${T.nome(item)} (${r})` : T.nome(item); };

/* ---------- imagens com placeholder ---------- */
T.ilus = (nome, classe) => `<img class="${classe || "ilus"}" src="assets/ilustracoes/${nome}.svg" alt="" width="120" height="120">`;
T.icone = (caminho, classe) => `<img class="${classe || "ilus"}" src="${T.esc(caminho)}" alt="" width="120" height="120">`;
T.foto = (src, alt, grupo, w, h, classe) =>
  `<img class="${classe || "foto-img"}" src="${T.esc(src)}" alt="${T.esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async" data-ph="${grupo === "comidas" ? "croissant" : "xicara"}">`;

// Foto que não carrega vira o placeholder do site (nunca ícone quebrado). O evento error não borbulha, por isso captura.
document.addEventListener("error", (e) => {
  const el = e.target;
  if (!el || el.tagName !== "IMG" || !(el.dataset.ph || el.dataset.phSrc)) return;
  if (el.dataset.phSrc) {                          // foto da aula: volta para o ícone da aula
    const ic = document.createElement("img");
    ic.className = "bolinha-ilus";
    ic.src = el.dataset.phSrc; ic.alt = ""; ic.width = 120; ic.height = 120;
    el.replaceWith(ic);
    return;
  }
  const ph = document.createElement("span");
  ph.className = "ph";
  ph.setAttribute("role", "img");
  ph.setAttribute("aria-label", el.alt || "Sem foto");
  ph.innerHTML = `<img src="assets/ilustracoes/${el.dataset.ph}.svg" alt="" width="120" height="120">`;
  el.replaceWith(ph);
}, true);

/* ---------- avisos ---------- */
T.toast = (msg, acao) => {
  const el = document.getElementById("toast");
  el.innerHTML = `<span>${T.esc(msg)}</span>` + (acao ? `<button type="button" data-act="${acao.act}">${T.esc(acao.rotulo)}</button>` : "");
  el.classList.add("on");
  clearTimeout(T._toastT);
  T._toastT = setTimeout(() => el.classList.remove("on"), 3200);
};

/* ---------- checagem dos dados (console) ---------- */
T.checarDados = () => {
  const erros = [];
  MENU.forEach((i) => {
    if (!T.cats[i.categoria]) erros.push(`Item "${i.id}" aponta para a categoria inexistente "${i.categoria}".`);
    i.opcoes.forEach((o) => { if (!OPCOES[o]) erros.push(`Item "${i.id}" aponta para a opção inexistente "${o}".`); });
    if (T.cats[i.categoria] && T.cats[i.categoria].grupo !== i.grupo) erros.push(`Item "${i.id}": grupo "${i.grupo}" difere do grupo da categoria.`);
  });
  const ids = new Set();
  MENU.forEach((i) => { if (ids.has(i.id)) erros.push(`Id repetido: "${i.id}".`); ids.add(i.id); });
  CONFIG.favorito.itens.forEach((f) => {
    const it = T.itens[f.id];
    if (!it) erros.push(`Favorito aponta para o item inexistente "${f.id}".`);
    else if (f.tamanho && !it.tamanhos.some((t) => t.rotulo === f.tamanho)) erros.push(`Favorito: "${f.id}" não tem o tamanho "${f.tamanho}".`);
  });
  const trilhas = new Set(AULAS_TRILHAS.map((t) => t.id));
  AULAS.forEach((a) => {
    if (a.item && !T.itens[a.item]) erros.push(`Aula "${a.id}" aponta para o item inexistente "${a.item}".`);
    if (!trilhas.has(a.trilha)) erros.push(`Aula "${a.id}" aponta para a trilha inexistente "${a.trilha}".`);
  });
  if (erros.length) { console.warn("[TOSTES] Problemas nos dados:\n- " + erros.join("\n- ")); }
  else console.info(`[TOSTES] Dados ok: ${MENU.length} itens, ${CATEGORIAS.length} categorias.`);
  return erros;
};
