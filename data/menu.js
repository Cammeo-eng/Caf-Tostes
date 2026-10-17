/* ==========================================================
   TOSTES café — Cardápio
   Arquivo de dados. Para alterar preços, nomes ou itens, edite SÓ este arquivo.
   Atualizado em: 2026-10-16 (smoothies sazonais e toasts)

   ITEM
   - id ............ identificador único. A foto do item é assets/fotos/<id>.jpg
   - grupo ......... "bebidas" ou "comidas" (define a seção do cardápio)
   - categoria ..... id de uma categoria de CATEGORIAS (abaixo)
   - nome .......... nome curto exibido no card
   - nomeCompleto .. (opcional) nome usado no carrinho e na tela de detalhe
   - descricaoCurta  1 linha, aparece no card
   - descricao ..... (opcional) texto completo da tela de detalhe; vazio = usa a curta
   - ingredientes .. lista do que vai no item
   - tamanhos ...... lista { rotulo, ml, preco }. 1 tamanho = preço único.
                     Mais de 1 = cliente escolhe. O tamanho recomendado (M) vem
                     definido em CONFIG.tamanhoRecomendado
   - opcoes ........ ids de OPCOES (leite, extras, complementos-cappuccino, estilo-pingado, amendoim, pao, sabores-soda)
   - preparo ....... (opcional) como é preparado; vazio = seção não aparece
   - fichaTecnica .. (opcional) { dose: "18 g", extracao: "28 s", temperatura: "65 °C" }
                     null = não aparece
   - etiquetas ..... usadas no quiz "Descubra seu café" (lista completa em data/quiz.js)
   - promocaoElegivel  false = fica fora do sorteio da Promoção do dia
   - selo .......... (opcional) "favorito" = etiqueta "Favorito da casa"
   - servidoEm ..... (opcional) "xícara" ou "copo". Aparece na tela de detalhe
   - serve ......... (opcional) número de pessoas
   - pedido ........ (opcional) false = item só informativo, sem botão de adicionar
   - sazonal ....... (só em CATEGORIAS) id da temporada, ex. "primavera-verao". Com CONFIG.temporada.ativa=false a categoria e seus itens somem do site
   - sobre ......... (só em CATEGORIAS) texto do "O que é?" da categoria
   - precoAConfirmar (anotação interna, NÃO aparece no site) preço ainda provisório
   ========================================================== */

const CATEGORIAS = [
  {
    "id": "espressos",
    "grupo": "bebidas",
    "nome": "Espressos",
    "nota": "Sem leite. Servidos na xícara.",
    "sobre": "A base de tudo: café moído na hora e extraído sob pressão em cerca de 30 segundos. Curto, intenso e aromático. Aqui ficam os cafés sem leite."
  },
  {
    "id": "espressos-com-leite",
    "grupo": "bebidas",
    "nome": "Espressos com Leite",
    "nota": "Tamanhos: P 170 ml · M 200 ml · G 250 ml",
    "sobre": "Espresso com leite vaporizado na textura certa. O que muda de um para outro é a quantidade de leite e de espuma: do macchiato, quase puro, ao latte, bem suave."
  },
  {
    "id": "coados",
    "grupo": "bebidas",
    "nome": "Coados",
    "nota": "V60 e Prensa Francesa servem 2 pessoas.",
    "sobre": "Café filtrado, sem pressão: mais leve e aromático que o espresso, ótimo para sentir as notas do grão. O V60 e a prensa francesa são preparados na hora, para dividir."
  },
  {
    "id": "docinhos",
    "grupo": "bebidas",
    "nome": "Cafés com Sabor",
    "nota": "Tamanhos: P 170 ml · M 200 ml · G 250 ml",
    "sobre": "Espressos com leite e um toque doce: caramelo, avelã, baunilha, chocolate ou doce de leite. Para quem gosta de café com cara de sobremesa."
  },
  {
    "id": "autorais",
    "grupo": "bebidas",
    "nome": "Autorais da Casa",
    "nota": "Receitas criadas aqui.",
    "sobre": "Receitas criadas aqui na TOSTES, que você não encontra em outro lugar."
  },
  {
    "id": "chocolate-quente",
    "grupo": "bebidas",
    "nome": "Chocolate Quente",
    "nota": "Tamanhos: P 170 ml · M 200 ml · G 250 ml",
    "sobre": "Chocolate de verdade derretido no leite vaporizado. Cremoso e sem café. No clássico, no de marshmallow e no de chantilly, você escolhe: tradicional, mais doce e cremoso, ou meio amargo, mais intenso."
  },
  {
    "id": "gelados",
    "grupo": "bebidas",
    "nome": "Gelados de Café",
    "nota": "",
    "sobre": "Nossos cafés na versão gelada, com gelo, em copo de 500 ml."
  },
  {
    "id": "smoothies",
    "grupo": "bebidas",
    "nome": "Smoothies",
    "nota": "Primavera/Verão. Fruta congelada no lugar do gelo: mais sabor, nada aguado. 500 ml.",
    "sobre": "Frutas congeladas batidas na hora, sem gelo: mais sabor e nada aguado. Nos de fruta, você escolhe a doçura: sem adoçar, só com o doce da própria fruta, levemente adoçado com mel ou mais docinho. Só na primavera e no verão.",
    "sazonal": "primavera-verao"
  },
  {
    "id": "matcha",
    "grupo": "bebidas",
    "nome": "Matcha",
    "nota": "",
    "sobre": "Chá verde japonês em pó, batido na hora. Quente ou gelado, puro ou com leite."
  },
  {
    "id": "chai",
    "grupo": "bebidas",
    "nome": "Chai",
    "nota": "",
    "sobre": "Chá preto com especiarias como canela, cardamomo e gengibre. Aromático e levemente picante."
  },
  {
    "id": "drinks",
    "grupo": "bebidas",
    "nome": "Drinks",
    "nota": "",
    "sobre": "Sucos, chás e soda italiana, para quem não quer café."
  },
  {
    "id": "croissants-salgados",
    "grupo": "comidas",
    "nome": "Croissants Salgados",
    "nota": "Feitos todos os dias.",
    "sobre": "Assados todos os dias e recheados na hora do pedido. Assim a massa continua crocante por fora e macia por dentro: recheado com antecedência, o croissant absorve a umidade e murcha."
  },
  {
    "id": "croissants-doces",
    "grupo": "comidas",
    "nome": "Croissants Doces",
    "nota": "Feitos todos os dias.",
    "sobre": "Assados todos os dias e recheados na hora do pedido, para a massa continuar crocante e o recheio, fresco."
  },
  {
    "id": "sanduiches",
    "grupo": "comidas",
    "nome": "Sanduíches",
    "nota": "No pão de forma ou na baguete.",
    "sobre": "Sanduíches clássicos na chapa, no pão de forma ou na baguete. Rápidos e quentinhos."
  },
  {
    "id": "gratinados",
    "grupo": "comidas",
    "nome": "Gratinados",
    "nota": "",
    "sobre": "Sanduíches cobertos de queijo e levados ao forno até o queijo derreter e dourar. A casquinha de queijo por cima é o que faz o gratinado."
  },
  {
    "id": "toasts",
    "grupo": "comidas",
    "nome": "Toasts",
    "nota": "Na broa de milho sovada, em fatia grossa dourada na chapa.",
    "sobre": "Uma fatia grossa de broa de milho sovada, com leve sabor de milho e um toque adocicado, dourada na chapa com manteiga e com a cobertura montada por cima. Mais caprichado que um sanduíche, para comer com garfo e faca. No Monte seu Toast, você escolhe tudo."
  },
  {
    "id": "brunches",
    "grupo": "comidas",
    "nome": "Brunches",
    "nota": "",
    "sobre": "Prato completo de café da manhã: ovos, torradas e acompanhamentos servidos lado a lado, para montar do seu jeito."
  },
  {
    "id": "waffle-mineiro",
    "grupo": "comidas",
    "nome": "Waffle Mineiro",
    "nota": "Massa de pão de queijo assada em forma de waffle.",
    "sobre": "Massa de pão de queijo assada na máquina de waffle: casquinha crocante e miolo macio e elástico. Uma ideia bem mineira."
  },
  {
    "id": "waffle-americano",
    "grupo": "comidas",
    "nome": "Waffle Americano",
    "nota": "",
    "sobre": "O waffle clássico, de massa leve e levemente doce, com coberturas."
  },
  {
    "id": "tortas",
    "grupo": "comidas",
    "nome": "Tortas do Dia",
    "nota": "Sabor diferente todos os dias.",
    "sobre": "Tortas feitas aqui, com um sabor diferente a cada dia. Pergunte no balcão qual é o de hoje."
  }
];

const OPCOES = {
  "leite": {
    "titulo": "Leite",
    "tipo": "unica",
    "obrigatoria": true,
    "itens": [
      {
        "id": "integral",
        "nome": "Integral",
        "valor": 0,
        "padrao": true
      },
      {
        "id": "zero-lactose",
        "nome": "Zero lactose",
        "valor": 0
      },
      {
        "id": "aveia",
        "nome": "Vegetal de aveia",
        "valor": 0
      }
    ]
  },
  "extras": {
    "titulo": "Adicionais",
    "tipo": "multipla",
    "obrigatoria": false,
    "itens": [
      {
        "id": "chantilly",
        "nome": "Chantilly",
        "valor": 2.0
      },
      {
        "id": "marshmallows",
        "nome": "Marshmallows",
        "valor": 2.0
      },
      {
        "id": "chocolate",
        "nome": "Chocolate",
        "valor": 2.0,
        "precoAConfirmar": true
      }
    ]
  },
  "complementos-cappuccino": {
    "titulo": "Monte o seu (escolha de 1 a 4)",
    "tipo": "multipla",
    "obrigatoria": true,
    "min": 1,
    "max": 4,
    "itens": [
      {
        "id": "cacau",
        "nome": "Cacau",
        "valor": 0
      },
      {
        "id": "chocolate",
        "nome": "Chocolate",
        "valor": 0
      },
      {
        "id": "canela",
        "nome": "Canela",
        "valor": 0
      },
      {
        "id": "acucar-baunilha",
        "nome": "Açúcar de baunilha",
        "valor": 0
      }
    ]
  },
  "amendoim": {
    "titulo": "Amendoim",
    "tipo": "multipla",
    "obrigatoria": false,
    "itens": [
      {
        "id": "amendoim-moido",
        "nome": "Com amendoim moído por cima",
        "valor": 0
      }
    ]
  },
  "estilo-pingado": {
    "titulo": "Como você prefere?",
    "tipo": "unica",
    "obrigatoria": true,
    "itens": [
      {
        "id": "simples",
        "nome": "Simples",
        "valor": 0
      },
      {
        "id": "cremoso",
        "nome": "Cremoso",
        "valor": 0
      }
    ]
  },
  "pao": {
    "titulo": "Pão",
    "tipo": "unica",
    "obrigatoria": true,
    "itens": [
      {
        "id": "forma",
        "nome": "Pão de forma",
        "valor": 0,
        "padrao": true
      },
      {
        "id": "baguete",
        "nome": "Baguete",
        "valor": 0
      }
    ]
  },
  "sabores-soda": {
    "titulo": "Sabores (escolha de 1 a 3)",
    "tipo": "multipla",
    "obrigatoria": true,
    "min": 1,
    "max": 3,
    "itens": [
      {
        "id": "melancia",
        "nome": "Melancia",
        "valor": 0
      },
      {
        "id": "maca-verde",
        "nome": "Maçã verde",
        "valor": 0
      },
      {
        "id": "cereja",
        "nome": "Cereja",
        "valor": 0
      },
      {
        "id": "frutas-vermelhas",
        "nome": "Frutas vermelhas",
        "valor": 0
      },
      {
        "id": "limao-gengibre",
        "nome": "Limão e gengibre",
        "valor": 0
      },
      {
        "id": "tangerina",
        "nome": "Tangerina",
        "valor": 0
      }
    ]
  },
  "base-toast": {
    "titulo": "Base",
    "tipo": "unica",
    "obrigatoria": true,
    "itens": [
      {
        "id": "requeijao",
        "nome": "Requeijão",
        "valor": 0,
        "padrao": true
      },
      {
        "id": "manteiga",
        "nome": "Só manteiga",
        "valor": 0
      },
      {
        "id": "doce-de-leite",
        "nome": "Doce de leite",
        "valor": 2
      },
      {
        "id": "creme-de-avela",
        "nome": "Creme de avelã",
        "valor": 3
      }
    ]
  },
  "coberturas-toast": {
    "titulo": "Coberturas (escolha de 1 a 5)",
    "tipo": "multipla",
    "obrigatoria": true,
    "min": 1,
    "max": 5,
    "itens": [
      {
        "id": "ovos-mexidos",
        "nome": "Ovos mexidos",
        "valor": 3
      },
      {
        "id": "ovo-estrelado",
        "nome": "Ovo estrelado",
        "valor": 3
      },
      {
        "id": "queijo",
        "nome": "Queijo derretido",
        "valor": 2
      },
      {
        "id": "bacon",
        "nome": "Bacon",
        "valor": 3
      },
      {
        "id": "presunto",
        "nome": "Presunto",
        "valor": 2
      },
      {
        "id": "frango-cremoso",
        "nome": "Frango cremoso",
        "valor": 5
      },
      {
        "id": "calabresa",
        "nome": "Calabresa",
        "valor": 3
      },
      {
        "id": "tomate",
        "nome": "Tomate temperado",
        "valor": 2
      },
      {
        "id": "banana",
        "nome": "Banana",
        "valor": 2
      },
      {
        "id": "morangos",
        "nome": "Morangos",
        "valor": 4
      },
      {
        "id": "mel",
        "nome": "Mel",
        "valor": 1
      },
      {
        "id": "canela",
        "nome": "Canela",
        "valor": 0
      }
    ]
  },
  "docura-smoothie": {
    "titulo": "Doçura",
    "tipo": "unica",
    "obrigatoria": true,
    "itens": [
      { "id": "sem-adocar", "nome": "Sem adoçar (só a fruta)", "valor": 0 },
      { "id": "levemente", "nome": "Levemente adoçado", "valor": 0, "padrao": true },
      { "id": "mais-docinho", "nome": "Mais docinho", "valor": 0 }
    ]
  },
  "tipo-chocolate": {
    "titulo": "Chocolate",
    "tipo": "unica",
    "obrigatoria": true,
    "itens": [
      { "id": "tradicional", "nome": "Tradicional", "valor": 0, "padrao": true },
      { "id": "meio-amargo", "nome": "Meio amargo", "valor": 0 }
    ]
  }
};

const MENU = [
  {
    "id": "espresso",
    "grupo": "bebidas",
    "categoria": "espressos",
    "nome": "Espresso",
    "descricaoCurta": "Café puro e intenso, extraído na hora.",
    "descricao": "",
    "ingredientes": [
      "Café moído na hora"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 30,
        "preco": 8.0
      }
    ],
    "opcoes": [
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/espresso.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "quente",
      "intenso",
      "cafe",
      "encorpado",
      "cafeina-alta",
      "classico",
      "notas-do-grao"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "ristretto",
    "grupo": "bebidas",
    "categoria": "espressos",
    "nome": "Ristretto",
    "descricaoCurta": "Extração curta: mais doce e concentrado.",
    "descricao": "",
    "ingredientes": [
      "Café moído na hora"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 20,
        "preco": 8.0
      }
    ],
    "opcoes": [
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/ristretto.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "quente",
      "intenso",
      "cafe",
      "encorpado",
      "cafeina-alta",
      "classico",
      "notas-do-grao"
    ],
    "promocaoElegivel": false,
    "servidoEm": "xícara",
    "precoAConfirmar": true
  },
  {
    "id": "espresso-duplo-doppio",
    "grupo": "bebidas",
    "categoria": "espressos",
    "nome": "Espresso Duplo (Doppio)",
    "descricaoCurta": "Duas doses de espresso.",
    "descricao": "",
    "ingredientes": [
      "Duas doses de espresso"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 60,
        "preco": 12.0
      }
    ],
    "opcoes": [
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/espresso-duplo-doppio.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "quente",
      "intenso",
      "cafe",
      "encorpado",
      "cafeina-alta",
      "classico"
    ],
    "promocaoElegivel": false,
    "servidoEm": "xícara",
    "precoAConfirmar": true
  },
  {
    "id": "americano",
    "grupo": "bebidas",
    "categoria": "espressos",
    "nome": "Americano",
    "descricaoCurta": "Espresso alongado com água quente.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Água quente"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 160,
        "preco": 8.0
      }
    ],
    "opcoes": [
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/americano.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "quente",
      "leve",
      "cafe",
      "liquido",
      "cafeina-alta",
      "classico",
      "notas-do-grao"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "macchiato",
    "grupo": "bebidas",
    "categoria": "espressos-com-leite",
    "nome": "Macchiato",
    "descricaoCurta": "Espresso com um toque de espuma de leite.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Espuma de leite"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 90,
        "preco": 10.0
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/macchiato.jpg",
    "etiquetas": [
      "amargo",
      "leite",
      "quente",
      "intenso",
      "cafe",
      "espumoso",
      "cafeina-alta",
      "classico"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "cortado",
    "grupo": "bebidas",
    "categoria": "espressos-com-leite",
    "nome": "Cortado",
    "descricaoCurta": "Espresso com a mesma quantidade de leite vaporizado.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado na mesma proporção"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 120,
        "preco": 10.0
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/cortado.jpg",
    "etiquetas": [
      "amargo",
      "leite",
      "quente",
      "intenso",
      "cafe",
      "cremoso",
      "cafeina-alta",
      "classico"
    ],
    "promocaoElegivel": false,
    "servidoEm": "xícara",
    "precoAConfirmar": true
  },
  {
    "id": "flat-white",
    "grupo": "bebidas",
    "categoria": "espressos-com-leite",
    "nome": "Flat White",
    "descricaoCurta": "Leite aveludado e pouca espuma.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado aveludado",
      "Camada fina de espuma"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 200,
        "preco": 12.0
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/flat-white.jpg",
    "etiquetas": [
      "amargo",
      "leite",
      "quente",
      "intenso",
      "cafe",
      "cremoso",
      "cafeina-alta",
      "classico"
    ],
    "promocaoElegivel": true,
    "servidoEm": "copo"
  },
  {
    "id": "cappuccino",
    "grupo": "bebidas",
    "categoria": "espressos-com-leite",
    "nome": "Cappuccino Italiano",
    "descricaoCurta": "Espresso, leite vaporizado e espuma.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado",
      "Espuma de leite"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 11
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 12
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 13
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/cappuccino.jpg",
    "etiquetas": [
      "amargo",
      "leite",
      "quente",
      "leve",
      "cafe",
      "espumoso",
      "cafeina-media",
      "classico"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "monte-seu-cappuccino",
    "grupo": "bebidas",
    "categoria": "espressos-com-leite",
    "nome": "Monte seu Cappuccino",
    "descricaoCurta": "Cappuccino com os complementos que você escolher.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado",
      "Espuma de leite",
      "Complementos à escolha: cacau, chocolate, canela, açúcar de baunilha"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 12.0
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 13.0
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 14.0
      }
    ],
    "opcoes": [
      "leite",
      "complementos-cappuccino",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/monte-seu-cappuccino.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "leve",
      "cafe",
      "espumoso",
      "cafeina-media",
      "diferente",
      "chocolate",
      "cacau",
      "canela",
      "baunilha"
    ],
    "promocaoElegivel": false,
    "servidoEm": "xícara"
  },
  {
    "id": "cafe-latte",
    "grupo": "bebidas",
    "categoria": "espressos-com-leite",
    "nome": "Café Latte",
    "descricaoCurta": "Espresso com bastante leite vaporizado.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 11
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 12
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 13
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/cafe-latte.jpg",
    "etiquetas": [
      "amargo",
      "leite",
      "quente",
      "leve",
      "cafe",
      "cremoso",
      "cafeina-media",
      "classico"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "marroquino",
    "grupo": "bebidas",
    "categoria": "espressos-com-leite",
    "nome": "Marroquino",
    "descricaoCurta": "Espresso com cacau 50%, açúcar e canela, coberto de espuma de leite.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Cacau 50%",
      "Açúcar",
      "Canela",
      "Espuma de leite"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 11
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 12
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 13
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/marroquino.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "intenso",
      "cafe",
      "cremoso",
      "cafeina-media",
      "classico",
      "chocolate",
      "cacau",
      "canela"
    ],
    "promocaoElegivel": true,
    "servidoEm": "copo"
  },
  {
    "id": "coado-do-dia",
    "grupo": "bebidas",
    "categoria": "coados",
    "nome": "Coado do Dia",
    "descricaoCurta": "Café filtrado com o grão da semana.",
    "descricao": "",
    "ingredientes": [
      "Café filtrado",
      "Grão da semana"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 200,
        "preco": 6.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/coado-do-dia.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "quente",
      "leve",
      "cafe",
      "liquido",
      "cafeina-alta",
      "classico",
      "notas-do-grao"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "pingado",
    "grupo": "bebidas",
    "categoria": "coados",
    "nome": "Pingado",
    "descricaoCurta": "Café passado com leite. Você escolhe: simples ou cremoso.",
    "descricao": "",
    "ingredientes": [
      "Café coado",
      "Leite (simples ou cremoso)"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 200,
        "preco": 8.0
      }
    ],
    "opcoes": [
      "estilo-pingado",
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/pingado.jpg",
    "etiquetas": [
      "amargo",
      "leite",
      "quente",
      "leve",
      "cafe",
      "liquido",
      "cafeina-alta",
      "classico"
    ],
    "promocaoElegivel": false,
    "servidoEm": "xícara"
  },
  {
    "id": "metodo-v60",
    "grupo": "bebidas",
    "categoria": "coados",
    "nome": "Método V60",
    "descricaoCurta": "Filtragem manual que realça as notas do grão.",
    "descricao": "",
    "ingredientes": [
      "Café filtrado manualmente no V60"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 400,
        "preco": 12.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/metodo-v60.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "quente",
      "leve",
      "cafe",
      "liquido",
      "cafeina-alta",
      "diferente",
      "notas-do-grao"
    ],
    "promocaoElegivel": false,
    "serve": 2
  },
  {
    "id": "prensa-francesa",
    "grupo": "bebidas",
    "categoria": "coados",
    "nome": "Prensa Francesa",
    "descricaoCurta": "Café em infusão, encorpado.",
    "descricao": "",
    "ingredientes": [
      "Café em infusão na prensa francesa"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 400,
        "preco": 12.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/prensa-francesa.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "quente",
      "intenso",
      "cafe",
      "encorpado",
      "cafeina-alta",
      "diferente",
      "notas-do-grao"
    ],
    "promocaoElegivel": false,
    "serve": 2
  },
  {
    "id": "caramel-macchiato",
    "grupo": "bebidas",
    "categoria": "docinhos",
    "nome": "Caramel Macchiato",
    "descricaoCurta": "Leite vaporizado com xarope de caramelo e baunilha, espresso e calda de caramelo por cima.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado",
      "Xarope de caramelo com baunilha",
      "Calda de caramelo por cima"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 14
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 15
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 16
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/caramel-macchiato.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "leve",
      "cafe",
      "espumoso",
      "cafeina-media",
      "classico",
      "caramelo",
      "sobremesa"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "avela-latte",
    "grupo": "bebidas",
    "categoria": "docinhos",
    "nome": "Avelã Latte",
    "descricaoCurta": "Espresso e leite vaporizado com creme de avelã diluído na bebida.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado",
      "Creme de avelã diluído"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 12
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 13
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 14
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/avela-latte.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "leve",
      "cafe",
      "cremoso",
      "cafeina-media",
      "classico",
      "avela"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "cafe-moka",
    "grupo": "bebidas",
    "categoria": "docinhos",
    "nome": "Café Moka",
    "descricaoCurta": "Espresso, chocolate e leite vaporizado.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Chocolate",
      "Leite vaporizado"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 14
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 15
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 16
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/cafe-moka.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "intenso",
      "cafe",
      "cremoso",
      "cafeina-media",
      "classico",
      "chocolate"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "moka-pistache",
    "grupo": "bebidas",
    "categoria": "docinhos",
    "nome": "Moka Pistache",
    "descricaoCurta": "Espresso, chocolate branco, pistache e leite vaporizado.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Chocolate branco",
      "Pistache",
      "Leite vaporizado"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 15
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 16
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 17
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/moka-pistache.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "chocolate",
      "sobremesa"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "vietnamita-latte",
    "grupo": "bebidas",
    "categoria": "docinhos",
    "nome": "Vietnamita Latte",
    "descricaoCurta": "Espresso com leite condensado.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite condensado",
      "Leite vaporizado"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 14
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 15
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 16
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/vietnamita-latte.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "intenso",
      "cafe",
      "cremoso",
      "cafeina-alta",
      "diferente",
      "condensado",
      "sobremesa",
      "lactose-fixa"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "latte-vanilla",
    "grupo": "bebidas",
    "categoria": "docinhos",
    "nome": "Latte Vanilla",
    "descricaoCurta": "Latte com xarope de baunilha.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado",
      "Xarope de baunilha"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 12
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 13
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 14
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/latte-vanilla.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "leve",
      "cafe",
      "cremoso",
      "cafeina-media",
      "classico",
      "baunilha"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "caramel-latte",
    "grupo": "bebidas",
    "categoria": "docinhos",
    "nome": "Caramel Latte",
    "descricaoCurta": "Latte com xarope de caramelo. Mais suave que o Caramel Macchiato, sem calda por cima.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado",
      "Xarope de caramelo"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 12
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 13
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 14
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/caramel-latte.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "leve",
      "cafe",
      "cremoso",
      "cafeina-media",
      "classico",
      "caramelo"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "cappuccino-avela",
    "grupo": "bebidas",
    "categoria": "docinhos",
    "nome": "Cappuccino Avelã",
    "descricaoCurta": "Cappuccino com creme de avelã por toda a borda da xícara. Amendoim moído por cima é opcional.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado",
      "Espuma de leite",
      "Creme de avelã na borda da xícara",
      "Amendoim moído (opcional)"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 16
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 17
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite",
      "amendoim",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/cappuccino-avela.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "leve",
      "cafe",
      "espumoso",
      "cafeina-media",
      "classico",
      "avela"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "latte-doce-de-leite",
    "grupo": "bebidas",
    "categoria": "docinhos",
    "nome": "Latte Doce de Leite",
    "descricaoCurta": "Espresso e leite vaporizado com doce de leite diluído na bebida.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado",
      "Doce de leite diluído"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 12
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 13
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 14
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/latte-doce-de-leite.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "leve",
      "cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "doce-de-leite",
      "caramelo",
      "sobremesa",
      "lactose-fixa"
    ],
    "promocaoElegivel": true,
    "servidoEm": "xícara"
  },
  {
    "id": "bala-de-canela",
    "grupo": "bebidas",
    "categoria": "autorais",
    "nome": "Bala de Canela",
    "descricaoCurta": "Espresso, leite, calda artesanal de cereja e leite condensado, com canela.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite",
      "Calda artesanal de cereja",
      "Leite condensado",
      "Canela em pó"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 13.9
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 14.9
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 15.9
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 18.9
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/bala-de-canela.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "leve",
      "cafe",
      "cremoso",
      "cafeina-media",
      "autoral",
      "diferente",
      "canela",
      "cereja",
      "frutado",
      "condensado",
      "sobremesa",
      "lactose-fixa"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "limon-cappuccino",
    "grupo": "bebidas",
    "categoria": "autorais",
    "nome": "Limon Cappuccino",
    "descricaoCurta": "Cappuccino cítrico com xarope de limão siciliano.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite vaporizado",
      "Espuma de leite",
      "Xarope de limão siciliano"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 13
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 14
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 15
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/limon-cappuccino.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "intenso",
      "cafe",
      "espumoso",
      "cafeina-media",
      "autoral",
      "diferente",
      "citrico"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "limon-gelado",
    "grupo": "bebidas",
    "categoria": "autorais",
    "nome": "Limon Gelado",
    "descricaoCurta": "Água tônica, espresso, limão siciliano e raspas de limão.",
    "descricao": "",
    "ingredientes": [
      "Água tônica",
      "Espresso",
      "Limão siciliano",
      "Raspas de limão",
      "Gelo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 16.2
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/limon-gelado.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "gelado",
      "leve",
      "cafe",
      "refrescante",
      "cafeina-media",
      "autoral",
      "diferente",
      "citrico"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "chocolate-quente-classico",
    "grupo": "bebidas",
    "categoria": "chocolate-quente",
    "nome": "Clássico",
    "nomeCompleto": "Chocolate Quente — Clássico",
    "descricaoCurta": "Chocolate derretido no leite vaporizado. Escolha tradicional ou meio amargo.",
    "descricao": "",
    "ingredientes": [
      "Chocolate",
      "Leite"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 14
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 15
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 16
      }
    ],
    "opcoes": [
      "tipo-chocolate",
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/chocolate-quente-classico.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "leve",
      "sem-cafe",
      "cremoso",
      "sem-cafeina",
      "classico",
      "chocolate",
      "cacau"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "chocolate-quente-marshmallow",
    "grupo": "bebidas",
    "categoria": "chocolate-quente",
    "nome": "Com Marshmallow",
    "nomeCompleto": "Chocolate Quente — Com Marshmallow",
    "descricaoCurta": "Chocolate quente coberto de marshmallows.",
    "descricao": "",
    "ingredientes": [
      "Chocolate",
      "Leite",
      "Marshmallows"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 16
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 17
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 18
      }
    ],
    "opcoes": [
      "tipo-chocolate",
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/chocolate-quente-marshmallow.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "leve",
      "sem-cafe",
      "cremoso",
      "sem-cafeina",
      "diferente",
      "chocolate",
      "sobremesa"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "chocolate-quente-chantilly",
    "grupo": "bebidas",
    "categoria": "chocolate-quente",
    "nome": "Com Chantilly",
    "nomeCompleto": "Chocolate Quente — Com Chantilly",
    "descricaoCurta": "Chocolate quente com chantilly e raspas de chocolate por cima.",
    "descricao": "",
    "ingredientes": [
      "Chocolate",
      "Leite",
      "Chantilly",
      "Raspas de chocolate"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 16
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 17
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 18
      }
    ],
    "opcoes": [
      "tipo-chocolate",
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/chocolate-quente-chantilly.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "leve",
      "sem-cafe",
      "cremoso",
      "sem-cafeina",
      "classico",
      "chocolate",
      "sobremesa"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "chocolate-quente-avela",
    "grupo": "bebidas",
    "categoria": "chocolate-quente",
    "nome": "Avelã",
    "nomeCompleto": "Chocolate Quente — Avelã",
    "descricaoCurta": "Chocolate quente com creme de avelã.",
    "descricao": "",
    "ingredientes": [
      "Chocolate",
      "Leite",
      "Creme de avelã"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 16
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 17
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/chocolate-quente-avela.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "leve",
      "sem-cafe",
      "cremoso",
      "sem-cafeina",
      "classico",
      "chocolate",
      "avela",
      "sobremesa"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "iced-latte",
    "grupo": "bebidas",
    "categoria": "gelados",
    "nome": "Iced Latte",
    "descricaoCurta": "Espresso e leite gelado, com gelo.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite gelado",
      "Gelo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 14.0
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/iced-latte.jpg",
    "etiquetas": [
      "amargo",
      "leite",
      "gelado",
      "leve",
      "cafe",
      "cremoso",
      "refrescante",
      "cafeina-media",
      "classico"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "vanilla-latte-gelado",
    "grupo": "bebidas",
    "categoria": "gelados",
    "nome": "Vanilla Latte Gelado",
    "descricaoCurta": "Iced latte com xarope de baunilha.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite gelado",
      "Xarope de baunilha",
      "Gelo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 16.0
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/vanilla-latte-gelado.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "gelado",
      "leve",
      "cafe",
      "cremoso",
      "refrescante",
      "cafeina-media",
      "classico",
      "baunilha"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "avela-latte-gelado",
    "grupo": "bebidas",
    "categoria": "gelados",
    "nome": "Avelã Latte Gelado",
    "descricaoCurta": "Iced latte com creme de avelã.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite gelado",
      "Creme de avelã",
      "Gelo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 16.0
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/avela-latte-gelado.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "gelado",
      "leve",
      "cafe",
      "cremoso",
      "refrescante",
      "cafeina-media",
      "classico",
      "avela"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "caramel-latte-gelado",
    "grupo": "bebidas",
    "categoria": "gelados",
    "nome": "Caramel Latte Gelado",
    "descricaoCurta": "Iced latte com calda de caramelo.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite gelado",
      "Calda de caramelo",
      "Gelo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 17.0
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/caramel-latte-gelado.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "gelado",
      "leve",
      "cafe",
      "cremoso",
      "refrescante",
      "cafeina-media",
      "classico",
      "caramelo"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "choco-latte-gelado",
    "grupo": "bebidas",
    "categoria": "gelados",
    "nome": "Choco Latte Gelado",
    "descricaoCurta": "Iced latte com chocolate.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Leite gelado",
      "Chocolate",
      "Gelo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 16.0
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/choco-latte-gelado.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "gelado",
      "leve",
      "cafe",
      "cremoso",
      "refrescante",
      "cafeina-media",
      "classico",
      "chocolate"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "iced-moka",
    "grupo": "bebidas",
    "categoria": "gelados",
    "nome": "Iced Moka",
    "descricaoCurta": "Espresso, chocolate e leite gelado.",
    "descricao": "",
    "ingredientes": [
      "Espresso",
      "Chocolate",
      "Leite gelado",
      "Gelo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 17.0
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/iced-moka.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "gelado",
      "intenso",
      "cafe",
      "cremoso",
      "refrescante",
      "cafeina-media",
      "classico",
      "chocolate"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "cold-brew",
    "grupo": "bebidas",
    "categoria": "gelados",
    "nome": "Cold Brew",
    "descricaoCurta": "Café extraído a frio por 12 horas.",
    "descricao": "",
    "ingredientes": [
      "Café extraído a frio por 12 horas",
      "Gelo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 300,
        "preco": 14.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/cold-brew.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "gelado",
      "intenso",
      "cafe",
      "liquido",
      "refrescante",
      "cafeina-alta",
      "diferente",
      "notas-do-grao"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "affogato",
    "grupo": "bebidas",
    "categoria": "gelados",
    "nome": "Affogato",
    "descricaoCurta": "Sorvete de creme com espresso por cima.",
    "descricao": "",
    "ingredientes": [
      "Sorvete de creme",
      "Espresso"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 16.0
      }
    ],
    "opcoes": [
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/affogato.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "gelado",
      "intenso",
      "cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "baunilha",
      "sobremesa",
      "lactose-fixa"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "smoothie-melancia-banana",
    "grupo": "bebidas",
    "categoria": "smoothies",
    "nome": "Melancia e Banana",
    "nomeCompleto": "Smoothie — Melancia e Banana",
    "descricaoCurta": "Melancia e banana congeladas, com limão e um toque de mel.",
    "descricao": "",
    "ingredientes": [
      "Melancia congelada",
      "Banana congelada",
      "Suco de limão",
      "Mel"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 15
      }
    ],
    "opcoes": [
      "docura-smoothie"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/smoothie-melancia-banana.jpg",
    "etiquetas": [
      "doce",
      "sem-leite",
      "gelado",
      "leve",
      "sem-cafe",
      "refrescante",
      "sem-cafeina",
      "diferente",
      "frutado",
      "mel"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "smoothie-melao-hortela-limao",
    "grupo": "bebidas",
    "categoria": "smoothies",
    "nome": "Melão, Hortelã e Limão",
    "nomeCompleto": "Smoothie — Melão, Hortelã e Limão",
    "descricaoCurta": "Melão congelado batido com hortelã fresca, limão e mel. O mais refrescante.",
    "descricao": "",
    "ingredientes": [
      "Melão congelado",
      "Hortelã fresca",
      "Suco de limão",
      "Mel"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 15
      }
    ],
    "opcoes": [
      "docura-smoothie"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/smoothie-melao-hortela-limao.jpg",
    "etiquetas": [
      "doce",
      "sem-leite",
      "gelado",
      "leve",
      "sem-cafe",
      "refrescante",
      "sem-cafeina",
      "diferente",
      "frutado",
      "herbal",
      "citrico",
      "mel"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "smoothie-abacaxi-hortela-mel",
    "grupo": "bebidas",
    "categoria": "smoothies",
    "nome": "Abacaxi, Hortelã e Mel",
    "nomeCompleto": "Smoothie — Abacaxi, Hortelã e Mel",
    "descricaoCurta": "Abacaxi congelado com hortelã fresca, mel e limão.",
    "descricao": "",
    "ingredientes": [
      "Abacaxi congelado",
      "Hortelã fresca",
      "Mel",
      "Suco de limão"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 16
      }
    ],
    "opcoes": [
      "docura-smoothie"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/smoothie-abacaxi-hortela-mel.jpg",
    "etiquetas": [
      "doce",
      "sem-leite",
      "gelado",
      "leve",
      "sem-cafe",
      "refrescante",
      "sem-cafeina",
      "diferente",
      "frutado",
      "herbal",
      "citrico",
      "mel"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "smoothie-manga-laranja",
    "grupo": "bebidas",
    "categoria": "smoothies",
    "nome": "Manga e Laranja",
    "nomeCompleto": "Smoothie — Manga e Laranja",
    "descricaoCurta": "Manga e banana congeladas com suco de laranja espremido na hora.",
    "descricao": "",
    "ingredientes": [
      "Manga congelada",
      "Banana congelada",
      "Suco de laranja natural"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 16
      }
    ],
    "opcoes": [
      "docura-smoothie"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/smoothie-manga-laranja.jpg",
    "etiquetas": [
      "doce",
      "sem-leite",
      "gelado",
      "leve",
      "sem-cafe",
      "refrescante",
      "sem-cafeina",
      "classico",
      "frutado",
      "citrico"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "smoothie-morango-baunilha",
    "grupo": "bebidas",
    "categoria": "smoothies",
    "nome": "Morango e Baunilha",
    "nomeCompleto": "Smoothie — Morango e Baunilha",
    "descricaoCurta": "Morango e banana com sorvete de creme, leite e baunilha. Cremoso.",
    "descricao": "",
    "ingredientes": [
      "Morango congelado",
      "Banana congelada",
      "Sorvete de creme",
      "Leite",
      "Xarope de baunilha"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/smoothie-morango-baunilha.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "refrescante",
      "sem-cafeina",
      "classico",
      "frutado",
      "morango",
      "baunilha",
      "sobremesa",
      "lactose-fixa"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "smoothie-bala-de-canela",
    "grupo": "bebidas",
    "categoria": "smoothies",
    "nome": "Bala de Canela Gelada",
    "nomeCompleto": "Smoothie — Bala de Canela Gelada",
    "descricaoCurta": "A versão de verão da nossa autoral: banana, calda de cereja, leite condensado e canela.",
    "descricao": "",
    "ingredientes": [
      "Banana congelada",
      "Calda artesanal de cereja",
      "Leite condensado",
      "Leite",
      "Canela em pó"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/smoothie-bala-de-canela.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "sem-cafeina",
      "autoral",
      "diferente",
      "frutado",
      "cereja",
      "canela",
      "condensado",
      "sobremesa",
      "lactose-fixa"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "smoothie-matcha-manga",
    "grupo": "bebidas",
    "categoria": "smoothies",
    "nome": "Matcha e Manga",
    "nomeCompleto": "Smoothie — Matcha e Manga",
    "descricaoCurta": "Matcha com manga congelada, leite e mel.",
    "descricao": "",
    "ingredientes": [
      "Matcha",
      "Manga congelada",
      "Leite",
      "Mel"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 19
      }
    ],
    "opcoes": [
      "docura-smoothie",
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/smoothie-matcha-manga.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "herbal",
      "frutado",
      "mel"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "pure-matcha",
    "grupo": "bebidas",
    "categoria": "matcha",
    "nome": "Pure Matcha",
    "descricaoCurta": "Matcha batido com água. Servido quente.",
    "descricao": "",
    "ingredientes": [
      "Matcha",
      "Água"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 11.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/pure-matcha.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "quente",
      "intenso",
      "sem-cafe",
      "liquido",
      "cafeina-media",
      "diferente",
      "herbal"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "matcha-latte-tradicional",
    "grupo": "bebidas",
    "categoria": "matcha",
    "nome": "Matcha Latte Tradicional",
    "descricaoCurta": "Matcha com leite vaporizado.",
    "descricao": "",
    "ingredientes": [
      "Matcha",
      "Leite"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 12
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 13
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 14
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/matcha-latte-tradicional.jpg",
    "etiquetas": [
      "amargo",
      "leite",
      "quente",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "herbal"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "vietnamita-matcha",
    "grupo": "bebidas",
    "categoria": "matcha",
    "nome": "Vietnamita Matcha",
    "descricaoCurta": "Matcha latte com leite condensado.",
    "descricao": "",
    "ingredientes": [
      "Matcha",
      "Leite",
      "Leite condensado"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 13
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 14
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 15
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 19
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/vietnamita-matcha.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "herbal",
      "condensado",
      "favorito-da-casa",
      "lactose-fixa"
    ],
    "promocaoElegivel": true,
    "selo": "favorito"
  },
  {
    "id": "honey-matcha",
    "grupo": "bebidas",
    "categoria": "matcha",
    "nome": "Honey Matcha",
    "descricaoCurta": "Matcha latte adoçado com mel.",
    "descricao": "",
    "ingredientes": [
      "Matcha",
      "Leite",
      "Mel"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 13
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 14
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 15
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/honey-matcha.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "herbal",
      "mel"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "vanilla-matcha",
    "grupo": "bebidas",
    "categoria": "matcha",
    "nome": "Vanilla Matcha",
    "descricaoCurta": "Matcha latte com xarope de baunilha.",
    "descricao": "",
    "ingredientes": [
      "Matcha",
      "Leite",
      "Xarope de baunilha"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 13
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 14
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 15
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/vanilla-matcha.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "herbal",
      "baunilha"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "caramel-matcha",
    "grupo": "bebidas",
    "categoria": "matcha",
    "nome": "Caramel Matcha",
    "descricaoCurta": "Matcha latte com calda de caramelo.",
    "descricao": "",
    "ingredientes": [
      "Matcha",
      "Leite",
      "Calda de caramelo"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 13
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 14
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 15
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/caramel-matcha.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "herbal",
      "caramelo"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "moka-matcha",
    "grupo": "bebidas",
    "categoria": "matcha",
    "nome": "Moka Matcha",
    "descricaoCurta": "Matcha latte com chocolate meio amargo.",
    "descricao": "",
    "ingredientes": [
      "Matcha",
      "Leite",
      "Chocolate meio amargo"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 14
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 15
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 16
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 19
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/moka-matcha.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "intenso",
      "sem-cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "herbal",
      "chocolate"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "matcha-com-leite-de-morango",
    "grupo": "bebidas",
    "categoria": "matcha",
    "nome": "Matcha com Leite de Morango",
    "descricaoCurta": "Matcha sobre leite de morango.",
    "descricao": "",
    "ingredientes": [
      "Matcha",
      "Leite de morango"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 15
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 16
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 17
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 19
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/matcha-com-leite-de-morango.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "herbal",
      "morango",
      "frutado",
      "lactose-fixa"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "chai-tradicional",
    "grupo": "bebidas",
    "categoria": "chai",
    "nome": "Chai Tradicional",
    "descricaoCurta": "Chá de especiarias. Servido quente.",
    "descricao": "",
    "ingredientes": [
      "Chá chai de especiarias"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 12
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 13
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 14
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/chai-tradicional.jpg",
    "etiquetas": [
      "doce",
      "sem-leite",
      "quente",
      "intenso",
      "sem-cafe",
      "liquido",
      "cafeina-baixa",
      "diferente",
      "especiarias",
      "canela"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "chai-latte",
    "grupo": "bebidas",
    "categoria": "chai",
    "nome": "Chai Latte",
    "descricaoCurta": "Chai com leite vaporizado.",
    "descricao": "",
    "ingredientes": [
      "Chá chai",
      "Leite"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 12
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 13
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 14
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/chai-latte.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-baixa",
      "diferente",
      "especiarias",
      "canela"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "vanilla-chai-latte",
    "grupo": "bebidas",
    "categoria": "chai",
    "nome": "Vanilla Chai Latte",
    "descricaoCurta": "Chai latte com xarope de baunilha.",
    "descricao": "",
    "ingredientes": [
      "Chá chai",
      "Leite",
      "Xarope de baunilha"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 13
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 14
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 15
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/vanilla-chai-latte.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-baixa",
      "diferente",
      "especiarias",
      "baunilha"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "honey-chai",
    "grupo": "bebidas",
    "categoria": "chai",
    "nome": "Honey Chai",
    "descricaoCurta": "Chai latte adoçado com mel.",
    "descricao": "",
    "ingredientes": [
      "Chá chai",
      "Leite",
      "Mel"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 13
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 14
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 15
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/honey-chai.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-baixa",
      "diferente",
      "especiarias",
      "mel"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "caramel-chai",
    "grupo": "bebidas",
    "categoria": "chai",
    "nome": "Caramel Chai",
    "descricaoCurta": "Chai latte com calda de caramelo.",
    "descricao": "",
    "ingredientes": [
      "Chá chai",
      "Leite",
      "Calda de caramelo"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 13
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 14
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 15
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 18
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/caramel-chai.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-baixa",
      "diferente",
      "especiarias",
      "caramelo"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "vietnamita-chai",
    "grupo": "bebidas",
    "categoria": "chai",
    "nome": "Vietnamita Chai",
    "descricaoCurta": "Chai latte com leite condensado.",
    "descricao": "",
    "ingredientes": [
      "Chá chai",
      "Leite",
      "Leite condensado"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 13
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 14
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 15
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 19
      }
    ],
    "opcoes": [
      "leite"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/vietnamita-chai.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "leve",
      "sem-cafe",
      "cremoso",
      "cafeina-baixa",
      "diferente",
      "especiarias",
      "condensado",
      "lactose-fixa"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "dirty-chai",
    "grupo": "bebidas",
    "categoria": "chai",
    "nome": "Dirty Chai",
    "descricaoCurta": "Chai latte com uma dose de espresso.",
    "descricao": "",
    "ingredientes": [
      "Chá chai",
      "Leite",
      "Espresso"
    ],
    "tamanhos": [
      {
        "rotulo": "P",
        "ml": 170,
        "preco": 14
      },
      {
        "rotulo": "M",
        "ml": 200,
        "preco": 15
      },
      {
        "rotulo": "G",
        "ml": 250,
        "preco": 16
      },
      {
        "rotulo": "Gelado",
        "ml": null,
        "preco": 19
      }
    ],
    "opcoes": [
      "leite",
      "extras"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/dirty-chai.jpg",
    "etiquetas": [
      "doce",
      "leite",
      "quente",
      "gelado",
      "intenso",
      "cafe",
      "cremoso",
      "cafeina-media",
      "diferente",
      "especiarias",
      "canela"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "suco-de-laranja",
    "grupo": "bebidas",
    "categoria": "drinks",
    "nome": "Suco de Laranja",
    "descricaoCurta": "Laranja espremida na hora.",
    "descricao": "",
    "ingredientes": [
      "Laranja"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/suco-de-laranja.jpg",
    "etiquetas": [
      "doce",
      "sem-leite",
      "gelado",
      "leve",
      "sem-cafe",
      "refrescante",
      "sem-cafeina",
      "classico",
      "citrico",
      "frutado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "cha",
    "grupo": "bebidas",
    "categoria": "drinks",
    "nome": "Chá",
    "descricaoCurta": "Sabores do dia. Consulte no balcão.",
    "descricao": "",
    "ingredientes": [
      "Chá do dia"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 200,
        "preco": 8.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/cha.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "quente",
      "leve",
      "sem-cafe",
      "liquido",
      "cafeina-baixa",
      "classico",
      "herbal"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "cha-gelado",
    "grupo": "bebidas",
    "categoria": "drinks",
    "nome": "Chá Gelado",
    "descricaoCurta": "Chá gelado com limão.",
    "descricao": "",
    "ingredientes": [
      "Chá",
      "Gelo",
      "Limão"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 12.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/cha-gelado.jpg",
    "etiquetas": [
      "amargo",
      "sem-leite",
      "gelado",
      "leve",
      "sem-cafe",
      "refrescante",
      "cafeina-baixa",
      "classico",
      "citrico"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "cha-de-morangos",
    "grupo": "bebidas",
    "categoria": "drinks",
    "nome": "Chá de Morangos",
    "descricaoCurta": "Chá gelado com morangos.",
    "descricao": "",
    "ingredientes": [
      "Chá",
      "Morangos",
      "Gelo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 15.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/cha-de-morangos.jpg",
    "etiquetas": [
      "doce",
      "sem-leite",
      "gelado",
      "leve",
      "sem-cafe",
      "refrescante",
      "cafeina-baixa",
      "diferente",
      "morango",
      "frutado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "soda-italiana",
    "grupo": "bebidas",
    "categoria": "drinks",
    "nome": "Soda Italiana",
    "descricaoCurta": "Monte a sua: escolha de 1 a 3 sabores, sem custo extra.",
    "descricao": "",
    "ingredientes": [
      "Água com gás",
      "60 ml de xarope, divididos entre os sabores escolhidos",
      "Gelo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": 500,
        "preco": 15.0
      }
    ],
    "opcoes": [
      "sabores-soda"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/soda-italiana.jpg",
    "etiquetas": [
      "doce",
      "sem-leite",
      "gelado",
      "leve",
      "sem-cafe",
      "refrescante",
      "sem-cafeina",
      "diferente",
      "frutado"
    ],
    "promocaoElegivel": false
  },
  {
    "id": "croissants-na-chapa-com-manteiga",
    "grupo": "comidas",
    "categoria": "croissants-salgados",
    "nome": "Na chapa com manteiga",
    "nomeCompleto": "Croissant — Na chapa com manteiga",
    "descricaoCurta": "Croissant aquecido na chapa com manteiga.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Manteiga"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 12.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-na-chapa-com-manteiga.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "croissants-frango-com-requeijao-e-queijo",
    "grupo": "comidas",
    "categoria": "croissants-salgados",
    "nome": "Frango com requeijão e queijo",
    "nomeCompleto": "Croissant — Frango com requeijão e queijo",
    "descricaoCurta": "Recheado com frango, requeijão e queijo.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Frango",
      "Requeijão",
      "Queijo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-frango-com-requeijao-e-queijo.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "croissants-presunto-com-queijo",
    "grupo": "comidas",
    "categoria": "croissants-salgados",
    "nome": "Presunto com queijo",
    "nomeCompleto": "Croissant — Presunto com queijo",
    "descricaoCurta": "Recheado com presunto e queijo.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Presunto",
      "Queijo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-presunto-com-queijo.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "croissants-presunto-queijo-e-tomate",
    "grupo": "comidas",
    "categoria": "croissants-salgados",
    "nome": "Presunto, queijo e tomate",
    "nomeCompleto": "Croissant — Presunto, queijo e tomate",
    "descricaoCurta": "Recheado com presunto, queijo e tomate.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Presunto",
      "Queijo",
      "Tomate"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.9
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-presunto-queijo-e-tomate.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "croissants-2-queijos-gratinado",
    "grupo": "comidas",
    "categoria": "croissants-salgados",
    "nome": "2 queijos gratinado",
    "nomeCompleto": "Croissant — 2 queijos gratinado",
    "descricaoCurta": "Recheado com dois queijos e gratinado.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Dois queijos",
      "Gratinado"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-2-queijos-gratinado.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "croissants-ovos-com-queijo",
    "grupo": "comidas",
    "categoria": "croissants-salgados",
    "nome": "Ovos com queijo",
    "nomeCompleto": "Croissant — Ovos com queijo",
    "descricaoCurta": "Recheado com ovos e queijo.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Ovos",
      "Queijo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-ovos-com-queijo.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "croissants-requeijao-com-queijo",
    "grupo": "comidas",
    "categoria": "croissants-salgados",
    "nome": "Requeijão com queijo",
    "nomeCompleto": "Croissant — Requeijão com queijo",
    "descricaoCurta": "Recheado com requeijão e queijo.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Requeijão",
      "Queijo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 12.5
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-requeijao-com-queijo.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "croissants-ovos-bacon-queijo-e-requeijao",
    "grupo": "comidas",
    "categoria": "croissants-salgados",
    "nome": "Ovos, bacon, queijo e requeijão",
    "nomeCompleto": "Croissant — Ovos, bacon, queijo e requeijão",
    "descricaoCurta": "Recheado com ovos, bacon, queijo e requeijão.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Ovos",
      "Bacon",
      "Queijo",
      "Requeijão"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 17.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-ovos-bacon-queijo-e-requeijao.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "croissants-creme-de-avela",
    "grupo": "comidas",
    "categoria": "croissants-doces",
    "nome": "Creme de avelã",
    "nomeCompleto": "Croissant — Creme de avelã",
    "descricaoCurta": "Recheado com creme de avelã.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Creme de avelã"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 16.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-creme-de-avela.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "croissants-creme-de-avela-e-morangos",
    "grupo": "comidas",
    "categoria": "croissants-doces",
    "nome": "Creme de avelã e morangos",
    "nomeCompleto": "Croissant — Creme de avelã e morangos",
    "descricaoCurta": "Recheado com creme de avelã e morangos.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Creme de avelã",
      "Morangos"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 18.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-creme-de-avela-e-morangos.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "croissants-doce-de-leite",
    "grupo": "comidas",
    "categoria": "croissants-doces",
    "nome": "Doce de leite",
    "nomeCompleto": "Croissant — Doce de leite",
    "descricaoCurta": "Recheado com doce de leite.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Doce de leite"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 15.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-doce-de-leite.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "croissants-doce-de-leite-com-banana",
    "grupo": "comidas",
    "categoria": "croissants-doces",
    "nome": "Doce de leite com banana",
    "nomeCompleto": "Croissant — Doce de leite com banana",
    "descricaoCurta": "Recheado com doce de leite e banana.",
    "descricao": "",
    "ingredientes": [
      "Croissant",
      "Doce de leite",
      "Banana"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 17.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/croissants-doce-de-leite-com-banana.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "sanduiches-pao-na-chapa-com-requeijao",
    "grupo": "comidas",
    "categoria": "sanduiches",
    "nome": "Pão na chapa com requeijão",
    "nomeCompleto": "Sanduíche — Pão na chapa com requeijão",
    "descricaoCurta": "Pão na chapa com requeijão.",
    "descricao": "",
    "ingredientes": [
      "Pão",
      "Requeijão"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 7.0
      }
    ],
    "opcoes": [
      "pao"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/sanduiches-pao-na-chapa-com-requeijao.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "sanduiches-misto-quente",
    "grupo": "comidas",
    "categoria": "sanduiches",
    "nome": "Misto quente",
    "nomeCompleto": "Sanduíche — Misto quente",
    "descricaoCurta": "Presunto e queijo, na chapa.",
    "descricao": "",
    "ingredientes": [
      "Pão",
      "Presunto",
      "Queijo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 12.0
      }
    ],
    "opcoes": [
      "pao"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/sanduiches-misto-quente.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "sanduiches-queijo-quente",
    "grupo": "comidas",
    "categoria": "sanduiches",
    "nome": "Queijo quente",
    "nomeCompleto": "Sanduíche — Queijo quente",
    "descricaoCurta": "Queijo derretido, na chapa.",
    "descricao": "",
    "ingredientes": [
      "Pão",
      "Queijo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 12.0
      }
    ],
    "opcoes": [
      "pao"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/sanduiches-queijo-quente.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "sanduiches-bauru",
    "grupo": "comidas",
    "categoria": "sanduiches",
    "nome": "Bauru",
    "nomeCompleto": "Sanduíche — Bauru",
    "descricaoCurta": "Presunto, queijo e tomate, na chapa.",
    "descricao": "",
    "ingredientes": [
      "Pão",
      "Presunto",
      "Queijo",
      "Tomate"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 13.0
      }
    ],
    "opcoes": [
      "pao"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/sanduiches-bauru.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "sanduiches-queijo-e-bacon",
    "grupo": "comidas",
    "categoria": "sanduiches",
    "nome": "Queijo e bacon",
    "nomeCompleto": "Sanduíche — Queijo e bacon",
    "descricaoCurta": "Queijo e bacon, na chapa.",
    "descricao": "",
    "ingredientes": [
      "Pão",
      "Queijo",
      "Bacon"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [
      "pao"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/sanduiches-queijo-e-bacon.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "sanduiches-misto-com-ovo",
    "grupo": "comidas",
    "categoria": "sanduiches",
    "nome": "Misto com ovo",
    "nomeCompleto": "Sanduíche — Misto com ovo",
    "descricaoCurta": "Presunto, queijo e ovo, na chapa.",
    "descricao": "",
    "ingredientes": [
      "Pão",
      "Presunto",
      "Queijo",
      "Ovo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [
      "pao"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/sanduiches-misto-com-ovo.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "gratinados-frango-cremoso",
    "grupo": "comidas",
    "categoria": "gratinados",
    "nome": "Frango cremoso",
    "nomeCompleto": "Gratinado — Frango cremoso",
    "descricaoCurta": "Sanduíche gratinado de frango cremoso.",
    "descricao": "",
    "ingredientes": [
      "Pão",
      "Frango cremoso",
      "Queijo gratinado"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/gratinados-frango-cremoso.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "gratinados-croque-monsieur",
    "grupo": "comidas",
    "categoria": "gratinados",
    "nome": "Croque monsieur",
    "nomeCompleto": "Gratinado — Croque monsieur",
    "descricaoCurta": "Clássico francês de presunto e queijo, gratinado.",
    "descricao": "",
    "ingredientes": [
      "Pão",
      "Presunto",
      "Queijo gratinado"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 13.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/gratinados-croque-monsieur.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "gratinados-ovos-e-queijo",
    "grupo": "comidas",
    "categoria": "gratinados",
    "nome": "Ovos e queijo",
    "nomeCompleto": "Gratinado — Ovos e queijo",
    "descricaoCurta": "Sanduíche gratinado de ovos e queijo.",
    "descricao": "",
    "ingredientes": [
      "Pão",
      "Ovos",
      "Queijo gratinado"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 13.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/gratinados-ovos-e-queijo.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "gratinados-bauru",
    "grupo": "comidas",
    "categoria": "gratinados",
    "nome": "Bauru",
    "nomeCompleto": "Gratinado — Bauru",
    "descricaoCurta": "Bauru gratinado: presunto, queijo e tomate.",
    "descricao": "",
    "ingredientes": [
      "Pão",
      "Presunto",
      "Tomate",
      "Queijo gratinado"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/gratinados-bauru.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "toast-ovos-queijo-requeijao",
    "grupo": "comidas",
    "categoria": "toasts",
    "nome": "Ovos, Queijo e Requeijão",
    "nomeCompleto": "Toast — Ovos, Queijo e Requeijão",
    "descricaoCurta": "Requeijão na base, ovos mexidos cremosos e queijo derretido.",
    "descricao": "",
    "ingredientes": [
      "Fatia grossa de broa de milho sovada, dourada na manteiga",
      "Requeijão",
      "Ovos mexidos cremosos",
      "Queijo derretido"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 15
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/toast-ovos-queijo-requeijao.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "toast-ovos-bacon-queijo",
    "grupo": "comidas",
    "categoria": "toasts",
    "nome": "Ovos, Bacon e Queijo",
    "nomeCompleto": "Toast — Ovos, Bacon e Queijo",
    "descricaoCurta": "Ovos mexidos, bacon crocante e queijo derretido.",
    "descricao": "",
    "ingredientes": [
      "Fatia grossa de broa de milho sovada, dourada na manteiga",
      "Ovos mexidos cremosos",
      "Bacon crocante",
      "Queijo derretido"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 17
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/toast-ovos-bacon-queijo.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "toast-frango-cremoso",
    "grupo": "comidas",
    "categoria": "toasts",
    "nome": "Frango Cremoso Gratinado",
    "nomeCompleto": "Toast — Frango Cremoso Gratinado",
    "descricaoCurta": "O frango cremoso da casa com queijo gratinado por cima.",
    "descricao": "",
    "ingredientes": [
      "Fatia grossa de broa de milho sovada, dourada na manteiga",
      "Frango cremoso",
      "Queijo gratinado"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 17
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/toast-frango-cremoso.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "toast-tomate-queijo",
    "grupo": "comidas",
    "categoria": "toasts",
    "nome": "Tomate e Queijo",
    "nomeCompleto": "Toast — Tomate e Queijo",
    "descricaoCurta": "Queijo derretido e tomate em cubinhos temperado com azeite e orégano.",
    "descricao": "",
    "ingredientes": [
      "Fatia grossa de broa de milho sovada, dourada na manteiga",
      "Queijo derretido",
      "Tomate temperado com azeite e orégano"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/toast-tomate-queijo.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "toast-presunto-queijo-ovo",
    "grupo": "comidas",
    "categoria": "toasts",
    "nome": "Presunto, Queijo e Ovo",
    "nomeCompleto": "Toast — Presunto, Queijo e Ovo",
    "descricaoCurta": "Presunto e queijo derretido com um ovo estrelado por cima, no estilo croque madame.",
    "descricao": "",
    "ingredientes": [
      "Fatia grossa de broa de milho sovada, dourada na manteiga",
      "Presunto",
      "Queijo derretido",
      "Ovo estrelado"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 17
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/toast-presunto-queijo-ovo.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "toast-banana-canela-mel",
    "grupo": "comidas",
    "categoria": "toasts",
    "nome": "Banana, Canela e Mel",
    "nomeCompleto": "Toast — Banana, Canela e Mel",
    "descricaoCurta": "Banana caramelizada na chapa, canela e um fio de mel.",
    "descricao": "",
    "ingredientes": [
      "Fatia grossa de broa de milho sovada, dourada na manteiga",
      "Banana caramelizada",
      "Canela",
      "Mel"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/toast-banana-canela-mel.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "toast-morango-avela",
    "grupo": "comidas",
    "categoria": "toasts",
    "nome": "Morango e Avelã",
    "nomeCompleto": "Toast — Morango e Avelã",
    "descricaoCurta": "Creme de avelã e morangos frescos fatiados.",
    "descricao": "",
    "ingredientes": [
      "Fatia grossa de broa de milho sovada, dourada na manteiga",
      "Creme de avelã",
      "Morangos frescos"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 17
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/toast-morango-avela.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "toast-doce-de-leite-banana",
    "grupo": "comidas",
    "categoria": "toasts",
    "nome": "Doce de Leite e Banana",
    "nomeCompleto": "Toast — Doce de Leite e Banana",
    "descricaoCurta": "Doce de leite, banana em rodelas e canela.",
    "descricao": "",
    "ingredientes": [
      "Fatia grossa de broa de milho sovada, dourada na manteiga",
      "Doce de leite",
      "Banana",
      "Canela"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 15
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/toast-doce-de-leite-banana.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "toast-monte-o-seu",
    "grupo": "comidas",
    "categoria": "toasts",
    "nome": "Monte seu Toast",
    "nomeCompleto": "Toast — Monte seu Toast",
    "descricaoCurta": "Escolha a base e de 1 a 5 coberturas. O preço muda conforme o que você escolher.",
    "descricao": "",
    "ingredientes": [
      "Fatia grossa de broa de milho sovada, dourada na manteiga",
      "Base à escolha",
      "Coberturas à escolha"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 10
      }
    ],
    "opcoes": [
      "base-toast",
      "coberturas-toast"
    ],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/toast-monte-o-seu.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": false
  },
  {
    "id": "brunches-tradicional",
    "grupo": "comidas",
    "categoria": "brunches",
    "nome": "Tradicional",
    "nomeCompleto": "Brunch — Tradicional",
    "descricaoCurta": "Torradas, ovos mexidos, bacon e requeijão.",
    "descricao": "",
    "ingredientes": [
      "Torradas",
      "Ovos mexidos",
      "Bacon",
      "Requeijão"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 15.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/brunches-tradicional.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "brunches-simples",
    "grupo": "comidas",
    "categoria": "brunches",
    "nome": "Simples",
    "nomeCompleto": "Brunch — Simples",
    "descricaoCurta": "Torradas, ovos mexidos e requeijão.",
    "descricao": "",
    "ingredientes": [
      "Torradas",
      "Ovos mexidos",
      "Requeijão"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 13.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/brunches-simples.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "brunches-omelete",
    "grupo": "comidas",
    "categoria": "brunches",
    "nome": "Omelete",
    "nomeCompleto": "Brunch — Omelete",
    "descricaoCurta": "Omelete de queijo, torradas e requeijão.",
    "descricao": "",
    "ingredientes": [
      "Omelete de queijo",
      "Torradas",
      "Requeijão"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 16.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/brunches-omelete.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "brunches-omelete-e-bacon",
    "grupo": "comidas",
    "categoria": "brunches",
    "nome": "Omelete e bacon",
    "nomeCompleto": "Brunch — Omelete e bacon",
    "descricaoCurta": "Omelete de queijo com bacon, torradas e requeijão.",
    "descricao": "",
    "ingredientes": [
      "Omelete de queijo",
      "Bacon",
      "Torradas",
      "Requeijão"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 17.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/brunches-omelete-e-bacon.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "brunches-omelete-de-calabresa",
    "grupo": "comidas",
    "categoria": "brunches",
    "nome": "Omelete de calabresa",
    "nomeCompleto": "Brunch — Omelete de calabresa",
    "descricaoCurta": "Omelete com calabresa, torradas e requeijão.",
    "descricao": "",
    "ingredientes": [
      "Omelete com calabresa",
      "Torradas",
      "Requeijão"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 17.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/brunches-omelete-de-calabresa.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "brunches-omelete-de-frango-cremoso",
    "grupo": "comidas",
    "categoria": "brunches",
    "nome": "Omelete de frango cremoso",
    "nomeCompleto": "Brunch — Omelete de frango cremoso",
    "descricaoCurta": "Omelete com frango cremoso, torradas e requeijão.",
    "descricao": "",
    "ingredientes": [
      "Omelete com frango cremoso",
      "Torradas",
      "Requeijão"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 17.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/brunches-omelete-de-frango-cremoso.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "waffle-mineiro-tradicional",
    "grupo": "comidas",
    "categoria": "waffle-mineiro",
    "nome": "Tradicional",
    "nomeCompleto": "Waffle Mineiro — Tradicional",
    "descricaoCurta": "Waffle de pão de queijo, sem recheio.",
    "descricao": "",
    "ingredientes": [
      "Massa de pão de queijo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 12.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-mineiro-tradicional.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "waffle-mineiro-calabresa",
    "grupo": "comidas",
    "categoria": "waffle-mineiro",
    "nome": "Calabresa",
    "nomeCompleto": "Waffle Mineiro — Calabresa",
    "descricaoCurta": "Waffle de pão de queijo com calabresa.",
    "descricao": "",
    "ingredientes": [
      "Massa de pão de queijo",
      "Calabresa"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-mineiro-calabresa.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "waffle-mineiro-frango",
    "grupo": "comidas",
    "categoria": "waffle-mineiro",
    "nome": "Frango",
    "nomeCompleto": "Waffle Mineiro — Frango",
    "descricaoCurta": "Waffle de pão de queijo com frango.",
    "descricao": "",
    "ingredientes": [
      "Massa de pão de queijo",
      "Frango"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-mineiro-frango.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "waffle-mineiro-presunto-e-queijo",
    "grupo": "comidas",
    "categoria": "waffle-mineiro",
    "nome": "Presunto e queijo",
    "nomeCompleto": "Waffle Mineiro — Presunto e queijo",
    "descricaoCurta": "Waffle de pão de queijo com presunto e queijo.",
    "descricao": "",
    "ingredientes": [
      "Massa de pão de queijo",
      "Presunto",
      "Queijo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 14.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-mineiro-presunto-e-queijo.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "waffle-mineiro-tipo-bauru",
    "grupo": "comidas",
    "categoria": "waffle-mineiro",
    "nome": "Tipo Bauru",
    "nomeCompleto": "Waffle Mineiro — Tipo Bauru",
    "descricaoCurta": "Waffle de pão de queijo com presunto, queijo e tomate.",
    "descricao": "",
    "ingredientes": [
      "Massa de pão de queijo",
      "Presunto",
      "Queijo",
      "Tomate"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 15.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-mineiro-tipo-bauru.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "waffle-mineiro-creme-de-avela",
    "grupo": "comidas",
    "categoria": "waffle-mineiro",
    "nome": "Creme de avelã",
    "nomeCompleto": "Waffle Mineiro — Creme de avelã",
    "descricaoCurta": "Waffle de pão de queijo com creme de avelã.",
    "descricao": "",
    "ingredientes": [
      "Massa de pão de queijo",
      "Creme de avelã"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 16.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-mineiro-creme-de-avela.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "waffle-mineiro-morangos-e-avela",
    "grupo": "comidas",
    "categoria": "waffle-mineiro",
    "nome": "Morangos e avelã",
    "nomeCompleto": "Waffle Mineiro — Morangos e avelã",
    "descricaoCurta": "Waffle de pão de queijo com morangos e creme de avelã.",
    "descricao": "",
    "ingredientes": [
      "Massa de pão de queijo",
      "Morangos",
      "Creme de avelã"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 18.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-mineiro-morangos-e-avela.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "waffle-mineiro-doce-de-leite",
    "grupo": "comidas",
    "categoria": "waffle-mineiro",
    "nome": "Doce de leite",
    "nomeCompleto": "Waffle Mineiro — Doce de leite",
    "descricaoCurta": "Waffle de pão de queijo com doce de leite.",
    "descricao": "",
    "ingredientes": [
      "Massa de pão de queijo",
      "Doce de leite"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 16.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-mineiro-doce-de-leite.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": true
  },
  {
    "id": "waffle-americano-chantilly-e-caramelo",
    "grupo": "comidas",
    "categoria": "waffle-americano",
    "nome": "Chantilly e caramelo",
    "nomeCompleto": "Waffle Americano — Chantilly e caramelo",
    "descricaoCurta": "Waffle com chantilly e calda de caramelo.",
    "descricao": "",
    "ingredientes": [
      "Waffle",
      "Chantilly",
      "Calda de caramelo"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 15.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-americano-chantilly-e-caramelo.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "waffle-americano-doce-de-leite-e-banana",
    "grupo": "comidas",
    "categoria": "waffle-americano",
    "nome": "Doce de leite e banana",
    "nomeCompleto": "Waffle Americano — Doce de leite e banana",
    "descricaoCurta": "Waffle com doce de leite e banana.",
    "descricao": "",
    "ingredientes": [
      "Waffle",
      "Doce de leite",
      "Banana"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 16.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-americano-doce-de-leite-e-banana.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "waffle-americano-avela-e-morangos",
    "grupo": "comidas",
    "categoria": "waffle-americano",
    "nome": "Avelã e morangos",
    "nomeCompleto": "Waffle Americano — Avelã e morangos",
    "descricaoCurta": "Waffle com creme de avelã e morangos.",
    "descricao": "",
    "ingredientes": [
      "Waffle",
      "Creme de avelã",
      "Morangos"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 18.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-americano-avela-e-morangos.jpg",
    "etiquetas": [
      "doce"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "waffle-americano-waffle-brunch",
    "grupo": "comidas",
    "categoria": "waffle-americano",
    "nome": "Waffle Brunch",
    "nomeCompleto": "Waffle Americano — Waffle Brunch",
    "descricaoCurta": "Waffle com ovos mexidos e bacon.",
    "descricao": "",
    "ingredientes": [
      "Waffle",
      "Ovos mexidos",
      "Bacon"
    ],
    "tamanhos": [
      {
        "rotulo": "Único",
        "ml": null,
        "preco": 18.0
      }
    ],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/waffle-americano-waffle-brunch.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": false,
    "precoAConfirmar": true
  },
  {
    "id": "tortas-torta-do-dia",
    "grupo": "comidas",
    "categoria": "tortas",
    "nome": "Torta do dia",
    "descricaoCurta": "Sabor muda todos os dias. Consulte sabor e valor no balcão.",
    "descricao": "",
    "ingredientes": [],
    "tamanhos": [],
    "opcoes": [],
    "preparo": "",
    "fichaTecnica": null,
    "foto": "assets/fotos/tortas-torta-do-dia.jpg",
    "etiquetas": [
      "salgado"
    ],
    "promocaoElegivel": false,
    "pedido": false
  }
];
