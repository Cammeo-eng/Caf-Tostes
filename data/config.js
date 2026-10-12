/* ==========================================================
   TOSTES to go — Configurações gerais
   ========================================================== */

// Número do WhatsApp que recebe os pedidos: 55 + DDD + número, só dígitos.
const WHATSAPP = "5541988883470";

const CONFIG = {
  nome: "TOSTES to go",
  cidade: "Fazenda Rio Grande, PR",
  endereco: "R. Jequitibá - Eucaliptos, Fazenda Rio Grande - PR, 83823-004",
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

  fidelidade: "A cada 10 pedidos, você ganha um café quente à sua escolha ou uma fatia da torta do dia.",

  // Promoção do dia: 2 combos (1 bebida + 1 comida), sorteados com a data como semente
  promocao: { ativa: true, desconto: 0.10, combos: 2 },

  // O pedido favorito (destaque no topo)
  favorito: {
    titulo: "O pedido favorito",
    nome: "Cappuccino com chocolate meio amargo + Sanduíche gratinado de frango",
    // Itens que entram no carrinho ao tocar em "Adicionar ao pedido"
    itens: [
      { id: "cappuccino", tamanho: "P" },
      { id: "gratinados-frango-cremoso" }
    ],
    // Preço do favorito. null = soma dos itens acima (hoje R$ 25,00). CONFIRMAR.
    preco: null,
    texto: "TEXTO PROVISÓRIO — explicar o que é o combo e por que é o mais pedido.",
    foto: "assets/fotos/favorito.jpg"
  }
};
