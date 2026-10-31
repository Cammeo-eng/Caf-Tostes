/* TOSTES café — seções da página inicial. */
"use strict";

const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
T.acts = {};            // ações dos botões [data-act]; cada módulo registra as suas
T.v = {};

const E = T.esc;

/* ---------- topo ---------- */
T.v.topo = () => {
  const s = T.statusLoja();
  const el = $("#status");
  el.className = "status " + (s.aberto ? "on" : "off");
  el.innerHTML = `<i class="xic" aria-hidden="true"></i>${E(s.texto)}`;
  $("#marquee .marquee-trilho").innerHTML = `<span>${E(T.cfg("marquee", CONFIG.marquee))}</span>`.repeat(4);
  const m = $("#mesa-linha");
  if (T.cart.daUrl && T.cart.st.modo === "mesa") { m.hidden = false; m.textContent = T.t("mesa", { n: T.cart.st.mesa }); } else m.hidden = true;
  $(".btn-menu").setAttribute("aria-label", T.t("abrirMenu"));
};

/* ---------- seletor de idioma (topo e menu) ---------- */
T.v.seletorIdioma = (completo) => T.IDIOMAS.map((l) =>
  `<button type="button" class="idioma-btn" data-act="lang" data-l="${l.id}" lang="${l.id}" aria-pressed="${l.id === T.lang}" ${completo ? "" : `aria-label="${E(l.nome)}"`}><span>${E(completo ? l.nome : l.curto)}</span></button>`).join("");
T.v.idiomas = () => {
  const el = $("#idiomas");
  el.setAttribute("aria-label", T.t("idioma"));
  el.innerHTML = T.v.seletorIdioma(false);
};
T.acts.lang = (b) => T.setLang(b.dataset.l);

/* ---------- o pedido favorito ---------- */
T.v.favorito = () => {
  const f = CONFIG.favorito;
  const c = T.favorito();
  $("#favorito").innerHTML = `
    <article class="fav-card">
      <div class="fav-foto">
        ${T.foto(T.item(f.itens[0].id).foto, T.t("favoritoFotoAlt"), "bebidas", 480, 360, "fav-img fav-img-a", T.item(f.itens[0].id))}
        <img class="fav-img fav-img-b" src="${E(T.item(f.itens[1].id).foto)}" alt="" width="480" height="360" loading="lazy" decoding="async">
      </div>
      <div class="fav-corpo">
        ${T.ilus("stickers/xicaras", "grav grav-fav")}
        <h2 id="fav-titulo" class="titulo-script">${E(T.cfg("favorito.titulo", f.titulo))}</h2>
        <p class="fav-nome">${E(f.nome)}</p>
        <div class="fav-rodape">
          <p class="preco-bloco">${c.original > c.preco ? `<s>${T.money(c.original)}</s>` : ""}<span class="preco preco-gd">${T.money(c.preco)}</span></p>
          <button type="button" class="btn btn-vinho" data-act="fav-add">${E(T.t("adicionarAoPedido"))}</button>
        </div>
      </div>
    </article>`;
};
/* Foto do favorito: bebida à esquerda, comida à direita (corte diagonal). Sem a foto da comida, só a bebida ocupa o quadro. */
T.v.favoritoFoto = () => {
  const box = $("#favorito .fav-foto"), b = box && $(".fav-img-b", box);
  if (!b) return;
  const sem = () => { b.remove(); box.classList.add("so-bebida"); };
  b.addEventListener("error", sem, { once: true });
  if (b.complete && b.naturalWidth === 0 && b.src) sem();
};
T.acts["fav-add"] = () => {
  T.cart.addCombo(T.favorito());
  T.toast(T.t("adicionadoNome", { nome: T.t("pedidoFavorito") }), { act: "open-pedido", rotulo: T.t("verPedido") });
};

/* ---------- promoção do dia ---------- */
T.v.promo = () => {
  const sec = $("#promo");
  if (!CONFIG.promocao.ativa) { sec.hidden = true; return; }
  const chave = T.chaveData(0);
  const [, mm, dd] = chave.split("-");
  const combos = T.combosDoDia(chave);
  const pct = Math.round(CONFIG.promocao.desconto * 100);
  sec.innerHTML = `
    <span class="tex" aria-hidden="true"></span>
    <span class="grav-mask grav-ramo" aria-hidden="true"></span>
    <div class="promo-topo">
      <div>
        <h2 id="promo-titulo" class="titulo-script">${E(T.t("promocaoDia"))}</h2>
        <p class="sub"><strong>${E(T.t("validoHoje", { data: dd + "/" + mm }))}</strong></p>
      </div>
      <span class="selo-promo" aria-label="${E(T.t("promoDescricao", { n: pct }))}"><b>−${pct}%</b><small>${E(T.t("hoje"))}</small></span>
    </div>
    <div class="combos" role="list">
      ${combos.map((c, k) => `
        <article class="combo" role="listitem">
          ${k === 0 ? `<img class="combo-colher" src="assets/ilustracoes/stickers/colher.svg" alt="" width="14" height="48" loading="lazy">` : ""}
          <div class="combo-topo">
            <div class="combo-fotos">${c.partes.map((p) => { const it = T.item(p.id); return T.foto(it.foto, "", it.grupo, 56, 56, "foto-mini", it); }).join("")}</div>
            <button type="button" class="add combo-add" data-act="combo-add" data-i="${k}" aria-label="${E(T.t("adicionarCombo"))}">+</button>
          </div>
          <p class="combo-itens"><strong>${E(T.nomeParte(c.partes[0]))}</strong><span>+ ${E(T.nomeParte(c.partes[1]))}</span></p>
          <p class="preco-bloco combo-preco"><s>${T.money(c.original)}</s><span class="preco">${T.money(c.preco)}</span></p>
        </article>`).join("")}
    </div>`;
};
T.acts["combo-add"] = (el) => {
  const c = T.combosDoDia(T.chaveData(0))[+el.dataset.i];
  if (!c) return;
  T.cart.addCombo(c);
  T.toast(T.t("comboAdicionado"), { act: "open-pedido", rotulo: T.t("verPedido") });
};

/* ---------- destaque da temporada (Primavera/Verão) ---------- */
T.v.temporada = () => {
  const sec = $("#temporada"), t = CONFIG.temporada;
  const cat = t && T.temporadaAtiva && T.cats[t.categoria];
  if (!cat) { sec.hidden = true; sec.innerHTML = ""; return; }
  sec.hidden = false;
  sec.setAttribute("aria-label", T.t("temporadaTitulo"));
  const itens = MENU.filter((i) => i.categoria === cat.id);
  sec.innerHTML = `
    <div class="temp-card" data-act="ver-temporada">
      <span class="temp-icone" role="img" aria-label="${E(T.t("temporadaSelo"))}"></span>
      <div class="temp-meio">
        <h2 class="temp-titulo">${E(T.t("temporadaTitulo"))}</h2>
        <p>${E(T.t("temporadaTexto"))}</p>
        <button type="button" class="btn btn-vinho temp-btn" data-act="ver-temporada">${E(T.t("temporadaBotao"))}</button>
      </div>
      <div class="temp-fotos" aria-hidden="true"></div>
    </div>`;
  // 3 fotos redondas dos smoothies que tiverem foto
  const ok = [];
  let pend = itens.length;
  const fim = () => {
    if (--pend > 0 || !ok.length) return;
    const box = $(".temp-fotos", sec);
    if (!box) return;
    $(".temp-card", sec).classList.add("com-fotos");
    box.innerHTML = ok.slice(0, 3).map((i) => `<img class="temp-foto" src="${E(i.foto)}" alt="" width="40" height="40" decoding="async">`).join("");
  };
  itens.forEach((i) => { const im = new Image(); im.onload = () => { ok.push(i); fim(); }; im.onerror = fim; im.src = i.foto; });
};
T.acts["ver-temporada"] = () => {
  const t = CONFIG.temporada;
  T.L.fechaTudo(() => {
    T.v.setCat("bebidas", t.categoria);
    const el = $("#bebidas");
    el.scrollIntoView({ behavior: T.reduzMovimento() ? "auto" : "smooth", block: "start" });
  });
};

/* ---------- card do quiz ---------- */
T.v.quizCard = () => {
  $("#quiz-card").innerHTML = `
    <div class="quiz-card">
      ${T.ilus("xicara", "quiz-ilus")}
      <div>
        <h2 class="titulo">${E(T.t("quizCardTitulo"))}</h2>
        <p>${E(T.t("quizCardTexto"))}</p>
        <button type="button" class="btn btn-creme" data-act="open" data-name="quiz">${E(T.t("quizCardBotao"))}</button>
      </div>
    </div>`;
};

/* ---------- cardápio ---------- */
const GRUPOS = { bebidas: "cafesBebidas", comidas: "comidas" };      // chaves de tradução dos títulos
const ativa = {};                                  // categoria ativa por grupo

/* Assinatura de quem recomenda o item (campo opcional recomendadoPor; o nome não é traduzido) */
T.v.recom = (i, classe) => i.recomendadoPor ? `<span class="recom${classe ? " " + classe : ""}"><span class="recom-frase">${E(T.t("recomendadoPor"))}</span><span class="recom-nome"><svg viewBox="0 0 16 14" width="14" height="12" aria-hidden="true"><path d="M8 13C3 9.5 1 7 1 4.6 1 2.7 2.4 1.5 4.1 1.5 5.7 1.5 7.1 2.5 8 4c.9-1.5 2.3-2.5 3.9-2.5C13.6 1.5 15 2.7 15 4.6 15 7 13 9.5 8 13z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>${E(i.recomendadoPor)}</span></span>` : "";
T.v.card = (i) => {
  const pedivel = T.pedivel(i);
  const tags = [];
  const tx = T.itemTxt(i);
  if (i.selo === "favorito") tags.push(`<span class="tag tag-fav">${E(T.t("favoritoCasa"))}</span>`);
  if (i.serve) tags.push(`<span class="tag">${E(T.t("serveCurto", { n: i.serve }))}</span>`);
  const preco = !pedivel
    ? `<span class="consulte">${E(T.t("consulteBalcao"))}</span>`
    : i.opcoes.includes("coberturas-toast")
      ? `<span class="preco">${E(T.t("aPartirDe", { valor: T.money(T.precoMinimo(i)) }))}</span>`
    : i.tamanhos.length > 1
      ? `<small>${E(T.rot(i.tamanhos[T.tamRec(i)].rotulo))} ·</small> <span class="preco">${T.money(i.tamanhos[T.tamRec(i)].preco)}</span>`
      : `<span class="preco">${T.money(i.tamanhos[0].preco)}</span>`;
  return `
    <article class="card">
      <button type="button" class="card-hit" data-act="open-item" data-id="${E(i.id)}" aria-label="${E(T.t("verDetalhes", { nome: T.nome(i) }))}">
        <span class="foto">${T.foto(i.foto, T.nome(i), i.grupo, 92, 92, "", i)}</span>
        <span class="txt">
          ${tags.length ? `<span class="tags">${tags.join("")}</span>` : ""}
          <span class="nome">${E(tx.nome)}</span>
          <span class="desc">${E(tx.descricaoCurta)}</span>
          ${T.v.recom(i)}
          <span class="preco-linha">${preco}</span>
        </span>
      </button>
      ${pedivel ? `<button type="button" class="add" data-act="add" data-id="${E(i.id)}" aria-label="${E(T.t("adicionarNome", { nome: T.nome(i) }))}">+</button>` : ""}
    </article>`;
};

/* "O que é?": texto "sobre" da categoria. Fechado por padrão; em Toasts e Waffle Mineiro abre sozinho na 1ª vez (sessionStorage). */
const SOBRE_ABRE = ["toasts", "waffle-mineiro"];
const sobreEstado = {};                             // categoria -> aberto (vale na sessão da página)
const sobreVisto = (id, marca) => {
  let l = [];
  let ja = false;
  try { l = JSON.parse(sessionStorage.getItem("tostes.sobreVisto")) || []; ja = l.includes(id); if (marca && !ja) { l.push(id); sessionStorage.setItem("tostes.sobreVisto", JSON.stringify(l)); } } catch (e) { /* sem storage */ }
  return ja;                                        // já tinha sido visto antes desta chamada?
};
T.v.sobre = (cat, ct) => {
  if (!ct.sobre) return "";
  if (sobreEstado[cat.id] == null) sobreEstado[cat.id] = SOBRE_ABRE.includes(cat.id) && !sobreVisto(cat.id, true);
  const aberto = sobreEstado[cat.id], id = "sobre-" + cat.id;
  return `<button type="button" class="oque-link" data-act="oque" data-cat="${E(cat.id)}" aria-expanded="${aberto}" aria-controls="${id}"><svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M8 7.2v4M8 4.9v.1" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg><span>${E(T.t("oQueE"))}</span></button>
    <div class="oque${aberto ? " aberto" : ""}" id="${id}"><div class="oque-miolo"><div class="oque-caixa">${T.stickerUrl(cat) ? `<img class="oque-grav" src="${E(T.stickerUrl(cat))}" alt="" width="32" height="32" loading="lazy">` : ""}<p>${E(ct.sobre)}</p></div></div></div>`;
};
T.acts.oque = (b) => {
  const id = b.dataset.cat, aberto = !(sobreEstado[id]);
  sobreEstado[id] = aberto;
  b.setAttribute("aria-expanded", String(aberto));
  const box = document.getElementById("sobre-" + id);
  if (box) box.classList.toggle("aberto", aberto);
};

T.v.painel = (grupo) => {
  const cat = T.cats[ativa[grupo]], ct = T.catTxt(cat);
  const html = MENU.filter((i) => i.categoria === cat.id).map(T.v.card).join("");
  return `<div class="cat-topo"><h3 class="titulo titulo-cat">${E(ct.nome)}</h3>${ct.nota ? `<p class="nota">${E(ct.nota)}</p>` : ""}${T.v.sobre(cat, ct)}</div><div class="lista">${html}</div>`;
};

T.v.cardapio = (grupo) => {
  const cats = CATEGORIAS.filter((c) => c.grupo === grupo);
  if (!ativa[grupo] || !cats.some((c) => c.id === ativa[grupo])) ativa[grupo] = cats[0].id;    // ao trocar de idioma, mantém a categoria aberta
  const abas = $(`#${grupo} .tabs`), rolagem = abas ? abas.scrollLeft : 0;
  $("#" + grupo).innerHTML = `
    <div class="cardapio-topo"><h2 id="${grupo}-titulo" class="titulo">${E(T.t(GRUPOS[grupo]))}</h2><img class="sticker-grupo" src="assets/ilustracoes/stickers/${grupo === "bebidas" ? "xicara-latte" : "croissant"}.svg" alt="" width="32" height="32"></div>
    <div class="tabs-wrap"><div class="tabs" role="tablist" aria-label="${E(T.t("categoriasAria"))}">
      ${cats.map((c) => `<button type="button" role="tab" class="tab" id="tab-${c.id}" aria-selected="${c.id === ativa[grupo]}" data-act="cat" data-grupo="${grupo}" data-cat="${c.id}">${c.sazonal ? `<span class="tab-sazonal" aria-hidden="true">✦</span> ` : ""}${E(T.catTxt(c).nome)}</button>`).join("")}
    </div></div>
    <div class="painel" role="tabpanel">${T.v.painel(grupo)}</div>`;
  T.v.swipe(grupo);
  if (rolagem) $(`#${grupo} .tabs`).scrollLeft = rolagem;
};

T.v.setCat = (grupo, id, dir) => {
  const sec = $("#" + grupo);
  const antes = sec.getBoundingClientRect().top;
  ativa[grupo] = id;
  $$(".tab", sec).forEach((b) => b.setAttribute("aria-selected", String(b.dataset.cat === id)));
  const tabs = $(".tabs", sec), b = $("#tab-" + id, sec);
  tabs.scrollTo({ left: b.offsetLeft - (tabs.clientWidth - b.offsetWidth) / 2, behavior: T.reduzMovimento() ? "auto" : "smooth" });
  const p = $(".painel", sec);
  p.innerHTML = T.v.painel(grupo);
  p.classList.remove("desliza-esq", "desliza-dir");
  if (dir && !T.reduzMovimento()) { void p.offsetWidth; p.classList.add(dir > 0 ? "desliza-dir" : "desliza-esq"); }
  if (antes < 0) sec.scrollIntoView({ block: "start" });      // volta ao topo da seção
};
T.acts.cat = (el) => T.v.setCat(el.dataset.grupo, el.dataset.cat);

T.v.swipe = (grupo) => {
  const p = $("#" + grupo + " .painel");
  let x0 = 0, y0 = 0, ativo = false;
  p.addEventListener("touchstart", (e) => { const t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; ativo = e.touches.length === 1; }, { passive: true });
  p.addEventListener("touchend", (e) => {
    if (!ativo) return;
    ativo = false;
    const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const cats = CATEGORIAS.filter((c) => c.grupo === grupo);
    const k = cats.findIndex((c) => c.id === ativa[grupo]) + (dx < 0 ? 1 : -1);
    if (k >= 0 && k < cats.length) T.v.setCat(grupo, cats[k].id, dx < 0 ? 1 : -1);
  }, { passive: true });
};

/* ---------- aulas (trilhas com bolinhas, como os destaques do Instagram) ---------- */
T.vistas = {
  KEY: "tostes.aulasVistas",
  lista() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (e) { return []; } },
  tem(id) { return this.lista().includes(id); },
  marca(id) { try { const l = this.lista(); if (!l.includes(id)) { l.push(id); localStorage.setItem(this.KEY, JSON.stringify(l)); } } catch (e) { /* sem storage */ } }
};
T.v.aulas = () => {
  $("#aulas").innerHTML = `
    <span class="grav-mask grav-moedor" aria-hidden="true"></span>
    <h2 id="aulas-titulo" class="titulo">${E(T.t("aulasTitulo"))}</h2>
    <p class="sub">${E(T.t("aulasSubtitulo"))}</p>
    ${AULAS_TRILHAS.map((t) => { const tt = T.aulaTrilhaTxt(t); return `
      <div class="trilha">
        <h3 class="trilha-nome">${E(tt.nome)}</h3>
        <p class="trilha-desc">${E(tt.descricao)}</p>
        <ul class="bolinhas">
          ${AULAS.filter((a) => a.trilha === t.id).map((a) => `
            <li><button type="button" class="bolinha${T.vistas.tem(a.id) ? " vista" : ""}" data-act="open" data-name="aula/${E(a.id)}" data-aula="${E(a.id)}">
              <span class="aula-bolinha__anel"><span class="aula-bolinha__miolo">${a.imagem
                ? `<img class="aula-bolinha__img" src="${E(a.imagem)}" alt="" width="72" height="72" loading="lazy" decoding="async" style="object-position:${E(a.foco || "50% 50%")}" data-ph-src="${E(a.icone)}">`
                : `<img class="aula-bolinha__icone" src="${E(a.icone)}" alt="" width="120" height="120">`}</span></span>
              <span class="bolinha-titulo">${E(T.aulaTxt(a).titulo)}</span>
            </button></li>`).join("")}
        </ul>
      </div>`; }).join("")}`;
};
T.v.atualizaVistas = () => { $$(".bolinha").forEach((b) => b.classList.toggle("vista", T.vistas.tem(b.dataset.aula))); };

/* ---------- convite do Instagram ---------- */
T.v.insta = () => {
  const c = CONFIG.instagramConvite, k = (n) => T.cfg("instagramConvite." + n, c[n]);
  $("#insta").innerHTML = `
    <div class="insta-card">
      ${T.ilus("camera", "insta-ilus")}
      <h2 class="titulo">${E(k("titulo"))}</h2>
      <p>${E(k("texto"))}</p>
      <a class="btn btn-musgo" href="${E(CONFIG.instagram.url)}" target="_blank" rel="noopener">${E(k("botao"))}</a>
    </div>`;
};

/* ---------- rodapé ---------- */
T.v.rodape = () => {
  const fid = (n) => T.cfg("fidelidade." + n, CONFIG.fidelidade[n]);
  const horas = ["horarioSemana", "horarioSabado", "horarioDomingo"].map((k) => T.t(k));
  $("#rodape").innerHTML = `
    <section id="fidelidade" class="secao fidelidade" aria-labelledby="fid-titulo">
      <span class="tex" aria-hidden="true"></span>
      <span class="fid-graos" aria-hidden="true"></span>
      <p class="fid-gancho">✦ ${E(fid("gancho"))}</p>
      <h2 id="fid-titulo" class="titulo">${E(fid("titulo"))}</h2>
      <p class="fid-texto">${E(fid("texto"))}</p>
      <div class="carimbos" aria-hidden="true">${Array.from({ length: 10 }, (_, k) => `<span class="carimbo${k === 0 ? " carimbado" : ""}">${k === 0 ? `<span class="sticker carimbo-chapeu"></span>` : T.ilus("xicara")}<b>${k + 1}</b></span>`).join("")}</div>
      <p class="mini">${E(fid("rodape"))}</p>
    </section>
    <section class="secao">
      <a class="btn btn-vinho btn-bloco" href="${E(CONFIG.avaliacaoGoogle)}" target="_blank" rel="noopener">${E(T.t("avalieGoogle"))}</a>
    </section>
    <section id="horarios" class="faixa-verde info" aria-labelledby="hor-titulo">
      <h2 id="hor-titulo" class="titulo">${E(T.t("menuHorarios"))}</h2>
      <ul class="horarios">${horas.map((h) => `<li><span>${E(h)}</span></li>`).join("")}</ul>
      <p class="endereco">${E(CONFIG.endereco)}</p>
      <p class="links"><a href="${E(CONFIG.mapa)}" target="_blank" rel="noopener">${E(T.t("comoChegar"))}</a><a href="${E(CONFIG.instagram.url)}" target="_blank" rel="noopener">Instagram ${E(CONFIG.instagram.usuario)}</a></p>
    </section>
    <div class="chapeu-bloco">
      <button type="button" class="chapeu-link" data-act="open" data-name="chapeu">
        <span class="chapeu-mini" aria-hidden="true"></span><span>${E(T.t("historiaChapeu"))}</span>
      </button>
    </div>
    <div class="rodape-faixa">
      <span class="tex" aria-hidden="true"></span>
      <div class="marca-wrap" aria-hidden="true"><span class="grav-marca"></span><p class="marca-gigante">TOSTES café</p></div>
      <p class="rodape-info">${E(CONFIG.endereco)}</p>
      <p class="rodape-info">${E(horas.join(" · "))}</p>
      <p class="rodape-info"><a href="${E(CONFIG.instagram.url)}" target="_blank" rel="noopener">Instagram ${E(CONFIG.instagram.usuario)}</a></p>
    </div>`;
};

/* ---------- barra flutuante do carrinho ---------- */
T.v.bag = () => {
  const t = T.cart.totais();
  const el = $("#bag-bar");
  const abertas = T.L && T.L.abertas();
  el.hidden = t.qtd === 0 || abertas;
  el.innerHTML = `<span>${E(t.qtd === 1 ? T.t("item") : T.t("itens", { n: t.qtd }))} · ${T.money(t.total)}</span><strong>${E(T.t("verPedido"))} →</strong>`;
  document.body.classList.toggle("com-bag", !el.hidden);
};

/* ---------- animações ---------- */
T.v.chuvaDeCafe = () => {                         // grãos e gotas caindo, uma vez, menos de 1 s
  if (T.reduzMovimento()) return;
  const box = document.createElement("div");
  box.className = "chuva";
  box.setAttribute("aria-hidden", "true");
  for (let k = 0; k < 16; k++) {
    const p = document.createElement("i");
    p.className = k % 3 === 0 ? "gota" : "grao";
    p.style.left = 4 + Math.random() * 92 + "%";
    p.style.animationDelay = Math.random() * 0.25 + "s";
    p.style.setProperty("--giro", (Math.random() * 360 - 180) + "deg");
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 1200);
};

T.v.confete = () => {
  if (T.reduzMovimento()) return;
  const box = document.createElement("div");
  box.className = "confete";
  box.setAttribute("aria-hidden", "true");
  const cores = ["var(--vinho)", "var(--musgo)", "var(--terra)"];
  for (let k = 0; k < 28; k++) {
    const p = document.createElement("b");
    p.textContent = k % 2 ? "✦" : "✱";
    const ang = (k / 28) * Math.PI * 2, d = 90 + Math.random() * 130;
    p.style.setProperty("--dx", Math.cos(ang) * d + "px");
    p.style.setProperty("--dy", Math.sin(ang) * d + "px");
    p.style.color = cores[k % 3];
    box.appendChild(p);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 1400);
};

T.v.observaBebidas = () => {
  let jaCaiu = false;
  const alvo = $("#bebidas");
  if (!("IntersectionObserver" in window)) return;
  new IntersectionObserver((es, ob) => {
    if (!jaCaiu && es.some((e) => e.isIntersecting)) { jaCaiu = true; T.v.chuvaDeCafe(); ob.disconnect(); }
  }, { threshold: 0.2 }).observe(alvo);
};
