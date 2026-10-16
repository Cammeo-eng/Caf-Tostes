/* ==========================================================
   TOSTES café — Tradução: English (en)
   O português é o idioma original e fica nos arquivos menu.js, quiz.js,
   aulas.js e config.js. Este arquivo só traz os TEXTOS traduzidos,
   organizados pelo mesmo id usado lá. Preços, fotos e regras continuam
   vindo dos arquivos originais.

   - ui ........... textos da interface (botões, avisos, títulos). {n}, {valor},
                    {data}, {dia}, {hora}, {nome}, {max}, {total} são trocados
                    pelo valor real.
   - config ....... textos do config.js (chave com ponto = campo dentro de objeto)
   - tamanhos ..... rótulos dos tamanhos (P/M/G/Gelado/Único)
   - categorias ... nome e nota de cada categoria, pelo id
   - opcoes ....... título do grupo e nome de cada opção, pelos ids
   - itens ........ nome, nomeCompleto, descricaoCurta e ingredientes, pelo id
   - quiz ......... perguntas, respostas (na mesma ordem do quiz.js), motivos,
                    textos e harmonização
   - aulas ........ (fase 2) trilhas e aulas traduzidas

   Se um texto não existir aqui, o site mostra o português.
   ========================================================== */

window.I18N = window.I18N || {};
window.I18N.en = {
  "ui": {
    "idioma": "Language",
    "abertoAgora": "Open now",
    "fechadoAbre": "Closed · opens {dia} at {hora}",
    "hoje": "today",
    "amanha": "tomorrow",
    "dias": [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "mesa": "Table {n}",
    "menuCardapio": "Menu",
    "menuQuiz": "Find your coffee",
    "menuAulas": "Coffee stories",
    "menuChapeu": "Behind the hat",
    "menuFidelidade": "Loyalty card",
    "menuAvalie": "Review us on Google",
    "menuHorarios": "Hours and location",
    "pedidoFavorito": "The favorite order",
    "promocaoDia": "Today's deal",
    "validoHoje": "Valid today, {data}",
    "off": "{n}% off",
    "adicionarCombo": "Add combo",
    "adicionarAoPedido": "Add to order",
    "adicionar": "Add",
    "adicionarTotal": "Add · {valor}",
    "adicionado": "Added · View order",
    "aPartirDe": "from {valor}",
    "recomendado": "Recommended",
    "favoritoCasa": "House favorite",
    "serve": "Serves {n}",
    "servidoXicara": "Served in a cup",
    "servidoCopo": "Served in a glass",
    "consulteBalcao": "Ask at the counter for today's flavor",
    "ingredientes": "What's in it",
    "preparo": "How it's made",
    "fichaTecnica": "Brew specs",
    "tamanho": "Size",
    "semCustoLeite": "Lactose-free and oat milk at no extra cost.",
    "escolhaMinimo": "Choose at least {n}",
    "contadorEscolha": "{n} of {max}",
    "escolhaPingado": "Choose regular or creamy",
    "verPedido": "View order",
    "itens": "{n} items",
    "item": "1 item",
    "seuPedido": "Your order",
    "pedidoVazio": "Your order is empty.",
    "verCardapio": "See the menu",
    "subtotal": "Subtotal",
    "desconto": "Discount",
    "total": "Total",
    "levarViagem": "To go",
    "comerMesa": "Eat here",
    "escolhaMesa": "Which table?",
    "seuNome": "Your name",
    "observacoes": "Notes",
    "opcional": "optional",
    "preenchaNome": "Enter your name to send the order.",
    "enviarWhatsapp": "Send order via WhatsApp",
    "avisoPedido": "Your order goes to the counter via WhatsApp. You pay at the counter. You can also order at the counter.",
    "avisoPreparoTitulo": "Made to order, one at a time",
    "avisoPreparoTexto": "Everything here is made when you order. On busier days, it may take a few extra minutes. We promise it's worth every second.",
    "limparPedido": "Clear order",
    "remover": "Remove",
    "voltar": "Back",
    "fechar": "Close",
    "pedidoEnviado": "Order sent!",
    "quizCardTitulo": "Not sure what to order?",
    "quizCardBotao": "Find my coffee",
    "comecar": "Start",
    "perguntaDe": "{n} of {total}",
    "adicionarOsDois": "Add both",
    "aulasTitulo": "While your coffee is being made",
    "aulasSubtitulo": "Tap a circle and read a little about coffee.",
    "verNoCardapio": "See it on the menu",
    "conhecerHistoria": "Read the story",
    "trilhaTerminada": "You finished {nome}",
    "proximaTrilha": "Next topic",
    "leitura": "{n} read",
    "fidelidadeTitulo": "Loyalty program",
    "avalieGoogle": "Review us on Google",
    "comoChegar": "Directions",
    "horarios": "Opening hours",
    "horarioSemana": "Monday to Friday, 9 am to 7:30 pm",
    "horarioSabado": "Saturday, 9 am to 3 pm",
    "horarioDomingo": "Sunday, closed",
    "historiaChapeu": "The story behind the hat →",
    "legendaChapeu": "Coffee harvest in the early 20th century.",
    "fotoIndisponivel": "Photo coming soon",
    "erroCarregar": "We couldn't load the menu.",
    "tentarNovamente": "Try again",
    "comboDia": "Combo of the day",
    "promoDescricao": "{n}% off every combo of 1 drink and 1 food item.",
    "quizCardTexto": "Answer a few questions and we'll suggest the right drink for you.",
    "quizSemResultado": "We couldn't find a drink for those answers. Try again.",
    "cafesBebidas": "Coffee and drinks",
    "comidas": "Food",
    "categoriasAria": "Categories",
    "verDetalhes": "See details for {nome}",
    "adicionarNome": "Add {nome}",
    "adicionadoNome": "Added · {nome}",
    "comboAdicionado": "Combo added",
    "adicionadosDois": "Added: drink and side",
    "acompAdicionado": "Side added. Now choose your drink.",
    "abrirMenu": "Open menu",
    "fecharMenu": "Close menu",
    "serveCurto": "Serves {n}",
    "faltaEscolher": "Please choose: {nome}",
    "escolhaComplemento": "Choose at least 1 topping",
    "fichaDose": "Dose",
    "fichaExtracao": "Extraction",
    "fichaTemperatura": "Temperature",
    "quantidade": "Quantity",
    "diminuir": "Decrease",
    "aumentar": "Increase",
    "comoReceber": "How would you like it?",
    "escolhaNumeroMesa": "Choose your table number.",
    "confirmaLimpar": "Clear the whole order?",
    "pedidoAberto": "Your order is open in WhatsApp. Just send the message.",
    "slideAnterior": "Previous slide",
    "proximoSlide": "Next slide",
    "fecharAula": "Close story",
    "pedidoVazioPendencia": "Your order is empty.",
    "temporadaTitulo": "Spring/Summer Smoothies",
    "temporadaTexto": "7 flavors made with real fruit, blended to order.",
    "temporadaBotao": "See smoothies",
    "temporadaSelo": "Spring/Summer",
    "oQueE": "What's this?",
    "escolhaCobertura": "Choose at least 1 topping"
  },
  "config": {
    "marquee": "coffee to the millimeter ✦ 84+ beans ✦ made to order ✦ Fazenda Rio Grande ✦",
    "fidelidade.gancho": "Did you know?",
    "fidelidade.titulo": "Your next coffee could be on us.",
    "fidelidade.texto": "Every 10 orders, you get a hot coffee of your choice or a slice of the pie of the day. Just give your phone number at the counter.",
    "fidelidade.rodape": "Stamps are added by the barista at the counter.",
    "instagramConvite.titulo": "Looks good in your photo?",
    "instagramConvite.texto": "Tag us at @tostes_co. We love seeing where our coffees end up.",
    "instagramConvite.botao": "Open Instagram",
    "instagramConvite.aposPedido": "If you take a photo, tag @tostes_co ✦",
    "favorito.titulo": "The favorite order"
  },
  "tamanhos": {
    "P": "S",
    "M": "M",
    "G": "L",
    "Gelado": "Iced",
    "Único": "One size"
  },
  "categorias": {
    "espressos": {
      "nome": "Espressos",
      "nota": "No milk. Served in a cup.",
      "sobre": "The base of everything: freshly ground coffee, pulled under pressure in about 30 seconds. Short, intense and aromatic. These are our coffees without milk."
    },
    "espressos-com-leite": {
      "nome": "Espresso & Milk",
      "nota": "Sizes: S 170 ml · M 200 ml · L 250 ml",
      "sobre": "Espresso with milk steamed to the right texture. What changes from one to the next is the amount of milk and foam: from the macchiato, almost pure, to the latte, very smooth."
    },
    "coados": {
      "nome": "Filter Coffee",
      "nota": "V60 and French Press serve 2.",
      "sobre": "Filter coffee, brewed without pressure: lighter and more aromatic than espresso, great for tasting the bean's notes. The V60 and French press are brewed to order and serve two."
    },
    "docinhos": {
      "nome": "Flavored Coffees",
      "nota": "Sizes: S 170 ml · M 200 ml · L 250 ml",
      "sobre": "Espressos with milk and a sweet touch: caramel, hazelnut, vanilla, chocolate or dulce de leche. For those who like a coffee that tastes like dessert."
    },
    "autorais": {
      "nome": "House Signatures",
      "nota": "Recipes created here.",
      "sobre": "Recipes created here at TOSTES, that you won't find anywhere else."
    },
    "chocolate-quente": {
      "nome": "Hot Chocolate",
      "nota": "Sizes: S 170 ml · M 200 ml · L 250 ml",
      "sobre": "Real chocolate melted into steamed milk. Creamy, with no coffee."
    },
    "gelados": {
      "nome": "Iced Coffees",
      "nota": "",
      "sobre": "Our coffees served iced, in a 500 ml cup."
    },
    "matcha": {
      "nome": "Matcha",
      "nota": "",
      "sobre": "Japanese green tea powder, whisked to order. Hot or iced, pure or with milk."
    },
    "chai": {
      "nome": "Chai",
      "nota": "",
      "sobre": "Black tea with spices like cinnamon, cardamom and ginger. Aromatic and slightly spicy."
    },
    "drinks": {
      "nome": "Drinks",
      "nota": "",
      "sobre": "Juice, tea and Italian soda, for when you don't want coffee."
    },
    "croissants-salgados": {
      "nome": "Savory Croissants",
      "nota": "Baked fresh every day.",
      "sobre": "Baked every day and filled when you order. That keeps the pastry crisp outside and soft inside: filled in advance, a croissant soaks up moisture and goes limp."
    },
    "croissants-doces": {
      "nome": "Sweet Croissants",
      "nota": "Baked fresh every day.",
      "sobre": "Baked every day and filled when you order, so the pastry stays crisp and the filling fresh."
    },
    "sanduiches": {
      "nome": "Sandwiches",
      "nota": "On sliced bread or baguette.",
      "sobre": "Classic grilled sandwiches, on sliced bread or baguette. Quick and warm."
    },
    "gratinados": {
      "nome": "Gratin Sandwiches",
      "nota": "Topped with melted, grilled cheese.",
      "sobre": "Sandwiches topped with cheese and baked until it melts and turns golden. That cheese crust on top is what makes a gratin."
    },
    "brunches": {
      "nome": "Brunch",
      "nota": "",
      "sobre": "A complete breakfast plate: eggs, toast and sides served side by side, to put together your way."
    },
    "waffle-mineiro": {
      "nome": "Cheese Bread Waffles",
      "nota": "Brazilian cheese bread (pão de queijo) dough baked as a waffle.",
      "sobre": "Brazilian cheese bread (pão de queijo) dough baked in a waffle iron: crispy outside, soft and chewy inside. A very Minas Gerais idea."
    },
    "waffle-americano": {
      "nome": "American Waffles",
      "nota": "",
      "sobre": "The classic waffle, light and slightly sweet, with toppings."
    },
    "tortas": {
      "nome": "Pie of the Day",
      "nota": "A different flavor every day.",
      "sobre": "Pies made here, with a different flavor every day. Ask at the counter for today's."
    },
    "smoothies": {
      "nome": "Smoothies",
      "nota": "Spring/Summer. Frozen fruit instead of ice: more flavor, never watery. 500 ml.",
      "sobre": "Frozen fruit blended to order, with no ice: more flavor and never watery. Spring and summer only."
    },
    "toasts": {
      "nome": "Toasts",
      "nota": "On Brazilian corn bread, a thick slice toasted on the grill.",
      "sobre": "A thick slice of broa de milho, a Brazilian corn bread with a gentle corn flavor and a hint of sweetness, toasted on the grill with butter, with the topping built on top. A step up from a sandwich, eaten with a knife and fork. With Build Your Toast, you choose everything."
    }
  },
  "opcoes": {
    "leite": {
      "titulo": "Milk",
      "itens": {
        "integral": "Whole",
        "zero-lactose": "Lactose-free",
        "aveia": "Oat milk"
      }
    },
    "extras": {
      "titulo": "Add-ons",
      "itens": {
        "chantilly": "Whipped cream",
        "marshmallows": "Marshmallows",
        "chocolate": "Chocolate"
      }
    },
    "complementos-cappuccino": {
      "titulo": "Build yours (choose 1 to 4)",
      "itens": {
        "cacau": "Cocoa",
        "chocolate": "Chocolate",
        "canela": "Cinnamon",
        "acucar-baunilha": "Vanilla sugar"
      }
    },
    "amendoim": {
      "titulo": "Peanuts",
      "itens": {
        "amendoim-moido": "Add ground peanuts on top"
      }
    },
    "estilo-pingado": {
      "titulo": "How do you like it?",
      "itens": {
        "simples": "Regular",
        "cremoso": "Creamy"
      }
    },
    "pao": {
      "titulo": "Bread",
      "itens": {
        "forma": "Sliced bread",
        "baguete": "Baguette"
      }
    },
    "sabores-soda": {
      "titulo": "Flavors (choose 1 to 3)",
      "itens": {
        "melancia": "Watermelon",
        "maca-verde": "Green apple",
        "cereja": "Cherry",
        "frutas-vermelhas": "Berries",
        "limao-gengibre": "Lime and ginger",
        "tangerina": "Tangerine"
      }
    },
    "base-toast": {
      "titulo": "Spread",
      "itens": {
        "requeijao": "Requeijão (cream cheese)",
        "manteiga": "Just butter",
        "doce-de-leite": "Dulce de leche",
        "creme-de-avela": "Hazelnut spread"
      }
    },
    "coberturas-toast": {
      "titulo": "Toppings (choose 1 to 5)",
      "itens": {
        "ovos-mexidos": "Scrambled eggs",
        "ovo-estrelado": "Sunny-side-up egg",
        "queijo": "Melted cheese",
        "bacon": "Bacon",
        "presunto": "Ham",
        "frango-cremoso": "Creamy chicken",
        "calabresa": "Calabresa sausage",
        "tomate": "Seasoned tomato",
        "banana": "Banana",
        "morangos": "Strawberries",
        "mel": "Honey",
        "canela": "Cinnamon"
      }
    }
  },
  "itens": {
    "espresso": {
      "nome": "Espresso",
      "descricaoCurta": "Pure, intense coffee, pulled to order.",
      "ingredientes": [
        "Freshly ground coffee"
      ]
    },
    "ristretto": {
      "nome": "Ristretto",
      "descricaoCurta": "A shorter shot: sweeter and more concentrated.",
      "ingredientes": [
        "Freshly ground coffee"
      ]
    },
    "espresso-duplo-doppio": {
      "nome": "Double Espresso (Doppio)",
      "descricaoCurta": "Two shots of espresso.",
      "ingredientes": [
        "Two shots of espresso"
      ]
    },
    "americano": {
      "nome": "Americano",
      "descricaoCurta": "Espresso lengthened with hot water.",
      "ingredientes": [
        "Espresso",
        "Hot water"
      ]
    },
    "macchiato": {
      "nome": "Macchiato",
      "descricaoCurta": "Espresso with a touch of milk foam.",
      "ingredientes": [
        "Espresso",
        "Milk foam"
      ]
    },
    "cortado": {
      "nome": "Cortado",
      "descricaoCurta": "Espresso with an equal amount of steamed milk.",
      "ingredientes": [
        "Espresso",
        "Steamed milk in equal parts"
      ]
    },
    "flat-white": {
      "nome": "Flat White",
      "descricaoCurta": "Velvety milk with very little foam.",
      "ingredientes": [
        "Espresso",
        "Velvety steamed milk",
        "Thin layer of foam"
      ]
    },
    "cappuccino": {
      "nome": "Italian Cappuccino",
      "descricaoCurta": "Espresso, steamed milk and foam.",
      "ingredientes": [
        "Espresso",
        "Steamed milk",
        "Milk foam"
      ]
    },
    "monte-seu-cappuccino": {
      "nome": "Build Your Cappuccino",
      "descricaoCurta": "A cappuccino with the toppings you choose.",
      "ingredientes": [
        "Espresso",
        "Steamed milk",
        "Milk foam",
        "Your choice of toppings: cocoa, chocolate, cinnamon, vanilla sugar"
      ]
    },
    "cafe-latte": {
      "nome": "Café Latte",
      "descricaoCurta": "Espresso with plenty of steamed milk.",
      "ingredientes": [
        "Espresso",
        "Steamed milk"
      ]
    },
    "marroquino": {
      "nome": "Marocchino",
      "descricaoCurta": "Layers of chocolate, espresso and milk foam, dusted with cocoa.",
      "ingredientes": [
        "Chocolate",
        "Espresso",
        "Milk foam",
        "Cocoa powder"
      ]
    },
    "coado-do-dia": {
      "nome": "Filter Coffee of the Day",
      "descricaoCurta": "Filter coffee made with the bean of the week.",
      "ingredientes": [
        "Filter coffee",
        "Bean of the week"
      ]
    },
    "pingado": {
      "nome": "Pingado (filter coffee with milk)",
      "descricaoCurta": "Brazilian-style filter coffee with milk. You choose: regular or creamy.",
      "ingredientes": [
        "Filter coffee",
        "Milk (regular or creamy)"
      ]
    },
    "metodo-v60": {
      "nome": "V60 Pour-Over",
      "descricaoCurta": "Hand-brewed filter coffee that brings out the bean's notes.",
      "ingredientes": [
        "Coffee hand-brewed in a V60"
      ]
    },
    "prensa-francesa": {
      "nome": "French Press",
      "descricaoCurta": "Steeped coffee with a full body.",
      "ingredientes": [
        "Coffee steeped in a French press"
      ]
    },
    "caramel-macchiato": {
      "nome": "Caramel Macchiato",
      "descricaoCurta": "Steamed milk with caramel-vanilla syrup, espresso and a caramel drizzle on top.",
      "ingredientes": [
        "Espresso",
        "Steamed milk",
        "Caramel and vanilla syrup",
        "Caramel drizzle on top"
      ]
    },
    "avela-latte": {
      "nome": "Hazelnut Latte",
      "descricaoCurta": "Espresso and steamed milk with hazelnut spread blended in.",
      "ingredientes": [
        "Espresso",
        "Steamed milk",
        "Hazelnut spread blended in"
      ]
    },
    "cafe-moka": {
      "nome": "Mocha",
      "descricaoCurta": "Espresso, chocolate and steamed milk.",
      "ingredientes": [
        "Espresso",
        "Chocolate",
        "Steamed milk"
      ]
    },
    "vietnamita-latte": {
      "nome": "Vietnamese Latte",
      "descricaoCurta": "Espresso with condensed milk.",
      "ingredientes": [
        "Espresso",
        "Condensed milk",
        "Steamed milk"
      ]
    },
    "latte-vanilla": {
      "nome": "Vanilla Latte",
      "descricaoCurta": "Latte with vanilla syrup.",
      "ingredientes": [
        "Espresso",
        "Steamed milk",
        "Vanilla syrup"
      ]
    },
    "caramel-latte": {
      "nome": "Caramel Latte",
      "descricaoCurta": "Latte with caramel syrup. Softer than the Caramel Macchiato, with no drizzle on top.",
      "ingredientes": [
        "Espresso",
        "Steamed milk",
        "Caramel syrup"
      ]
    },
    "cappuccino-avela": {
      "nome": "Hazelnut Cappuccino",
      "descricaoCurta": "Cappuccino with hazelnut spread all around the rim of the cup. Ground peanuts on top are optional.",
      "ingredientes": [
        "Espresso",
        "Steamed milk",
        "Milk foam",
        "Hazelnut spread around the rim of the cup",
        "Ground peanuts (optional)"
      ]
    },
    "latte-doce-de-leite": {
      "nome": "Dulce de Leche Latte",
      "descricaoCurta": "Espresso and steamed milk with dulce de leche blended in.",
      "ingredientes": [
        "Espresso",
        "Steamed milk",
        "Dulce de leche blended in"
      ]
    },
    "bala-de-canela": {
      "nome": "Bala de Canela",
      "descricaoCurta": "Our signature: espresso, milk, house-made cherry syrup and condensed milk, finished with cinnamon.",
      "ingredientes": [
        "Espresso",
        "Milk",
        "House-made cherry syrup",
        "Condensed milk",
        "Ground cinnamon"
      ]
    },
    "limon-cappuccino": {
      "nome": "Lemon Cappuccino",
      "descricaoCurta": "A citrusy cappuccino with lemon syrup.",
      "ingredientes": [
        "Espresso",
        "Steamed milk",
        "Milk foam",
        "Lemon syrup"
      ]
    },
    "limon-gelado": {
      "nome": "Iced Limon (espresso tonic)",
      "descricaoCurta": "Tonic water, espresso, lemon and lemon zest.",
      "ingredientes": [
        "Tonic water",
        "Espresso",
        "Lemon",
        "Lemon zest",
        "Ice"
      ]
    },
    "chocolate-quente-tradicional": {
      "nome": "Classic",
      "descricaoCurta": "Creamy and rich in chocolate.",
      "ingredientes": [
        "Chocolate",
        "Milk"
      ],
      "nomeCompleto": "Hot Chocolate — Classic"
    },
    "chocolate-quente-meio-amargo": {
      "nome": "Dark",
      "descricaoCurta": "More intense and less sweet.",
      "ingredientes": [
        "Dark chocolate",
        "Milk"
      ],
      "nomeCompleto": "Hot Chocolate — Dark"
    },
    "chocolate-quente-avela": {
      "nome": "Hazelnut",
      "descricaoCurta": "Hot chocolate with hazelnut spread.",
      "ingredientes": [
        "Chocolate",
        "Milk",
        "Hazelnut spread"
      ],
      "nomeCompleto": "Hot Chocolate — Hazelnut"
    },
    "iced-latte": {
      "nome": "Iced Latte",
      "descricaoCurta": "Espresso and cold milk over ice.",
      "ingredientes": [
        "Espresso",
        "Cold milk",
        "Ice"
      ]
    },
    "vanilla-latte-gelado": {
      "nome": "Iced Vanilla Latte",
      "descricaoCurta": "Iced latte with vanilla syrup.",
      "ingredientes": [
        "Espresso",
        "Cold milk",
        "Vanilla syrup",
        "Ice"
      ]
    },
    "avela-latte-gelado": {
      "nome": "Iced Hazelnut Latte",
      "descricaoCurta": "Iced latte with hazelnut spread.",
      "ingredientes": [
        "Espresso",
        "Cold milk",
        "Hazelnut spread",
        "Ice"
      ]
    },
    "caramel-latte-gelado": {
      "nome": "Iced Caramel Latte",
      "descricaoCurta": "Iced latte with caramel sauce.",
      "ingredientes": [
        "Espresso",
        "Cold milk",
        "Caramel sauce",
        "Ice"
      ]
    },
    "choco-latte-gelado": {
      "nome": "Iced Choco Latte",
      "descricaoCurta": "Iced latte with chocolate.",
      "ingredientes": [
        "Espresso",
        "Cold milk",
        "Chocolate",
        "Ice"
      ]
    },
    "iced-moka": {
      "nome": "Iced Mocha",
      "descricaoCurta": "Espresso, chocolate and cold milk.",
      "ingredientes": [
        "Espresso",
        "Chocolate",
        "Cold milk",
        "Ice"
      ]
    },
    "cold-brew": {
      "nome": "Cold Brew",
      "descricaoCurta": "Coffee cold-brewed for 12 hours.",
      "ingredientes": [
        "Coffee cold-brewed for 12 hours",
        "Ice"
      ]
    },
    "affogato": {
      "nome": "Affogato",
      "descricaoCurta": "Vanilla ice cream topped with espresso.",
      "ingredientes": [
        "Vanilla ice cream",
        "Espresso"
      ]
    },
    "pure-matcha": {
      "nome": "Pure Matcha",
      "descricaoCurta": "Matcha whisked with water. Served hot.",
      "ingredientes": [
        "Matcha",
        "Water"
      ]
    },
    "matcha-latte-tradicional": {
      "nome": "Classic Matcha Latte",
      "descricaoCurta": "Matcha with steamed milk.",
      "ingredientes": [
        "Matcha",
        "Milk"
      ]
    },
    "vietnamita-matcha": {
      "nome": "Vietnamese Matcha",
      "descricaoCurta": "Matcha latte with condensed milk.",
      "ingredientes": [
        "Matcha",
        "Milk",
        "Condensed milk"
      ]
    },
    "honey-matcha": {
      "nome": "Honey Matcha",
      "descricaoCurta": "Matcha latte sweetened with honey.",
      "ingredientes": [
        "Matcha",
        "Milk",
        "Honey"
      ]
    },
    "vanilla-matcha": {
      "nome": "Vanilla Matcha",
      "descricaoCurta": "Matcha latte with vanilla syrup.",
      "ingredientes": [
        "Matcha",
        "Milk",
        "Vanilla syrup"
      ]
    },
    "caramel-matcha": {
      "nome": "Caramel Matcha",
      "descricaoCurta": "Matcha latte with caramel sauce.",
      "ingredientes": [
        "Matcha",
        "Milk",
        "Caramel sauce"
      ]
    },
    "moka-matcha": {
      "nome": "Mocha Matcha",
      "descricaoCurta": "Matcha latte with dark chocolate.",
      "ingredientes": [
        "Matcha",
        "Milk",
        "Dark chocolate"
      ]
    },
    "matcha-com-leite-de-morango": {
      "nome": "Strawberry Milk Matcha",
      "descricaoCurta": "Matcha poured over strawberry milk.",
      "ingredientes": [
        "Matcha",
        "Strawberry milk"
      ]
    },
    "chai-tradicional": {
      "nome": "Classic Chai",
      "descricaoCurta": "Spiced tea. Served hot.",
      "ingredientes": [
        "Spiced chai tea"
      ]
    },
    "chai-latte": {
      "nome": "Chai Latte",
      "descricaoCurta": "Chai with steamed milk.",
      "ingredientes": [
        "Chai tea",
        "Milk"
      ]
    },
    "vanilla-chai-latte": {
      "nome": "Vanilla Chai Latte",
      "descricaoCurta": "Chai latte with vanilla syrup.",
      "ingredientes": [
        "Chai tea",
        "Milk",
        "Vanilla syrup"
      ]
    },
    "honey-chai": {
      "nome": "Honey Chai",
      "descricaoCurta": "Chai latte sweetened with honey.",
      "ingredientes": [
        "Chai tea",
        "Milk",
        "Honey"
      ]
    },
    "caramel-chai": {
      "nome": "Caramel Chai",
      "descricaoCurta": "Chai latte with caramel sauce.",
      "ingredientes": [
        "Chai tea",
        "Milk",
        "Caramel sauce"
      ]
    },
    "vietnamita-chai": {
      "nome": "Vietnamese Chai",
      "descricaoCurta": "Chai latte with condensed milk.",
      "ingredientes": [
        "Chai tea",
        "Milk",
        "Condensed milk"
      ]
    },
    "dirty-chai": {
      "nome": "Dirty Chai",
      "descricaoCurta": "Chai latte with a shot of espresso.",
      "ingredientes": [
        "Chai tea",
        "Milk",
        "Espresso"
      ]
    },
    "suco-de-laranja": {
      "nome": "Fresh Orange Juice",
      "descricaoCurta": "Squeezed to order.",
      "ingredientes": [
        "Orange"
      ]
    },
    "cha": {
      "nome": "Tea",
      "descricaoCurta": "Flavors of the day. Ask at the counter.",
      "ingredientes": [
        "Tea of the day"
      ]
    },
    "cha-gelado": {
      "nome": "Iced Tea",
      "descricaoCurta": "Iced tea with lime.",
      "ingredientes": [
        "Tea",
        "Ice",
        "Lime"
      ]
    },
    "cha-de-morangos": {
      "nome": "Strawberry Iced Tea",
      "descricaoCurta": "Iced tea with strawberries.",
      "ingredientes": [
        "Tea",
        "Strawberries",
        "Ice"
      ]
    },
    "soda-italiana": {
      "nome": "Italian Soda",
      "descricaoCurta": "Make your own: choose 1 to 3 flavors, at no extra cost.",
      "ingredientes": [
        "Sparkling water",
        "60 ml of syrup, split between your chosen flavors",
        "Ice"
      ]
    },
    "croissants-na-chapa-com-manteiga": {
      "nome": "Grilled with butter",
      "descricaoCurta": "Croissant warmed on the grill with butter.",
      "ingredientes": [
        "Croissant",
        "Butter"
      ],
      "nomeCompleto": "Croissant — Grilled with butter"
    },
    "croissants-frango-com-requeijao-e-queijo": {
      "nome": "Chicken, cream cheese and cheese",
      "descricaoCurta": "Filled with chicken, requeijão (Brazilian cream cheese) and cheese.",
      "ingredientes": [
        "Croissant",
        "Chicken",
        "Requeijão (Brazilian cream cheese)",
        "Cheese"
      ],
      "nomeCompleto": "Croissant — Chicken, cream cheese and cheese"
    },
    "croissants-presunto-com-queijo": {
      "nome": "Ham and cheese",
      "descricaoCurta": "Filled with ham and cheese.",
      "ingredientes": [
        "Croissant",
        "Ham",
        "Cheese"
      ],
      "nomeCompleto": "Croissant — Ham and cheese"
    },
    "croissants-presunto-queijo-e-tomate": {
      "nome": "Ham, cheese and tomato",
      "descricaoCurta": "Filled with ham, cheese and tomato.",
      "ingredientes": [
        "Croissant",
        "Ham",
        "Cheese",
        "Tomato"
      ],
      "nomeCompleto": "Croissant — Ham, cheese and tomato"
    },
    "croissants-2-queijos-gratinado": {
      "nome": "Two-cheese gratin",
      "descricaoCurta": "Filled with two cheeses and grilled until golden.",
      "ingredientes": [
        "Croissant",
        "Two cheeses",
        "Grilled cheese topping"
      ],
      "nomeCompleto": "Croissant — Two-cheese gratin"
    },
    "croissants-ovos-com-queijo": {
      "nome": "Eggs and cheese",
      "descricaoCurta": "Filled with eggs and cheese.",
      "ingredientes": [
        "Croissant",
        "Eggs",
        "Cheese"
      ],
      "nomeCompleto": "Croissant — Eggs and cheese"
    },
    "croissants-requeijao-com-queijo": {
      "nome": "Cream cheese and cheese",
      "descricaoCurta": "Filled with requeijão (Brazilian cream cheese) and cheese.",
      "ingredientes": [
        "Croissant",
        "Requeijão (Brazilian cream cheese)",
        "Cheese"
      ],
      "nomeCompleto": "Croissant — Cream cheese and cheese"
    },
    "croissants-ovos-bacon-queijo-e-requeijao": {
      "nome": "Eggs, bacon, cheese and cream cheese",
      "descricaoCurta": "Filled with eggs, bacon, cheese and requeijão.",
      "ingredientes": [
        "Croissant",
        "Eggs",
        "Bacon",
        "Cheese",
        "Requeijão (Brazilian cream cheese)"
      ],
      "nomeCompleto": "Croissant — Eggs, bacon, cheese and cream cheese"
    },
    "croissants-creme-de-avela": {
      "nome": "Hazelnut spread",
      "descricaoCurta": "Filled with hazelnut spread.",
      "ingredientes": [
        "Croissant",
        "Hazelnut spread"
      ],
      "nomeCompleto": "Croissant — Hazelnut spread"
    },
    "croissants-creme-de-avela-e-morangos": {
      "nome": "Hazelnut spread and strawberries",
      "descricaoCurta": "Filled with hazelnut spread and strawberries.",
      "ingredientes": [
        "Croissant",
        "Hazelnut spread",
        "Strawberries"
      ],
      "nomeCompleto": "Croissant — Hazelnut spread and strawberries"
    },
    "croissants-doce-de-leite": {
      "nome": "Dulce de leche",
      "descricaoCurta": "Filled with dulce de leche.",
      "ingredientes": [
        "Croissant",
        "Dulce de leche"
      ],
      "nomeCompleto": "Croissant — Dulce de leche"
    },
    "croissants-doce-de-leite-com-banana": {
      "nome": "Dulce de leche and banana",
      "descricaoCurta": "Filled with dulce de leche and banana.",
      "ingredientes": [
        "Croissant",
        "Dulce de leche",
        "Banana"
      ],
      "nomeCompleto": "Croissant — Dulce de leche and banana"
    },
    "sanduiches-pao-na-chapa-com-requeijao": {
      "nome": "Grilled bread with cream cheese",
      "descricaoCurta": "Bread grilled with requeijão (Brazilian cream cheese).",
      "ingredientes": [
        "Bread",
        "Requeijão (Brazilian cream cheese)"
      ],
      "nomeCompleto": "Sandwich — Grilled bread with cream cheese"
    },
    "sanduiches-misto-quente": {
      "nome": "Grilled ham and cheese",
      "descricaoCurta": "Ham and cheese, grilled.",
      "ingredientes": [
        "Bread",
        "Ham",
        "Cheese"
      ],
      "nomeCompleto": "Sandwich — Grilled ham and cheese"
    },
    "sanduiches-queijo-quente": {
      "nome": "Grilled cheese",
      "descricaoCurta": "Melted cheese, grilled.",
      "ingredientes": [
        "Bread",
        "Cheese"
      ],
      "nomeCompleto": "Sandwich — Grilled cheese"
    },
    "sanduiches-bauru": {
      "nome": "Bauru",
      "descricaoCurta": "Ham, cheese and tomato, grilled.",
      "ingredientes": [
        "Bread",
        "Ham",
        "Cheese",
        "Tomato"
      ],
      "nomeCompleto": "Sandwich — Bauru"
    },
    "sanduiches-queijo-e-bacon": {
      "nome": "Cheese and bacon",
      "descricaoCurta": "Cheese and bacon, grilled.",
      "ingredientes": [
        "Bread",
        "Cheese",
        "Bacon"
      ],
      "nomeCompleto": "Sandwich — Cheese and bacon"
    },
    "sanduiches-misto-com-ovo": {
      "nome": "Ham, cheese and egg",
      "descricaoCurta": "Ham, cheese and egg, grilled.",
      "ingredientes": [
        "Bread",
        "Ham",
        "Cheese",
        "Egg"
      ],
      "nomeCompleto": "Sandwich — Ham, cheese and egg"
    },
    "gratinados-frango-cremoso": {
      "nome": "Creamy chicken",
      "descricaoCurta": "Creamy chicken sandwich with grilled cheese on top.",
      "ingredientes": [
        "Bread",
        "Creamy chicken",
        "Melted, grilled cheese"
      ],
      "nomeCompleto": "Gratin sandwich — Creamy chicken"
    },
    "gratinados-croque-monsieur": {
      "nome": "Croque monsieur",
      "descricaoCurta": "The French classic: ham and cheese, grilled with cheese on top.",
      "ingredientes": [
        "Bread",
        "Ham",
        "Melted, grilled cheese"
      ],
      "nomeCompleto": "Gratin sandwich — Croque monsieur"
    },
    "gratinados-ovos-e-queijo": {
      "nome": "Eggs and cheese",
      "descricaoCurta": "Eggs and cheese sandwich with grilled cheese on top.",
      "ingredientes": [
        "Bread",
        "Eggs",
        "Melted, grilled cheese"
      ],
      "nomeCompleto": "Gratin sandwich — Eggs and cheese"
    },
    "gratinados-bauru": {
      "nome": "Bauru",
      "descricaoCurta": "Bauru gratin: ham, cheese and tomato.",
      "ingredientes": [
        "Bread",
        "Ham",
        "Tomato",
        "Melted, grilled cheese"
      ],
      "nomeCompleto": "Gratin sandwich — Bauru"
    },
    "brunches-tradicional": {
      "nome": "Classic",
      "descricaoCurta": "Toast, scrambled eggs, bacon and requeijão (cream cheese).",
      "ingredientes": [
        "Toast",
        "Scrambled eggs",
        "Bacon",
        "Requeijão (Brazilian cream cheese)"
      ],
      "nomeCompleto": "Brunch — Classic"
    },
    "brunches-simples": {
      "nome": "Simple",
      "descricaoCurta": "Toast, scrambled eggs and requeijão (cream cheese).",
      "ingredientes": [
        "Toast",
        "Scrambled eggs",
        "Requeijão (Brazilian cream cheese)"
      ],
      "nomeCompleto": "Brunch — Simple"
    },
    "brunches-omelete": {
      "nome": "Omelet",
      "descricaoCurta": "Cheese omelet, toast and requeijão.",
      "ingredientes": [
        "Cheese omelet",
        "Toast",
        "Requeijão (Brazilian cream cheese)"
      ],
      "nomeCompleto": "Brunch — Omelet"
    },
    "brunches-omelete-e-bacon": {
      "nome": "Omelet and bacon",
      "descricaoCurta": "Cheese omelet with bacon, toast and requeijão.",
      "ingredientes": [
        "Cheese omelet",
        "Bacon",
        "Toast",
        "Requeijão (Brazilian cream cheese)"
      ],
      "nomeCompleto": "Brunch — Omelet and bacon"
    },
    "brunches-omelete-de-calabresa": {
      "nome": "Calabresa sausage omelet",
      "descricaoCurta": "Omelet with calabresa sausage, toast and requeijão.",
      "ingredientes": [
        "Omelet with calabresa sausage",
        "Toast",
        "Requeijão (Brazilian cream cheese)"
      ],
      "nomeCompleto": "Brunch — Calabresa sausage omelet"
    },
    "brunches-omelete-de-frango-cremoso": {
      "nome": "Creamy chicken omelet",
      "descricaoCurta": "Omelet with creamy chicken, toast and requeijão.",
      "ingredientes": [
        "Omelet with creamy chicken",
        "Toast",
        "Requeijão (Brazilian cream cheese)"
      ],
      "nomeCompleto": "Brunch — Creamy chicken omelet"
    },
    "waffle-mineiro-tradicional": {
      "nome": "Plain",
      "descricaoCurta": "Cheese bread waffle, no filling.",
      "ingredientes": [
        "Brazilian cheese bread dough (pão de queijo)"
      ],
      "nomeCompleto": "Cheese Bread Waffle — Plain"
    },
    "waffle-mineiro-calabresa": {
      "nome": "Calabresa sausage",
      "descricaoCurta": "Cheese bread waffle with calabresa sausage.",
      "ingredientes": [
        "Brazilian cheese bread dough (pão de queijo)",
        "Calabresa (Brazilian smoked sausage)"
      ],
      "nomeCompleto": "Cheese Bread Waffle — Calabresa sausage"
    },
    "waffle-mineiro-frango": {
      "nome": "Chicken",
      "descricaoCurta": "Cheese bread waffle with chicken.",
      "ingredientes": [
        "Brazilian cheese bread dough (pão de queijo)",
        "Chicken"
      ],
      "nomeCompleto": "Cheese Bread Waffle — Chicken"
    },
    "waffle-mineiro-presunto-e-queijo": {
      "nome": "Ham and cheese",
      "descricaoCurta": "Cheese bread waffle with ham and cheese.",
      "ingredientes": [
        "Brazilian cheese bread dough (pão de queijo)",
        "Ham",
        "Cheese"
      ],
      "nomeCompleto": "Cheese Bread Waffle — Ham and cheese"
    },
    "waffle-mineiro-tipo-bauru": {
      "nome": "Bauru style",
      "descricaoCurta": "Cheese bread waffle with ham, cheese and tomato.",
      "ingredientes": [
        "Brazilian cheese bread dough (pão de queijo)",
        "Ham",
        "Cheese",
        "Tomato"
      ],
      "nomeCompleto": "Cheese Bread Waffle — Bauru style"
    },
    "waffle-mineiro-creme-de-avela": {
      "nome": "Hazelnut spread",
      "descricaoCurta": "Cheese bread waffle with hazelnut spread.",
      "ingredientes": [
        "Brazilian cheese bread dough (pão de queijo)",
        "Hazelnut spread"
      ],
      "nomeCompleto": "Cheese Bread Waffle — Hazelnut spread"
    },
    "waffle-mineiro-morangos-e-avela": {
      "nome": "Strawberries and hazelnut",
      "descricaoCurta": "Cheese bread waffle with strawberries and hazelnut spread.",
      "ingredientes": [
        "Brazilian cheese bread dough (pão de queijo)",
        "Strawberries",
        "Hazelnut spread"
      ],
      "nomeCompleto": "Cheese Bread Waffle — Strawberries and hazelnut"
    },
    "waffle-mineiro-doce-de-leite": {
      "nome": "Dulce de leche",
      "descricaoCurta": "Cheese bread waffle with dulce de leche.",
      "ingredientes": [
        "Brazilian cheese bread dough (pão de queijo)",
        "Dulce de leche"
      ],
      "nomeCompleto": "Cheese Bread Waffle — Dulce de leche"
    },
    "waffle-americano-chantilly-e-caramelo": {
      "nome": "Whipped cream and caramel",
      "descricaoCurta": "Waffle with whipped cream and caramel sauce.",
      "ingredientes": [
        "Waffle",
        "Whipped cream",
        "Caramel sauce"
      ],
      "nomeCompleto": "American Waffle — Whipped cream and caramel"
    },
    "waffle-americano-doce-de-leite-e-banana": {
      "nome": "Dulce de leche and banana",
      "descricaoCurta": "Waffle with dulce de leche and banana.",
      "ingredientes": [
        "Waffle",
        "Dulce de leche",
        "Banana"
      ],
      "nomeCompleto": "American Waffle — Dulce de leche and banana"
    },
    "waffle-americano-avela-e-morangos": {
      "nome": "Hazelnut and strawberries",
      "descricaoCurta": "Waffle with hazelnut spread and strawberries.",
      "ingredientes": [
        "Waffle",
        "Hazelnut spread",
        "Strawberries"
      ],
      "nomeCompleto": "American Waffle — Hazelnut and strawberries"
    },
    "waffle-americano-waffle-brunch": {
      "nome": "Brunch Waffle",
      "descricaoCurta": "Waffle with scrambled eggs and bacon.",
      "ingredientes": [
        "Waffle",
        "Scrambled eggs",
        "Bacon"
      ],
      "nomeCompleto": "American Waffle — Brunch Waffle"
    },
    "tortas-torta-do-dia": {
      "nome": "Pie of the day",
      "descricaoCurta": "The flavor changes every day. Ask at the counter for today's flavor and price.",
      "ingredientes": []
    },
    "smoothie-melancia-banana": {
      "nome": "Watermelon & Banana",
      "descricaoCurta": "Frozen watermelon and banana, with lime and a touch of honey.",
      "ingredientes": [
        "Frozen watermelon",
        "Frozen banana",
        "Lime juice",
        "Honey"
      ],
      "nomeCompleto": "Smoothie — Watermelon & Banana"
    },
    "smoothie-melao-hortela-limao": {
      "nome": "Melon, Mint & Lime",
      "descricaoCurta": "Frozen melon blended with fresh mint, lime and honey. The most refreshing one.",
      "ingredientes": [
        "Frozen melon",
        "Fresh mint",
        "Lime juice",
        "Honey"
      ],
      "nomeCompleto": "Smoothie — Melon, Mint & Lime"
    },
    "smoothie-abacaxi-hortela-mel": {
      "nome": "Pineapple, Mint & Honey",
      "descricaoCurta": "Frozen pineapple with fresh mint, honey and lime.",
      "ingredientes": [
        "Frozen pineapple",
        "Fresh mint",
        "Honey",
        "Lime juice"
      ],
      "nomeCompleto": "Smoothie — Pineapple, Mint & Honey"
    },
    "smoothie-manga-laranja": {
      "nome": "Mango & Orange",
      "descricaoCurta": "Frozen mango and banana with fresh-squeezed orange juice.",
      "ingredientes": [
        "Frozen mango",
        "Frozen banana",
        "Fresh-squeezed orange juice"
      ],
      "nomeCompleto": "Smoothie — Mango & Orange"
    },
    "smoothie-morango-baunilha": {
      "nome": "Strawberry & Vanilla",
      "descricaoCurta": "Strawberry and banana with vanilla ice cream, milk and vanilla. Creamy.",
      "ingredientes": [
        "Frozen strawberries",
        "Frozen banana",
        "Vanilla ice cream",
        "Milk",
        "Vanilla syrup"
      ],
      "nomeCompleto": "Smoothie — Strawberry & Vanilla"
    },
    "smoothie-bala-de-canela": {
      "nome": "Iced Bala de Canela",
      "descricaoCurta": "The summer version of our signature drink: banana, cherry syrup, condensed milk and cinnamon.",
      "ingredientes": [
        "Frozen banana",
        "House-made cherry syrup",
        "Condensed milk",
        "Milk",
        "Ground cinnamon"
      ],
      "nomeCompleto": "Smoothie — Iced Bala de Canela"
    },
    "smoothie-matcha-manga": {
      "nome": "Matcha & Mango",
      "descricaoCurta": "Matcha with frozen mango, milk and honey.",
      "ingredientes": [
        "Matcha",
        "Frozen mango",
        "Milk",
        "Honey"
      ],
      "nomeCompleto": "Smoothie — Matcha & Mango"
    },
    "toast-ovos-queijo-requeijao": {
      "nome": "Eggs, Cheese & Cream Cheese",
      "descricaoCurta": "Requeijão (Brazilian cream cheese) spread, creamy scrambled eggs and melted cheese.",
      "ingredientes": [
        "Thick slice of Brazilian corn bread (broa de milho), toasted in butter",
        "Requeijão (Brazilian cream cheese)",
        "Creamy scrambled eggs",
        "Melted cheese"
      ],
      "nomeCompleto": "Toast — Eggs, Cheese & Cream Cheese"
    },
    "toast-ovos-bacon-queijo": {
      "nome": "Eggs, Bacon & Cheese",
      "descricaoCurta": "Scrambled eggs, crispy bacon and melted cheese.",
      "ingredientes": [
        "Thick slice of Brazilian corn bread (broa de milho), toasted in butter",
        "Creamy scrambled eggs",
        "Crispy bacon",
        "Melted cheese"
      ],
      "nomeCompleto": "Toast — Eggs, Bacon & Cheese"
    },
    "toast-frango-cremoso": {
      "nome": "Creamy Chicken Gratin",
      "descricaoCurta": "Our creamy chicken with cheese grilled on top.",
      "ingredientes": [
        "Thick slice of Brazilian corn bread (broa de milho), toasted in butter",
        "Creamy chicken",
        "Melted, grilled cheese"
      ],
      "nomeCompleto": "Toast — Creamy Chicken Gratin"
    },
    "toast-tomate-queijo": {
      "nome": "Tomato & Cheese",
      "descricaoCurta": "Melted cheese and diced tomato with olive oil and oregano.",
      "ingredientes": [
        "Thick slice of Brazilian corn bread (broa de milho), toasted in butter",
        "Melted cheese",
        "Diced tomato with olive oil and oregano"
      ],
      "nomeCompleto": "Toast — Tomato & Cheese"
    },
    "toast-presunto-queijo-ovo": {
      "nome": "Ham, Cheese & Egg",
      "descricaoCurta": "Ham and melted cheese topped with a sunny-side-up egg, croque madame style.",
      "ingredientes": [
        "Thick slice of Brazilian corn bread (broa de milho), toasted in butter",
        "Ham",
        "Melted cheese",
        "Sunny-side-up egg"
      ],
      "nomeCompleto": "Toast — Ham, Cheese & Egg"
    },
    "toast-banana-canela-mel": {
      "nome": "Banana, Cinnamon & Honey",
      "descricaoCurta": "Banana caramelized on the grill, cinnamon and a drizzle of honey.",
      "ingredientes": [
        "Thick slice of Brazilian corn bread (broa de milho), toasted in butter",
        "Caramelized banana",
        "Cinnamon",
        "Honey"
      ],
      "nomeCompleto": "Toast — Banana, Cinnamon & Honey"
    },
    "toast-morango-avela": {
      "nome": "Strawberry & Hazelnut",
      "descricaoCurta": "Hazelnut spread and fresh sliced strawberries.",
      "ingredientes": [
        "Thick slice of Brazilian corn bread (broa de milho), toasted in butter",
        "Hazelnut spread",
        "Fresh strawberries"
      ],
      "nomeCompleto": "Toast — Strawberry & Hazelnut"
    },
    "toast-doce-de-leite-banana": {
      "nome": "Dulce de Leche & Banana",
      "descricaoCurta": "Dulce de leche, sliced banana and cinnamon.",
      "ingredientes": [
        "Thick slice of Brazilian corn bread (broa de milho), toasted in butter",
        "Dulce de leche",
        "Banana",
        "Cinnamon"
      ],
      "nomeCompleto": "Toast — Dulce de Leche & Banana"
    },
    "toast-monte-o-seu": {
      "nome": "Build Your Toast",
      "descricaoCurta": "Choose the spread and 1 to 5 toppings. The price depends on what you pick.",
      "ingredientes": [
        "Thick slice of Brazilian corn bread (broa de milho), toasted in butter",
        "Your choice of spread",
        "Your choice of toppings"
      ],
      "nomeCompleto": "Toast — Build Your Toast"
    }
  },
  "quiz": {
    "textos": {
      "abertura": "Not sure what to order? Answer 12 quick questions and we'll choose for you.",
      "titulo": "Your coffee for today",
      "alternativas": "Also a good match for you",
      "acompanhamento": "To go with it",
      "refazer": "Take the quiz again",
      "porque": "Because you",
      "e": "and"
    },
    "perguntas": {
      "momento": {
        "pergunta": "What kind of moment is this?",
        "apoio": "The right coffee changes with the time of day.",
        "respostas": [
          {
            "texto": "Starting the day",
            "motivo": "are starting your day"
          },
          {
            "texto": "Mid-afternoon break",
            "motivo": "want an afternoon break"
          },
          {
            "texto": "End of the day, time to slow down",
            "motivo": "want to slow down without losing sleep"
          },
          {
            "texto": "After lunch, instead of dessert",
            "motivo": "want something instead of dessert"
          }
        ]
      },
      "relacao": {
        "pergunta": "How do you take your coffee?",
        "apoio": "No wrong answers. It just helps us get it right.",
        "respostas": [
          {
            "texto": "Black, no sugar",
            "motivo": "like coffee just as it is"
          },
          {
            "texto": "With milk and a little sugar",
            "motivo": "like coffee with milk"
          },
          {
            "texto": "I like it when I can barely taste the coffee",
            "motivo": "prefer a milder coffee"
          },
          {
            "texto": "I don't drink coffee",
            "motivo": "don't drink coffee"
          }
        ]
      },
      "doce": {
        "pergunta": "How about sugar?",
        "apoio": "Think about how much you usually sweeten.",
        "respostas": [
          {
            "texto": "None. I like the pure flavor",
            "motivo": "prefer it without sugar"
          },
          {
            "texto": "A touch, nothing more",
            "motivo": "like a touch of sweetness"
          },
          {
            "texto": "Sweet, but balanced",
            "motivo": "like a sweet coffee"
          },
          {
            "texto": "The sweeter the better",
            "motivo": "like it really sweet"
          }
        ]
      },
      "temperatura": {
        "pergunta": "Hot or iced?",
        "apoio": "Some drinks come both ways.",
        "respostas": [
          {
            "texto": "Nice and hot",
            "motivo": "want something hot"
          },
          {
            "texto": "Iced",
            "motivo": "want something iced"
          },
          {
            "texto": "Either is fine"
          }
        ]
      },
      "sobremesa": {
        "pergunta": "If you could pick a dessert right now…",
        "apoio": "It says a lot about the flavors you're after.",
        "respostas": [
          {
            "texto": "Brigadeiro (chocolate truffle)",
            "motivo": "are on team chocolate"
          },
          {
            "texto": "Flan or dulce de leche",
            "motivo": "love caramel and dulce de leche"
          },
          {
            "texto": "Lemon pie",
            "motivo": "like citrus flavors"
          },
          {
            "texto": "Strawberries and cream",
            "motivo": "like fruity flavors"
          },
          {
            "texto": "Rice pudding with cinnamon",
            "motivo": "like cinnamon and spices"
          },
          {
            "texto": "None, I'd rather have something savory",
            "motivo": "prefer the less sweet side"
          }
        ]
      },
      "aroma": {
        "pergunta": "Which smell makes you stop at a café door?",
        "apoio": "Pick the first one that comes to mind.",
        "respostas": [
          {
            "texto": "Freshly ground coffee",
            "motivo": "love the smell of fresh coffee"
          },
          {
            "texto": "Vanilla",
            "motivo": "like vanilla"
          },
          {
            "texto": "Toasted hazelnut",
            "motivo": "like hazelnut"
          },
          {
            "texto": "Cinnamon and cloves",
            "motivo": "like spices"
          },
          {
            "texto": "Melted chocolate",
            "motivo": "can't resist chocolate"
          },
          {
            "texto": "Something fresh and herbal",
            "motivo": "like fresh flavors"
          }
        ]
      },
      "textura": {
        "pergunta": "What texture are you in the mood for?",
        "apoio": "Texture changes everything in a drink.",
        "respostas": [
          {
            "texto": "Creamy and velvety",
            "motivo": "like a creamy drink"
          },
          {
            "texto": "Tall, light foam",
            "motivo": "like foam"
          },
          {
            "texto": "Full-bodied and bold",
            "motivo": "like body and intensity"
          },
          {
            "texto": "Light and easy to drink",
            "motivo": "prefer something light"
          },
          {
            "texto": "Refreshing",
            "motivo": "want to cool down"
          }
        ]
      },
      "energia": {
        "pergunta": "How much energy do you need right now?",
        "apoio": "So we get the caffeine right.",
        "respostas": [
          {
            "texto": "A lot. The day is still long",
            "motivo": "need energy"
          },
          {
            "texto": "Just a little boost",
            "motivo": "want just a little boost"
          },
          {
            "texto": "None, I just want the flavor",
            "motivo": "just want the flavor"
          }
        ]
      },
      "aventura": {
        "pergunta": "At a new place, what do you order?",
        "apoio": "Classic or something new?",
        "respostas": [
          {
            "texto": "The classic, can't go wrong",
            "motivo": "like the classics"
          },
          {
            "texto": "A classic with a twist",
            "motivo": "like a classic with a twist"
          },
          {
            "texto": "Something I've never tried",
            "motivo": "like trying new things"
          },
          {
            "texto": "I ask what the house specialty is",
            "motivo": "want to try the house specialty"
          }
        ]
      },
      "trilha": {
        "pergunta": "Which soundtrack fits your day?",
        "apoio": "Trust us, it matters.",
        "respostas": [
          {
            "texto": "Bossa nova, nice and slow",
            "motivo": "are having a calm day"
          },
          {
            "texto": "Rock, I need strength",
            "motivo": "are having an intense day"
          },
          {
            "texto": "Upbeat pop",
            "motivo": "are having a cheerful day"
          },
          {
            "texto": "Lo-fi to study or work",
            "motivo": "are going to study or work"
          },
          {
            "texto": "Jazz, something more refined",
            "motivo": "like something refined"
          }
        ]
      },
      "leite": {
        "pergunta": "Any milk preference?",
        "apoio": "Lactose-free and oat milk at no extra cost.",
        "respostas": [
          {
            "texto": "Whole milk"
          },
          {
            "texto": "Lactose-free",
            "motivo": "prefer lactose-free"
          },
          {
            "texto": "Oat milk",
            "motivo": "prefer plant-based milk"
          },
          {
            "texto": "No milk, please",
            "motivo": "prefer no milk"
          }
        ]
      },
      "fome": {
        "pergunta": "Having something to eat too?",
        "apoio": "We'll suggest the perfect pairing.",
        "respostas": [
          {
            "texto": "Yes, something savory"
          },
          {
            "texto": "Yes, something sweet"
          },
          {
            "texto": "Just the drink"
          }
        ]
      }
    },
    "harmonizacao": [
      "Cheese bread balances the herbal notes of matcha.",
      "Banana and cinnamon are old friends.",
      "A light drink calls for a fresh side.",
      "The savory croissant contrasts with the sweet drink.",
      "Coffee without sugar goes well with something creamy."
    ],
    "harmonizacaoPadrao": "Our croissants are baked fresh every day."
  }
};
