/* ==========================================================
   TOSTES café — "Enquanto seu café fica pronto"
   Aulas curtas em formato stories.

   AULA
   - id ............ identificador único
   - trilha ........ id de uma trilha de AULAS_TRILHAS (agrupa as bolinhas)
   - titulo ........ aparece na bolinha e no topo do story
   - icone ......... ilustração da bolinha (assets/ilustracoes/...)
   - slides ........ lista de { titulo?, texto }. Cada slide = uma tela do story.
                     Texto curto: no máximo ~280 caracteres por slide.
   - item .......... (opcional) id de um item do MENU. No último slide aparece
                     o botão "Ver no cardápio".
   - link .......... (opcional) hash de uma página do site, ex.: "#chapeu"
   ========================================================== */

const AULAS_TRILHAS = [
  { id: "metodos", nome: "Métodos" },
  { id: "bebidas", nome: "Bebidas" },
  { id: "graos", nome: "Grãos" },
  { id: "casa", nome: "Da casa" }
];

const AULAS = [
  {
    id: "espresso",
    trilha: "metodos",
    titulo: "O que é um espresso",
    icone: "assets/ilustracoes/xicara.svg",
    item: "espresso",
    slides: [
      { titulo: "Café sob pressão", texto: "Espresso é café extraído com água quente sob pressão, por volta de 9 bar. A água atravessa o café moído bem fino em cerca de 25 a 30 segundos." },
      { titulo: "De onde vem a crema", texto: "A pressão extrai óleos e aromas que um coado não alcança. É daí que vem a crema, a camada dourada por cima da xícara." },
      { titulo: "Ristretto e doppio", texto: "Ristretto é uma extração mais curta: menos água, mais doce e concentrado. Doppio é a dose dupla de espresso." },
      { titulo: "Regulado ao longo do dia", texto: "Umidade e temperatura do ambiente mudam o resultado na xícara. Por isso a moagem e a dose são ajustadas durante o dia." }
    ]
  },
  {
    id: "filtrados",
    trilha: "metodos",
    titulo: "V60 e prensa francesa",
    icone: "assets/ilustracoes/grao.svg",
    item: "metodo-v60",
    slides: [
      { titulo: "Café coado", texto: "No coado, a água passa pelo café só pela gravidade. O resultado é uma bebida mais limpa e aromática que o espresso." },
      { titulo: "V60", texto: "Funil de origem japonesa, com filtro de papel. O papel segura os óleos: a bebida fica leve e destaca a acidez e as notas do grão." },
      { titulo: "Prensa francesa", texto: "O café fica em infusão na água por cerca de 4 minutos e é separado por uma tela de metal. A bebida sai com mais corpo e textura." },
      { titulo: "Para dividir", texto: "Aqui, V60 e prensa francesa servem 2 pessoas. Uma boa forma de provar o mesmo grão de dois jeitos diferentes." }
    ]
  },
  {
    id: "moka-cold-brew",
    trilha: "metodos",
    titulo: "Moka e cold brew",
    icone: "assets/ilustracoes/xicara.svg",
    item: "cold-brew",
    slides: [
      { titulo: "Moka italiana", texto: "Na moka, o vapor da água empurra o café para cima. A pressão é baixa, então não é um espresso, mas o café sai forte e encorpado." },
      { titulo: "Cold brew", texto: "Cold brew é café extraído a frio, por muitas horas. O nosso descansa 12 horas antes de ser servido." },
      { titulo: "Por que é diferente", texto: "Sem calor, a extração muda: a bebida fica mais suave, com acidez menos perceptível e o dulçor mais evidente." }
    ]
  },
  {
    id: "moagem-temperatura",
    trilha: "metodos",
    titulo: "Moagem e temperatura",
    icone: "assets/ilustracoes/grao.svg",
    slides: [
      { titulo: "Moído na hora", texto: "Café moído começa a perder aroma em poucos minutos. Por isso moemos na hora de preparar cada bebida." },
      { titulo: "Cada método, uma moagem", texto: "Bem fina para espresso, média para V60, grossa para prensa francesa. A moagem errada deixa o café amargo ou aguado." },
      { titulo: "Água no ponto", texto: "Água fervendo queima o café. Para coados, o ideal fica entre 90 e 96 °C." },
      { titulo: "Leite no ponto", texto: "Vaporizado até cerca de 60 a 65 °C, o leite fica mais doce e cremoso. Acima de 70 °C, ele perde doçura." }
    ]
  },
  {
    id: "cappuccino-latte",
    trilha: "bebidas",
    titulo: "Cappuccino, latte ou flat white?",
    icone: "assets/ilustracoes/xicara.svg",
    item: "cappuccino",
    slides: [
      { titulo: "A mesma base", texto: "Todos começam com espresso e leite vaporizado. O que muda é a proporção de leite e a quantidade de espuma." },
      { titulo: "Macchiato e cortado", texto: "Macchiato é o espresso \"manchado\" com um pouco de espuma. Cortado é espresso e leite em partes iguais." },
      { titulo: "Cappuccino", texto: "Espresso, leite e uma camada generosa de espuma. Leve na boca. No Monte seu Cappuccino, você escolhe o que vai por cima." },
      { titulo: "Latte e flat white", texto: "Latte tem mais leite e espuma fina: suave, bom para quem está começando. Flat white tem menos leite que o latte, e o café aparece mais." }
    ]
  },
  {
    id: "matcha",
    trilha: "bebidas",
    titulo: "Matcha",
    icone: "assets/ilustracoes/xicara.svg",
    item: "vietnamita-matcha",
    slides: [
      { titulo: "Chá verde em pó", texto: "Matcha é chá verde japonês. Nas semanas antes da colheita, as plantas ficam na sombra, o que deixa a cor mais intensa e o sabor mais suave." },
      { titulo: "A folha inteira", texto: "As folhas são secas e moídas até virar um pó bem fino. Você bebe a folha inteira, e não só a infusão." },
      { titulo: "Energia diferente", texto: "O matcha tem cafeína e também L-teanina. Muita gente descreve a energia como mais estável que a do café." },
      { titulo: "Sem água fervendo", texto: "O pó é batido com água abaixo da fervura, por volta de 80 °C. Água fervendo deixa o matcha amargo." }
    ]
  },
  {
    id: "chai",
    trilha: "bebidas",
    titulo: "Chai",
    icone: "assets/ilustracoes/xicara.svg",
    item: "chai-latte",
    slides: [
      { titulo: "Chá com especiarias", texto: "Chai quer dizer \"chá\" em hindi. O masala chai, tradicional na Índia, é chá preto preparado com especiarias." },
      { titulo: "As especiarias", texto: "As mais comuns são canela, cardamomo, gengibre, cravo e pimenta-do-reino." },
      { titulo: "Chai latte e dirty chai", texto: "Chai latte é o chai com leite vaporizado. Dirty chai leva também uma dose de espresso: especiarias e café na mesma xícara." }
    ]
  },
  {
    id: "arabica-robusta",
    trilha: "graos",
    titulo: "Arábica e robusta",
    icone: "assets/ilustracoes/grao.svg",
    slides: [
      { titulo: "Duas espécies", texto: "As espécies mais cultivadas no mundo são a arábica e a canéfora, conhecida como robusta ou conilon." },
      { titulo: "Arábica", texto: "Cresce em regiões mais altas, tem mais doçura e acidez e menos cafeína. É a base dos cafés especiais." },
      { titulo: "Robusta", texto: "Planta mais resistente, com mais cafeína, mais amargor e mais corpo. No Brasil, é muito cultivada no Espírito Santo e em Rondônia." },
      { titulo: "O Brasil no mapa", texto: "O Brasil é o maior produtor de café do mundo desde o século 19. Minas Gerais lidera a produção de arábica." }
    ]
  },
  {
    id: "pontuacao-84",
    trilha: "graos",
    titulo: "Por que 84+",
    icone: "assets/ilustracoes/grao.svg",
    slides: [
      { titulo: "Café tem nota", texto: "Cafés especiais são avaliados por provadores certificados numa escala de 0 a 100, pela metodologia da Specialty Coffee Association (SCA)." },
      { titulo: "A partir de 80", texto: "Com 80 pontos ou mais, o café é considerado especial: poucos defeitos, doçura, acidez equilibrada e aroma limpo." },
      { titulo: "Quanto mais alto", texto: "Quanto maior a nota, mais marcantes e complexas são as características do grão." },
      { titulo: "Nossa escolha", texto: "Aqui, trabalhamos com grãos de 84 pontos ou mais. A diferença aparece já no primeiro gole." }
    ]
  },
  {
    id: "do-pe-a-xicara",
    trilha: "graos",
    titulo: "Do pé à xícara",
    icone: "assets/ilustracoes/chapeu.svg",
    link: "#chapeu",
    slides: [
      { titulo: "Café é fruto", texto: "O café nasce como uma cereja vermelha ou amarela. Dentro dela costumam estar duas sementes: os grãos." },
      { titulo: "A colheita", texto: "No Brasil, a colheita acontece principalmente entre maio e setembro. Em muitas fazendas, ainda é feita à mão." },
      { titulo: "A torra", texto: "Depois vêm a secagem, o beneficiamento e a torra. O grão cru é verde e quase sem aroma: é na torra que ele ganha cor e perfume." },
      { titulo: "O chapéu", texto: "O chapéu da nossa marca homenageia quem trabalha sob o sol para o café chegar até aqui." }
    ]
  },
  {
    id: "curiosidades",
    trilha: "graos",
    titulo: "Curiosidades",
    icone: "assets/ilustracoes/grao.svg",
    item: "bala-de-canela",
    slides: [
      { titulo: "O grão moca", texto: "Às vezes a cereja do café tem uma única semente, que cresce arredondada. É o grão moca, separado e vendido à parte." },
      { titulo: "Torra clara ou escura", texto: "Torras mais claras tendem a preservar acidez e notas de fruta. Torras mais escuras trazem mais amargor e notas de tostado e chocolate." },
      { titulo: "Descafeinado", texto: "O descafeinado ainda tem um pouco de cafeína, só que em quantidade bem menor." },
      { titulo: "Cereja na xícara", texto: "O fruto do café se chama cereja. A calda do nosso Bala de Canela também é de cereja." }
    ]
  },
  {
    id: "peca-do-seu-jeito",
    trilha: "casa",
    titulo: "Peça do seu jeito",
    icone: "assets/ilustracoes/chapeu.svg",
    item: "monte-seu-cappuccino",
    slides: [
      { titulo: "Leite", texto: "Toda bebida com leite pode ser feita com leite zero lactose ou vegetal de aveia, sem custo extra." },
      { titulo: "Tamanhos", texto: "P 170 ml, M 200 ml e G 250 ml. O M é o tamanho que recomendamos: o equilíbrio entre café e leite." },
      { titulo: "Monte o seu", texto: "No Monte seu Cappuccino, você escolhe o que vai nele: cacau, chocolate, canela e açúcar de baunilha." },
      { titulo: "Fidelidade", texto: "A cada 10 pedidos, um café quente à sua escolha ou uma fatia da torta do dia. É só informar seu telefone no balcão." },
      { titulo: "Na dúvida", texto: "Faça o quiz Descubra seu café ou pergunte para quem está no balcão." }
    ]
  }
];
