/* TOSTES café — carrinho e mensagem do WhatsApp. */
"use strict";

T.cart = (function () {
  const KEY = "tostes.pedido";
  const salvo = T.store.get(KEY) || {};
  const st = {
    linhas: Array.isArray(salvo.linhas) ? salvo.linhas.filter((l) => linhaValida(l)) : [],
    modo: salvo.modo === "mesa" ? "mesa" : "viagem",         // "viagem" = Levar pra viagem
    mesa: salvo.mesa || null,
    nome: salvo.nome || "",
    obs: salvo.obs || ""
  };
  const ouvintes = [];

  function linhaValida(l) {                    // descarta linhas de itens que não existem mais
    if (!l) return false;
    if (l.tipo === "combo") return l.partes && l.partes.every((p) => T.item(p.id) && T.item(p.id).tamanhos[p.tam]);
    return T.item(l.id) && T.item(l.id).tamanhos[l.tam];
  }
  function salvar() { T.store.set(KEY, st); ouvintes.forEach((f) => f()); }

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
    limpar() { st.linhas = []; salvar(); },
    set(campo, v, mudo) { st[campo] = v; if (mudo) T.store.set(KEY, st); else salvar(); },   // mudo = não avisa a tela (digitação)

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
      sub = T.r2(sub); desc = T.r2(desc);
      return { subtotal: sub, desconto: desc, total: T.r2(sub - desc), qtd: n };
    },
    // O que falta para enviar (texto curto) ou null. O nome é obrigatório.
    pendencia() {
      if (!st.linhas.length) return T.t("pedidoVazioPendencia");
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
        if (l.tipo === "combo") {
          L.push(`${l.qtd}x ${l.prefixo}: ${l.partes.map((p) => T.nomeParte(p, "pt")).join(" + ")} — ${valor}`);
        } else {
          const it = T.item(l.id);
          const ops = T.textoOpcoes(it, l.sel, false, "pt");
          L.push(`${l.qtd}x ${T.nomeComTam(it, l.tam, "pt")}${ops.length ? " — " + ops.join(", ") : ""} — ${valor}`);
        }
      });
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
  return api;
})();
