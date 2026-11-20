/* TOSTES café — carrinho e mensagem do WhatsApp. */
"use strict";

T.cart = (function () {
  // O pedido NUNCA fica salvo: só existe na memória desta página. Ao recarregar ou voltar outro dia, o carrinho começa vazio,
  // para ninguém reenviar um pedido antigo por engano. (Limpa também o que versões antigas do site tinham guardado.)
  try { sessionStorage.removeItem("tostes.pedido"); } catch (e) { /* sem storage */ }
  // Única exceção: a SACOLA COMPARTILHADA com o cardápio dos gelados (outro site, mesma origem). Só no momento de trocar de cardápio
  // a sacola vai para o sessionStorage (chave tostes.sacola) e o outro site a lê e apaga na hora. Recarregar a página, abrir de novo
  // ou enviar o pedido não traz nada de volta.
  const SACOLA = "tostes.sacola", VALIDADE = 30 * 60 * 1000;
  const st = {
    linhas: [],
    outras: [],                                              // linhas que vieram do cardápio dos gelados: { origem, qtd, preco, texto, nativo }
    modo: "viagem",                                          // "viagem" = Levar pra viagem
    mesa: null,
    nome: "",
    obs: ""
  };
  const ouvintes = [];

  function linhaValida(l) {                    // descarta linhas de itens que não existem mais
    if (!l) return false;
    if (l.tipo === "combo") return l.partes && l.partes.every((p) => T.item(p.id) && T.item(p.id).tamanhos[p.tam]);
    return T.item(l.id) && T.item(l.id).tamanhos[l.tam];
  }
  function salvar() { ouvintes.forEach((f) => f()); }
  const vazio = () => !st.linhas.length && !st.outras.length;

  // Mesa vinda do QR code: ?mesa=3 (valores fora de 1..CONFIG.mesas são ignorados)
  function mesaDaUrl() {
    const v = new URLSearchParams(location.search).get("mesa");
    if (v == null || !/^\d+$/.test(v)) return null;
    const n = parseInt(v, 10);
    return n >= 1 && n <= CONFIG.mesas ? n : null;
  }
  const daUrl = mesaDaUrl();
  if (daUrl) { st.modo = "mesa"; st.mesa = daUrl; }
  if (st.mesa && (st.mesa < 1 || st.mesa > CONFIG.mesas)) st.mesa = null;
  if (st.modo === "mesa" && !st.mesa) st.modo = "viagem";

  const chaveItem = (id, tam, sel) => "i|" + id + "|" + tam + "|" + Object.keys(sel).sort().map((g) => g + ":" + sel[g].slice().sort().join(",")).join(";");
  const chaveCombo = (pref, partes) => "c|" + pref + "|" + partes.map((p) => p.id + ":" + p.tam).join("+");

  // texto da linha em português, sem quantidade e sem preço (vai para o WhatsApp e para a sacola compartilhada)
  function textoPt(l) {
    if (l.tipo === "combo") return `${l.prefixo}: ${l.partes.map((p) => T.nomeParte(p, "pt")).join(" + ")}`;
    const it = T.item(l.id), ops = T.textoOpcoes(it, l.sel, false, "pt");
    return `${T.nomeComTam(it, l.tam, "pt")}${ops.length ? " — " + ops.join(", ") : ""}`;
  }

  const api = {
    st,
    daUrl,
    onChange(f) { ouvintes.push(f); },

    addItem(id, tam, sel, qtd) {
      const key = chaveItem(id, tam, sel);
      const q = qtd || 1;
      const ex = st.linhas.find((l) => l.key === key);
      if (ex) ex.qtd += q;
      else st.linhas.push({ key, tipo: "item", id, tam, sel: JSON.parse(JSON.stringify(sel)), qtd: q });
      salvar();
    },
    addCombo(c) {
      const key = chaveCombo(c.prefixo, c.partes);
      const ex = st.linhas.find((l) => l.key === key);
      if (ex) ex.qtd += 1;
      else st.linhas.push({ key, tipo: "combo", prefixo: c.prefixo, partes: JSON.parse(JSON.stringify(c.partes)), original: c.original, preco: c.preco, qtd: 1 });
      salvar();
    },
    setQtd(i, d) {
      const l = st.linhas[i];
      if (!l) return;
      l.qtd = Math.min(99, l.qtd + d);
      if (l.qtd < 1) st.linhas.splice(i, 1);
      salvar();
    },
    remover(i) { st.linhas.splice(i, 1); salvar(); },
    setQtdOutra(i, d) { const o = st.outras[i]; if (!o) return; o.qtd = Math.min(99, o.qtd + d); if (o.qtd < 1) st.outras.splice(i, 1); salvar(); },
    removerOutra(i) { st.outras.splice(i, 1); salvar(); },
    vazio,
    limpar() { st.linhas = []; st.outras = []; salvar(); },
    enviado() { st.linhas = []; st.outras = []; st.obs = ""; salvar(); },      // depois de abrir o WhatsApp o pedido sai do carrinho (não dá para reenviar sem querer)
    set(campo, v, mudo) { st[campo] = v; if (!mudo) salvar(); },   // mudo = não avisa a tela (digitação)

    valores(l) {                               // unitário original e unitário cobrado
      if (l.tipo === "combo") return { original: l.original, preco: l.preco };
      const p = T.precoUnit(T.item(l.id), l.tam, l.sel);
      return { original: p, preco: p };
    },
    totais() {
      let sub = 0, desc = 0, n = 0;
      st.linhas.forEach((l) => {
        const v = api.valores(l);
        sub += v.original * l.qtd; desc += (v.original - v.preco) * l.qtd; n += l.qtd;
      });
      st.outras.forEach((o) => { sub += o.preco * o.qtd; n += o.qtd; });
      sub = T.r2(sub); desc = T.r2(desc);
      return { subtotal: sub, desconto: desc, total: T.r2(sub - desc), qtd: n };
    },
    // O que falta para enviar (texto curto) ou null. O nome é obrigatório.
    pendencia() {
      if (vazio()) return T.t("pedidoVazioPendencia");
      if (!st.nome.trim()) return T.t("preenchaNome");
      if (st.modo === "mesa" && !st.mesa) return T.t("escolhaNumeroMesa");
      return null;
    },
    podeEnviar() { return api.pendencia() === null; },

    mensagem() {
      const t = api.totais();
      const L = [];
      L.push("*Pedido — " + CONFIG.nome + "*");
      L.push(st.modo === "mesa" ? "*Mesa " + st.mesa + "*" : "*Para viagem*");
      L.push("Nome: " + st.nome.trim());
      // A mensagem é para o barista: vai sempre em português. Se o cliente usa outro idioma, avisa qual.
      if (T.lang !== "pt") L.push("Idioma do cliente: " + T.IDIOMAS.find((x) => x.id === T.lang).cliente);
      L.push("");
      st.linhas.forEach((l) => {
        const v = api.valores(l);
        const valor = T.moneyWA(T.r2(v.preco * l.qtd));
        L.push(`${l.qtd}x ${textoPt(l)} — ${valor}`);
      });
      st.outras.forEach((o) => L.push(`${o.qtd}x ${o.texto} — ${T.moneyWA(T.r2(o.preco * o.qtd))}`));
      L.push("");
      if (t.desconto > 0) {                       // Subtotal e Desconto só aparecem quando há combo com desconto
        L.push("Subtotal: " + T.moneyWA(t.subtotal));
        L.push("Desconto: −" + T.moneyWA(t.desconto));
      }
      L.push("*Total: " + T.moneyWA(t.total) + "*");
      L.push("");
      if (st.obs.trim()) L.push("Obs.: " + st.obs.trim());
      L.push("(Pagamento no balcão)");
      return L.join("\n");
    },
    urlWhatsApp() { return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(api.mensagem()); }
  };

  /* ---------- sacola compartilhada com o cardápio dos gelados ---------- */
  function exporta() {
    const proprias = st.linhas.map((l) => ({ origem: "cardapio", qtd: l.qtd, preco: api.valores(l).preco, texto: textoPt(l), nativo: l }));
    return { v: 1, t: Date.now(), nome: st.nome, modo: st.modo, mesa: st.mesa, obs: st.obs, linhas: proprias.concat(st.outras.map((o) => ({ origem: o.origem, qtd: o.qtd, preco: o.preco, texto: o.texto, nativo: o.nativo }))) };
  }
  function importa(d, tudo) {                   // tudo = substitui a sacola inteira (voltou pelo histórico); senão só preenche
    if (!d || d.v !== 1 || !Array.isArray(d.linhas) || Date.now() - d.t > VALIDADE) return false;
    st.linhas = []; st.outras = [];
    d.linhas.forEach((x) => {
      if (!x || !(x.qtd >= 1) || !(x.preco >= 0)) return;
      if (x.origem === "cardapio") { const n = x.nativo; if (n && linhaValida(n)) { n.qtd = Math.min(99, x.qtd); st.linhas.push(n); } }
      else if (typeof x.texto === "string") st.outras.push({ origem: String(x.origem), qtd: Math.min(99, x.qtd), preco: +x.preco, texto: x.texto, nativo: x.nativo });
    });
    if (tudo || !st.nome) st.nome = String(d.nome || "").slice(0, 40);
    if (!daUrl) { if (d.modo === "mesa" && d.mesa >= 1 && d.mesa <= CONFIG.mesas) { st.modo = "mesa"; st.mesa = d.mesa; } else if (tudo) { st.modo = "viagem"; st.mesa = null; } }
    if (tudo || !st.obs) st.obs = String(d.obs || "").slice(0, 140);
    return true;
  }
  function lerSacola(tudo) {
    let d = null;
    try { d = JSON.parse(sessionStorage.getItem(SACOLA)); sessionStorage.removeItem(SACOLA); } catch (e) { return false; }
    return importa(d, tudo);
  }
  (function () {
    const nav = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {};
    const veioDoOutro = CONFIG.gelados && (document.referrer || "").indexOf(CONFIG.gelados) === 0;
    if (nav.type === "back_forward" || (nav.type === "navigate" && veioDoOutro)) lerSacola(false);
    else { try { sessionStorage.removeItem(SACOLA); } catch (e) { /* sem storage */ } }          // recarregou ou abriu do zero: nada volta
  })();
  window.addEventListener("pagehide", () => {   // saindo da página (para o outro cardápio ou pelo botão voltar): deixa a sacola para o próximo
    try { if (vazio()) sessionStorage.removeItem(SACOLA); else sessionStorage.setItem(SACOLA, JSON.stringify(exporta())); } catch (e) { /* sem storage */ }
  });
  window.addEventListener("pageshow", (e) => {   // voltou do histórico sem recarregar: pega o que mudou no outro cardápio
    if (e.persisted && lerSacola(true)) salvar();
  });
  return api;
})();
