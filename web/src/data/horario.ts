// Horário de Brasília. 0 = domingo. Valores em minutos desde 00:00.
export const horarios: Record<number, { abre: number; fecha: number } | null> = {
  0: null,
  1: { abre: 9 * 60, fecha: 19 * 60 + 30 },
  2: { abre: 9 * 60, fecha: 19 * 60 + 30 },
  3: { abre: 9 * 60, fecha: 19 * 60 + 30 },
  4: { abre: 9 * 60, fecha: 19 * 60 + 30 },
  5: { abre: 9 * 60, fecha: 19 * 60 + 30 },
  6: { abre: 9 * 60, fecha: 15 * 60 },
};

const dias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export function agoraEmBrasilia(d = new Date()) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => partes.find((p) => p.type === t)!.value;
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { dia, minutos: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function statusDaLoja(d = new Date()) {
  const { dia, minutos } = agoraEmBrasilia(d);
  const h = horarios[dia];
  if (h && minutos >= h.abre && minutos < h.fecha) return { aberto: true, texto: "Aberto agora" };
  // próximo dia de abertura
  const hoje = h && minutos < h.abre ? 0 : 1;
  for (let i = hoje; i < 8; i++) {
    const alvo = (dia + i) % 7;
    const ha = horarios[alvo];
    if (ha) {
      const quando = i === 0 ? "" : i === 1 ? "amanhã " : `${dias[alvo]} `;
      return { aberto: false, texto: `Fechado — abrimos ${quando}às 9h`.replace("  ", " ") };
    }
  }
  return { aberto: false, texto: "Fechado" };
}
