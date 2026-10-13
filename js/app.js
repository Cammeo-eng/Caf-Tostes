/* TOSTES café — inicialização. */
"use strict";

(function () {
  T.checarDados();

  T.v.topo();
  T.v.favorito();
  T.v.promo();
  T.v.quizCard();
  T.v.cardapio("bebidas");
  T.v.cardapio("comidas");
  T.v.aulas();
  T.v.insta();
  T.v.rodape();
  T.v.observaBebidas();
  T.v.bag();
  setInterval(T.v.topo, 60000);                    // atualiza "Aberto agora"

  // um único ouvinte para todos os botões [data-act]
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b || b.disabled) return;
    const fn = T.acts[b.dataset.act];
    if (fn) fn(b, e);
  });

  // tela de carregamento: só no primeiro acesso da sessão
  const splash = document.getElementById("splash");
  let visto = false;
  try { visto = sessionStorage.getItem("tostes.splash") === "1"; sessionStorage.setItem("tostes.splash", "1"); } catch (e) { /* sem storage */ }
  if (visto) splash.remove();
  else setTimeout(() => { splash.classList.add("fim"); setTimeout(() => splash.remove(), 350); }, T.reduzMovimento() ? 150 : 900);

  T.L.iniciar();
})();
