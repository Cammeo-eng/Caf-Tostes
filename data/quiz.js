/* ==========================================================
   TOSTES café — Quiz "Descubra seu café"
   Recomendação sem IA, por regras. Para quem não sabe o que pedir.

   COMO FUNCIONA
   1. Candidatos: itens de MENU com grupo "bebidas" e pedido !== false.
   2. Filtros: cada resposta pode ter "filtro":
        exigir: [etiquetas]  -> o item precisa ter TODAS
        excluir: [etiquetas] -> o item não pode ter NENHUMA
      Os filtros nunca são removidos. Se sobrarem menos de 3 itens, mostrar
      os que existirem (sempre sobra pelo menos 1 em qualquer combinação).
   3. Pontuação: para cada resposta, somar pesos[etiqueta] de cada etiqueta
      que o item tem. Pesos negativos tiram pontos.
   4. Desempate: 1) item com selo "favorito"; 2) item com etiqueta "cafe";
      3) menor preço do tamanho recomendado.
   5. Resultado: o 1º lugar vira "Seu café de hoje". O 2º e o 3º aparecem como
      "Também combina com você". Evitar 3 itens da mesma categoria: se o 2º e o
      3º forem da categoria do 1º, trocar o 3º pelo melhor de outra categoria.
   6. Explicação: para o 1º lugar, pegar as 2 respostas que mais somaram
      pontos para ele e montar a frase:
        "Porque você " + motivo1 + " e " + motivo2 + "."
   7. Ao adicionar ao pedido:
      - tamanho: "Gelado" se a resposta de temperatura definiu "gelado" e o
        item tiver esse tamanho; senão o tamanho recomendado (M); senão o único.
      - leite: o que a pergunta de leite definiu (integral, zero-lactose, aveia).
      - se o item tiver escolha obrigatória sem padrão (ex.: Monte seu
        Cappuccino, Soda Italiana), abrir a tela de detalhe já com tamanho e
        leite selecionados, em vez de adicionar direto.
   8. Acompanhamento: se a pergunta "fome" definiu "salgado" ou "doce", sugerir
      uma comida usando HARMONIZACAO (primeira regra cuja etiqueta o 1º lugar tem).
   ========================================================== */

const QUIZ_PERGUNTAS = [
  {
    id: "momento",
    pergunta: "Que momento é esse?",
    apoio: "O café certo muda com a hora do dia.",
    respostas: [
      { texto: "Começando o dia", pesos: { "cafeina-alta": 2, intenso: 1, classico: 1 }, motivo: "está começando o dia" },
      { texto: "Pausa no meio da tarde", pesos: { "cafeina-media": 2, leve: 1, cremoso: 1 }, motivo: "quer uma pausa na tarde" },
      { texto: "Fim do dia, quero desacelerar", pesos: { "sem-cafeina": 3, "cafeina-baixa": 2, "cafeina-alta": -3 }, motivo: "quer desacelerar sem perder o sono" },
      { texto: "Depois do almoço, no lugar da sobremesa", pesos: { sobremesa: 3, doce: 2 }, motivo: "quer algo no lugar da sobremesa" }
    ]
  },
  {
    id: "relacao",
    pergunta: "Como é a sua relação com café?",
    apoio: "Sem resposta certa. É só para a gente acertar o ponto.",
    respostas: [
      { texto: "Tomo puro, sem açúcar", pesos: { amargo: 3, "notas-do-grao": 2, cafe: 2, "sem-leite": 1 }, motivo: "gosta do café como ele é" },
      { texto: "Gosto com leite e um pouco de açúcar", pesos: { leite: 2, cremoso: 1, cafe: 2 }, motivo: "gosta de café com leite" },
      { texto: "Gosto quando o café aparece pouco", pesos: { doce: 2, leite: 2, chocolate: 1, caramelo: 1, cafe: -1 }, motivo: "prefere o café mais suave" },
      { texto: "Não tomo café", pesos: { "sem-cafe": 6, cafe: -6 }, motivo: "não toma café" }
    ]
  },
  {
    id: "doce",
    pergunta: "E o açúcar?",
    apoio: "Pense no quanto você costuma adoçar.",
    respostas: [
      { texto: "Nada. Gosto do sabor puro", pesos: { amargo: 3, doce: -3 }, motivo: "prefere sem açúcar" },
      { texto: "Um toque, sem exagero", pesos: { amargo: 1, doce: 1 }, motivo: "gosta de um toque de doce" },
      { texto: "Docinho na medida", pesos: { doce: 2 }, motivo: "gosta de um café docinho" },
      { texto: "Quanto mais doce, melhor", pesos: { doce: 3, condensado: 2, sobremesa: 2 }, motivo: "gosta de bem doce" }
    ]
  },
  {
    id: "temperatura",
    pergunta: "Quente ou gelado?",
    apoio: "Algumas bebidas saem dos dois jeitos.",
    respostas: [
      { texto: "Bem quentinho", filtro: { exigir: ["quente"] }, define: { temperatura: "quente" }, motivo: "quer algo quente" },
      { texto: "Gelado", filtro: { exigir: ["gelado"] }, define: { temperatura: "gelado" }, motivo: "quer algo gelado" },
      { texto: "Tanto faz", pesos: {} }
    ]
  },
  {
    id: "sobremesa",
    pergunta: "Se fosse escolher uma sobremesa agora…",
    apoio: "Diz muito sobre o sabor que você procura.",
    respostas: [
      { texto: "Brigadeiro", pesos: { chocolate: 3, cacau: 1 }, motivo: "é do time do chocolate" },
      { texto: "Pudim ou doce de leite", pesos: { caramelo: 3, "doce-de-leite": 3, condensado: 2 }, motivo: "gosta de caramelo e doce de leite" },
      { texto: "Torta de limão", pesos: { citrico: 3, refrescante: 1 }, motivo: "gosta de sabores cítricos" },
      { texto: "Morango com chantilly", pesos: { morango: 3, frutado: 2, cereja: 1 }, motivo: "gosta de sabores de fruta" },
      { texto: "Arroz-doce com canela", pesos: { canela: 3, especiarias: 2 }, motivo: "gosta de canela e especiarias" },
      { texto: "Nenhuma, prefiro um salgado", pesos: { amargo: 2, doce: -1, "notas-do-grao": 1 }, motivo: "prefere o lado menos doce" }
    ]
  },
  {
    id: "aroma",
    pergunta: "Qual aroma faz você parar na porta de uma cafeteria?",
    apoio: "Escolha o primeiro que vier à cabeça.",
    respostas: [
      { texto: "Café sendo moído", pesos: { "notas-do-grao": 3, cafe: 2, classico: 1 }, motivo: "ama o aroma do café moído" },
      { texto: "Baunilha", pesos: { baunilha: 3 }, motivo: "gosta de baunilha" },
      { texto: "Avelã tostada", pesos: { avela: 3 }, motivo: "gosta de avelã" },
      { texto: "Canela e cravo", pesos: { especiarias: 3, canela: 2 }, motivo: "gosta de especiarias" },
      { texto: "Chocolate derretido", pesos: { chocolate: 3, cacau: 1 }, motivo: "não resiste a chocolate" },
      { texto: "Algo fresco e herbal", pesos: { herbal: 3, citrico: 1 }, motivo: "gosta de sabores frescos" }
    ]
  },
  {
    id: "textura",
    pergunta: "Que textura você quer sentir?",
    apoio: "Textura muda tudo numa bebida.",
    respostas: [
      { texto: "Cremosa e aveludada", pesos: { cremoso: 3 }, motivo: "gosta de bebida cremosa" },
      { texto: "Espuma alta e leve", pesos: { espumoso: 3 }, motivo: "gosta de espuma" },
      { texto: "Encorpada, presente na boca", pesos: { encorpado: 3, intenso: 2 }, motivo: "gosta de corpo e intensidade" },
      { texto: "Leve, fácil de beber", pesos: { liquido: 2, leve: 2 }, motivo: "prefere algo leve" },
      { texto: "Refrescante", pesos: { refrescante: 3 }, motivo: "quer se refrescar" }
    ]
  },
  {
    id: "energia",
    pergunta: "Quanta energia você precisa agora?",
    apoio: "Para a gente acertar na cafeína.",
    respostas: [
      { texto: "Muita. O dia ainda é longo", pesos: { "cafeina-alta": 3, "sem-cafeina": -2 }, motivo: "precisa de energia" },
      { texto: "Só um empurrãozinho", pesos: { "cafeina-media": 2, "cafeina-baixa": 1 }, motivo: "quer só um empurrãozinho" },
      { texto: "Nenhuma, quero só o sabor", pesos: { "sem-cafeina": 3, "cafeina-baixa": 2, "cafeina-alta": -2 }, motivo: "quer só o sabor" }
    ]
  },
  {
    id: "aventura",
    pergunta: "Num lugar novo, o que você pede?",
    apoio: "Clássico ou novidade?",
    respostas: [
      { texto: "O clássico, sem erro", pesos: { classico: 3 }, motivo: "gosta dos clássicos" },
      { texto: "Um clássico com um toque diferente", pesos: { classico: 1, diferente: 2 }, motivo: "gosta de um clássico com um toque diferente" },
      { texto: "O que eu nunca provei", pesos: { diferente: 3, autoral: 2 }, motivo: "gosta de provar coisas novas" },
      { texto: "Pergunto o que é da casa", pesos: { autoral: 3, "favorito-da-casa": 3 }, motivo: "quer provar o que é da casa" }
    ]
  },
  {
    id: "trilha",
    pergunta: "Qual trilha combina com o seu dia?",
    apoio: "Confia, tem a ver.",
    respostas: [
      { texto: "Bossa nova, tudo com calma", pesos: { leve: 2, cremoso: 1 }, motivo: "está num dia tranquilo" },
      { texto: "Rock, preciso de força", pesos: { intenso: 3, "cafeina-alta": 1 }, motivo: "está num dia intenso" },
      { texto: "Pop animado", pesos: { doce: 1, frutado: 1, refrescante: 1 }, motivo: "está num dia animado" },
      { texto: "Lo-fi para estudar ou trabalhar", pesos: { "cafeina-media": 2, classico: 1 }, motivo: "vai estudar ou trabalhar" },
      { texto: "Jazz, algo mais sofisticado", pesos: { "notas-do-grao": 2, diferente: 1, especiarias: 1 }, motivo: "gosta de algo sofisticado" }
    ]
  },
  {
    id: "leite",
    pergunta: "Alguma preferência de leite?",
    apoio: "Zero lactose e vegetal de aveia não têm custo extra.",
    respostas: [
      { texto: "Leite integral", define: { leite: "integral" } },
      { texto: "Zero lactose", define: { leite: "zero-lactose" }, filtro: { excluir: ["lactose-fixa"] }, motivo: "prefere zero lactose" },
      { texto: "Vegetal de aveia", define: { leite: "aveia" }, filtro: { excluir: ["lactose-fixa"] }, motivo: "prefere leite vegetal" },
      { texto: "Prefiro sem leite", pesos: { "sem-leite": 5, leite: -5 }, motivo: "prefere sem leite" }
    ]
  },
  {
    id: "fome",
    pergunta: "Vai comer alguma coisa junto?",
    apoio: "A gente sugere o par ideal.",
    respostas: [
      { texto: "Sim, algo salgado", define: { acompanhamento: "salgado" } },
      { texto: "Sim, algo doce", define: { acompanhamento: "doce" } },
      { texto: "Só a bebida mesmo", define: { acompanhamento: null } }
    ]
  }
];

// Harmonização: a primeira regra cuja etiqueta o 1º lugar tem é usada.
const HARMONIZACAO = [
  { etiqueta: "herbal",      salgado: "waffle-mineiro-tradicional",         doce: "croissants-creme-de-avela-e-morangos",  texto: "O pão de queijo equilibra o herbal do matcha." },
  { etiqueta: "especiarias", salgado: "gratinados-croque-monsieur",         doce: "croissants-doce-de-leite-com-banana",   texto: "Banana e canela são parceiras antigas." },
  { etiqueta: "refrescante", salgado: "croissants-presunto-queijo-e-tomate", doce: "waffle-mineiro-morangos-e-avela",      texto: "Uma bebida leve pede um acompanhamento fresco." },
  { etiqueta: "doce",        salgado: "croissants-presunto-com-queijo",     doce: "waffle-mineiro-doce-de-leite",          texto: "O salgado do croissant contrasta com o doce da bebida." },
  { etiqueta: "amargo",      salgado: "gratinados-frango-cremoso",          doce: "croissants-creme-de-avela",             texto: "Um café sem açúcar valoriza um acompanhamento cremoso." }
];
const HARMONIZACAO_PADRAO = { salgado: "croissants-na-chapa-com-manteiga", doce: "croissants-creme-de-avela", texto: "O croissant é feito aqui todos os dias." };

// Textos da tela de resultado
const QUIZ_TEXTOS = {
  abertura: "Não sabe o que pedir? Responda 12 perguntas rápidas e a gente escolhe por você.",
  titulo: "Seu café de hoje",
  alternativas: "Também combina com você",
  acompanhamento: "Para acompanhar",
  refazer: "Refazer o quiz"
};
