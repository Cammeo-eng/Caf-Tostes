/* ==========================================================
   TOSTES café — "Enquanto seu café fica pronto"
   Aulas em formato stories.

   TRILHA: { id, nome, descricao }

   AULA
   - id ............ identificador único
   - trilha ........ id de uma trilha de AULAS_TRILHAS (agrupa as bolinhas)
   - titulo ........ aparece na bolinha e no topo do story
   - icone ......... ilustração da bolinha (assets/ilustracoes/...)
   - leitura ....... tempo estimado de leitura
   - slides ........ lista de telas do story:
       titulo ...... título do slide
       texto ....... texto do slide (2 a 4 frases)
       destaque .... (opcional) { valor, legenda } — número ou dado em destaque,
                     exibido grande acima do texto. Ex.: { valor: "9 bar",
                     legenda: "pressão do espresso" }
   - item .......... (opcional) id de um item do MENU. No último slide aparece
                     o botão "Ver no cardápio".
   - link .......... (opcional) hash de uma página do site, ex.: "#chapeu"
   ========================================================== */

const AULAS_TRILHAS = [
  { id: "origem",  nome: "Do pé à xícara", descricao: "Como o café é plantado, colhido, processado e torrado." },
  { id: "metodos", nome: "Métodos",        descricao: "O que muda em cada forma de preparo." },
  { id: "prova",   nome: "Provar café",    descricao: "Como provar e o que significam as notas de um café." },
  { id: "bebidas", nome: "Bebidas",        descricao: "A história e o jeito certo de cada bebida." },
  { id: "casa",    nome: "Da casa",        descricao: "Como pedir do seu jeito e curiosidades." }
];

const AULAS = [

  /* ───────────── DO PÉ À XÍCARA ───────────── */

  {
    id: "historia",
    trilha: "origem",
    titulo: "Como o café chegou aqui",
    icone: "assets/ilustracoes/grao.svg",
    leitura: "2 min",
    slides: [
      { titulo: "Nasceu na Etiópia", texto: "O café arábica é nativo das florestas de altitude da Etiópia, na África. A lenda mais conhecida fala de um pastor, Kaldi, que notou suas cabras agitadas depois de comerem os frutos de um arbusto." },
      { titulo: "Do Iêmen para o mundo", texto: "Foi no Iêmen que o café começou a ser cultivado e preparado como bebida, por volta do século 15. O porto de Mokha exportava os grãos para o mundo árabe e, depois, para a Europa. Daí vem a palavra \"moca\"." },
      { titulo: "Chegada ao Brasil", destaque: { valor: "1727", legenda: "primeiras mudas no Brasil" }, texto: "As primeiras mudas chegaram ao Pará, trazidas da Guiana Francesa por Francisco de Melo Palheta. Do Norte, o café desceu para o Rio de Janeiro, o Vale do Paraíba, São Paulo, Minas Gerais e o Paraná." },
      { titulo: "O país do café", destaque: { valor: "1/3", legenda: "do café do mundo vem do Brasil" }, texto: "O Brasil é o maior produtor de café do mundo desde o século 19 e responde por cerca de um terço da produção mundial. Também é um dos maiores consumidores." },
      { titulo: "Ciclo do café", texto: "Entre o fim do século 19 e o começo do 20, o café foi o principal produto da economia brasileira. Ferrovias, cidades e portos inteiros nasceram para escoar a produção." }
    ]
  },

  {
    id: "cultivo-colheita",
    trilha: "origem",
    titulo: "Plantio e colheita",
    icone: "assets/ilustracoes/chapeu.svg",
    leitura: "3 min",
    link: "#chapeu",
    slides: [
      { titulo: "Uma planta paciente", destaque: { valor: "3 a 4 anos", legenda: "até a primeira boa safra" }, texto: "O cafeeiro é um arbusto que leva de 3 a 4 anos para produzir uma safra de verdade. Bem cuidado, produz por décadas." },
      { titulo: "A florada", texto: "Depois das primeiras chuvas da primavera, a planta se cobre de flores brancas com perfume de jasmim. A florada dura só 2 ou 3 dias, e cada flor pode virar um fruto." },
      { titulo: "Da flor à cereja", destaque: { valor: "7 a 9 meses", legenda: "da flor ao fruto maduro (arábica)" }, texto: "O fruto nasce verde, amadurece até ficar vermelho ou amarelo, conforme a variedade, e se chama cereja. Dentro dele costumam estar duas sementes: os grãos de café." },
      { titulo: "Altitude faz diferença", texto: "Em regiões mais altas e frias, o fruto amadurece mais devagar. O grão fica mais denso e desenvolve mais açúcares e acidez, o que dá mais complexidade à xícara." },
      { titulo: "Três jeitos de colher", texto: "Na derriça, todos os frutos do galho são puxados de uma vez sobre um pano. Na colheita seletiva, só os maduros são colhidos à mão, em várias passadas. Em terrenos planos, como no Cerrado Mineiro, colhedoras vibram a planta para soltar os frutos." },
      { titulo: "Quem está por trás", texto: "No Brasil, a colheita vai principalmente de maio a setembro. Em regiões de montanha, ainda é quase toda manual, sob o sol. O chapéu da nossa marca é uma homenagem a essas pessoas." }
    ]
  },

  {
    id: "pos-colheita",
    trilha: "origem",
    titulo: "Natural, lavado ou descascado",
    icone: "assets/ilustracoes/grao.svg",
    leitura: "3 min",
    slides: [
      { titulo: "O que é pós-colheita", texto: "Depois de colhido, o fruto precisa ser seco e separado da semente. A forma como isso é feito muda muito o sabor final. É uma das etapas mais importantes para um café especial." },
      { titulo: "Separação", texto: "Os frutos passam por um lavador. Os mais leves, secos ou defeituosos, boiam e são separados. Os maduros e densos afundam e seguem para o processo escolhido." },
      { titulo: "Natural", texto: "O fruto inteiro seca ao sol, com casca e polpa, em terreiros ou camas suspensas, por 15 a 30 dias. Os açúcares da polpa influenciam o grão: o café fica mais encorpado, doce e com notas de fruta. É o processo mais tradicional do Brasil." },
      { titulo: "Cereja descascado", texto: "A casca é retirada, mas parte da mucilagem, a camada doce e grudenta sobre o grão, fica. Resultado: doçura do natural com uma xícara mais limpa. É um processo muito usado no Brasil." },
      { titulo: "Lavado", texto: "A casca e a mucilagem são removidas com água e fermentação antes da secagem. O café fica mais limpo e com acidez mais evidente. É comum na Colômbia, no Quênia e na América Central." },
      { titulo: "Secagem no ponto", destaque: { valor: "11%", legenda: "umidade ideal do grão seco" }, texto: "Seja qual for o processo, o grão é seco até cerca de 11% de umidade. Seco demais, perde qualidade; úmido demais, pode mofar. Depois, descansa em armazéns por semanas para estabilizar." }
    ]
  },

  {
    id: "beneficiamento",
    trilha: "origem",
    titulo: "Do grão cru à seleção",
    icone: "assets/ilustracoes/grao.svg",
    leitura: "2 min",
    slides: [
      { titulo: "Beneficiamento", texto: "Antes de ser vendido, o café seco passa por máquinas que retiram as camadas que ainda envolvem a semente. O que sobra é o café verde, ou café cru." },
      { titulo: "Café verde", texto: "O grão cru é verde-claro, duro e quase sem aroma. Ele aguenta meses armazenado em sacas. Todo o sabor que você conhece só vai aparecer na torra." },
      { titulo: "Peneiras", texto: "Os grãos são separados por tamanho em peneiras com furos padronizados. Lotes de tamanho uniforme torram por igual, o que é essencial para um café de qualidade." },
      { titulo: "Caça aos defeitos", texto: "Grãos pretos, ardidos, quebrados ou furados por insetos são retirados por máquinas e, em cafés especiais, também à mão. Poucos defeitos estragam o sabor de uma xícara inteira." },
      { titulo: "Saca de café", destaque: { valor: "60 kg", legenda: "uma saca de café verde" }, texto: "O café é comercializado em sacas de 60 kg. É a unidade usada para medir safras e exportações no mundo todo." }
    ]
  },

  {
    id: "torra",
    trilha: "origem",
    titulo: "A torra",
    icone: "assets/ilustracoes/grao.svg",
    leitura: "3 min",
    slides: [
      { titulo: "Onde o sabor nasce", destaque: { valor: "10 a 15 min", legenda: "duração típica de uma torra" }, texto: "Na torra, o grão verde é aquecido num tambor giratório. Em poucos minutos, centenas de compostos de aroma e sabor se formam. A mesma saca pode ficar ótima ou ruim dependendo de como é torrada." },
      { titulo: "Secagem", texto: "Na primeira fase, o grão perde a água que ainda tem. A cor vai do verde ao amarelo, e o cheiro lembra feno e pão." },
      { titulo: "Reação de Maillard", texto: "Açúcares e proteínas reagem e o grão fica dourado e depois marrom. É a mesma reação que doura o pão e a carne, e cria as notas de caramelo, nozes e chocolate." },
      { titulo: "O primeiro crack", texto: "O vapor e o gás acumulados dentro do grão fazem ele estalar, como pipoca. A partir daí, o mestre de torra decide quanto desenvolver o café até tirá-lo do tambor." },
      { titulo: "Clara, média ou escura", texto: "Torras mais claras preservam acidez e notas de fruta. Torras mais escuras trazem amargor, corpo e notas de tostado. Cafés especiais costumam ter torras claras a médias, para mostrar o que o grão tem de melhor." },
      { titulo: "Descanso", destaque: { valor: "15 a 20%", legenda: "do peso que o grão perde na torra" }, texto: "Depois de torrado, o café libera gás carbônico por alguns dias. Por isso as embalagens têm uma válvula, e o espresso costuma ficar melhor depois de alguns dias de descanso." }
    ]
  },

  {
    id: "regioes",
    trilha: "origem",
    titulo: "Regiões do Brasil",
    icone: "assets/ilustracoes/grao.svg",
    leitura: "2 min",
    slides: [
      { titulo: "Terroir", texto: "Clima, solo, altitude e o jeito de produzir de cada lugar mudam o sabor do café. É o mesmo conceito usado para vinhos, chamado de terroir." },
      { titulo: "Sul de Minas e Mantiqueira", texto: "A maior região produtora do país. Montanhas, clima ameno e muita colheita manual. Cafés doces, equilibrados, com notas de chocolate e caramelo." },
      { titulo: "Cerrado Mineiro", texto: "Planaltos com estações bem definidas: chuva no verão e seca na colheita. Primeira Denominação de Origem de café do Brasil. Cafés com corpo e doçura, colheita muito mecanizada." },
      { titulo: "Mogiana e Chapada Diamantina", texto: "A Mogiana, entre São Paulo e Minas, é tradicional e conhecida por cafés doces e encorpados. A Chapada Diamantina, na Bahia, ganhou fama com cafés premiados em concursos de qualidade." },
      { titulo: "Espírito Santo e Rondônia", texto: "O Espírito Santo é o maior produtor de conilon do país e também tem arábicas de montanha. Em Rondônia, os Robustas Amazônicos mostram que o canéfora também pode ser especial." },
      { titulo: "Aqui do lado", texto: "O Paraná já foi o maior produtor de café do Brasil. Hoje, o Norte Pioneiro do Paraná tem Indicação Geográfica e produz cafés especiais reconhecidos." }
    ]
  },

  {
    id: "especies-variedades",
    trilha: "origem",
    titulo: "Arábica, robusta e variedades",
    icone: "assets/ilustracoes/grao.svg",
    leitura: "3 min",
    slides: [
      { titulo: "Duas espécies", texto: "Quase todo o café do mundo vem de duas espécies: Coffea arabica, o arábica, e Coffea canephora, conhecida como robusta ou conilon." },
      { titulo: "Arábica", destaque: { valor: "~1,2%", legenda: "de cafeína no grão de arábica" }, texto: "Prefere altitude e clima ameno. Tem mais açúcares e acidez, aroma complexo e menos cafeína. É a base dos cafés especiais e a maior parte do café brasileiro." },
      { titulo: "Robusta e conilon", destaque: { valor: "~2,2%", legenda: "de cafeína no grão de robusta" }, texto: "Planta mais resistente ao calor e às pragas, cresce em altitudes menores. Tem quase o dobro de cafeína, mais corpo e mais amargor. É muito usada em blends e no café solúvel." },
      { titulo: "Variedades", texto: "Dentro do arábica existem dezenas de variedades, como as uvas no vinho. Cada uma tem produtividade, resistência e sabor próprios." },
      { titulo: "As brasileiras", texto: "Mundo Novo e Catuaí são as mais plantadas no Brasil. O Catuaí foi desenvolvido pelo Instituto Agronômico de Campinas (IAC). O Bourbon, de frutos vermelhos ou amarelos, é conhecido pela doçura." },
      { titulo: "As raras", texto: "A Geisha, de origem etíope, ficou famosa no Panamá pelas notas florais e de chá e está entre os cafés mais caros do mundo." }
    ]
  },

  /* ───────────── MÉTODOS ───────────── */

  {
    id: "espresso",
    trilha: "metodos",
    titulo: "O espresso",
    icone: "assets/ilustracoes/xicara.svg",
    leitura: "2 min",
    item: "espresso",
    slides: [
      { titulo: "Café sob pressão", destaque: { valor: "9 bar", legenda: "pressão de extração" }, texto: "No espresso, a água quente atravessa o café moído bem fino sob pressão de cerca de 9 bar, nove vezes a pressão atmosférica." },
      { titulo: "Rápido e concentrado", destaque: { valor: "25 a 30 s", legenda: "tempo de extração" }, texto: "Em cerca de 25 a 30 segundos, a água extrai óleos, açúcares e aromas. Uma referência comum é tirar o dobro do peso do café em bebida: 18 g de pó para cerca de 36 g de espresso." },
      { titulo: "A crema", texto: "A crema é a espuma dourada por cima, formada por óleos e gás carbônico do café fresco. Ela surgiu com as máquinas de alavanca de Achille Gaggia, na Itália, nos anos 1940." },
      { titulo: "Ristretto e doppio", texto: "Ristretto é uma extração mais curta, com menos água: mais doce e concentrado. Doppio é a dose dupla de espresso." },
      { titulo: "Regulagem diária", texto: "Umidade, temperatura e o descanso do grão mudam a extração ao longo do dia. Por isso o barista prova e ajusta a moagem várias vezes por turno. Um ajuste de segundos muda o sabor." }
    ]
  },

  {
    id: "filtrados",
    trilha: "metodos",
    titulo: "V60 e prensa francesa",
    icone: "assets/ilustracoes/xicara.svg",
    leitura: "2 min",
    item: "metodo-v60",
    slides: [
      { titulo: "Café filtrado", texto: "Nos métodos filtrados, não há pressão: a água passa pelo café pela gravidade ou fica em infusão. O resultado é uma bebida mais leve e aromática que o espresso." },
      { titulo: "V60", destaque: { valor: "60°", legenda: "ângulo do cone que dá nome ao V60" }, texto: "Funil japonês com nervuras em espiral e um furo grande no fundo. O barista controla o fluxo despejando a água em etapas. O filtro de papel segura os óleos, então a xícara fica limpa e mostra a acidez e as notas do grão." },
      { titulo: "Prensa francesa", destaque: { valor: "4 min", legenda: "tempo de infusão" }, texto: "O café, moído grosso, fica em infusão na água por cerca de 4 minutos e é separado por uma tela de metal. Os óleos passam para a xícara: a bebida tem mais corpo e textura. Apesar do nome, foi patenteada por um italiano, em 1929." },
      { titulo: "Coado do dia", texto: "O coado tradicional, no filtro de papel ou de pano, segue o mesmo princípio do V60. É o jeito mais brasileiro de tomar café." },
      { titulo: "Para dividir", texto: "Aqui, V60 e prensa francesa servem 2 pessoas. Pedir os dois com o mesmo grão é um jeito simples de sentir como o método muda a bebida." }
    ]
  },

  {
    id: "moka-cold-brew",
    trilha: "metodos",
    titulo: "Moka e cold brew",
    icone: "assets/ilustracoes/xicara.svg",
    leitura: "2 min",
    item: "cold-brew",
    slides: [
      { titulo: "Moka italiana", destaque: { valor: "1933", legenda: "ano em que a moka foi lançada" }, texto: "A cafeteira de alumínio de Alfonso Bialetti se tornou símbolo da Itália. A água ferve no compartimento de baixo e o vapor empurra a água pelo café até o de cima." },
      { titulo: "Moka não é espresso", texto: "A pressão da moka é bem menor que a de uma máquina de espresso. O café sai forte e encorpado, mas sem crema de verdade." },
      { titulo: "Cold brew", destaque: { valor: "12 h", legenda: "de extração a frio no nosso cold brew" }, texto: "O cold brew é feito com água fria, em contato com o café por muitas horas, e depois filtrado. O nosso extrai por 12 horas." },
      { titulo: "Por que o sabor muda", texto: "Sem calor, a água extrai menos compostos ácidos e amargos. A bebida fica mais suave, com acidez menos perceptível e o dulçor mais evidente. Cold brew não é café quente que esfriou: é outra bebida." }
    ]
  },

  {
    id: "moagem-agua",
    trilha: "metodos",
    titulo: "Moagem, água e temperatura",
    icone: "assets/ilustracoes/grao.svg",
    leitura: "2 min",
    slides: [
      { titulo: "Moído na hora", texto: "Depois de moído, o café perde aromas rapidamente, em questão de minutos. Por isso moemos o grão na hora de preparar cada bebida." },
      { titulo: "Cada método, uma moagem", texto: "Bem fina, quase como talco, para espresso. Média, como areia, para V60 e coado. Grossa, como sal grosso, para prensa francesa. Moagem fina demais deixa o café amargo; grossa demais, aguado." },
      { titulo: "Café é água", destaque: { valor: "98%", legenda: "de um coado é água" }, texto: "Um café coado é quase todo água. Por isso a água precisa ser filtrada e sem cheiro: cloro e excesso de minerais aparecem no sabor." },
      { titulo: "Temperatura certa", destaque: { valor: "90 a 96 °C", legenda: "água ideal para coados" }, texto: "Água fervendo extrai demais e deixa a bebida amarga. Água fria demais extrai de menos, e o café fica azedo e fraco." },
      { titulo: "Proporção", texto: "Uma referência para coados é 1 parte de café para 15 a 17 de água, por exemplo 15 g de café para 250 ml. Pesar, em vez de medir na colher, é o que garante o mesmo café todos os dias." }
    ]
  },

  {
    id: "leite",
    trilha: "metodos",
    titulo: "O leite vaporizado",
    icone: "assets/ilustracoes/xicara.svg",
    leitura: "2 min",
    item: "flat-white",
    slides: [
      { titulo: "O que o vapor faz", texto: "O vapor da máquina aquece o leite e, ao mesmo tempo, incorpora ar. As proteínas do leite seguram as bolhas e formam a espuma; a gordura deixa tudo cremoso." },
      { titulo: "Microespuma", texto: "Uma boa espuma tem bolhas tão pequenas que não dá para vê-las. O leite fica brilhante, como tinta, e se mistura ao espresso. É isso que permite desenhar no latte." },
      { titulo: "O ponto do leite", destaque: { valor: "60 a 65 °C", legenda: "temperatura ideal do leite" }, texto: "Nessa faixa, o leite fica mais doce, sem precisar de açúcar. Acima de 70 °C, as proteínas se desfazem, a espuma murcha e aparece gosto de leite fervido." },
      { titulo: "Zero lactose e aveia", texto: "Leite zero lactose vaporiza quase igual ao integral e fica levemente mais doce. Bebidas vegetais de aveia formam boa espuma e combinam com café. Aqui, as duas opções não têm custo extra." }
    ]
  },

  /* ───────────── PROVAR CAFÉ ───────────── */

  {
    id: "como-provar",
    trilha: "prova",
    titulo: "Como provar um café",
    icone: "assets/ilustracoes/xicara.svg",
    leitura: "2 min",
    slides: [
      { titulo: "Primeiro, o aroma", texto: "Antes do primeiro gole, sinta o cheiro. A maior parte do que chamamos de sabor, na verdade, é percebida pelo olfato." },
      { titulo: "Acidez", texto: "Acidez não é azedo. É a sensação viva e brilhante que lembra frutas, como laranja, maçã ou frutas vermelhas. Ela deixa o café mais interessante." },
      { titulo: "Doçura e corpo", texto: "Doçura é o açúcar natural do grão, que aparece sem adoçar. Corpo é a sensação de peso na boca: leve como chá ou denso como leite integral." },
      { titulo: "Retrogosto", texto: "É o sabor que fica depois de engolir. Em um bom café, ele é agradável e dura. Em um café ruim, fica áspero e amargo." },
      { titulo: "Notas sensoriais", texto: "Quando um pacote diz \"chocolate e caramelo\", ninguém colocou chocolate no café. São aromas que o próprio grão desenvolve no cultivo, no processo e na torra." },
      { titulo: "Prova profissional", texto: "Na prova de xícara, ou cupping, provadores despejam água quente sobre café moído, esperam alguns minutos, quebram a crosta e sorvem com uma colher, fazendo barulho, para espalhar o café pela boca." }
    ]
  },

  {
    id: "pontuacao-84",
    trilha: "prova",
    titulo: "O que significa 84+",
    icone: "assets/ilustracoes/grao.svg",
    leitura: "2 min",
    slides: [
      { titulo: "Café tem nota", texto: "Cafés especiais são avaliados por provadores certificados, os Q-Graders, numa escala de 0 a 100, seguindo a metodologia da Specialty Coffee Association (SCA)." },
      { titulo: "O que é avaliado", texto: "Fragrância, aroma, sabor, retrogosto, acidez, corpo, doçura, equilíbrio e limpeza da xícara, entre outros atributos. O lote também é analisado em busca de defeitos." },
      { titulo: "As faixas", destaque: { valor: "80+", legenda: "pontuação mínima de um café especial" }, texto: "Abaixo de 80 pontos, o café não é considerado especial. De 80 a 84, \"muito bom\". De 85 a 89, \"excelente\". 90 ou mais, \"excepcional\"; são poucos lotes no mundo." },
      { titulo: "Por que 84+", texto: "Grãos de 84 pontos ou mais ficam no topo da faixa \"muito bom\", já na porta dos excelentes. Têm doçura, acidez e aroma marcantes. É o padrão que escolhemos para todas as bebidas da casa." }
    ]
  },

  /* ───────────── BEBIDAS ───────────── */

  {
    id: "cappuccino-latte",
    trilha: "bebidas",
    titulo: "Cappuccino, latte ou flat white?",
    icone: "assets/ilustracoes/xicara.svg",
    leitura: "2 min",
    item: "cappuccino",
    slides: [
      { titulo: "A mesma base", texto: "Todas começam com espresso e leite vaporizado. O que muda é a quantidade de leite e de espuma." },
      { titulo: "Macchiato e cortado", texto: "Macchiato é o espresso \"manchado\" com uma colherada de espuma. Cortado é espresso e leite em partes iguais, com pouca espuma." },
      { titulo: "Cappuccino", texto: "Espresso, leite e uma camada generosa de espuma. O nome vem dos frades capuchinhos, por causa da cor do hábito. Na Itália, é bebida da manhã." },
      { titulo: "Latte", texto: "Mais leite e espuma fina. É a bebida mais suave da família, boa para quem está começando no café ou gosta de algo cremoso." },
      { titulo: "Flat white", texto: "Criado entre a Austrália e a Nova Zelândia. Tem menos leite que o latte e uma camada fina de microespuma: o café aparece mais." },
      { titulo: "Monte o seu", texto: "No Monte seu Cappuccino, você escolhe o que vai nele: cacau, chocolate, canela e açúcar de baunilha." }
    ]
  },

  {
    id: "matcha",
    trilha: "bebidas",
    titulo: "Matcha",
    icone: "assets/ilustracoes/xicara.svg",
    leitura: "2 min",
    item: "vietnamita-matcha",
    slides: [
      { titulo: "Chá verde em pó", texto: "Matcha é um chá verde japonês, tradicional nas regiões de Uji, em Kyoto, e Nishio. É a base da cerimônia do chá no Japão." },
      { titulo: "Cultivado na sombra", destaque: { valor: "3 a 4 semanas", legenda: "de sombra antes da colheita" }, texto: "Antes da colheita, as plantas são cobertas. Com menos sol, as folhas produzem mais clorofila e aminoácidos: ficam verde-intenso e com sabor mais doce e menos amargo." },
      { titulo: "A folha inteira", texto: "As folhas são cozidas no vapor, secas, separadas dos talos e moídas em moinhos de pedra até virar pó. No matcha, você bebe a folha inteira, e não só a infusão." },
      { titulo: "Energia diferente", texto: "O matcha tem cafeína e também L-teanina, um aminoácido do chá. Muita gente descreve a energia como mais estável que a do café." },
      { titulo: "Preparo", destaque: { valor: "~80 °C", legenda: "temperatura da água" }, texto: "O pó é batido com água abaixo da fervura, com um batedor de bambu chamado chasen, até formar espuma. Água fervendo deixa o matcha amargo." }
    ]
  },

  {
    id: "chai",
    trilha: "bebidas",
    titulo: "Chai",
    icone: "assets/ilustracoes/xicara.svg",
    leitura: "2 min",
    item: "chai-latte",
    slides: [
      { titulo: "Chai é chá", texto: "Chai quer dizer \"chá\" em hindi e em várias outras línguas. O que conhecemos como chai é o masala chai: chá preto preparado com especiarias." },
      { titulo: "Na Índia", texto: "Na Índia, o masala chai é fervido com leite e açúcar e vendido em cada esquina pelos chaiwalas. Cada família tem a sua receita." },
      { titulo: "As especiarias", texto: "As mais comuns são canela, cardamomo, gengibre, cravo e pimenta-do-reino. Juntas, deixam a bebida quente, aromática e levemente picante." },
      { titulo: "Chai latte e dirty chai", texto: "Chai latte é o chai com leite vaporizado, no estilo das cafeterias. O dirty chai leva também uma dose de espresso: especiarias e café na mesma xícara." }
    ]
  },

  /* ───────────── DA CASA ───────────── */

  {
    id: "peca-do-seu-jeito",
    trilha: "casa",
    titulo: "Peça do seu jeito",
    icone: "assets/ilustracoes/chapeu.svg",
    leitura: "1 min",
    item: "monte-seu-cappuccino",
    slides: [
      { titulo: "Leite", texto: "Toda bebida com leite pode ser feita com leite zero lactose ou vegetal de aveia, sem custo extra." },
      { titulo: "Tamanhos", destaque: { valor: "M", legenda: "o tamanho que recomendamos" }, texto: "P 170 ml, M 200 ml e G 250 ml. O M é o equilíbrio entre café e leite que mais gostamos." },
      { titulo: "Monte o seu", texto: "No Monte seu Cappuccino, você escolhe o que vai nele: cacau, chocolate, canela e açúcar de baunilha." },
      { titulo: "Fidelidade", texto: "A cada 10 pedidos, você ganha um café quente à sua escolha ou uma fatia da torta do dia. É só informar seu telefone no balcão." },
      { titulo: "Na dúvida", texto: "Faça o quiz Descubra seu café ou pergunte para quem está no balcão. A gente adora ajudar a escolher." }
    ]
  },

  {
    id: "curiosidades",
    trilha: "casa",
    titulo: "Curiosidades",
    icone: "assets/ilustracoes/grao.svg",
    leitura: "2 min",
    item: "bala-de-canela",
    slides: [
      { titulo: "O grão moca", texto: "Às vezes a cereja tem uma única semente, que cresce arredondada. No Brasil, esse grão é chamado de moca e costuma ser separado e vendido à parte." },
      { titulo: "Café é fruta", texto: "O fruto do café se chama cereja e tem polpa doce. Com a casca seca, alguns países preparam um chá chamado cáscara." },
      { titulo: "Cereja na xícara", texto: "A calda do nosso Bala de Canela é de cereja, o mesmo nome do fruto do café." },
      { titulo: "Descafeinado", texto: "No descafeinado, a cafeína é retirada do grão verde, antes da torra. Em geral, mais de 97% sai, mas ainda sobra um pouco." },
      { titulo: "Mais cafeína?", texto: "Torra escura não tem mais cafeína que torra clara. O amargor vem da torra, não da cafeína. Uma xícara de coado costuma ter mais cafeína que um espresso, porque o volume é maior." }
    ]
  }
];
