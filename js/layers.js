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
  build.item = (id) => {
    const it = T.item(id);
    if (!it) return null;
    const el = camada("item/" + id, "layer-item", T.nome(it));
    const S = { it, tam: T.tamRec(it), sel: T.padroes(it), qtd: 1 };
    el._S = S;
    el.innerHTML = `
      <div class="sheet">
        <div class="sheet-scroll">
          <div class="sheet-foto">${T.foto(it.foto, T.nome(it), it.grupo, 480, 360)}
            <span class="puxador" aria-hidden="true"></span>
            <button type="button" class="fechar" data-act="back" aria-label="Fechar">×</button>
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
      const tag = [];
      if (it.selo === "favorito") tag.push('<span class="tag tag-fav">Favorito da casa</span>');
      if (it.serve) tag.push(`<span class="tag">Serve ${it.serve}</span>`);
      let h = "";
      h += tag.length ? `<p class="tags">${tag.join("")}</p>` : "";
      h += `<h2 class="titulo sheet-nome">${E(T.nome(it))}</h2>`;
      if (pedivel) {
        const t1 = it.tamanhos[0];
        h += `<p class="sheet-preco"><span class="preco preco-gd">${T.money(total)}</span>${it.tamanhos.length === 1 && t1.ml ? `<span class="ml">${t1.ml} ml</span>` : ""}</p>`;
      }
      h += `<p class="sheet-desc">${E(it.descricao || it.descricaoCurta)}</p>`;
      if (!pedivel) {
        h += `<p class="aviso-balcao">Consulte o sabor no balcão</p>`;
      } else {
        if (it.tamanhos.length > 1) {
          const rec = T.temRec(it) ? T.tamRec(it) : -1;
          h += `<div class="grupo"><h3>Tamanho</h3><div class="tamanhos" role="radiogroup" aria-label="Tamanho">${it.tamanhos.map((t, k) =>
            `<div class="tam-col"><em class="rec">${k === rec ? "Recomendado" : "&nbsp;"}</em><button type="button" role="radio" aria-checked="${k === S.tam}" class="tam" data-act="sheet-tam" data-i="${k}"><b>${E(t.rotulo)}</b><small>${t.ml ? t.ml + " ml" : "&nbsp;"}</small><span>${T.money(t.preco)}</span></button></div>`).join("")}</div></div>`;
        }
        it.opcoes.forEach((g) => {
          const gr = OPCOES[g], escolhidos = S.sel[g] || [], max = T.maximo(gr);
          h += `<div class="grupo"><h3>${E(gr.titulo)}${gr.tipo === "multipla" && max !== Infinity ? ` <em>${escolhidos.length} de ${max}</em>` : ""}</h3>`;
          if (g === "leite") h += `<p class="nota-grupo">Zero lactose e vegetal sem custo extra.</p>`;
          if (g === "complementos-cappuccino") {
            h += `<div class="chips chips-gd" role="group" aria-label="${E(gr.titulo)}">${gr.itens.map((o) => {
              const on = escolhidos.includes(o.id), trava = !on && escolhidos.length >= max;
              return `<button type="button" class="chip chip-gd" aria-pressed="${on}" data-act="sheet-opt" data-g="${g}" data-o="${o.id}" ${trava ? "disabled" : ""}>${E(o.nome)}</button>`;
            }).join("")}</div>`;
          } else if (gr.tipo === "unica") {
            h += `<div class="chips" role="radiogroup" aria-label="${E(gr.titulo)}">${gr.itens.map((o) =>
              `<button type="button" role="radio" aria-checked="${escolhidos.includes(o.id)}" class="chip" data-act="sheet-opt" data-g="${g}" data-o="${o.id}">${E(o.nome)}${o.valor > 0 ? ` <small>+ ${T.money(o.valor)}</small>` : ""}</button>`).join("")}</div>`;
          } else {
            h += `<div class="checks">${gr.itens.map((o) => {
              const on = escolhidos.includes(o.id);
              const trava = !on && escolhidos.length >= max;
              return `<label class="check${trava ? " trava" : ""}"><input type="checkbox" data-act="sheet-opt" data-g="${g}" data-o="${o.id}" ${on ? "checked" : ""} ${trava ? "disabled" : ""}><span class="caixa"></span><span class="rot">${E(o.nome)}</span>${o.valor > 0 ? `<small>+ ${T.money(o.valor)}</small>` : ""}</label>`;
            }).join("")}</div>`;
          }
          h += `</div>`;
        });
      }
      if (it.ingredientes.length) h += `<div class="grupo"><h3>${it.grupo === "bebidas" ? "O que vai na bebida" : "O que vai no prato"}</h3><ul class="ingr">${it.ingredientes.map((x) => `<li>${E(x)}</li>`).join("")}</ul></div>`;
      if (it.serve) h += `<p class="serve">Serve ${it.serve} pessoas</p>`;
      if (it.preparo) h += `<div class="grupo"><h3>Como é preparado</h3><p>${E(it.preparo)}</p></div>`;
      if (it.fichaTecnica) {
        const rot = { dose: "Dose", extracao: "Extração", temperatura: "Temperatura" };
        h += `<dl class="ficha" aria-label="Ficha técnica">${Object.keys(it.fichaTecnica).map((k) => `<div><dt>${E(rot[k] || k)}</dt><dd>${E(it.fichaTecnica[k])}</dd></div>`).join("")}</dl>`;
      }
      corpo.innerHTML = h;
      if (!pedivel) { barra.innerHTML = ""; barra.hidden = true; }
      else {
        const falta = T.faltaTexto(it, S.sel);
        barra.hidden = false;
        barra.innerHTML = `
          ${falta.length ? `<p class="falta">${E(falta.join(". "))}.</p>` : ""}
          <div class="barra-linha">
            <div class="stepper" role="group" aria-label="Quantidade">
              <button type="button" data-act="sheet-qtd" data-d="-1" aria-label="Diminuir" ${S.qtd <= 1 ? "disabled" : ""}>−</button>
              <output>${S.qtd}</output>
              <button type="button" data-act="sheet-qtd" data-d="1" aria-label="Aumentar">+</button>
            </div>
            <button type="button" class="btn btn-vinho btn-add" data-act="sheet-add" ${falta.length ? "disabled" : ""}>Adicionar · ${T.money(total)}</button>
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
    T.toast("Adicionado · " + T.nome(S.it), { act: "open-pedido", rotulo: "Ver pedido" });
  };

  /* ===== pedido (carrinho) ===== */
  build.pedido = () => {
    const el = camada("pedido", "layer-tela", "Seu pedido");
    const render = () => {
      const c = T.cart, st = c.st, t = c.totais();
      const sc = $(".tela-scroll", el), y = sc ? sc.scrollTop : 0;
      let h = `<div class="tela-topo"><h2 class="titulo">Seu pedido</h2><button type="button" class="fechar-tela" data-act="back" aria-label="Fechar">×</button></div><div class="tela-scroll">`;
      if (!st.linhas.length) {
        h += `<div class="vazio">${T.ilus("xicara", "vazio-ilus")}<p>Seu pedido está vazio.</p><button type="button" class="btn btn-vinho" data-act="ver-cardapio">Ver cardápio</button></div>`;
      } else {
        h += `<ul class="linhas">${st.linhas.map((l, i) => {
          const v = c.valores(l);
          let nome, det;
          if (l.tipo === "combo") {
            nome = l.prefixo;
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
              <div class="stepper stepper-p" role="group" aria-label="Quantidade">
                <button type="button" data-act="c-qtd" data-i="${i}" data-d="-1" aria-label="Diminuir">−</button><output>${l.qtd}</output><button type="button" data-act="c-qtd" data-i="${i}" data-d="1" aria-label="Aumentar">+</button>
              </div>
              <button type="button" class="link-rm" data-act="c-rm" data-i="${i}">Remover</button>
            </div></li>`;
        }).join("")}</ul>
        <dl class="resumo">
          <div><dt>Subtotal</dt><dd>${T.money(t.subtotal)}</dd></div>
          ${t.desconto > 0 ? `<div><dt>Desconto</dt><dd>−${T.money(t.desconto)}</dd></div>` : ""}
          <div class="total"><dt>Total</dt><dd>${T.money(t.total)}</dd></div>
        </dl>
        <fieldset class="modo"><legend>Como você quer receber?</legend>
          <div class="chips">
            <button type="button" role="radio" aria-checked="${st.modo === "balcao"}" class="chip" data-act="c-modo" data-m="balcao">Retirar no balcão</button>
            <button type="button" role="radio" aria-checked="${st.modo === "mesa"}" class="chip" data-act="c-modo" data-m="mesa">Comer na mesa</button>
          </div>
          ${st.modo === "mesa" ? `<p class="mesa-rot">Qual é a sua mesa?</p><div class="mesas">${Array.from({ length: CONFIG.mesas }, (_, k) => `<button type="button" role="radio" aria-checked="${st.mesa === k + 1}" class="mesa-n" data-act="c-mesa" data-n="${k + 1}" aria-label="Mesa ${k + 1}">${k + 1}</button>`).join("")}</div>` : ""}
        </fieldset>
        <label class="campo">Seu nome (opcional)<input type="text" id="c-nome" maxlength="40" autocomplete="given-name" value="${E(st.nome)}"></label>
        <label class="campo">Observações (opcional)<textarea id="c-obs" maxlength="140" rows="2">${E(st.obs)}</textarea><small id="c-cont">${st.obs.length}/140</small></label>
        <p class="mini">Fazer o pedido por aqui é opcional: você também pode pedir no balcão. O pagamento é feito no balcão.</p>
        <button type="button" class="btn btn-vinho btn-bloco" data-act="c-enviar" ${c.podeEnviar() ? "" : "disabled"}>Enviar pedido pelo WhatsApp</button>
        ${st.modo === "mesa" && !st.mesa ? `<p class="falta">Escolha o número da mesa.</p>` : ""}
        <button type="button" class="link-rm limpar" data-act="c-limpar">Limpar pedido</button>`;
      }
      h += `</div>`;
      el.innerHTML = h;
      const ns = $(".tela-scroll", el);
      if (ns) ns.scrollTop = y;
      if (el._enviado && st.linhas.length) ns.insertAdjacentHTML("afterbegin", `<div class="enviado" role="status"><strong>Pedido aberto no WhatsApp.</strong> É só enviar a mensagem.<small>${E(CONFIG.instagramConvite.aposPedido)}</small></div>`);
      const n = $("#c-nome", el), o = $("#c-obs", el);
      if (n) n.addEventListener("input", () => c.set("nome", n.value, true));
      if (o) o.addEventListener("input", () => { c.set("obs", o.value.slice(0, 140), true); $("#c-cont", el).textContent = o.value.length + "/140"; });
    };
    el._render = render;
    render();
    return el;
  };
  const semEnviado = () => { const el = $('.layer[data-name="pedido"]'); if (el) el._enviado = false; };
  T.acts["c-qtd"] = (b) => { semEnviado(); T.cart.setQtd(+b.dataset.i, +b.dataset.d); };
  T.acts["c-rm"] = (b) => { semEnviado(); T.cart.remover(+b.dataset.i); };
  T.acts["c-modo"] = (b) => { T.cart.st.modo = b.dataset.m; if (b.dataset.m === "balcao") T.cart.st.mesa = null; T.cart.set("modo", b.dataset.m); };
  T.acts["c-mesa"] = (b) => T.cart.set("mesa", +b.dataset.n);
  T.acts["c-limpar"] = () => { if (confirm("Limpar todo o pedido?")) T.cart.limpar(); };
  T.acts["c-enviar"] = () => {
    if (!T.cart.podeEnviar()) return;
    window.open(T.cart.urlWhatsApp(), "_blank", "noopener");
    T.v.confete();
    const el = $('.layer[data-name="pedido"]');
    if (el) { el._enviado = true; el._render(); const sc = $(".tela-scroll", el); if (sc) sc.scrollTop = 0; }
  };
  T.acts["ver-cardapio"] = () => api.irPara("bebidas");

  /* ===== menu de três tracinhos ===== */
  build.menu = () => {
    const el = camada("menu", "layer-menu", "Menu");
    const link = (rot, acao, arg) => `<li><button type="button" data-act="${acao}" ${arg ? `data-arg="${arg}"` : ""}>${rot}</button></li>`;
    el.innerHTML = `
      <div class="tela-topo"><span class="titulo">Menu</span><button type="button" class="fechar-tela" data-act="back" aria-label="Fechar menu">×</button></div>
      <ul class="menu-lista">
        ${link("Cardápio", "m-ir", "bebidas")}
        ${link("Descubra seu café", "m-abrir", "quiz")}
        ${link("Aulas", "m-ir", "aulas")}
        ${link("Por trás do chapéu", "m-abrir", "chapeu")}
        ${link("Fidelidade", "m-ir", "fidelidade")}
        <li><a href="${E(CONFIG.avaliacaoGoogle)}" target="_blank" rel="noopener">Avalie no Google</a></li>
        ${link("Horários e localização", "m-ir", "horarios")}
      </ul>
      <p class="menu-rodape">${E(CONFIG.nome)} · ${E(CONFIG.cidade)}</p>`;
    return el;
  };
  T.acts["m-ir"] = (b) => api.irPara(b.dataset.arg);
  T.acts["m-abrir"] = (b) => api.fechaTudo(() => api.abrir(b.dataset.arg));

  /* ===== quiz ===== */
  build.quiz = () => {
    const el = camada("quiz", "layer-tela layer-creme", QUIZ.titulo);
    const Q = { passo: -1, resp: [], res: [] };
    el._Q = Q;
    const render = () => {
      let h = `<div class="tela-topo"><h2 class="titulo">${E(QUIZ.titulo)}</h2><button type="button" class="fechar-tela" data-act="back" aria-label="Fechar">×</button></div><div class="tela-scroll quiz-corpo">`;
      const n = QUIZ.perguntas.length;
      if (Q.passo < 0) {
        h += `${T.ilus("xicara", "quiz-gd")}<p class="quiz-intro">${E(QUIZ.chamada)}</p><button type="button" class="btn btn-vinho btn-bloco" data-act="q-iniciar">Começar</button>`;
      } else if (Q.passo < n) {
        const p = QUIZ.perguntas[Q.passo];
        h += `<p class="quiz-passo">Pergunta ${Q.passo + 1} de ${n}</p><div class="quiz-barra"><i style="width:${(Q.passo / n) * 100}%"></i></div>
          <h3 class="titulo quiz-pergunta">${E(p.titulo)}</h3>
          <div class="quiz-resp">${p.respostas.map((r, k) => `<button type="button" class="btn-resp" data-act="q-resp" data-k="${k}">${E(r.rotulo)}</button>`).join("")}</div>
          ${Q.passo > 0 ? `<button type="button" class="link-rm" data-act="q-voltar">Voltar</button>` : ""}`;
      } else {
        h += `<h3 class="titulo quiz-pergunta">Tem tudo a ver com você</h3><ul class="quiz-res">${Q.res.map((r, k) => {
          const it = r.item, t = it.tamanhos[r.tam];
          return `<li class="card card-quiz"><button type="button" class="card-hit" data-act="open-item" data-id="${E(it.id)}" aria-label="Ver detalhes de ${E(T.nome(it))}">
            <span class="foto">${T.foto(it.foto, T.nome(it), it.grupo, 92, 92)}</span>
            <span class="txt"><span class="nome">${E(it.nome)}</span><span class="desc">${E(it.descricaoCurta)}</span>
            <span class="preco-linha"><span class="preco">${T.money(t.preco)}</span>${it.tamanhos.length > 1 ? ` <small>${E(t.rotulo)}</small>` : ""}</span></span></button>
            <button type="button" class="add" data-act="q-add" data-k="${k}" aria-label="Adicionar ${E(T.nome(it))}">+</button></li>`;
        }).join("")}</ul><button type="button" class="btn btn-contorno btn-bloco" data-act="q-refazer">Refazer</button>`;
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
    Q.resp[Q.passo] = QUIZ.perguntas[Q.passo].respostas[+b.dataset.k].etiqueta;
    Q.passo++;
    if (Q.passo >= QUIZ.perguntas.length) Q.res = T.recomenda(Q.resp);
    e._draw();
  };
  T.acts["q-voltar"] = (b) => { const e = quizEl(b); e._Q.passo = Math.max(0, e._Q.passo - 1); e._draw(); };
  T.acts["q-refazer"] = (b) => { const e = quizEl(b); e._Q.passo = 0; e._Q.resp = []; e._Q.res = []; e._draw(); };
  T.acts["q-add"] = (b) => {
    const r = quizEl(b)._Q.res[+b.dataset.k], it = r.item;
    if (T.faltando(it, T.padroes(it)).length) { api.abrir("item/" + it.id); return; }
    T.cart.addItem(it.id, r.tam, T.padroes(it), 1);
    T.toast("Adicionado · " + T.nome(it), { act: "open-pedido", rotulo: "Ver pedido" });
  };

  // regras do quiz (data/quiz.js): pontua por etiqueta e desempata por "cafe"
  T.recomenda = (escolhas) => {
    const R = QUIZ.regras;
    const lista = MENU.filter((i) => i.grupo === R.grupo && i.pedido !== false && i.tamanhos.length)
      .map((i, ordem) => ({ i, ordem, pts: escolhas.filter((e) => i.etiquetas.includes(e)).length * R.pontosPorEtiqueta, cafe: i.etiquetas.includes(R.desempate) ? 1 : 0 }));
    lista.sort((a, b) => b.pts - a.pts || b.cafe - a.cafe || a.ordem - b.ordem);
    const n = Math.max(R.minimo, Math.min(R.maximo, lista.length));
    return lista.slice(0, n).map((x) => {
      let tam = T.tamRec(x.i);                        // tamanho recomendado (M)
      escolhas.forEach((e) => {
        const alvo = R.tamanhoPorEtiqueta[e];
        const k = alvo ? x.i.tamanhos.findIndex((t) => t.rotulo === alvo) : -1;
        if (k >= 0) tam = k;
      });
      return { item: x.i, tam, pts: x.pts };
    });
  };

  /* ===== aulas (stories) =====
     Toque no terço esquerdo volta; no resto da tela avança. Segurar pausa (não navega).
     Deslizar para baixo ou o X fecha. Os slides nunca avançam sozinhos; o texto rola dentro do slide.
     Ao fim da aula segue para a próxima da trilha; na última da trilha, mostra "Você terminou a trilha". */
  build.aula = (id) => {
    let aula = AULAS.find((a) => a.id === id);
    if (!aula) return null;
    const el = camada("aula/" + id, "layer-aula", aula.titulo);
    let k = 0, fim = false;
    const trilhaDe = (a) => AULAS_TRILHAS.find((t) => t.id === a.trilha);
    const proximaTrilha = () => {
      const i = AULAS_TRILHAS.findIndex((t) => t.id === aula.trilha);
      for (let j = i + 1; j < AULAS_TRILHAS.length; j++) { const a = AULAS.find((x) => x.trilha === AULAS_TRILHAS[j].id); if (a) return a; }
      return null;
    };
    const abre = () => { T.vistas.marca(aula.id); T.v.atualizaVistas(); el.setAttribute("aria-label", aula.titulo); };
    const render = () => {
      const n = aula.slides.length;
      if (fim) {
        const prox = proximaTrilha();
        el.innerHTML = `
          <div class="story-topo"><span>${E(aula.titulo)}</span><button type="button" class="fechar-tela" data-act="back" aria-label="Fechar aula">×</button></div>
          <div class="story-corpo story-fim">${T.icone(aula.icone, "story-ilus")}<h2 class="titulo">Você terminou a trilha ${E(trilhaDe(aula).nome)}</h2>
            <div class="story-botoes">${prox ? `<button type="button" class="btn btn-vinho" data-act="s-trilha">Próxima trilha</button>` : ""}<button type="button" class="btn btn-contorno" data-act="back">Fechar</button></div></div>`;
        return;
      }
      const s = aula.slides[k], ultimo = k === n - 1;
      const botoes = [];
      if (ultimo && aula.item && T.item(aula.item)) botoes.push(`<button type="button" class="btn btn-vinho" data-act="s-item" data-id="${E(aula.item)}">Ver no cardápio</button>`);
      if (ultimo && aula.link) botoes.push(`<button type="button" class="btn btn-vinho" data-act="s-link" data-h="${E(aula.link.replace(/^#/, ""))}">Conhecer a história</button>`);
      el.innerHTML = `
        <div class="story-barras" aria-hidden="true">${aula.slides.map((_, j) => `<i class="${j <= k ? "feita" : ""}"></i>`).join("")}</div>
        <div class="story-topo"><span>${E(aula.titulo)}${aula.leitura ? ` <em>· ${E(aula.leitura)}</em>` : ""}</span><button type="button" class="fechar-tela" data-act="back" aria-label="Fechar aula">×</button></div>
        <div class="story-corpo" tabindex="0"><div class="story-miolo">
          <p class="story-n">${k + 1} de ${n}</p>
          ${s.destaque ? `<p class="story-destaque"><strong>${E(s.destaque.valor)}</strong><span>${E(s.destaque.legenda)}</span></p>` : ""}
          <h2 class="titulo">${E(s.titulo)}</h2><p class="story-texto">${E(s.texto)}</p>
          ${botoes.length ? `<div class="story-botoes">${botoes.join("")}</div>` : ""}
          </div>
          <div class="sr-nav"><button type="button" data-act="s-ant">Slide anterior</button><button type="button" data-act="s-prox">Próximo slide</button></div>
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
    const el = camada("chapeu", "layer-tela layer-creme", "Por trás do chapéu");
    // TEXTO PROVISÓRIO — o dono vai substituir.
    el.innerHTML = `
      <div class="tela-topo"><h2 class="titulo">Por trás do chapéu</h2><button type="button" class="fechar-tela" data-act="back" aria-label="Fechar">×</button></div>
      <div class="tela-scroll chapeu-corpo">
        <div class="chapeu-foto">${T.foto("assets/fotos/chapeu-historia.jpg", "Foto da história por trás do chapéu", "bebidas", 480, 360)}</div>
        ${T.ilus("chapeu", "chapeu-gd")}
        <p>O chapéu da nossa marca é uma homenagem ao avô do fundador, Lucas Tostes, e a todos os trabalhadores e trabalhadoras que passam o dia no sol para o café chegar até a xícara.</p>
        <p>Cada café que sai daqui carrega um pouco desse trabalho. Obrigado por fazer parte dessa história.</p>
        <button type="button" class="btn btn-vinho btn-bloco" data-act="ver-cardapio">Ver cardápio</button>
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
      T.toast("Adicionado · " + T.nome(it), { act: "open-pedido", rotulo: "Ver pedido" });
    } else api.abrir("item/" + it.id);
  };
  T.acts.go = (b) => api.irPara(b.dataset.id);
  return api;
})();
