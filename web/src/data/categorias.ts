export type Categoria = { slug: string; nome: string; subtitulo?: string };

export const categorias: Categoria[] = [
  { slug: "espresso-bar", nome: "Espresso Bar", subtitulo: "Café especial, extraído na hora." },
  { slug: "coados", nome: "Coados", subtitulo: "Confira com o barista o grão do dia." },
  { slug: "cafes-docinhos", nome: "Cafés Docinhos", subtitulo: "Para quem gosta do café com um carinho a mais." },
  { slug: "chocolate-quente", nome: "Chocolate Quente" },
  { slug: "gelados-de-cafe", nome: "Gelados de Café", subtitulo: "Espresso, leite e muito gelo." },
  { slug: "matchas-e-chai", nome: "Matchas e Chai" },
  { slug: "drinks", nome: "Drinks" },
  { slug: "croissants", nome: "Croissants", subtitulo: "Massa folhada amanteigada, feita todos os dias e recheada na hora." },
  { slug: "sanduiches", nome: "Sanduíches", subtitulo: "Escolha entre pão de forma ou baguete." },
  { slug: "gratinados", nome: "Gratinados" },
  { slug: "brunches-e-rabanadas", nome: "Brunches e Rabanadas" },
  { slug: "waffles", nome: "Waffles" },
];
