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
  el.textContent = s.texto;
  $("#marquee .marquee-trilho").innerHTML = `<span>${E(CONFIG.marquee)}</span>`.repeat(4);
  const m = $("#mesa-linha");
  if (T.cart.daUrl && T.cart.st.modo === "mesa") { m.hidden = false; m.textContent = "Mesa " + T.cart.st.mesa; } else m.hidden = true;
};

/* ---------- o pedido favorito ---------- */
T.v.favorito = () => {
  const f = CONFIG.favorito;
  const c = T.favorito();
  $("#favorito").innerHTML = `
    <article class="fav-card">
      <div class="fav-foto">${T.foto(f.foto, f.nome, "bebidas", 480, 360)}</div>
      <div class="fav-corpo">
        <h2 id="fav-titulo" class="titulo-script">${E(f.titulo)}</h2>
        <p class="fav-nome">${E(f.nome)}</p>
        <p class="fav-texto">${E(f.texto)}</p>
        <div class="fav-rodape">
          <p class="preco-bloco">${c.original > c.preco ? `<s>${T.money(c.original)}</s>` : ""}<span class="preco preco-gd">${T.money(c.preco)}</span></p>
          <button type="button" class="btn btn-vinho" data-act="fav-add">Adicionar ao pedido</button>
        </div>
      </div>
    </article>`;
};
T.acts["fav-add"] = () => {
  T.cart.addCombo(T.favorito());
  T.toast("Adicionado · O pedido favorito", { act: "open-pedido", rotulo: "Ver pedido" });
};

/* ---------- promoção do dia ---------- */
T.v.promo = () => {
  const sec = $("#promo");
  if (!CONFIG.promocao.ativa) { sec.hidden = true; return; }
  const chave = T.chaveData(0);
  const [, mm, dd] = chave.split("-");
  const combos = T.combosDoDia(chave);
  sec.innerHTML = `
    <h2 id="promo-titulo" class="titulo-script">Promoção do dia</h2>
    <p class="sub"><strong>Válido hoje, ${dd}/${mm}</strong> · ${Math.round(CONFIG.promocao.desconto * 100)}% de desconto em cada combo de 1 bebida e 1 comida.</p>
    <div class="combos">
      ${combos.map((c, k) => `
        <article class="combo">
          <div class="combo-fotos">${c.partes.map((p) => { const it = T.item(p.id); return T.foto(it.foto, T.nome(it), it.grupo, 64, 64, "foto-mini"); }).join("")}</div>
          <p class="combo-itens"><strong>${E(T.nomeParte(c.partes[0]))}</strong><span>+ ${E(T.nomeParte(c.partes[1]))}</span></p>
          <div class="combo-rodape">
            <p class="preco-bloco"><s>${T.money(c.original)}</s><span class="preco preco-gd">${T.money(c.preco)}</span></p>
            <button type="button" class="btn btn-creme" data-act="combo-add" data-i="${k}">Adicionar combo</button>
          </div>
        </article>`).join("")}
    </div>`;
};
T.acts["combo-add"] = (el) => {
  const c = T.combosDoDia(T.chaveData(0))[+el.dataset.i];
  if (!c) return;
  T.cart.addCombo(c);
  T.toast("Combo adicionado", { act: "open-pedido", rotulo: "Ver pedido" });
};

/* ---------- card do quiz ---------- */
T.v.quizCard = () => {
  $("#quiz-card").innerHTML = `
    <div class="quiz-card">
      ${T.ilus("xicara", "quiz-ilus")}
      <div>
        <h2 class="titulo">Não sabe o que pedir?</h2>
        <p>Responda às perguntas e a gente sugere a bebida certa para você.</p>
        <button type="button" class="btn btn-creme" data-act="open" data-name="quiz">Descobrir meu café</button>
      </div>
    </div>`;
};

/* ---------- cardápio ---------- */
const GRUPOS = { bebidas: "Cafés e bebidas", comidas: "Comidas" };
const ativa = {};                                  // categoria ativa por grupo

T.v.card = (i) => {
  const pedivel = T.pedivel(i);
  const tags = [];
  if (i.selo === "favorito") tags.push('<span class="tag tag-fav">Favorito da casa</span>');
  if (i.serve) tags.push(`<span class="tag">Serve ${i.serve}</span>`);
  const preco = !pedivel
    ? '<span class="consulte">Consulte o sabor no balcão</span>'
    : i.tamanhos.length > 1
      ? `<small>${E(i.tamanhos[T.tamRec(i)].rotulo)} ·</small> <span class="preco">${T.money(i.tamanhos[T.tamRec(i)].preco)}</span>`
      : `<span class="preco">${T.money(i.tamanhos[0].preco)}</span>`;
  return `
    <article class="card">
      <button type="button" class="card-hit" data-act="open-item" data-id="${E(i.id)}" aria-label="Ver detalhes de ${E(T.nome(i))}">
        <span class="foto">${T.foto(i.foto, T.nome(i), i.grupo, 92, 92)}</span>
        <span class="txt">
          ${tags.length ? `<span class="tags">${tags.join("")}</span>` : ""}
          <span class="nome">${E(i.nome)}</span>
          <span class="desc">${E(i.descricaoCurta)}</span>
          <span class="preco-linha">${preco}</span>
        </span>
      </button>
      ${pedivel ? `<button type="button" class="add" data-act="add" data-id="${E(i.id)}" aria-label="Adicionar ${E(T.nome(i))}">+</button>` : ""}
    </article>`;
};

T.v.painel = (grupo) => {
  const cat = T.cats[ativa[grupo]];
  const html = MENU.filter((i) => i.categoria === cat.id).map(T.v.card).join("");
  return `<div class="cat-topo"><h3 class="titulo titulo-cat">${E(cat.nome)}</h3>${cat.nota ? `<p class="nota">${E(cat.nota)}</p>` : ""}</div><div class="lista">${html}</div>`;
};

T.v.cardapio = (grupo) => {
  const cats = CATEGORIAS.filter((c) => c.grupo === grupo);
  ativa[grupo] = cats[0].id;
  $("#" + grupo).innerHTML = `
    <div class="cardapio-topo"><h2 id="${grupo}-titulo" class="titulo">${GRUPOS[grupo]}</h2></div>
    <div class="tabs-wrap"><div class="tabs" role="tablist" aria-label="Categorias de ${E(GRUPOS[grupo].toLowerCase())}">
      ${cats.map((c) => `<button type="button" role="tab" class="tab" id="tab-${c.id}" aria-selected="${c.id === ativa[grupo]}" data-act="cat" data-grupo="${grupo}" data-cat="${c.id}">${E(c.nome)}</button>`).join("")}
    </div></div>
    <div class="painel" role="tabpanel">${T.v.painel(grupo)}</div>`;
  T.v.swipe(grupo);
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
    <h2 id="aulas-titulo" class="titulo">Enquanto seu café fica pronto</h2>
    <p class="sub">Toque numa bolinha e leia um pouco sobre café.</p>
    ${AULAS_TRILHAS.map((t) => `
      <div class="trilha">
        <h3 class="trilha-nome">${E(t.nome)}</h3>
        <p class="trilha-desc">${E(t.descricao)}</p>
        <ul class="bolinhas">
          ${AULAS.filter((a) => a.trilha === t.id).map((a) => `
            <li><button type="button" class="bolinha${T.vistas.tem(a.id) ? " vista" : ""}" data-act="open" data-name="aula/${E(a.id)}" data-aula="${E(a.id)}">
              <span class="anel">${a.imagem
                ? `<img class="bolinha-foto" src="${E(a.imagem)}" alt="" width="72" height="72" loading="lazy" decoding="async" data-ph-src="${E(a.icone)}">`
                : T.icone(a.icone, "bolinha-ilus")}</span>
              <span class="bolinha-titulo">${E(a.titulo)}</span>
            </button></li>`).join("")}
        </ul>
      </div>`).join("")}`;
};
T.v.atualizaVistas = () => { $$(".bolinha").forEach((b) => b.classList.toggle("vista", T.vistas.tem(b.dataset.aula))); };

/* ---------- convite do Instagram ---------- */
T.v.insta = () => {
  const c = CONFIG.instagramConvite;
  $("#insta").innerHTML = `
    <div class="insta-card">
      ${T.ilus("camera", "insta-ilus")}
      <h2 class="titulo">${E(c.titulo)}</h2>
      <p>${E(c.texto)}</p>
      <a class="btn btn-musgo" href="${E(CONFIG.instagram.url)}" target="_blank" rel="noopener">${E(c.botao)}</a>
    </div>`;
};

/* ---------- rodapé ---------- */
T.v.rodape = () => {
  $("#rodape").innerHTML = `
    <section id="fidelidade" class="secao fidelidade" aria-labelledby="fid-titulo">
      <p class="fid-gancho">✦ ${E(CONFIG.fidelidade.gancho)}</p>
      <h2 id="fid-titulo" class="titulo">${E(CONFIG.fidelidade.titulo)}</h2>
      <p class="fid-texto">${E(CONFIG.fidelidade.texto)}</p>
      <div class="carimbos" aria-hidden="true">${Array.from({ length: 10 }, (_, k) => `<span class="carimbo${k === 0 ? " carimbado" : ""}">${T.ilus("xicara")}<b>${k + 1}</b></span>`).join("")}</div>
      <p class="mini">${E(CONFIG.fidelidade.rodape)}</p>
    </section>
    <section class="secao">
      <a class="btn btn-vinho btn-bloco" href="${E(CONFIG.avaliacaoGoogle)}" target="_blank" rel="noopener">Avalie a gente no Google</a>
    </section>
    <section id="horarios" class="secao info" aria-labelledby="hor-titulo">
      <h2 id="hor-titulo" class="titulo">Horários e localização</h2>
      <ul class="horarios">${T.horariosTexto().map((h) => `<li><span>${E(h.dias)}</span><span>${E(h.horas)}</span></li>`).join("")}</ul>
      <p class="endereco">${E(CONFIG.endereco)}</p>
      <p class="links"><a href="${E(CONFIG.mapa)}" target="_blank" rel="noopener">Como chegar</a><a href="${E(CONFIG.instagram.url)}" target="_blank" rel="noopener">Instagram ${E(CONFIG.instagram.usuario)}</a></p>
    </section>
    <button type="button" class="chapeu-link" data-act="open" data-name="chapeu">
      ${T.ilus("chapeu", "chapeu-mini")}<span>Conheça a história por trás do chapéu →</span>
    </button>
    <p class="marca-gigante" aria-hidden="true">TOSTES café</p>`;
};

/* ---------- barra flutuante do carrinho ---------- */
T.v.bag = () => {
  const t = T.cart.totais();
  const el = $("#bag-bar");
  const abertas = T.L && T.L.abertas();
  el.hidden = t.qtd === 0 || abertas;
  el.innerHTML = `<span>${t.qtd} ${t.qtd === 1 ? "item" : "itens"} · ${T.money(t.total)}</span><strong>Ver pedido →</strong>`;
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
