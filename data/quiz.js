/* ==========================================================
   TOSTES café — Quiz "Descubra seu café"
   Recomendação sem IA, só com regras. As etiquetas de cada item estão em menu.js.

   PERGUNTAS ..... uma por tela. Cada resposta aponta para uma etiqueta de menu.js.
   REGRAS ........ como o resultado é calculado:
     - só entram itens do grupo "bebidas" com pedido diferente de false;
     - cada etiqueta que combina vale "pontosPorEtiqueta" ponto(s);
     - em empate, ganha o item com a etiqueta "desempate";
     - o resultado mostra de "minimo" a "maximo" itens.
   ========================================================== */

const QUIZ = {
  titulo: "Descubra seu café",
  chamada: "4 perguntas rápidas e a gente sugere a bebida certa para você.",
  perguntas: [
    { id: "doce", titulo: "Doce ou sem açúcar?", respostas: [
      { rotulo: "Doce", etiqueta: "doce" },
      { rotulo: "Sem açúcar", etiqueta: "amargo" }
    ] },
    { id: "leite", titulo: "Com leite ou sem?", respostas: [
      { rotulo: "Com leite", etiqueta: "leite" },
      { rotulo: "Sem leite", etiqueta: "sem-leite" }
    ] },
    { id: "temperatura", titulo: "Quente ou gelado?", respostas: [
      { rotulo: "Quente", etiqueta: "quente" },
      { rotulo: "Gelado", etiqueta: "gelado" }
    ] },
    { id: "intensidade", titulo: "Mais leve ou mais intenso?", respostas: [
      { rotulo: "Mais leve", etiqueta: "leve" },
      { rotulo: "Mais intenso", etiqueta: "intenso" }
    ] }
  ],
  regras: {
    grupo: "bebidas",
    pontosPorEtiqueta: 1,
    desempate: "cafe",
    minimo: 2,
    maximo: 3,
    // Se a pessoa escolher esta etiqueta e o item tiver este tamanho, ele é adicionado nesse tamanho.
    tamanhoPorEtiqueta: { gelado: "Gelado" }
  }
};
