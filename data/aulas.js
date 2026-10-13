/* ==========================================================
   TOSTES to go — Aulas "Enquanto seu café fica pronto"
   ATENÇÃO: os textos abaixo são PROVISÓRIOS. Revise antes de divulgar.

   Para adicionar uma aula, copie um bloco de AULAS e preencha:
   - id ........... identificador único (sem espaços)
   - titulo ....... nome da aula (aparece no cartão da página)
   - resumo ....... 1 linha de apoio no cartão
   - ilustracao ... arquivo de assets/ilustracoes/ (xicara, grao, chapeu, croissant)
   - cards ........ lista de { titulo, texto }: cada um é uma tela do "stories"
   - itemId ....... (opcional) id de um item de menu.js; vira o botão do último cartão
   - itemRotulo ... (opcional) texto do botão; se vazio usa "Ver no cardápio"
   ========================================================== */

const AULAS = [
  {
    id: "metodos",
    titulo: "Métodos de preparo",
    resumo: "Espresso, V60, prensa francesa e moka.",
    ilustracao: "xicara",
    cards: [
      { titulo: "Espresso", texto: "Água quente passa sob pressão, em cerca de 9 bar, por café moído fino. A extração leva por volta de 25 a 30 segundos e rende uma bebida curta, concentrada e encorpada." },
      { titulo: "V60", texto: "Um filtro de papel em formato de cone e água despejada devagar, em círculos. O resultado é uma bebida limpa, que deixa as notas do grão mais claras." },
      { titulo: "Prensa francesa", texto: "O café moído mais grosso fica em infusão na água quente por alguns minutos. Depois, o êmbolo separa a borra. A bebida sai mais encorpada." },
      { titulo: "Moka", texto: "A cafeteira italiana vai ao fogo. O vapor empurra a água por cima do café moído e a bebida sobe pronta. É forte, entre um coado e um espresso." }
    ],
    itemId: "metodo-v60",
    itemRotulo: "Pedir um Método V60"
  },
  {
    id: "graos",
    titulo: "Tipos de grão",
    resumo: "Arábica, robusta e o que se planta no Brasil.",
    ilustracao: "grao",
    cards: [
      { titulo: "Arábica", texto: "É o grão mais cultivado no mundo. Costuma ser mais doce e aromático, com acidez mais marcada e menos cafeína que o robusta." },
      { titulo: "Robusta", texto: "Mais resistente e com mais cafeína. Tem corpo cheio e sabor mais amargo. No Brasil, a variedade conilon, que é um robusta, é plantada principalmente no Espírito Santo e em Rondônia." },
      { titulo: "No Brasil", texto: "O Brasil é o maior produtor de café do mundo. O arábica se concentra em regiões de Minas Gerais, São Paulo e Paraná, entre outras. Variedades como Catuaí, Mundo Novo e Bourbon são das mais comuns." }
    ],
    itemId: "coado-do-dia",
    itemRotulo: "Pedir o Coado do Dia"
  },
  {
    id: "pontuacao",
    titulo: "Por que grãos 84+",
    resumo: "O que a pontuação diz sobre o café.",
    ilustracao: "grao",
    cards: [
      { titulo: "A nota do café", texto: "Provadores treinados avaliam o café de 0 a 100, em critérios como aroma, doçura, acidez, corpo e finalização. Acima de 80 pontos ele é considerado especial." },
      { titulo: "O que muda no 84+", texto: "Quanto mais alta a nota, mais definidas são as notas de sabor e menos defeitos o café tem. Na prática, é uma xícara mais doce e mais limpa." },
      { titulo: "Na TOSTES", texto: "Por isso trabalhamos com grãos de pontuação 84 ou mais. Toda semana a casa serve um grão diferente de algum lugar do Brasil." }
    ],
    itemId: "espresso",
    itemRotulo: "Pedir um Espresso"
  },
  {
    id: "temperatura",
    titulo: "Temperatura e moagem",
    resumo: "Dois detalhes que mudam a xícara.",
    ilustracao: "xicara",
    cards: [
      { titulo: "Moído na hora", texto: "Depois de moído, o café perde aroma muito rápido. Moer só na hora de preparar mantém o que o grão tem de melhor." },
      { titulo: "Temperatura da água", texto: "Para extrair café, a água fica em geral entre 90 e 96 °C. Muito quente, queima e amarga. Fria demais, a bebida sai fraca e ácida." },
      { titulo: "Temperatura do leite", texto: "O leite vaporizado fica melhor em torno de 60 °C. Acima de 70 °C ele perde a doçura natural." }
    ],
    itemId: "cappuccino",
    itemRotulo: "Pedir um Cappuccino"
  }
];
