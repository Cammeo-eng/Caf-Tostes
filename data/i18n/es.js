/* ==========================================================
   TOSTES café — Tradução: Español (es)
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
window.I18N.es = {
  "ui": {
    "idioma": "Idioma",
    "abertoAgora": "Abierto ahora",
    "fechadoAbre": "Cerrado · abre {dia} a las {hora}",
    "hoje": "hoy",
    "amanha": "mañana",
    "dias": [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado"
    ],
    "mesa": "Mesa {n}",
    "menuCardapio": "Menú",
    "menuQuiz": "Descubre tu café",
    "menuAulas": "Aprende sobre café",
    "menuChapeu": "Detrás del sombrero",
    "menuFidelidade": "Tarjeta de fidelidad",
    "menuAvalie": "Califícanos en Google",
    "menuHorarios": "Horarios y ubicación",
    "pedidoFavorito": "El pedido favorito",
    "promocaoDia": "Promoción del día",
    "validoHoje": "Válido hoy, {data}",
    "off": "{n}% de descuento",
    "adicionarCombo": "Agregar combo",
    "adicionarAoPedido": "Agregar al pedido",
    "adicionar": "Agregar",
    "adicionarTotal": "Agregar · {valor}",
    "adicionado": "Agregado · Ver pedido",
    "aPartirDe": "desde {valor}",
    "recomendado": "Recomendado",
    "favoritoCasa": "Favorito de la casa",
    "serve": "Para {n} personas",
    "servidoXicara": "Se sirve en taza",
    "servidoCopo": "Se sirve en vaso",
    "consulteBalcao": "Pregunta el sabor en el mostrador",
    "ingredientes": "Qué lleva",
    "preparo": "Cómo se prepara",
    "fichaTecnica": "Ficha técnica",
    "tamanho": "Tamaño",
    "semCustoLeite": "Leche deslactosada y vegetal sin costo extra.",
    "escolhaMinimo": "Elige al menos {n}",
    "contadorEscolha": "{n} de {max}",
    "escolhaPingado": "Elige simple o cremoso",
    "verPedido": "Ver pedido",
    "itens": "{n} artículos",
    "item": "1 artículo",
    "seuPedido": "Tu pedido",
    "pedidoVazio": "Tu pedido está vacío.",
    "verCardapio": "Ver el menú",
    "subtotal": "Subtotal",
    "desconto": "Descuento",
    "total": "Total",
    "levarViagem": "Para llevar",
    "comerMesa": "Comer en la mesa",
    "escolhaMesa": "¿Qué mesa?",
    "seuNome": "Tu nombre",
    "observacoes": "Observaciones",
    "opcional": "opcional",
    "preenchaNome": "Escribe tu nombre para enviar el pedido.",
    "enviarWhatsapp": "Enviar pedido por WhatsApp",
    "avisoPedido": "Tu pedido llega al mostrador por WhatsApp. Se paga en el mostrador. También puedes pedir directamente en el mostrador.",
    "avisoPreparoTitulo": "Hecho al momento, uno por uno",
    "avisoPreparoTexto": "Aquí todo se prepara en el momento del pedido. En los días más movidos, puede tardar unos minutitos más. Prometemos que vale cada segundo.",
    "limparPedido": "Vaciar pedido",
    "remover": "Quitar",
    "voltar": "Volver",
    "fechar": "Cerrar",
    "pedidoEnviado": "¡Pedido enviado!",
    "quizCardTitulo": "¿No sabes qué pedir?",
    "quizCardBotao": "Descubrir mi café",
    "comecar": "Empezar",
    "perguntaDe": "{n} de {total}",
    "adicionarOsDois": "Agregar los dos",
    "aulasTitulo": "Mientras tu café está listo",
    "aulasSubtitulo": "Toca un círculo y lee un poco sobre café.",
    "verNoCardapio": "Ver en el menú",
    "conhecerHistoria": "Conocer la historia",
    "trilhaTerminada": "Terminaste {nome}",
    "proximaTrilha": "Siguiente tema",
    "leitura": "{n} de lectura",
    "fidelidadeTitulo": "Programa de fidelidad",
    "avalieGoogle": "Califícanos en Google",
    "comoChegar": "Cómo llegar",
    "horarios": "Horarios",
    "horarioSemana": "Lunes a viernes, de 9:00 a 19:30",
    "horarioSabado": "Sábado, de 9:00 a 15:00",
    "horarioDomingo": "Domingo, cerrado",
    "historiaChapeu": "Conoce la historia detrás del sombrero →",
    "legendaChapeu": "Cosecha de café a principios del siglo XX.",
    "fotoIndisponivel": "Foto próximamente",
    "erroCarregar": "No pudimos cargar el menú.",
    "tentarNovamente": "Intentar de nuevo",
    "comboDia": "Combo del día",
    "promoDescricao": "{n}% de descuento en cada combo de 1 bebida y 1 comida.",
    "quizCardTexto": "Responde unas preguntas y te sugerimos la bebida ideal.",
    "quizSemResultado": "No encontramos una bebida con esas respuestas. Inténtalo de nuevo.",
    "cafesBebidas": "Cafés y bebidas",
    "comidas": "Comidas",
    "categoriasAria": "Categorías",
    "verDetalhes": "Ver detalles de {nome}",
    "adicionarNome": "Agregar {nome}",
    "adicionadoNome": "Agregado · {nome}",
    "comboAdicionado": "Combo agregado",
    "adicionadosDois": "Agregados: bebida y acompañamiento",
    "acompAdicionado": "Acompañamiento agregado. Falta elegir la bebida.",
    "abrirMenu": "Abrir menú",
    "fecharMenu": "Cerrar menú",
    "serveCurto": "Para {n}",
    "faltaEscolher": "Falta elegir: {nome}",
    "escolhaComplemento": "Elige al menos 1 complemento",
    "fichaDose": "Dosis",
    "fichaExtracao": "Extracción",
    "fichaTemperatura": "Temperatura",
    "quantidade": "Cantidad",
    "diminuir": "Disminuir",
    "aumentar": "Aumentar",
    "comoReceber": "¿Cómo quieres recibirlo?",
    "escolhaNumeroMesa": "Elige el número de tu mesa.",
    "confirmaLimpar": "¿Vaciar todo el pedido?",
    "pedidoAberto": "Tu pedido se abrió en WhatsApp. Solo envía el mensaje.",
    "slideAnterior": "Diapositiva anterior",
    "proximoSlide": "Siguiente diapositiva",
    "fecharAula": "Cerrar lección",
    "pedidoVazioPendencia": "Tu pedido está vacío.",
    "temporadaTitulo": "Smoothies de Primavera/Verano",
    "temporadaTexto": "7 sabores con fruta de verdad, preparados al momento.",
    "temporadaBotao": "Ver smoothies",
    "temporadaSelo": "Primavera/Verano",
    "oQueE": "¿Qué es?",
    "escolhaCobertura": "Elige al menos 1 cobertura"
  },
  "config": {
    "marquee": "café al milímetro ✦ granos 84+ ✦ hecho al momento ✦ Fazenda Rio Grande ✦",
    "fidelidade.gancho": "¿Sabías que…?",
    "fidelidade.titulo": "Tu próximo café puede ir por nuestra cuenta.",
    "fidelidade.texto": "Cada 10 pedidos, eliges un café caliente o una porción de la torta del día. Solo da tu número de teléfono en el mostrador.",
    "fidelidade.rodape": "El barista marca los sellos en el mostrador.",
    "instagramConvite.titulo": "¿Salió bonito en la foto?",
    "instagramConvite.texto": "Etiquétanos en @tostes_co. Nos encanta ver a dónde llegan nuestros cafés.",
    "instagramConvite.botao": "Abrir Instagram",
    "instagramConvite.aposPedido": "Si tomas una foto, etiqueta a @tostes_co ✦",
    "favorito.titulo": "El pedido favorito"
  },
  "tamanhos": {
    "P": "P",
    "M": "M",
    "G": "G",
    "Gelado": "Helado",
    "Único": "Único"
  },
  "categorias": {
    "espressos": {
      "nome": "Espressos",
      "nota": "Sin leche. Se sirven en taza.",
      "sobre": "La base de todo: café molido al momento y extraído con presión en unos 30 segundos. Corto, intenso y aromático. Aquí están los cafés sin leche."
    },
    "espressos-com-leite": {
      "nome": "Espressos con Leche",
      "nota": "Tamaños: P 170 ml · M 200 ml · G 250 ml",
      "sobre": "Espresso con leche vaporizada en su punto. Lo que cambia de uno a otro es la cantidad de leche y de espuma: del macchiato, casi puro, al latte, muy suave."
    },
    "coados": {
      "nome": "Filtrados",
      "nota": "El V60 y la Prensa Francesa son para 2 personas.",
      "sobre": "Café filtrado, sin presión: más ligero y aromático que el espresso, ideal para sentir las notas del grano. El V60 y la prensa francesa se preparan al momento, para compartir."
    },
    "docinhos": {
      "nome": "Cafés con Sabor",
      "nota": "Tamaños: P 170 ml · M 200 ml · G 250 ml",
      "sobre": "Espressos con leche y un toque dulce: caramelo, avellana, vainilla, chocolate o dulce de leche. Para quien le gusta un café con aire de postre."
    },
    "autorais": {
      "nome": "De la Casa",
      "nota": "Recetas creadas aquí.",
      "sobre": "Recetas creadas aquí en TOSTES, que no vas a encontrar en otro lugar."
    },
    "chocolate-quente": {
      "nome": "Chocolate Caliente",
      "nota": "Tamaños: P 170 ml · M 200 ml · G 250 ml",
      "sobre": "Chocolate de verdad derretido en leche vaporizada. Cremoso y sin café."
    },
    "gelados": {
      "nome": "Cafés Helados",
      "nota": "",
      "sobre": "Nuestros cafés en versión helada, con hielo, en vaso de 500 ml."
    },
    "matcha": {
      "nome": "Matcha",
      "nota": "",
      "sobre": "Té verde japonés en polvo, batido al momento. Caliente o helado, puro o con leche."
    },
    "chai": {
      "nome": "Chai",
      "nota": "",
      "sobre": "Té negro con especias como canela, cardamomo y jengibre. Aromático y ligeramente picante."
    },
    "drinks": {
      "nome": "Bebidas",
      "nota": "",
      "sobre": "Jugos, tés y soda italiana, para cuando no quieres café."
    },
    "croissants-salgados": {
      "nome": "Croissants Salados",
      "nota": "Hechos todos los días.",
      "sobre": "Horneados todos los días y rellenados al momento del pedido. Así la masa sigue crocante por fuera y suave por dentro: rellenado con anticipación, el croissant absorbe la humedad y se aplasta."
    },
    "croissants-doces": {
      "nome": "Croissants Dulces",
      "nota": "Hechos todos los días.",
      "sobre": "Horneados todos los días y rellenados al momento, para que la masa siga crocante y el relleno, fresco."
    },
    "sanduiches": {
      "nome": "Sándwiches",
      "nota": "En pan de molde o baguette.",
      "sobre": "Sándwiches clásicos a la plancha, en pan de molde o baguette. Rápidos y calientitos."
    },
    "gratinados": {
      "nome": "Gratinados",
      "nota": "Con queso gratinado por encima.",
      "sobre": "Sándwiches cubiertos de queso y llevados al horno hasta que se derrita y se dore. La costrita de queso por encima es lo que hace el gratinado."
    },
    "brunches": {
      "nome": "Brunch",
      "nota": "",
      "sobre": "Plato completo de desayuno: huevos, tostadas y acompañantes servidos lado a lado, para armar a tu manera."
    },
    "waffle-mineiro": {
      "nome": "Waffle Mineiro",
      "nota": "Masa de pan de queso brasileño (pão de queijo) hecha en wafflera.",
      "sobre": "Masa de pan de queso brasileño (pão de queijo) hecha en wafflera: crocante por fuera, suave y elástica por dentro. Una idea muy de Minas Gerais."
    },
    "waffle-americano": {
      "nome": "Waffles Americanos",
      "nota": "",
      "sobre": "El waffle clásico, de masa ligera y un poco dulce, con coberturas."
    },
    "tortas": {
      "nome": "Torta del Día",
      "nota": "Un sabor diferente cada día.",
      "sobre": "Tortas hechas aquí, con un sabor diferente cada día. Pregunta en el mostrador cuál es el de hoy."
    },
    "smoothies": {
      "nome": "Smoothies",
      "nota": "Primavera/Verano. Fruta congelada en lugar de hielo: más sabor, nada aguado. 500 ml.",
      "sobre": "Fruta congelada licuada al momento, sin hielo: más sabor y nada aguado. Solo en primavera y verano."
    },
    "toasts": {
      "nome": "Toasts",
      "nota": "En pan de maíz brasileño, rebanada gruesa dorada a la plancha.",
      "sobre": "Una rebanada gruesa de broa de milho, un pan de maíz brasileño con suave sabor a maíz y un toque dulce, dorada a la plancha con mantequilla y con la cobertura armada encima. Más elaborado que un sándwich, para comer con cuchillo y tenedor. En Arma tu Toast, eliges todo."
    }
  },
  "opcoes": {
    "leite": {
      "titulo": "Leche",
      "itens": {
        "integral": "Entera",
        "zero-lactose": "Deslactosada",
        "aveia": "Bebida vegetal de avena"
      }
    },
    "extras": {
      "titulo": "Adicionales",
      "itens": {
        "chantilly": "Crema chantilly",
        "marshmallows": "Malvaviscos",
        "chocolate": "Chocolate"
      }
    },
    "complementos-cappuccino": {
      "titulo": "Arma el tuyo (elige de 1 a 4)",
      "itens": {
        "cacau": "Cacao",
        "chocolate": "Chocolate",
        "canela": "Canela",
        "acucar-baunilha": "Azúcar de vainilla"
      }
    },
    "amendoim": {
      "titulo": "Maní",
      "itens": {
        "amendoim-moido": "Con maní molido por encima"
      }
    },
    "estilo-pingado": {
      "titulo": "¿Cómo lo prefieres?",
      "itens": {
        "simples": "Simple",
        "cremoso": "Cremoso"
      }
    },
    "pao": {
      "titulo": "Pan",
      "itens": {
        "forma": "Pan de molde",
        "baguete": "Baguette"
      }
    },
    "sabores-soda": {
      "titulo": "Sabores (elige de 1 a 3)",
      "itens": {
        "melancia": "Patilla / sandía",
        "maca-verde": "Manzana verde",
        "cereja": "Cereza",
        "frutas-vermelhas": "Frutos rojos",
        "limao-gengibre": "Limón y jengibre",
        "tangerina": "Mandarina"
      }
    },
    "base-toast": {
      "titulo": "Base",
      "itens": {
        "requeijao": "Requeijão (queso crema)",
        "manteiga": "Solo mantequilla",
        "doce-de-leite": "Dulce de leche",
        "creme-de-avela": "Crema de avellanas"
      }
    },
    "coberturas-toast": {
      "titulo": "Coberturas (elige de 1 a 5)",
      "itens": {
        "ovos-mexidos": "Huevos revueltos",
        "ovo-estrelado": "Huevo frito",
        "queijo": "Queso derretido",
        "bacon": "Tocineta",
        "presunto": "Jamón",
        "frango-cremoso": "Pollo cremoso",
        "calabresa": "Calabresa",
        "tomate": "Tomate sazonado",
        "banana": "Cambur",
        "morangos": "Fresas",
        "mel": "Miel",
        "canela": "Canela"
      }
    }
  },
  "itens": {
    "espresso": {
      "nome": "Espresso",
      "descricaoCurta": "Café puro e intenso, extraído al momento.",
      "ingredientes": [
        "Café molido al momento"
      ]
    },
    "ristretto": {
      "nome": "Ristretto",
      "descricaoCurta": "Extracción corta: más dulce y concentrado.",
      "ingredientes": [
        "Café molido al momento"
      ]
    },
    "espresso-duplo-doppio": {
      "nome": "Espresso Doble (Doppio)",
      "descricaoCurta": "Dos shots de espresso.",
      "ingredientes": [
        "Dos shots de espresso"
      ]
    },
    "americano": {
      "nome": "Americano",
      "descricaoCurta": "Espresso alargado con agua caliente.",
      "ingredientes": [
        "Espresso",
        "Agua caliente"
      ]
    },
    "macchiato": {
      "nome": "Macchiato",
      "descricaoCurta": "Espresso con un toque de espuma de leche.",
      "ingredientes": [
        "Espresso",
        "Espuma de leche"
      ]
    },
    "cortado": {
      "nome": "Cortado",
      "descricaoCurta": "Espresso con la misma cantidad de leche vaporizada.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada en la misma proporción"
      ]
    },
    "flat-white": {
      "nome": "Flat White",
      "descricaoCurta": "Leche aterciopelada y poca espuma.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada aterciopelada",
        "Capa fina de espuma"
      ]
    },
    "cappuccino": {
      "nome": "Cappuccino Italiano",
      "descricaoCurta": "Espresso, leche vaporizada y espuma.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada",
        "Espuma de leche"
      ]
    },
    "monte-seu-cappuccino": {
      "nome": "Arma tu Cappuccino",
      "descricaoCurta": "Un cappuccino con los complementos que elijas.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada",
        "Espuma de leche",
        "Complementos a elección: cacao, chocolate, canela, azúcar de vainilla"
      ]
    },
    "cafe-latte": {
      "nome": "Café Latte",
      "descricaoCurta": "Espresso con bastante leche vaporizada.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada"
      ]
    },
    "marroquino": {
      "nome": "Marroquino",
      "descricaoCurta": "Espresso con cacao al 50%, azúcar y canela, cubierto de espuma de leche.",
      "ingredientes": [
        "Espresso",
        "Cacao al 50%",
        "Azúcar",
        "Canela",
        "Espuma de leche"
      ]
    },
    "coado-do-dia": {
      "nome": "Café Filtrado del Día",
      "descricaoCurta": "Café filtrado con el grano de la semana.",
      "ingredientes": [
        "Café filtrado",
        "Grano de la semana"
      ]
    },
    "pingado": {
      "nome": "Pingado (café con leche)",
      "descricaoCurta": "Café colado con leche, al estilo brasileño. Tú eliges: simple o cremoso.",
      "ingredientes": [
        "Café colado",
        "Leche (simple o cremosa)"
      ]
    },
    "metodo-v60": {
      "nome": "Método V60",
      "descricaoCurta": "Filtrado a mano que resalta las notas del grano.",
      "ingredientes": [
        "Café filtrado a mano en V60"
      ]
    },
    "prensa-francesa": {
      "nome": "Prensa Francesa",
      "descricaoCurta": "Café en infusión, con mucho cuerpo.",
      "ingredientes": [
        "Café en infusión en prensa francesa"
      ]
    },
    "caramel-macchiato": {
      "nome": "Caramel Macchiato",
      "descricaoCurta": "Leche vaporizada con jarabe de caramelo y vainilla, espresso y salsa de caramelo por encima.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada",
        "Jarabe de caramelo con vainilla",
        "Salsa de caramelo por encima"
      ]
    },
    "avela-latte": {
      "nome": "Latte de Avellana",
      "descricaoCurta": "Espresso y leche vaporizada con crema de avellanas disuelta en la bebida.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada",
        "Crema de avellanas disuelta"
      ]
    },
    "cafe-moka": {
      "nome": "Café Moka",
      "descricaoCurta": "Espresso, chocolate y leche vaporizada.",
      "ingredientes": [
        "Espresso",
        "Chocolate",
        "Leche vaporizada"
      ]
    },
    "moka-pistache": {
      "nome": "Moka de Pistacho",
      "descricaoCurta": "Espresso, chocolate blanco, pistacho y leche vaporizada.",
      "ingredientes": [
        "Espresso",
        "Chocolate blanco",
        "Pistacho",
        "Leche vaporizada"
      ]
    },
    "vietnamita-latte": {
      "nome": "Latte Vietnamita",
      "descricaoCurta": "Espresso con leche condensada.",
      "ingredientes": [
        "Espresso",
        "Leche condensada",
        "Leche vaporizada"
      ]
    },
    "latte-vanilla": {
      "nome": "Latte de Vainilla",
      "descricaoCurta": "Latte con jarabe de vainilla.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada",
        "Jarabe de vainilla"
      ]
    },
    "caramel-latte": {
      "nome": "Latte de Caramelo",
      "descricaoCurta": "Latte con jarabe de caramelo. Más suave que el Caramel Macchiato, sin salsa por encima.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada",
        "Jarabe de caramelo"
      ]
    },
    "cappuccino-avela": {
      "nome": "Cappuccino de Avellana",
      "descricaoCurta": "Cappuccino con crema de avellanas en todo el borde de la taza. Maní molido por encima, opcional.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada",
        "Espuma de leche",
        "Crema de avellanas en el borde de la taza",
        "Maní molido (opcional)"
      ]
    },
    "latte-doce-de-leite": {
      "nome": "Latte de Dulce de Leche",
      "descricaoCurta": "Espresso y leche vaporizada con dulce de leche disuelto en la bebida.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada",
        "Dulce de leche disuelto"
      ]
    },
    "bala-de-canela": {
      "nome": "Bala de Canela",
      "descricaoCurta": "Nuestra receta de la casa: espresso, leche, salsa artesanal de cereza y leche condensada, con canela.",
      "ingredientes": [
        "Espresso",
        "Leche",
        "Salsa artesanal de cereza",
        "Leche condensada",
        "Canela en polvo"
      ]
    },
    "limon-cappuccino": {
      "nome": "Cappuccino de Limón",
      "descricaoCurta": "Cappuccino cítrico con jarabe de limón.",
      "ingredientes": [
        "Espresso",
        "Leche vaporizada",
        "Espuma de leche",
        "Jarabe de limón"
      ]
    },
    "limon-gelado": {
      "nome": "Limon Helado (espresso tónico)",
      "descricaoCurta": "Agua tónica, espresso, limón amarillo y ralladura de limón.",
      "ingredientes": [
        "Agua tónica",
        "Espresso",
        "Limón amarillo",
        "Ralladura de limón",
        "Hielo"
      ]
    },
    "chocolate-quente-tradicional": {
      "nome": "Tradicional",
      "descricaoCurta": "Cremoso y bien achocolatado.",
      "ingredientes": [
        "Chocolate",
        "Leche"
      ],
      "nomeCompleto": "Chocolate Caliente — Tradicional"
    },
    "chocolate-quente-meio-amargo": {
      "nome": "Semiamargo",
      "descricaoCurta": "Más intenso y menos dulce.",
      "ingredientes": [
        "Chocolate semiamargo",
        "Leche"
      ],
      "nomeCompleto": "Chocolate Caliente — Semiamargo"
    },
    "chocolate-quente-avela": {
      "nome": "Avellana",
      "descricaoCurta": "Chocolate caliente con crema de avellanas.",
      "ingredientes": [
        "Chocolate",
        "Leche",
        "Crema de avellanas"
      ],
      "nomeCompleto": "Chocolate Caliente — Avellana"
    },
    "iced-latte": {
      "nome": "Latte Helado",
      "descricaoCurta": "Espresso y leche fría, con hielo.",
      "ingredientes": [
        "Espresso",
        "Leche fría",
        "Hielo"
      ]
    },
    "vanilla-latte-gelado": {
      "nome": "Latte de Vainilla Helado",
      "descricaoCurta": "Latte helado con jarabe de vainilla.",
      "ingredientes": [
        "Espresso",
        "Leche fría",
        "Jarabe de vainilla",
        "Hielo"
      ]
    },
    "avela-latte-gelado": {
      "nome": "Latte de Avellana Helado",
      "descricaoCurta": "Latte helado con crema de avellanas.",
      "ingredientes": [
        "Espresso",
        "Leche fría",
        "Crema de avellanas",
        "Hielo"
      ]
    },
    "caramel-latte-gelado": {
      "nome": "Latte de Caramelo Helado",
      "descricaoCurta": "Latte helado con salsa de caramelo.",
      "ingredientes": [
        "Espresso",
        "Leche fría",
        "Salsa de caramelo",
        "Hielo"
      ]
    },
    "choco-latte-gelado": {
      "nome": "Choco Latte Helado",
      "descricaoCurta": "Latte helado con chocolate.",
      "ingredientes": [
        "Espresso",
        "Leche fría",
        "Chocolate",
        "Hielo"
      ]
    },
    "iced-moka": {
      "nome": "Moka Helado",
      "descricaoCurta": "Espresso, chocolate y leche fría.",
      "ingredientes": [
        "Espresso",
        "Chocolate",
        "Leche fría",
        "Hielo"
      ]
    },
    "cold-brew": {
      "nome": "Cold Brew",
      "descricaoCurta": "Café extraído en frío durante 12 horas.",
      "ingredientes": [
        "Café extraído en frío durante 12 horas",
        "Hielo"
      ]
    },
    "affogato": {
      "nome": "Affogato",
      "descricaoCurta": "Helado de crema con espresso por encima.",
      "ingredientes": [
        "Helado de crema",
        "Espresso"
      ]
    },
    "pure-matcha": {
      "nome": "Matcha Puro",
      "descricaoCurta": "Matcha batido con agua. Se sirve caliente.",
      "ingredientes": [
        "Matcha",
        "Agua"
      ]
    },
    "matcha-latte-tradicional": {
      "nome": "Matcha Latte Tradicional",
      "descricaoCurta": "Matcha con leche vaporizada.",
      "ingredientes": [
        "Matcha",
        "Leche"
      ]
    },
    "vietnamita-matcha": {
      "nome": "Matcha Vietnamita",
      "descricaoCurta": "Matcha latte con leche condensada.",
      "ingredientes": [
        "Matcha",
        "Leche",
        "Leche condensada"
      ]
    },
    "honey-matcha": {
      "nome": "Matcha con Miel",
      "descricaoCurta": "Matcha latte endulzado con miel.",
      "ingredientes": [
        "Matcha",
        "Leche",
        "Miel"
      ]
    },
    "vanilla-matcha": {
      "nome": "Matcha de Vainilla",
      "descricaoCurta": "Matcha latte con jarabe de vainilla.",
      "ingredientes": [
        "Matcha",
        "Leche",
        "Jarabe de vainilla"
      ]
    },
    "caramel-matcha": {
      "nome": "Matcha de Caramelo",
      "descricaoCurta": "Matcha latte con salsa de caramelo.",
      "ingredientes": [
        "Matcha",
        "Leche",
        "Salsa de caramelo"
      ]
    },
    "moka-matcha": {
      "nome": "Matcha Moka",
      "descricaoCurta": "Matcha latte con chocolate semiamargo.",
      "ingredientes": [
        "Matcha",
        "Leche",
        "Chocolate semiamargo"
      ]
    },
    "matcha-com-leite-de-morango": {
      "nome": "Matcha con Leche de Fresa",
      "descricaoCurta": "Matcha sobre leche de fresa.",
      "ingredientes": [
        "Matcha",
        "Leche de fresa"
      ]
    },
    "chai-tradicional": {
      "nome": "Chai Tradicional",
      "descricaoCurta": "Té de especias. Se sirve caliente.",
      "ingredientes": [
        "Té chai de especias"
      ]
    },
    "chai-latte": {
      "nome": "Chai Latte",
      "descricaoCurta": "Chai con leche vaporizada.",
      "ingredientes": [
        "Té chai",
        "Leche"
      ]
    },
    "vanilla-chai-latte": {
      "nome": "Chai Latte de Vainilla",
      "descricaoCurta": "Chai latte con jarabe de vainilla.",
      "ingredientes": [
        "Té chai",
        "Leche",
        "Jarabe de vainilla"
      ]
    },
    "honey-chai": {
      "nome": "Chai con Miel",
      "descricaoCurta": "Chai latte endulzado con miel.",
      "ingredientes": [
        "Té chai",
        "Leche",
        "Miel"
      ]
    },
    "caramel-chai": {
      "nome": "Chai de Caramelo",
      "descricaoCurta": "Chai latte con salsa de caramelo.",
      "ingredientes": [
        "Té chai",
        "Leche",
        "Salsa de caramelo"
      ]
    },
    "vietnamita-chai": {
      "nome": "Chai Vietnamita",
      "descricaoCurta": "Chai latte con leche condensada.",
      "ingredientes": [
        "Té chai",
        "Leche",
        "Leche condensada"
      ]
    },
    "dirty-chai": {
      "nome": "Dirty Chai",
      "descricaoCurta": "Chai latte con un shot de espresso.",
      "ingredientes": [
        "Té chai",
        "Leche",
        "Espresso"
      ]
    },
    "suco-de-laranja": {
      "nome": "Jugo de Naranja",
      "descricaoCurta": "Exprimido al momento.",
      "ingredientes": [
        "Naranja"
      ]
    },
    "cha": {
      "nome": "Té",
      "descricaoCurta": "Sabores del día. Pregunta en el mostrador.",
      "ingredientes": [
        "Té del día"
      ]
    },
    "cha-gelado": {
      "nome": "Té Helado",
      "descricaoCurta": "Té helado con limón.",
      "ingredientes": [
        "Té",
        "Hielo",
        "Limón"
      ]
    },
    "cha-de-morangos": {
      "nome": "Té de Fresas",
      "descricaoCurta": "Té helado con fresas.",
      "ingredientes": [
        "Té",
        "Fresas",
        "Hielo"
      ]
    },
    "soda-italiana": {
      "nome": "Soda Italiana",
      "descricaoCurta": "Arma la tuya: elige de 1 a 3 sabores, sin costo extra.",
      "ingredientes": [
        "Agua con gas",
        "60 ml de jarabe, divididos entre los sabores elegidos",
        "Hielo"
      ]
    },
    "croissants-na-chapa-com-manteiga": {
      "nome": "A la plancha con mantequilla",
      "descricaoCurta": "Croissant calentado a la plancha con mantequilla.",
      "ingredientes": [
        "Croissant",
        "Mantequilla"
      ],
      "nomeCompleto": "Croissant — A la plancha con mantequilla"
    },
    "croissants-frango-com-requeijao-e-queijo": {
      "nome": "Pollo, queso crema y queso",
      "descricaoCurta": "Relleno de pollo, requeijão (queso crema) y queso.",
      "ingredientes": [
        "Croissant",
        "Pollo",
        "Requeijão (queso crema brasileño)",
        "Queso"
      ],
      "nomeCompleto": "Croissant — Pollo, queso crema y queso"
    },
    "croissants-presunto-com-queijo": {
      "nome": "Jamón y queso",
      "descricaoCurta": "Relleno de jamón y queso.",
      "ingredientes": [
        "Croissant",
        "Jamón",
        "Queso"
      ],
      "nomeCompleto": "Croissant — Jamón y queso"
    },
    "croissants-presunto-queijo-e-tomate": {
      "nome": "Jamón, queso y tomate",
      "descricaoCurta": "Relleno de jamón, queso y tomate.",
      "ingredientes": [
        "Croissant",
        "Jamón",
        "Queso",
        "Tomate"
      ],
      "nomeCompleto": "Croissant — Jamón, queso y tomate"
    },
    "croissants-2-queijos-gratinado": {
      "nome": "Dos quesos gratinado",
      "descricaoCurta": "Relleno de dos quesos y gratinado.",
      "ingredientes": [
        "Croissant",
        "Dos quesos",
        "Gratinado"
      ],
      "nomeCompleto": "Croissant — Dos quesos gratinado"
    },
    "croissants-ovos-com-queijo": {
      "nome": "Huevos y queso",
      "descricaoCurta": "Relleno de huevos y queso.",
      "ingredientes": [
        "Croissant",
        "Huevos",
        "Queso"
      ],
      "nomeCompleto": "Croissant — Huevos y queso"
    },
    "croissants-requeijao-com-queijo": {
      "nome": "Queso crema y queso",
      "descricaoCurta": "Relleno de requeijão (queso crema) y queso.",
      "ingredientes": [
        "Croissant",
        "Requeijão (queso crema brasileño)",
        "Queso"
      ],
      "nomeCompleto": "Croissant — Queso crema y queso"
    },
    "croissants-ovos-bacon-queijo-e-requeijao": {
      "nome": "Huevos, tocineta, queso y queso crema",
      "descricaoCurta": "Relleno de huevos, tocineta, queso y requeijão.",
      "ingredientes": [
        "Croissant",
        "Huevos",
        "Tocineta",
        "Queso",
        "Requeijão (queso crema brasileño)"
      ],
      "nomeCompleto": "Croissant — Huevos, tocineta, queso y queso crema"
    },
    "croissants-creme-de-avela": {
      "nome": "Crema de avellanas",
      "descricaoCurta": "Relleno de crema de avellanas.",
      "ingredientes": [
        "Croissant",
        "Crema de avellanas"
      ],
      "nomeCompleto": "Croissant — Crema de avellanas"
    },
    "croissants-creme-de-avela-e-morangos": {
      "nome": "Crema de avellanas y fresas",
      "descricaoCurta": "Relleno de crema de avellanas y fresas.",
      "ingredientes": [
        "Croissant",
        "Crema de avellanas",
        "Fresas"
      ],
      "nomeCompleto": "Croissant — Crema de avellanas y fresas"
    },
    "croissants-doce-de-leite": {
      "nome": "Dulce de leche",
      "descricaoCurta": "Relleno de dulce de leche.",
      "ingredientes": [
        "Croissant",
        "Dulce de leche"
      ],
      "nomeCompleto": "Croissant — Dulce de leche"
    },
    "croissants-doce-de-leite-com-banana": {
      "nome": "Dulce de leche y cambur",
      "descricaoCurta": "Relleno de dulce de leche y cambur (plátano).",
      "ingredientes": [
        "Croissant",
        "Dulce de leche",
        "Cambur / plátano"
      ],
      "nomeCompleto": "Croissant — Dulce de leche y cambur"
    },
    "sanduiches-pao-na-chapa-com-requeijao": {
      "nome": "Pan a la plancha con queso crema",
      "descricaoCurta": "Pan a la plancha con requeijão (queso crema).",
      "ingredientes": [
        "Pan",
        "Requeijão (queso crema brasileño)"
      ],
      "nomeCompleto": "Sándwich — Pan a la plancha con queso crema"
    },
    "sanduiches-misto-quente": {
      "nome": "Mixto caliente",
      "descricaoCurta": "Jamón y queso, a la plancha.",
      "ingredientes": [
        "Pan",
        "Jamón",
        "Queso"
      ],
      "nomeCompleto": "Sándwich — Mixto caliente"
    },
    "sanduiches-queijo-quente": {
      "nome": "Queso caliente",
      "descricaoCurta": "Queso derretido, a la plancha.",
      "ingredientes": [
        "Pan",
        "Queso"
      ],
      "nomeCompleto": "Sándwich — Queso caliente"
    },
    "sanduiches-bauru": {
      "nome": "Bauru",
      "descricaoCurta": "Jamón, queso y tomate, a la plancha.",
      "ingredientes": [
        "Pan",
        "Jamón",
        "Queso",
        "Tomate"
      ],
      "nomeCompleto": "Sándwich — Bauru"
    },
    "sanduiches-queijo-e-bacon": {
      "nome": "Queso y tocineta",
      "descricaoCurta": "Queso y tocineta, a la plancha.",
      "ingredientes": [
        "Pan",
        "Queso",
        "Tocineta"
      ],
      "nomeCompleto": "Sándwich — Queso y tocineta"
    },
    "sanduiches-misto-com-ovo": {
      "nome": "Mixto con huevo",
      "descricaoCurta": "Jamón, queso y huevo, a la plancha.",
      "ingredientes": [
        "Pan",
        "Jamón",
        "Queso",
        "Huevo"
      ],
      "nomeCompleto": "Sándwich — Mixto con huevo"
    },
    "gratinados-frango-cremoso": {
      "nome": "Pollo cremoso",
      "descricaoCurta": "Sándwich gratinado de pollo cremoso.",
      "ingredientes": [
        "Pan",
        "Pollo cremoso",
        "Queso gratinado"
      ],
      "nomeCompleto": "Gratinado — Pollo cremoso"
    },
    "gratinados-croque-monsieur": {
      "nome": "Croque monsieur",
      "descricaoCurta": "Clásico francés de jamón y queso, gratinado.",
      "ingredientes": [
        "Pan",
        "Jamón",
        "Queso gratinado"
      ],
      "nomeCompleto": "Gratinado — Croque monsieur"
    },
    "gratinados-ovos-e-queijo": {
      "nome": "Huevos y queso",
      "descricaoCurta": "Sándwich gratinado de huevos y queso.",
      "ingredientes": [
        "Pan",
        "Huevos",
        "Queso gratinado"
      ],
      "nomeCompleto": "Gratinado — Huevos y queso"
    },
    "gratinados-bauru": {
      "nome": "Bauru",
      "descricaoCurta": "Bauru gratinado: jamón, queso y tomate.",
      "ingredientes": [
        "Pan",
        "Jamón",
        "Tomate",
        "Queso gratinado"
      ],
      "nomeCompleto": "Gratinado — Bauru"
    },
    "brunches-tradicional": {
      "nome": "Tradicional",
      "descricaoCurta": "Tostadas, huevos revueltos, tocineta y requeijão (queso crema).",
      "ingredientes": [
        "Tostadas",
        "Huevos revueltos",
        "Tocineta",
        "Requeijão (queso crema brasileño)"
      ],
      "nomeCompleto": "Brunch — Tradicional"
    },
    "brunches-simples": {
      "nome": "Sencillo",
      "descricaoCurta": "Tostadas, huevos revueltos y requeijão (queso crema).",
      "ingredientes": [
        "Tostadas",
        "Huevos revueltos",
        "Requeijão (queso crema brasileño)"
      ],
      "nomeCompleto": "Brunch — Sencillo"
    },
    "brunches-omelete": {
      "nome": "Tortilla",
      "descricaoCurta": "Tortilla de queso, tostadas y requeijão.",
      "ingredientes": [
        "Tortilla de queso",
        "Tostadas",
        "Requeijão (queso crema brasileño)"
      ],
      "nomeCompleto": "Brunch — Tortilla"
    },
    "brunches-omelete-e-bacon": {
      "nome": "Tortilla y tocineta",
      "descricaoCurta": "Tortilla de queso con tocineta, tostadas y requeijão.",
      "ingredientes": [
        "Tortilla de queso",
        "Tocineta",
        "Tostadas",
        "Requeijão (queso crema brasileño)"
      ],
      "nomeCompleto": "Brunch — Tortilla y tocineta"
    },
    "brunches-omelete-de-calabresa": {
      "nome": "Tortilla de calabresa",
      "descricaoCurta": "Tortilla con chorizo calabresa, tostadas y requeijão.",
      "ingredientes": [
        "Tortilla con chorizo calabresa",
        "Tostadas",
        "Requeijão (queso crema brasileño)"
      ],
      "nomeCompleto": "Brunch — Tortilla de calabresa"
    },
    "brunches-omelete-de-frango-cremoso": {
      "nome": "Tortilla de pollo cremoso",
      "descricaoCurta": "Tortilla con pollo cremoso, tostadas y requeijão.",
      "ingredientes": [
        "Tortilla con pollo cremoso",
        "Tostadas",
        "Requeijão (queso crema brasileño)"
      ],
      "nomeCompleto": "Brunch — Tortilla de pollo cremoso"
    },
    "waffle-mineiro-tradicional": {
      "nome": "Tradicional",
      "descricaoCurta": "Waffle de pan de queso, sin relleno.",
      "ingredientes": [
        "Masa de pan de queso brasileño (pão de queijo)"
      ],
      "nomeCompleto": "Waffle Mineiro — Tradicional"
    },
    "waffle-mineiro-calabresa": {
      "nome": "Calabresa",
      "descricaoCurta": "Waffle de pan de queso con calabresa.",
      "ingredientes": [
        "Masa de pan de queso brasileño (pão de queijo)",
        "Calabresa (chorizo ahumado brasileño)"
      ],
      "nomeCompleto": "Waffle Mineiro — Calabresa"
    },
    "waffle-mineiro-frango": {
      "nome": "Pollo",
      "descricaoCurta": "Waffle de pan de queso con pollo.",
      "ingredientes": [
        "Masa de pan de queso brasileño (pão de queijo)",
        "Pollo"
      ],
      "nomeCompleto": "Waffle Mineiro — Pollo"
    },
    "waffle-mineiro-presunto-e-queijo": {
      "nome": "Jamón y queso",
      "descricaoCurta": "Waffle de pan de queso con jamón y queso.",
      "ingredientes": [
        "Masa de pan de queso brasileño (pão de queijo)",
        "Jamón",
        "Queso"
      ],
      "nomeCompleto": "Waffle Mineiro — Jamón y queso"
    },
    "waffle-mineiro-tipo-bauru": {
      "nome": "Tipo Bauru",
      "descricaoCurta": "Waffle de pan de queso con jamón, queso y tomate.",
      "ingredientes": [
        "Masa de pan de queso brasileño (pão de queijo)",
        "Jamón",
        "Queso",
        "Tomate"
      ],
      "nomeCompleto": "Waffle Mineiro — Tipo Bauru"
    },
    "waffle-mineiro-creme-de-avela": {
      "nome": "Crema de avellanas",
      "descricaoCurta": "Waffle de pan de queso con crema de avellanas.",
      "ingredientes": [
        "Masa de pan de queso brasileño (pão de queijo)",
        "Crema de avellanas"
      ],
      "nomeCompleto": "Waffle Mineiro — Crema de avellanas"
    },
    "waffle-mineiro-morangos-e-avela": {
      "nome": "Fresas y avellana",
      "descricaoCurta": "Waffle de pan de queso con fresas y crema de avellanas.",
      "ingredientes": [
        "Masa de pan de queso brasileño (pão de queijo)",
        "Fresas",
        "Crema de avellanas"
      ],
      "nomeCompleto": "Waffle Mineiro — Fresas y avellana"
    },
    "waffle-mineiro-doce-de-leite": {
      "nome": "Dulce de leche",
      "descricaoCurta": "Waffle de pan de queso con dulce de leche.",
      "ingredientes": [
        "Masa de pan de queso brasileño (pão de queijo)",
        "Dulce de leche"
      ],
      "nomeCompleto": "Waffle Mineiro — Dulce de leche"
    },
    "waffle-americano-chantilly-e-caramelo": {
      "nome": "Chantilly y caramelo",
      "descricaoCurta": "Waffle con crema chantilly y salsa de caramelo.",
      "ingredientes": [
        "Waffle",
        "Crema chantilly",
        "Salsa de caramelo"
      ],
      "nomeCompleto": "Waffle Americano — Chantilly y caramelo"
    },
    "waffle-americano-doce-de-leite-e-banana": {
      "nome": "Dulce de leche y cambur",
      "descricaoCurta": "Waffle con dulce de leche y cambur (plátano).",
      "ingredientes": [
        "Waffle",
        "Dulce de leche",
        "Cambur / plátano"
      ],
      "nomeCompleto": "Waffle Americano — Dulce de leche y cambur"
    },
    "waffle-americano-avela-e-morangos": {
      "nome": "Avellana y fresas",
      "descricaoCurta": "Waffle con crema de avellanas y fresas.",
      "ingredientes": [
        "Waffle",
        "Crema de avellanas",
        "Fresas"
      ],
      "nomeCompleto": "Waffle Americano — Avellana y fresas"
    },
    "waffle-americano-waffle-brunch": {
      "nome": "Waffle Brunch",
      "descricaoCurta": "Waffle con huevos revueltos y tocineta.",
      "ingredientes": [
        "Waffle",
        "Huevos revueltos",
        "Tocineta"
      ],
      "nomeCompleto": "Waffle Americano — Waffle Brunch"
    },
    "tortas-torta-do-dia": {
      "nome": "Torta del día",
      "descricaoCurta": "El sabor cambia todos los días. Pregunta en el mostrador por el sabor y el precio.",
      "ingredientes": []
    },
    "smoothie-melancia-banana": {
      "nome": "Patilla y Cambur",
      "descricaoCurta": "Patilla (sandía) y cambur congelados, con limón y un toque de miel.",
      "ingredientes": [
        "Patilla (sandía) congelada",
        "Cambur (plátano) congelado",
        "Jugo de limón",
        "Miel"
      ],
      "nomeCompleto": "Smoothie — Patilla y Cambur"
    },
    "smoothie-melao-hortela-limao": {
      "nome": "Melón, Hierbabuena y Limón",
      "descricaoCurta": "Melón congelado con hierbabuena fresca, limón y miel. El más refrescante.",
      "ingredientes": [
        "Melón congelado",
        "Hierbabuena fresca",
        "Jugo de limón",
        "Miel"
      ],
      "nomeCompleto": "Smoothie — Melón, Hierbabuena y Limón"
    },
    "smoothie-abacaxi-hortela-mel": {
      "nome": "Piña, Hierbabuena y Miel",
      "descricaoCurta": "Piña congelada con hierbabuena fresca, miel y limón.",
      "ingredientes": [
        "Piña congelada",
        "Hierbabuena fresca",
        "Miel",
        "Jugo de limón"
      ],
      "nomeCompleto": "Smoothie — Piña, Hierbabuena y Miel"
    },
    "smoothie-manga-laranja": {
      "nome": "Mango y Naranja",
      "descricaoCurta": "Mango y cambur congelados con jugo de naranja exprimido al momento.",
      "ingredientes": [
        "Mango congelado",
        "Cambur (plátano) congelado",
        "Jugo de naranja natural"
      ],
      "nomeCompleto": "Smoothie — Mango y Naranja"
    },
    "smoothie-morango-baunilha": {
      "nome": "Fresa y Vainilla",
      "descricaoCurta": "Fresa y cambur con helado de crema, leche y vainilla. Cremoso.",
      "ingredientes": [
        "Fresas congeladas",
        "Cambur (plátano) congelado",
        "Helado de crema",
        "Leche",
        "Jarabe de vainilla"
      ],
      "nomeCompleto": "Smoothie — Fresa y Vainilla"
    },
    "smoothie-bala-de-canela": {
      "nome": "Bala de Canela Helada",
      "descricaoCurta": "La versión de verano de nuestra receta de la casa: cambur, salsa de cereza, leche condensada y canela.",
      "ingredientes": [
        "Cambur (plátano) congelado",
        "Salsa artesanal de cereza",
        "Leche condensada",
        "Leche",
        "Canela en polvo"
      ],
      "nomeCompleto": "Smoothie — Bala de Canela Helada"
    },
    "smoothie-matcha-manga": {
      "nome": "Matcha y Mango",
      "descricaoCurta": "Matcha con mango congelado, leche y miel.",
      "ingredientes": [
        "Matcha",
        "Mango congelado",
        "Leche",
        "Miel"
      ],
      "nomeCompleto": "Smoothie — Matcha y Mango"
    },
    "toast-ovos-queijo-requeijao": {
      "nome": "Huevos, Queso y Queso Crema",
      "descricaoCurta": "Requeijão (queso crema) como base, huevos revueltos cremosos y queso derretido.",
      "ingredientes": [
        "Rebanada gruesa de pan de maíz brasileño (broa de milho), dorada en mantequilla",
        "Requeijão (queso crema brasileño)",
        "Huevos revueltos cremosos",
        "Queso derretido"
      ],
      "nomeCompleto": "Toast — Huevos, Queso y Queso Crema"
    },
    "toast-ovos-bacon-queijo": {
      "nome": "Huevos, Tocineta y Queso",
      "descricaoCurta": "Huevos revueltos, tocineta crocante y queso derretido.",
      "ingredientes": [
        "Rebanada gruesa de pan de maíz brasileño (broa de milho), dorada en mantequilla",
        "Huevos revueltos cremosos",
        "Tocineta crocante",
        "Queso derretido"
      ],
      "nomeCompleto": "Toast — Huevos, Tocineta y Queso"
    },
    "toast-frango-cremoso": {
      "nome": "Pollo Cremoso Gratinado",
      "descricaoCurta": "Nuestro pollo cremoso con queso gratinado por encima.",
      "ingredientes": [
        "Rebanada gruesa de pan de maíz brasileño (broa de milho), dorada en mantequilla",
        "Pollo cremoso",
        "Queso gratinado"
      ],
      "nomeCompleto": "Toast — Pollo Cremoso Gratinado"
    },
    "toast-tomate-queijo": {
      "nome": "Tomate y Queso",
      "descricaoCurta": "Queso derretido y tomate en cubitos con aceite de oliva y orégano.",
      "ingredientes": [
        "Rebanada gruesa de pan de maíz brasileño (broa de milho), dorada en mantequilla",
        "Queso derretido",
        "Tomate en cubitos con aceite de oliva y orégano"
      ],
      "nomeCompleto": "Toast — Tomate y Queso"
    },
    "toast-presunto-queijo-ovo": {
      "nome": "Jamón, Queso y Huevo",
      "descricaoCurta": "Jamón y queso derretido con un huevo frito encima, estilo croque madame.",
      "ingredientes": [
        "Rebanada gruesa de pan de maíz brasileño (broa de milho), dorada en mantequilla",
        "Jamón",
        "Queso derretido",
        "Huevo frito"
      ],
      "nomeCompleto": "Toast — Jamón, Queso y Huevo"
    },
    "toast-banana-canela-mel": {
      "nome": "Cambur, Canela y Miel",
      "descricaoCurta": "Cambur caramelizado a la plancha, canela y un hilo de miel.",
      "ingredientes": [
        "Rebanada gruesa de pan de maíz brasileño (broa de milho), dorada en mantequilla",
        "Cambur caramelizado",
        "Canela",
        "Miel"
      ],
      "nomeCompleto": "Toast — Cambur, Canela y Miel"
    },
    "toast-morango-avela": {
      "nome": "Fresa y Avellana",
      "descricaoCurta": "Crema de avellanas y fresas frescas en láminas.",
      "ingredientes": [
        "Rebanada gruesa de pan de maíz brasileño (broa de milho), dorada en mantequilla",
        "Crema de avellanas",
        "Fresas frescas"
      ],
      "nomeCompleto": "Toast — Fresa y Avellana"
    },
    "toast-doce-de-leite-banana": {
      "nome": "Dulce de Leche y Cambur",
      "descricaoCurta": "Dulce de leche, cambur en rodajas y canela.",
      "ingredientes": [
        "Rebanada gruesa de pan de maíz brasileño (broa de milho), dorada en mantequilla",
        "Dulce de leche",
        "Cambur / plátano",
        "Canela"
      ],
      "nomeCompleto": "Toast — Dulce de Leche y Cambur"
    },
    "toast-monte-o-seu": {
      "nome": "Arma tu Toast",
      "descricaoCurta": "Elige la base y de 1 a 5 coberturas. El precio cambia según lo que elijas.",
      "ingredientes": [
        "Rebanada gruesa de pan de maíz brasileño (broa de milho), dorada en mantequilla",
        "Base a elección",
        "Coberturas a elección"
      ],
      "nomeCompleto": "Toast — Arma tu Toast"
    }
  },
  "quiz": {
    "textos": {
      "abertura": "¿No sabes qué pedir? Responde 12 preguntas rápidas y elegimos por ti.",
      "titulo": "Tu café de hoy",
      "alternativas": "También combina contigo",
      "acompanhamento": "Para acompañar",
      "refazer": "Repetir el quiz",
      "porque": "Porque",
      "e": "y"
    },
    "perguntas": {
      "momento": {
        "pergunta": "¿Qué momento es este?",
        "apoio": "El café ideal cambia según la hora del día.",
        "respostas": [
          {
            "texto": "Empezando el día",
            "motivo": "estás empezando el día"
          },
          {
            "texto": "Pausa a media tarde",
            "motivo": "quieres una pausa en la tarde"
          },
          {
            "texto": "Fin del día, quiero bajar el ritmo",
            "motivo": "quieres bajar el ritmo sin perder el sueño"
          },
          {
            "texto": "Después del almuerzo, en lugar del postre",
            "motivo": "quieres algo en lugar del postre"
          }
        ]
      },
      "relacao": {
        "pergunta": "¿Cómo te llevas con el café?",
        "apoio": "No hay respuesta incorrecta. Solo nos ayuda a acertar.",
        "respostas": [
          {
            "texto": "Lo tomo solo, sin azúcar",
            "motivo": "te gusta el café tal como es"
          },
          {
            "texto": "Me gusta con leche y un poco de azúcar",
            "motivo": "te gusta el café con leche"
          },
          {
            "texto": "Me gusta cuando casi no se siente el café",
            "motivo": "prefieres un café más suave"
          },
          {
            "texto": "No tomo café",
            "motivo": "no tomas café"
          }
        ]
      },
      "doce": {
        "pergunta": "¿Y el azúcar?",
        "apoio": "Piensa en cuánto sueles endulzar.",
        "respostas": [
          {
            "texto": "Nada. Me gusta el sabor puro",
            "motivo": "lo prefieres sin azúcar"
          },
          {
            "texto": "Un toque, sin exagerar",
            "motivo": "te gusta un toque dulce"
          },
          {
            "texto": "Dulce, en su punto",
            "motivo": "te gusta un café dulce"
          },
          {
            "texto": "Mientras más dulce, mejor",
            "motivo": "te gusta bien dulce"
          }
        ]
      },
      "temperatura": {
        "pergunta": "¿Caliente o helado?",
        "apoio": "Algunas bebidas vienen de las dos formas.",
        "respostas": [
          {
            "texto": "Bien calientito",
            "motivo": "quieres algo caliente"
          },
          {
            "texto": "Helado",
            "motivo": "quieres algo helado"
          },
          {
            "texto": "Me da igual"
          }
        ]
      },
      "sobremesa": {
        "pergunta": "Si pudieras elegir un postre ahora…",
        "apoio": "Dice mucho del sabor que buscas.",
        "respostas": [
          {
            "texto": "Brigadeiro (trufa de chocolate)",
            "motivo": "eres del equipo chocolate"
          },
          {
            "texto": "Flan o dulce de leche",
            "motivo": "te encantan el caramelo y el dulce de leche"
          },
          {
            "texto": "Pie de limón",
            "motivo": "te gustan los sabores cítricos"
          },
          {
            "texto": "Fresas con crema",
            "motivo": "te gustan los sabores frutales"
          },
          {
            "texto": "Arroz con leche y canela",
            "motivo": "te gustan la canela y las especias"
          },
          {
            "texto": "Ninguno, prefiero algo salado",
            "motivo": "prefieres lo menos dulce"
          }
        ]
      },
      "aroma": {
        "pergunta": "¿Qué aroma te hace detenerte en la puerta de un café?",
        "apoio": "Elige el primero que se te ocurra.",
        "respostas": [
          {
            "texto": "Café recién molido",
            "motivo": "amas el aroma del café recién molido"
          },
          {
            "texto": "Vainilla",
            "motivo": "te gusta la vainilla"
          },
          {
            "texto": "Avellana tostada",
            "motivo": "te gusta la avellana"
          },
          {
            "texto": "Canela y clavo",
            "motivo": "te gustan las especias"
          },
          {
            "texto": "Chocolate derretido",
            "motivo": "no te resistes al chocolate"
          },
          {
            "texto": "Algo fresco y herbal",
            "motivo": "te gustan los sabores frescos"
          }
        ]
      },
      "textura": {
        "pergunta": "¿Qué textura quieres sentir?",
        "apoio": "La textura lo cambia todo en una bebida.",
        "respostas": [
          {
            "texto": "Cremosa y aterciopelada",
            "motivo": "te gusta una bebida cremosa"
          },
          {
            "texto": "Espuma alta y ligera",
            "motivo": "te gusta la espuma"
          },
          {
            "texto": "Con cuerpo, intensa en la boca",
            "motivo": "te gustan el cuerpo y la intensidad"
          },
          {
            "texto": "Ligera, fácil de tomar",
            "motivo": "prefieres algo ligero"
          },
          {
            "texto": "Refrescante",
            "motivo": "quieres refrescarte"
          }
        ]
      },
      "energia": {
        "pergunta": "¿Cuánta energía necesitas ahora?",
        "apoio": "Para acertar con la cafeína.",
        "respostas": [
          {
            "texto": "Mucha. El día todavía es largo",
            "motivo": "necesitas energía"
          },
          {
            "texto": "Solo un empujoncito",
            "motivo": "quieres solo un empujoncito"
          },
          {
            "texto": "Ninguna, solo quiero el sabor",
            "motivo": "solo quieres el sabor"
          }
        ]
      },
      "aventura": {
        "pergunta": "En un lugar nuevo, ¿qué pides?",
        "apoio": "¿Clásico o novedad?",
        "respostas": [
          {
            "texto": "Lo clásico, sin error",
            "motivo": "te gustan los clásicos"
          },
          {
            "texto": "Un clásico con un toque diferente",
            "motivo": "te gusta un clásico con un toque diferente"
          },
          {
            "texto": "Algo que nunca he probado",
            "motivo": "te gusta probar cosas nuevas"
          },
          {
            "texto": "Pregunto cuál es la especialidad de la casa",
            "motivo": "quieres probar lo de la casa"
          }
        ]
      },
      "trilha": {
        "pergunta": "¿Qué música combina con tu día?",
        "apoio": "Confía, tiene que ver.",
        "respostas": [
          {
            "texto": "Bossa nova, todo con calma",
            "motivo": "estás en un día tranquilo"
          },
          {
            "texto": "Rock, necesito fuerza",
            "motivo": "estás en un día intenso"
          },
          {
            "texto": "Pop animado",
            "motivo": "estás en un día alegre"
          },
          {
            "texto": "Lo-fi para estudiar o trabajar",
            "motivo": "vas a estudiar o trabajar"
          },
          {
            "texto": "Jazz, algo más sofisticado",
            "motivo": "te gusta algo sofisticado"
          }
        ]
      },
      "leite": {
        "pergunta": "¿Alguna preferencia de leche?",
        "apoio": "La leche deslactosada y la de avena no tienen costo extra.",
        "respostas": [
          {
            "texto": "Leche entera"
          },
          {
            "texto": "Deslactosada",
            "motivo": "prefieres leche deslactosada"
          },
          {
            "texto": "Bebida de avena",
            "motivo": "prefieres leche vegetal"
          },
          {
            "texto": "Prefiero sin leche",
            "motivo": "prefieres sin leche"
          }
        ]
      },
      "fome": {
        "pergunta": "¿Vas a comer algo también?",
        "apoio": "Te sugerimos la combinación ideal.",
        "respostas": [
          {
            "texto": "Sí, algo salado"
          },
          {
            "texto": "Sí, algo dulce"
          },
          {
            "texto": "Solo la bebida"
          }
        ]
      }
    },
    "harmonizacao": [
      "El pan de queso equilibra lo herbal del matcha.",
      "El cambur y la canela son viejos amigos.",
      "Una bebida ligera pide un acompañamiento fresco.",
      "Lo salado del croissant contrasta con lo dulce de la bebida.",
      "Un café sin azúcar va bien con algo cremoso."
    ],
    "harmonizacaoPadrao": "Nuestros croissants se hacen todos los días."
  }
};
