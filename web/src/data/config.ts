// CONFIGURAÇÕES — edite aqui: WhatsApp, horário (com feriados), endereço, texto da fidelidade.

export const config = {
  nome: "TOSTES&CO",
  /** com DDI e DDD, só números */
  whatsapp: "5541988883470",
  instagram: "https://www.instagram.com/tostes_co",
  avaliacaoGoogle: "https://g.page/r/CXD8XVyDVQdyEBM/review",
  endereco: "R. Jequitibá - Eucaliptos, Fazenda Rio Grande - PR, 83823-004",

  fidelidade: {
    titulo: "A cada 10 pedidos, um mimo por nossa conta.",
    texto:
      "Escolha qualquer café quente do cardápio ou uma fatia da torta do dia. É só informar seu telefone no caixa: a gente marca tudo pra você.",
  },

  /** itens do carrossel "Favoritos da casa" (slugs de cardapio.ts), na ordem em que aparecem */
  favoritosDaHome: [
    "frango-com-requeijao-e-queijo",
    "2-queijos-gratinado",
    "creme-de-avela",
    "frango-cremoso",
    "croque-monsieur",
    "bauru-gratinado",
  ],
} as const;

/** Horário normal. Formato "HH:MM". null = fechado o dia todo. */
export const horarioSemanal: Record<"dom" | "seg" | "ter" | "qua" | "qui" | "sex" | "sab", { abre: string; fecha: string } | null> = {
  dom: null,
  seg: { abre: "09:00", fecha: "19:30" },
  ter: { abre: "09:00", fecha: "19:30" },
  qua: { abre: "09:00", fecha: "19:30" },
  qui: { abre: "09:00", fecha: "19:30" },
  sex: { abre: "09:00", fecha: "19:30" },
  sab: { abre: "09:00", fecha: "15:00" },
};

export type ExcecaoDeHorario = {
  /** AAAA-MM-DD */
  data: string;
  motivo?: string;
  /** sem abre/fecha = fechado o dia todo */
  abre?: string;
  fecha?: string;
};

/**
 * Feriados e dias diferentes. Exemplos (apague o "//" para usar):
 *   { data: "2026-12-25", motivo: "Natal" },
 *   { data: "2026-12-24", motivo: "Véspera de Natal", abre: "09:00", fecha: "13:00" },
 */
export const excecoesDeHorario: ExcecaoDeHorario[] = [];

/** Pedido para retirada: intervalo entre horários e antecedência mínima, em minutos. */
export const retirada = { intervaloMin: 15, antecedenciaMin: 15 } as const;
