/* ==========================================================
   TOSTES café — Configurações gerais
   ========================================================== */

// Número do WhatsApp que recebe os pedidos: 55 + DDD + número, só dígitos.
const WHATSAPP = "5541988883470";

const CONFIG = {
  nome: "TOSTES café",
  cidade: "Fazenda Rio Grande, PR",
  endereco: "Rua Jequitibá, 105 — Eucaliptos, Fazenda Rio Grande, PR",
  mapa: "https://www.google.com/maps/search/?api=1&query=Rua+Jequitib%C3%A1+105+Eucaliptos+Fazenda+Rio+Grande+PR",

  // Tamanho recomendado em todo o site quando o item tem mais de um tamanho
  tamanhoRecomendado: "M",

  // Convite para marcar a cafeteria nas fotos
  instagramConvite: {
    titulo: "Ficou bonito na foto?",
    texto: "Marca a gente no @tostes_co. A gente adora ver por onde nossos cafés andam.",
    botao: "Abrir Instagram",
    aposPedido: "Se tirar uma foto, marca @tostes_co ✦"
  },
  instagram: { usuario: "@tostes_co", url: "https://www.instagram.com/tostes_co" },
  avaliacaoGoogle: "https://g.page/r/CXD8XVyDVQdyEBM/review",

  // Horário de funcionamento (fuso America/Sao_Paulo). null = fechado.
  horarios: {
    seg: ["09:00", "19:30"], ter: ["09:00", "19:30"], qua: ["09:00", "19:30"],
    qui: ["09:00", "19:30"], sex: ["09:00", "19:30"], sab: ["09:00", "15:00"],
    dom: null
  },

  // Mesas atendidas pelo QR code (?mesa=1 até ?mesa=6)
  mesas: 6,

  marquee: "café no milímetro ✦ grãos 84+ ✦ feito na hora ✦ Fazenda Rio Grande ✦",

  fidelidade: {
    gancho: "Você sabia?",
    titulo: "Seu próximo café pode ser por nossa conta.",
    texto: "A cada 10 pedidos, você escolhe um café quente ou uma fatia da torta do dia. É só informar seu telefone no balcão.",
    rodape: "Os carimbos são marcados pelo barista no balcão."
  },

  // Promoção do dia: 2 combos (1 bebida + 1 comida), sorteados com a data como semente
  promocao: { ativa: true, desconto: 0.10, combos: 2 },

  // Temporada: quando ativa=false, a categoria sazonal some do site inteiro
  temporada: { ativa: true, id: "primavera-verao", categoria: "smoothies" },

  // O pedido favorito (destaque no topo)
  favorito: {
    titulo: "O pedido favorito",
    nome: "Cappuccino com chocolate meio amargo + Sanduíche gratinado de frango",
    // Itens que entram no carrinho ao tocar em "Adicionar ao pedido"
    itens: [
      { id: "cappuccino", tamanho: "M" },
      { id: "gratinados-frango-cremoso" }
    ],
    // Preço do favorito. null = soma dos itens acima (hoje R$ 26,00). CONFIRMAR.
    preco: null,
    texto: "TEXTO PROVISÓRIO — explicar o que é o combo e por que é o mais pedido.",
    foto: "assets/fotos/favorito.jpg"
  }
};
