/* TOSTES café — telas sobrepostas (detalhe do item, pedido, menu, quiz, aulas, chapéu)
   e o histórico: o botão "voltar" do celular fecha a tela de cima. */
"use strict";

T.L = (function () {
  const cont = $("#layers");
  let pilha = [];
  let pendente = null;
  const limpa = () => location.pathname + location.search;

  /* ---- construtores: cada um devolve o elemento da tela (ou null se o nome for inválido) ---- */
  const build = {};

  function camada(nome, classe, rotulo) {
    const el = document.createElement("div");
    el.className = "layer " + classe;
    el.dataset.name = nome;
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", rotulo);
    return el;
  }

  /* ===== detalhe do item ===== */
  // ícones de traço fino: xícara e copo
  const ICONE_SERVIDO = {
    "xícara": '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h12v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H15.5"/><path d="M3 21h15"/><path d="M8 3.5c-1 1 1 2 0 3M12 3.5c-1 1 1 2 0 3"/></svg>',
    "copo": '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4h12l-1.6 15.2a1.5 1.5 0 0 1-1.5 1.3H9.1a1.5 1.5 0 0 1-1.5-1.3z"/><path d="M6.6 9.5h10.8"/></svg>'
  };

  build.item = (id) => {
    const it = T.item(id);
    if (!it) return null;
    const el = camada("item/" + id, "layer-item", T.nome(it));
    const pre = T.preset[id]; delete T.preset[id];
    const S = { it, tam: pre ? pre.tam : T.tamRec(it), sel: pre ? pre.sel : T.padroes(it), qtd: 1 };
    el._S = S;
    el.innerHTML = `
      <div class="sheet">
        <div class="sheet-scroll">
          <div class="sheet-foto">${T.foto(it.foto, T.nome(it), it.grupo, 480, 360, "", it)}
            <span class="puxador" aria-hidden="true"></span>
            <button type="button" class="fechar" data-act="back" aria-label="${E(T.t("fechar"))}">×</button>
          </div>
          <div class="sheet-corpo"></div>
        </div>
        <div class="sheet-barra"></div>
      </div>`;
    const render = () => {
      const corpo = $(".sheet-corpo", el), barra = $(".sheet-barra", el), sc = $(".sheet-scroll", el);
      const y = sc.scrollTop;
      const pedivel = T.pedivel(it);
      const un = pedivel ? T.precoUnit(it, S.tam, S.sel) : 0;
      const total = T.r2(un * S.qtd);
      const tag = [], tx = T.itemTxt(it);
      if (it.selo === "favorito") tag.push(`<span class="tag tag-fav">${E(T.t("favoritoCasa"))}</span>`);
      if (it.serve) tag.push(`<span class="tag">${E(T.t("serveCurto", { n: it.serve }))}</span>`);
      let h = "";
      h += tag.length ? `<p class="tags">${tag.join("")}</p>` : "";
      h += `<h2 class="titulo sheet-nome">${E(T.nome(it))}</h2>`;
      if (pedivel) {
        const t1 = it.tamanhos[0];
        const servido = it.servidoEm ? `<span class="servido">${ICONE_SERVIDO[it.servidoEm] || ""}${E(T.t(it.servidoEm === "copo" ? "servidoCopo" : "servidoXicara"))}</span>` : "";
        h += `<p class="sheet-preco"><span class="preco preco-gd">${T.money(total)}</span>${it.tamanhos.length === 1 && t1.ml ? `<span class="ml">${t1.ml} ml</span>` : ""}${servido}</p>`;
      }
      // aviso de alérgeno no fim do texto ("Contém amendoim.") vira etiqueta própria
      const texto = it.descricao || tx.descricaoCurta;
      const alerg = texto.match(/\s*(Contém [^.]+\.)\s*$/);
      h += `<p class="sheet-desc">${E(alerg ? texto.slice(0, alerg.index) : texto)}</p>${alerg ? `<p class="alergeno-linha"><span class="alergeno">${E(alerg[1])}</span></p>` : ""}`;
      if (!pedivel) {
        h += `<p class="aviso-balcao">${E(T.t("consulteBalcao"))}</p>`;
      } else {
        if (it.tamanhos.length > 1) {
          const rec = T.temRec(it) ? T.tamRec(it) : -1;
          h += `<div class="grupo"><h3>${E(T.t("tamanho"))}</h3><div class="tamanhos" role="radiogroup" aria-label="${E(T.t("tamanho"))}">${it.tamanhos.map((t, k) =>
            `<div class="tam-col"><em class="rec">${k === rec ? E(T.t("recomendado")) : "&nbsp;"}</em><button type="button" role="radio" aria-checked="${k === S.tam}" class="tam" data-act="sheet-tam" data-i="${k}"><b>${E(T.rot(t.rotulo))}</b><small>${t.ml ? t.ml + " ml" : "&nbsp;"}</small><span>${T.money(t.preco)}</span></button></div>`).join("")}</div></div>`;
        }
        it.opcoes.forEach((g) => {
          const gr = OPCOES[g], escolhidos = S.sel[g] || [], max = T.maximo(gr);
          const titulo = T.opTitulo(g);
          h += `<div class="grupo"><h3>${E(titulo)}${gr.tipo === "multipla" && max !== Infinity ? ` <em>${E(T.t("contadorEscolha", { n: escolhidos.length, max }))}</em>` : ""}</h3>`;
          if (g === "leite") h += `<p class="nota-grupo">${E(T.t("semCustoLeite"))}</p>`;
          if (g === "complementos-cappuccino" || g === "coberturas-toast") {
            h += `<div class="chips chips-gd" role="group" aria-label="${E(titulo)}">${gr.itens.map((o) => {
              const on = escolhidos.includes(o.id), trava = !on && escolhidos.length >= max;
              return `<button type="button" class="chip chip-gd" aria-pressed="${on}" data-act="sheet-opt" data-g="${g}" data-o="${o.id}" ${trava ? "disabled" : ""}>${E(T.opNome(g, o.id))}${o.valor > 0 ? `<small>+ ${T.money(o.valor)}</small>` : ""}</button>`;
            }).join("")}</div>`;
          } else if (g === "docura-smoothie") {
            h += `<div class="tamanhos docuras" role="radiogroup" aria-label="${E(titulo)}">${gr.itens.map((o) => `<button type="button" role="radio" aria-checked="${escolhidos.includes(o.id)}" class="tam docura" data-act="sheet-opt" data-g="${g}" data-o="${o.id}"><b>${E(T.opNome(g, o.id))}</b></button>`).join("")}</div>`;
          } else if (gr.tipo === "unica") {
            h += `<div class="chips" role="radiogroup" aria-label="${E(titulo)}">${gr.itens.map((o) =>
              `<button type="button" role="radio" aria-checked="${escolhidos.includes(o.id)}" class="chip" data-act="sheet-opt" data-g="${g}" data-o="${o.id}">${E(T.opNome(g, o.id))}${o.valor > 0 ? ` <small>+ ${T.money(o.valor)}</small>` : ""}</button>`).join("")}</div>`;
          } else {
            h += `<div class="checks">${gr.itens.map((o) => {
              const on = escolhidos.includes(o.id);
              const trava = !on && escolhidos.length >= max;
              return `<label class="check${trava ? " trava" : ""}"><input type="checkbox" data-act="sheet-opt" data-g="${g}" data-o="${o.id}" ${on ? "checked" : ""} ${trava ? "disabled" : ""}><span class="caixa"></span><span class="rot">${E(T.opNome(g, o.id))}</span>${o.valor > 0 ? `<small>+ ${T.money(o.valor)}</small>` : ""}</label>`;
            }).join("")}</div>`;
          }
          h += `</div>`;
        });
      }
      if (it.ingredientes.length) h += `<div class="grupo"><h3>${E(T.t("ingredientes"))}</h3><ul class="ingr">${tx.ingredientes.map((x) => `<li>${E(x)}</li>`).join("")}</ul></div>`;
      if (it.serve) h += `<p class="serve">${E(T.t("serve", { n: it.serve }))}</p>`;
      if (it.preparo) h += `<div class="grupo"><h3>${E(T.t("preparo"))}</h3><p>${E(it.preparo)}</p></div>`;
      if (it.fichaTecnica) {
        const rot = { dose: T.t("fichaDose"), extracao: T.t("fichaExtracao"), temperatura: T.t("fichaTemperatura") };
        h += `<dl class="ficha" aria-label="${E(T.t("fichaTecnica"))}">${Object.keys(it.fichaTecnica).map((k) => `<div><dt>${E(rot[k] || k)}</dt><dd>${E(it.fichaTecnica[k])}</dd></div>`).join("")}</dl>`;
      }
      corpo.innerHTML = h;
      if (!pedivel) { barra.innerHTML = ""; barra.hidden = true; }
      else {
        const falta = T.faltaTexto(it, S.sel);
        barra.hidden = false;
        barra.innerHTML = `
          ${falta.length ? `<p class="falta">${E(falta.join(". "))}.</p>` : ""}
          <div class="barra-linha">
            <div class="stepper" role="group" aria-label="${E(T.t("quantidade"))}">
              <button type="button" data-act="sheet-qtd" data-d="-1" aria-label="${E(T.t("diminuir"))}" ${S.qtd <= 1 ? "disabled" : ""}>−</button>
              <output>${S.qtd}</output>
              <button type="button" data-act="sheet-qtd" data-d="1" aria-label="${E(T.t("aumentar"))}">+</button>
            </div>
            <button type="button" class="btn btn-vinho btn-add" data-act="sheet-add" ${falta.length ? "disabled" : ""}>${E(T.t("adicionarTotal", { valor: T.money(total) }))}</button>
          </div>`;
      }
      sc.scrollTop = y;
    };
    el._render = null;          // o carrinho não precisa redesenhar esta tela
    render();
    el._S.render = render;
    arrastar(el);
    return el;
  };

  // deslizar para baixo fecha o detalhe (só quando a rolagem está no topo)
  function arrastar(el) {
    const sc = $(".sheet-scroll", el), sheet = $(".sheet", el);
    let y0 = null, dy = 0;
    sc.addEventListener("touchstart", (e) => { y0 = sc.scrollTop <= 0 ? e.touches[0].clientY : null; dy = 0; }, { passive: true });
    sc.addEventListener("touchmove", (e) => {
      if (y0 == null) return;
      dy = e.touches[0].clientY - y0;
      if (dy > 0) { sheet.style.transition = "none"; sheet.style.transform = `translateY(${dy}px)`; }
    }, { passive: true });
    sc.addEventListener("touchend", () => {
      if (y0 == null) return;
      sheet.style.transition = "";
      if (dy > 110) { sheet.style.transform = ""; api.voltar(); } else sheet.style.transform = "";
      y0 = null;
    }, { passive: true });
  }

  T.acts["sheet-tam"] = (b) => { const S = b.closest(".layer")._S; S.tam = +b.dataset.i; S.render(); };
  T.acts["sheet-opt"] = (b) => {
    const S = b.closest(".layer")._S, g = b.dataset.g, o = b.dataset.o, gr = OPCOES[g];
    const cur = S.sel[g] || [];
    if (gr.tipo === "unica") S.sel[g] = [o];
    else if (cur.includes(o)) S.sel[g] = cur.filter((x) => x !== o);
    else if (cur.length < T.maximo(gr)) S.sel[g] = cur.concat(o);
    S.render();
  };
  T.acts["sheet-qtd"] = (b) => { const S = b.closest(".layer")._S; S.qtd = Math.max(1, Math.min(99, S.qtd + +b.dataset.d)); S.render(); };
  T.acts["sheet-add"] = (b) => {
    const S = b.closest(".layer")._S;
    if (T.faltando(S.it, S.sel).length) return;
    T.cart.addItem(S.it.id, S.tam, S.sel, S.qtd);
    api.voltar();
    T.toast(T.t("adicionadoNome", { nome: T.nome(S.it) }), { act: "open-pedido", rotulo: T.t("verPedido") });
  };

  /* ===== pedido (carrinho) ===== */
  build.pedido = () => {
    const el = camada("pedido", "layer-tela", T.t("seuPedido"));
    const render = () => {
      const c = T.cart, st = c.st, t = c.totais();
      const sc = $(".tela-scroll", el), y = sc ? sc.scrollTop : 0;
      let h = `<div class="tela-topo"><h2 class="titulo">${E(T.t("seuPedido"))}</h2><button type="button" class="fechar-tela" data-act="back" aria-label="${E(T.t("fechar"))}">×</button></div><div class="tela-scroll"><span class="mancha-xic" aria-hidden="true"></span>`;
      if (!st.linhas.length) {
        h += `<div class="vazio">${T.ilus("chapeu", "vazio-ilus")}<p>${E(T.t("pedidoVazio"))}</p><button type="button" class="btn btn-vinho" data-act="ver-cardapio">${E(T.t("verCardapio"))}</button></div>`;
      } else {
        h += `<ul class="linhas">${st.linhas.map((l, i) => {
          const v = c.valores(l);
          let nome, det;
          if (l.tipo === "combo") {
            nome = l.prefixo === "Combo do dia" ? T.t("comboDia") : T.t("pedidoFavorito");     // a linha guarda o nome em português (vai assim no WhatsApp)
            det = l.partes.map((p) => { const it = T.item(p.id), o = T.textoOpcoes(it, p.sel, true); return T.nomeParte(p) + (o.length ? " · " + o.join(" · ") : ""); }).join("<br>+ ");
            det = det.split("<br>").map((s, k) => (k ? "<br>" : "") + E(s).replace(/^\+ /, "+ ")).join("");
          } else {
            const it = T.item(l.id), o = T.textoOpcoes(it, l.sel);
            nome = T.nome(it);
            det = E([T.rotuloTam(it, l.tam)].concat(o).filter(Boolean).join(" · "));
          }
          return `<li class="linha">
            <div class="linha-topo"><p class="linha-nome"><b>${l.qtd}x</b> ${E(nome)}</p>
              <p class="linha-preco">${v.original > v.preco ? `<s>${T.money(T.r2(v.original * l.qtd))}</s>` : ""}<strong>${T.money(T.r2(v.preco * l.qtd))}</strong></p></div>
            ${det ? `<p class="linha-det">${det}</p>` : ""}
            <div class="linha-acoes">
              <div class="stepper stepper-p" role="group" aria-label="${E(T.t("quantidade"))}">
                <button type="button" data-act="c-qtd" data-i="${i}" data-d="-1" aria-label="${E(T.t("diminuir"))}">−</button><output>${l.qtd}</output><button type="button" data-act="c-qtd" data-i="${i}" data-d="1" aria-label="${E(T.t("aumentar"))}">+</button>
              </div>
              <button type="button" class="link-rm" data-act="c-rm" data-i="${i}">${E(T.t("remover"))}</button>
            </div></li>`;
        }).join("")}</ul>
        <dl class="resumo">
          <div><dt>${E(T.t("subtotal"))}</dt><dd>${T.money(t.subtotal)}</dd></div>
          ${t.desconto > 0 ? `<div><dt>${E(T.t("desconto"))}</dt><dd>−${T.money(t.desconto)}</dd></div>` : ""}
          <div class="total"><dt>${E(T.t("total"))}</dt><dd>${T.money(t.total)}</dd></div>
        </dl>
        <fieldset class="modo"><legend>${E(T.t("comoReceber"))}</legend>
          <div class="chips">
            <button type="button" role="radio" aria-checked="${st.modo === "viagem"}" class="chip" data-act="c-modo" data-m="viagem">${E(T.t("levarViagem"))}</button>
            <button type="button" role="radio" aria-checked="${st.modo === "mesa"}" class="chip" data-act="c-modo" data-m="mesa">${E(T.t("comerMesa"))}</button>
          </div>
          ${st.modo === "mesa" ? `<p class="mesa-rot">${E(T.t("escolhaMesa"))}</p><div class="mesas">${Array.from({ length: CONFIG.mesas }, (_, k) => `<button type="button" role="radio" aria-checked="${st.mesa === k + 1}" class="mesa-n" data-act="c-mesa" data-n="${k + 1}" aria-label="${E(T.t("mesa", { n: k + 1 }))}">${k + 1}</button>`).join("")}</div>` : ""}
        </fieldset>
        <label class="campo">${E(T.t("seuNome"))}<input type="text" id="c-nome" maxlength="40" autocomplete="given-name" required value="${E(st.nome)}"></label>
        <label class="campo">${E(T.t("observacoes"))} (${E(T.t("opcional"))})<textarea id="c-obs" maxlength="140" rows="2">${E(st.obs)}</textarea><small id="c-cont">${st.obs.length}/140</small></label>
        <p class="mini">${E(T.t("avisoPedido"))}</p>
        <div class="aviso-preparo">${T.ilus("stickers/xicaras", "aviso-ilus")}<div><p class="aviso-titulo">${E(T.t("avisoPreparoTitulo"))}</p><p class="aviso-texto">${E(T.t("avisoPreparoTexto"))}</p></div></div>
        <button type="button" class="btn btn-vinho btn-bloco" data-act="c-enviar" id="c-enviar" aria-disabled="${c.podeEnviar() ? "false" : "true"}">${E(T.t("enviarWhatsapp"))}</button>
        <p class="falta" id="c-falta" role="status" ${c.pendencia() ? "" : "hidden"}>${E(c.pendencia() || "")}</p>
        <button type="button" class="link-rm limpar" data-act="c-limpar">${E(T.t("limparPedido"))}</button>`;
      }
      h += `</div>`;
      el.innerHTML = h;
      const ns = $(".tela-scroll", el);
      if (ns) ns.scrollTop = y;
      if (el._enviado && st.linhas.length) ns.insertAdjacentHTML("afterbegin", `<div class="enviado" role="status">${E(T.t("pedidoAberto"))}<small>${E(T.cfg("instagramConvite.aposPedido", CONFIG.instagramConvite.aposPedido))}</small></div>`);
      const n = $("#c-nome", el), o = $("#c-obs", el);
      if (n) n.addEventListener("input", () => {
        c.set("nome", n.value, true);                          // digitando não redesenha a tela; só atualiza o botão
        const btn = $("#c-enviar", el), f = $("#c-falta", el), p = c.pendencia();
        btn.setAttribute("aria-disabled", p ? "true" : "false");
        f.hidden = !p; f.textContent = p || "";
      });
      if (o) o.addEventListener("input", () => { c.set("obs", o.value.slice(0, 140), true); $("#c-cont", el).textContent = o.value.length + "/140"; });
    };
    el._render = render;
    render();
    return el;
  };
  const semEnviado = () => { const el = $('.layer[data-name="pedido"]'); if (el) el._enviado = false; };
  T.acts["c-qtd"] = (b) => { semEnviado(); T.cart.setQtd(+b.dataset.i, +b.dataset.d); };
  T.acts["c-rm"] = (b) => { semEnviado(); T.cart.remover(+b.dataset.i); };
  T.acts["c-modo"] = (b) => { T.cart.st.modo = b.dataset.m; if (b.dataset.m === "viagem") T.cart.st.mesa = null; T.cart.set("modo", b.dataset.m); };
  T.acts["c-mesa"] = (b) => T.cart.set("mesa", +b.dataset.n);
  T.acts["c-limpar"] = () => { if (confirm(T.t("confirmaLimpar"))) T.cart.limpar(); };
  T.acts["c-enviar"] = () => {
    const falta = T.cart.pendencia();
    if (falta) {                                        // botão desabilitado: leva até o campo que falta
      const el = $('.layer[data-name="pedido"]');
      const alvo = !T.cart.st.nome.trim() ? $("#c-nome", el) : $(".mesas", el);
      if (alvo) { alvo.scrollIntoView({ block: "center", behavior: T.reduzMovimento() ? "auto" : "smooth" }); if (alvo.focus) alvo.focus({ preventScroll: true }); }
      return;
    }
    window.open(T.cart.urlWhatsApp(), "_blank", "noopener");
    T.v.confete();
    const el = $('.layer[data-name="pedido"]');
    if (el) { el._enviado = true; el._render(); const sc = $(".tela-scroll", el); if (sc) sc.scrollTop = 0; }
  };
  T.acts["ver-cardapio"] = () => api.irPara("bebidas");

  /* ===== menu de três tracinhos ===== */
  build.menu = () => {
    const el = camada("menu", "layer-menu", T.t("menuCardapio"));
    const link = (rot, acao, arg) => `<li><button type="button" data-act="${acao}" ${arg ? `data-arg="${arg}"` : ""}>${rot}</button></li>`;
    el.innerHTML = `
      <div class="tela-topo"><span class="titulo">${E(T.t("menuCardapio"))}</span><button type="button" class="fechar-tela" data-act="back" aria-label="${E(T.t("fecharMenu"))}">×</button></div>
      <div class="menu-idiomas" role="group" aria-label="${E(T.t("idioma"))}"><span>${E(T.t("idioma"))}</span><div>${T.v.seletorIdioma(true)}</div></div>
      <ul class="menu-lista">
        ${link(E(T.t("menuCardapio")), "m-ir", "bebidas")}
        ${link(E(T.t("menuQuiz")), "m-abrir", "quiz")}
        ${link(E(T.t("menuAulas")), "m-ir", "aulas")}
        ${link(E(T.t("menuChapeu")), "m-abrir", "chapeu")}
        ${link(E(T.t("menuFidelidade")), "m-ir", "fidelidade")}
        <li><a href="${E(CONFIG.avaliacaoGoogle)}" target="_blank" rel="noopener">${E(T.t("menuAvalie"))}</a></li>
        ${link(E(T.t("menuHorarios")), "m-ir", "horarios")}
      </ul>
      <p class="menu-rodape">${E(CONFIG.nome)} · ${E(CONFIG.cidade)}</p>`;
    return el;
  };
  T.acts["m-ir"] = (b) => api.irPara(b.dataset.arg);
  T.acts["m-abrir"] = (b) => api.fechaTudo(() => api.abrir(b.dataset.arg));

  /* ===== quiz "Descubra seu café" (regras em data/quiz.js) ===== */
  T.quiz = {
    // Motor: filtros nunca são removidos; pontua por resposta; desempata; evita 3 itens da mesma categoria.
    calcula(resp) {                                   // resp: lista de índices de resposta, um por pergunta
      const escolhidas = QUIZ_PERGUNTAS.map((p, i) => p.respostas[resp[i]]);
      let cands = MENU.filter((i) => i.grupo === "bebidas" && i.pedido !== false && i.tamanhos.length);
      escolhidas.forEach((r) => {
        const f = r.filtro; if (!f) return;
        cands = cands.filter((it) => (f.exigir || []).every((t) => it.etiquetas.includes(t)) && !(f.excluir || []).some((t) => it.etiquetas.includes(t)));
      });
      const lista = cands.map((it, ordem) => {
        const porResposta = escolhidas.map((r) => (r.pesos ? it.etiquetas.reduce((s, t) => s + (r.pesos[t] || 0), 0) : 0));
        return { it, ordem, pts: porResposta.reduce((a, b) => a + b, 0), porResposta };
      });
      const preco = (it) => it.tamanhos[T.tamRec(it)].preco;
      lista.sort((x, y) => y.pts - x.pts
        || (y.it.selo === "favorito") - (x.it.selo === "favorito")
        || y.it.etiquetas.includes("cafe") - x.it.etiquetas.includes("cafe")
        || preco(x.it) - preco(y.it)
        || x.ordem - y.ordem);
      if (!lista.length) return null;
      const topo = lista[0], outros = lista.slice(1);
      let segundo = outros[0], terceiro = outros[1];
      if (segundo && terceiro && segundo.it.categoria === topo.it.categoria && terceiro.it.categoria === topo.it.categoria) {
        const outra = outros.slice(2).find((x) => x.it.categoria !== topo.it.categoria);
        if (outra) terceiro = outra;
      }
      const define = {};
      escolhidas.forEach((r) => Object.assign(define, r.define || {}));
      const pega = (x) => {                            // tamanho e leite escolhidos no quiz
        const it = x.it;
        let tam = T.tamRec(it);
        if (define.temperatura === "gelado") { const g = it.tamanhos.findIndex((t) => t.rotulo === "Gelado"); if (g >= 0) tam = g; }
        const sel = T.padroes(it);
        if (define.leite && OPCOES.leite && it.opcoes.includes("leite") && OPCOES.leite.itens.some((o) => o.id === define.leite)) sel.leite = [define.leite];
        return { item: it, tam, sel, pts: x.pts };
      };
      // explicação: as 2 respostas que mais somaram pontos para o 1º lugar (com motivo)
      const motivos = escolhidas.map((r, i) => ({ m: r.motivo, p: topo.porResposta[i], i })).filter((x) => x.m);
      const ordenados = motivos.filter((x) => x.p > 0).sort((a, b) => b.p - a.p || a.i - b.i).slice(0, 2);
      if (ordenados.length < 2) motivos.filter((x) => x.p <= 0 && x.p === 0).forEach((x) => { if (ordenados.length < 2) ordenados.push(x); });
      const explicacao = ordenados.map((x) => x.i);       // perguntas cujos "motivos" explicam o resultado (o texto é montado na hora, no idioma atual)
      let acomp = null;
      if (define.acompanhamento === "salgado" || define.acompanhamento === "doce") {
        const idx = HARMONIZACAO.findIndex((h) => topo.it.etiquetas.includes(h.etiqueta));
        const regra = idx >= 0 ? HARMONIZACAO[idx] : HARMONIZACAO_PADRAO;
        const food = T.item(regra[define.acompanhamento]);
        if (food) acomp = { item: food, tam: T.tamRec(food), sel: T.padroes(food), harm: idx };
      }
      return { principal: pega(topo), explicacao, alternativas: [segundo, terceiro].filter(Boolean).map(pega), acomp };
    },
    // Console: testeQuiz() roda 1.000 combinações aleatórias
    teste(n) {
      n = n || 1000;
      let sem = 0; const primeiros = {};
      for (let k = 0; k < n; k++) {
        const resp = QUIZ_PERGUNTAS.map((p) => Math.floor(Math.random() * p.respostas.length));   // aleatório só no teste
        const r = T.quiz.calcula(resp);
        if (!r) { sem++; continue; }
        primeiros[r.principal.item.id] = (primeiros[r.principal.item.id] || 0) + 1;
      }
      const ids = Object.keys(primeiros).sort((a, b) => primeiros[b] - primeiros[a]);
      console.info(`[TOSTES] testeQuiz: ${n} combinações · sem resultado: ${sem} · itens diferentes em 1º lugar: ${ids.length}`);
      console.table(ids.slice(0, 10).map((id) => ({ item: id, vezes: primeiros[id] })));
      return { combinacoes: n, semResultado: sem, itensEmPrimeiro: ids.length };
    }
  };
  window.testeQuiz = (n) => T.quiz.teste(n);

  build.quiz = () => {
    const el = camada("quiz", "layer-tela layer-creme", T.t("menuQuiz"));
    const Q = { passo: -1, resp: [], res: null, trava: false };
    el._Q = Q;
    const card = (r, grande) => {
      const it = r.item, t = it.tamanhos[r.tam], un = T.precoUnit(it, r.tam, r.sel);
      const ops = T.textoOpcoes(it, r.sel);
      return `<div class="card card-quiz${grande ? " card-gd" : ""}">
        <button type="button" class="card-hit" data-act="open-item" data-id="${E(it.id)}" aria-label="${E(T.t("verDetalhes", { nome: T.nome(it) }))}">
          <span class="foto">${T.foto(it.foto, T.nome(it), it.grupo, 92, 92, "", it)}</span>
          <span class="txt"><span class="nome">${E(T.nome(it))}</span>
            <span class="desc">${E([it.tamanhos.length > 1 ? T.rot(t.rotulo) : "", ...ops].filter(Boolean).join(" · ") || T.itemTxt(it).descricaoCurta)}</span>
            <span class="preco-linha"><span class="preco">${T.money(un)}</span></span></span></button></div>`;
    };
    const render = () => {
      const n = QUIZ_PERGUNTAS.length;
      let h = `<div class="tela-topo"><h2 class="titulo">${E(T.t("menuQuiz"))}</h2><button type="button" class="fechar-tela" data-act="back" aria-label="${E(T.t("fechar"))}">×</button></div><div class="tela-scroll quiz-corpo">`;
      if (Q.passo < 0) {
        h += `${T.ilus("xicara", "quiz-gd")}<p class="quiz-intro">${E(T.qTxt.textos("abertura"))}</p><button type="button" class="btn btn-vinho btn-bloco" data-act="q-iniciar">${E(T.t("comecar"))}</button>`;
      } else if (Q.passo < n) {
        const p = QUIZ_PERGUNTAS[Q.passo];
        h += `<div class="quiz-barra" role="progressbar" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${Q.passo}"><i style="width:${(Q.passo / n) * 100}%"></i></div>
          <p class="quiz-passo">${E(T.t("perguntaDe", { n: Q.passo + 1, total: n }))}</p>
          <h3 class="titulo quiz-pergunta">${E(T.qTxt.pergunta(p))}</h3>
          <p class="quiz-apoio">${E(T.qTxt.apoio(p))}</p>
          <div class="quiz-resp">${p.respostas.map((r, k) => `<button type="button" class="btn-resp${Q.resp[Q.passo] === k ? " on" : ""}" data-act="q-resp" data-k="${k}">${E(T.qTxt.resposta(p, k))}</button>`).join("")}</div>
          ${Q.passo > 0 ? `<button type="button" class="link-rm" data-act="q-voltar">${E(T.t("voltar"))}</button>` : ""}`;
      } else {
        const r = Q.res;
        if (!r) h += `<p class="quiz-intro">${E(T.t("quizSemResultado"))}</p>`;
        else {
          const ms = r.explicacao.map((qi) => T.qTxt.motivo(QUIZ_PERGUNTAS[qi], Q.resp[qi]));
          const explica = ms.length ? T.qTxt.textos("porque") + " " + ms.join(" " + T.qTxt.textos("e") + " ") + "." : "";
          const addBtn = (w, cls) => `<button type="button" class="btn ${cls} btn-bloco" data-act="q-add" data-w="${w}">${E(T.t("adicionarAoPedido"))}</button>`;
          h += `<h3 class="quiz-sec quiz-sec-moka">${E(T.qTxt.textos("titulo"))}<img src="assets/ilustracoes/stickers/moka.svg" alt="" width="36" height="36"></h3>${card(r.principal, true)}
            ${explica ? `<p class="quiz-explica">${E(explica)}</p>` : ""}
            ${addBtn("p", "btn-vinho")}`;
          if (r.alternativas.length) h += `<h3 class="quiz-sec">${E(T.qTxt.textos("alternativas"))}</h3><div class="quiz-alt">${r.alternativas.map((a, k) => `<div>${card(a)}${addBtn("a" + k, "btn-contorno")}</div>`).join("")}</div>`;
          if (r.acomp) h += `<h3 class="quiz-sec">${E(T.qTxt.textos("acompanhamento"))}</h3>${card(r.acomp)}<p class="quiz-explica">${E(T.qTxt.harmonizacao(r.acomp.harm))}</p>
            ${addBtn("c", "btn-contorno")}
            <button type="button" class="btn btn-vinho btn-bloco" data-act="q-add" data-w="os-dois">${E(T.t("adicionarOsDois"))}</button>`;
        }
        h += `<button type="button" class="link-rm limpar" data-act="q-refazer">${E(T.qTxt.textos("refazer"))}</button>`;
      }
      el.innerHTML = h + `</div>`;
    };
    el._render = null;
    el._draw = render;
    render();
    return el;
  };
  const quizEl = (b) => b.closest(".layer");
  T.acts["q-iniciar"] = (b) => { const e = quizEl(b); e._Q.passo = 0; e._Q.resp = []; e._draw(); };
  T.acts["q-resp"] = (b) => {
    const e = quizEl(b), Q = e._Q;
    if (Q.trava) return;
    Q.trava = true;
    Q.resp[Q.passo] = +b.dataset.k;
    b.classList.add("on");                              // a resposta acende e o quiz avança sozinho
    setTimeout(() => {
      Q.trava = false;
      Q.passo++;
      if (Q.passo >= QUIZ_PERGUNTAS.length) Q.res = T.quiz.calcula(Q.resp);
      e._draw();
      const sc = $(".tela-scroll", e); if (sc) sc.scrollTop = 0;
    }, 250);
  };
  T.acts["q-voltar"] = (b) => { const e = quizEl(b); e._Q.passo = Math.max(0, e._Q.passo - 1); e._draw(); };
  T.acts["q-refazer"] = (b) => { const e = quizEl(b); Object.assign(e._Q, { passo: 0, resp: [], res: null }); e._draw(); };
  T.acts["q-add"] = (b) => {
    const r = quizEl(b)._Q.res, w = b.dataset.w;
    const poe = (x) => {                                // devolve true se adicionou; false se precisou abrir o detalhe
      if (T.faltando(x.item, x.sel).length) { T.preset[x.item.id] = { tam: x.tam, sel: x.sel }; api.abrir("item/" + x.item.id); return false; }
      T.cart.addItem(x.item.id, x.tam, x.sel, 1);
      return true;
    };
    if (w === "os-dois") {
      T.cart.addItem(r.acomp.item.id, r.acomp.tam, r.acomp.sel, 1);
      if (poe(r.principal)) T.toast(T.t("adicionadosDois"), { act: "open-pedido", rotulo: T.t("verPedido") });
      else T.toast(T.t("acompAdicionado"));
      return;
    }
    const x = w === "p" ? r.principal : w === "c" ? r.acomp : r.alternativas[+w.slice(1)];
    if (poe(x)) T.toast(T.t("adicionadoNome", { nome: T.nome(x.item) }), { act: "open-pedido", rotulo: T.t("verPedido") });
  };
  T.preset = {};                                        // tamanho e leite vindos do quiz para a tela de detalhe

  /* ===== aulas (stories) =====
     Toque no terço esquerdo volta; no resto da tela avança. Segurar pausa (não navega).
     Deslizar para baixo ou o X fecha. Os slides nunca avançam sozinhos; o texto rola dentro do slide.
     Ao fim da aula segue para a próxima da trilha; na última da trilha, mostra "Você terminou a trilha". */
  build.aula = (id) => {
    let aula = AULAS.find((a) => a.id === id);
    if (!aula) return null;
    const el = camada("aula/" + id, "layer-aula", T.aulaTxt(aula).titulo);
    let k = 0, fim = false;
    const trilhaDe = (a) => AULAS_TRILHAS.find((t) => t.id === a.trilha);
    const proximaTrilha = () => {
      const i = AULAS_TRILHAS.findIndex((t) => t.id === aula.trilha);
      for (let j = i + 1; j < AULAS_TRILHAS.length; j++) { const a = AULAS.find((x) => x.trilha === AULAS_TRILHAS[j].id); if (a) return a; }
      return null;
    };
    const abre = () => { T.vistas.marca(aula.id); T.v.atualizaVistas(); el.setAttribute("aria-label", T.aulaTxt(aula).titulo); };
    // imagem do slide tem prioridade; no primeiro slide, sem imagem própria, vale a capa da aula
    const imagemDoSlide = (s) => s.imagem || (k === 0 ? aula.imagem : null);
    const focoDoSlide = (s) => (s.imagem ? s.foco : aula.foco) || "50% 50%";      // foco da aula na capa; do slide na imagem do slide
    const render = () => {
      const n = aula.slides.length, at = T.aulaTxt(aula);
      if (fim) {
        const prox = proximaTrilha();
        el.innerHTML = `
          <div class="story-topo"><span>${E(at.titulo)}</span><button type="button" class="fechar-tela" data-act="back" aria-label="${E(T.t("fecharAula"))}">×</button></div>
          <div class="story-corpo story-fim">${T.icone(aula.icone, "story-ilus")}<h2 class="titulo">${E(T.t("trilhaTerminada", { nome: T.aulaTrilhaTxt(trilhaDe(aula)).nome }))}</h2>
            <div class="story-botoes">${prox ? `<button type="button" class="btn btn-vinho" data-act="s-trilha">${E(T.t("proximaTrilha"))}</button>` : ""}<button type="button" class="btn btn-contorno" data-act="back">${E(T.t("fechar"))}</button></div></div>`;
        return;
      }
      const s = at.slide(k), ultimo = k === n - 1;
      const botoes = [];
      if (ultimo && aula.item && T.item(aula.item)) botoes.push(`<button type="button" class="btn btn-vinho" data-act="s-item" data-id="${E(aula.item)}">${E(T.t("verNoCardapio"))}</button>`);
      if (ultimo && aula.link) botoes.push(`<button type="button" class="btn btn-vinho" data-act="s-link" data-h="${E(aula.link.replace(/^#/, ""))}">${E(T.t("conhecerHistoria"))}</button>`);
      el.innerHTML = `
        <div class="story-barras" aria-hidden="true">${aula.slides.map((_, j) => `<i class="${j <= k ? "feita" : ""}"></i>`).join("")}</div>
        <div class="story-topo"><span>${E(at.titulo)}${at.leitura ? ` <em>· ${E(T.t("leitura", { n: at.leitura }))}</em>` : ""}</span><button type="button" class="fechar-tela" data-act="back" aria-label="${E(T.t("fecharAula"))}">×</button></div>
        <div class="story-corpo" tabindex="0"><div class="story-miolo">
          ${imagemDoSlide(s) ? `<div class="story-img-bloco"><img class="story-img" src="${E(imagemDoSlide(s))}" alt="${E(s.titulo)}" width="720" height="900" decoding="async" style="object-position:${E(focoDoSlide(s))}" data-remove-se-falhar="1"></div>` : ""}
          <p class="story-n">${E(T.t("perguntaDe", { n: k + 1, total: n }))}</p>
          ${s.destaque ? `<p class="story-destaque"><strong>${E(s.destaque.valor)}</strong><span>${E(s.destaque.legenda)}</span></p>` : ""}
          <h2 class="titulo">${E(s.titulo)}</h2><p class="story-texto">${E(s.texto)}</p>
          ${botoes.length ? `<div class="story-botoes">${botoes.join("")}</div>` : ""}
          </div>
          <div class="sr-nav"><button type="button" data-act="s-ant">${E(T.t("slideAnterior"))}</button><button type="button" data-act="s-prox">${E(T.t("proximoSlide"))}</button></div>
        </div>`;
    };
    const proximaAula = () => {
      const irmas = AULAS.filter((a) => a.trilha === aula.trilha), j = irmas.indexOf(aula);
      if (j < irmas.length - 1) { aula = irmas[j + 1]; k = 0; abre(); render(); } else { fim = true; render(); }
    };
    el._story = {
      prox() { if (k < aula.slides.length - 1) { k++; render(); } else proximaAula(); },
      ant() { if (k > 0) { k--; render(); } },
      trilha() { const a = proximaTrilha(); if (a) { aula = a; k = 0; fim = false; abre(); render(); } }
    };
    // toque na tela: terço esquerdo volta, o resto avança; toque longo pausa; arrastar rola o texto (o navegador não gera clique)
    let t0 = 0, x0 = 0, y0 = 0;
    el.addEventListener("pointerdown", (e) => { t0 = Date.now(); });
    el.addEventListener("click", (e) => {
      if (fim || e.target.closest("button, a") || !e.target.closest(".story-corpo")) return;
      if (Date.now() - t0 > 350) return;
      const r = el.getBoundingClientRect();
      if (e.clientX - r.left < r.width / 3) el._story.ant(); else el._story.prox();
    });
    el.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener("touchend", (e) => {
      const t = e.changedTouches[0], sc = $(".story-corpo", el);
      if (t.clientY - y0 > 110 && Math.abs(t.clientX - x0) < 70 && (!sc || sc.scrollTop <= 0)) api.voltar();     // deslizar para baixo fecha
    }, { passive: true });
    abre();
    render();
    return el;
  };
  T.acts["s-prox"] = (b) => b.closest(".layer")._story.prox();
  T.acts["s-ant"] = (b) => b.closest(".layer")._story.ant();
  T.acts["s-trilha"] = (b) => b.closest(".layer")._story.trilha();
  T.acts["s-item"] = (b) => api.fechaTudo(() => api.abrir("item/" + b.dataset.id));
  T.acts["s-link"] = (b) => api.fechaTudo(() => api.abrir(b.dataset.h));

  /* ===== por trás do chapéu ===== */
  build.chapeu = () => {
    const el = camada("chapeu", "layer-tela layer-creme", T.t("menuChapeu"));
    // TEXTO PROVISÓRIO — o dono vai substituir.
    el.innerHTML = `
      <div class="tela-topo"><h2 class="titulo">${E(T.t("menuChapeu"))}</h2><button type="button" class="fechar-tela" data-act="back" aria-label="${E(T.t("fechar"))}">×</button></div>
      <div class="tela-scroll chapeu-corpo">
        <div class="chapeu-foto">${T.foto("assets/fotos/chapeu-historia.jpg", T.t("legendaChapeu"), "bebidas", 480, 360)}</div>
        ${T.ilus("chapeu", "chapeu-gd")}
        <p>O chapéu da nossa marca é uma homenagem ao avô do fundador, Lucas Tostes, e a todos os trabalhadores e trabalhadoras que passam o dia no sol para o café chegar até a xícara.</p>
        <p>Cada café que sai daqui carrega um pouco desse trabalho. Obrigado por fazer parte dessa história.</p>
        <button type="button" class="btn btn-vinho btn-bloco" data-act="ver-cardapio">${E(T.t("verCardapio"))}</button>
      </div>`;
    return el;
  };

  /* ---- pilha e histórico ---- */
  function cria(nome) {
    const [k, ...r] = nome.split("/");
    return build[k] ? build[k](r.join("/")) : null;
  }

  function sincroniza() {
    // remove o que saiu da pilha
    Array.from(cont.children).forEach((el) => {
      if (!pilha.includes(el.dataset.name) && !el._saindo) {
        el._saindo = true;
        el.classList.add("saindo");
        setTimeout(() => el.remove(), T.reduzMovimento() ? 0 : 230);
      }
    });
    // cria o que entrou
    pilha = pilha.filter((nome, i) => {
      let el = Array.from(cont.children).find((x) => x.dataset.name === nome && !x._saindo);
      if (!el) {
        el = cria(nome);
        if (!el) return false;
        cont.appendChild(el);
        const foco = $("button", el);
        if (foco) setTimeout(() => foco.focus({ preventScroll: true }), 50);
      }
      el.style.zIndex = (nome.startsWith("item/") ? 80 : 60) + i;
      return true;
    });
    document.body.classList.toggle("trava", pilha.length > 0);
    T.v.bag();
    if (!pilha.length && pendente) {
      // espera o navegador terminar de voltar no histórico: ele restaura a rolagem antiga logo após o popstate
      const f = pendente; pendente = null;
      setTimeout(f, 60);
    }
  }

  const api = {
    abertas: () => pilha.length > 0,
    atualiza() { Array.from(cont.children).forEach((el) => el._render && !el._saindo && el._render()); },
    // troca de idioma com telas abertas (o seletor fica no menu): redesenha cada uma sem perder o estado
    atualizaIdioma() {
      Array.from(cont.children).forEach((el) => {
        if (el._saindo) return;
        if (el.dataset.name === "menu") { const n = build.menu(); el.innerHTML = n.innerHTML; el.setAttribute("aria-label", n.getAttribute("aria-label")); }
        else if (el._render) el._render();
        else if (el._S) el._S.render();
        else if (el._draw) el._draw();
      });
    },
    abrir(nome) {
      if (pilha.includes(nome)) return;
      pilha.push(nome);
      history.pushState({ pilha: pilha.slice() }, "", "#" + nome);
      sincroniza();
    },
    voltar() {
      if (!pilha.length) return;
      history.back();
    },
    fechaTudo(cb) {
      if (!pilha.length) { if (cb) cb(); return; }
      pendente = cb || null;
      history.go(-pilha.length);
      // se o navegador não avisar o popstate (acontece em alguns celulares), fecha à força
      setTimeout(() => { if (pendente) { pilha = []; sincroniza(); } }, 400);
    },
    irPara(id) {                         // fecha as telas e rola até a seção
      api.fechaTudo(() => {
        const alvo = document.getElementById(id);
        if (alvo) alvo.scrollIntoView({ behavior: T.reduzMovimento() ? "auto" : "smooth", block: "start" });
      });
    },
    iniciar() {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";   // senão o navegador desfaz a rolagem do menu
      const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
      history.replaceState({ pilha: [] }, "", limpa());
      if (hash && cria(hash)) {           // abriu direto por um link (#item/cappuccino, #chapeu...)
        const el = cria(hash); if (el) { pilha = [hash]; history.pushState({ pilha: [hash] }, "", "#" + hash); }
      }
      sincroniza();
    }
  };

  window.addEventListener("popstate", (e) => {
    pilha = (e.state && e.state.pilha) ? e.state.pilha.slice() : [];
    sincroniza();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && pilha.length) api.voltar(); });
  T.cart.onChange(() => { api.atualiza(); T.v.bag(); });
  T.acts.back = () => api.voltar();
  T.acts.open = (b) => api.abrir(b.dataset.name);
  T.acts["open-item"] = (b) => api.abrir("item/" + b.dataset.id);
  T.acts["open-pedido"] = () => api.abrir("pedido");
  T.acts.add = (b) => {
    const it = T.item(b.dataset.id);
    if (T.adicionaDireto(it)) {
      T.cart.addItem(it.id, 0, T.padroes(it), 1);
      T.toast(T.t("adicionadoNome", { nome: T.nome(it) }), { act: "open-pedido", rotulo: T.t("verPedido") });
    } else api.abrir("item/" + it.id);
  };
  T.acts.go = (b) => api.irPara(b.dataset.id);
  return api;
})();
