import { excecoesDeHorario, horarioSemanal } from "@/data/config";

// Tudo em horário de Brasília (America/Sao_Paulo), independente do fuso do aparelho.
const chaves = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"] as const;
const nomes = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

const emMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function agoraEmBrasilia(d = new Date()) {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => partes.find((p) => p.type === t)!.value;
  const data = `${get("year")}-${get("month")}-${get("day")}`;
  return { data, dia: diaDaSemana(data), minutos: Number(get("hour")) * 60 + Number(get("minute")) };
}

export const diaDaSemana = (dataISO: string) => new Date(`${dataISO}T12:00:00Z`).getUTCDay();

export function somaDias(dataISO: string, n: number) {
  const d = new Date(`${dataISO}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Horário de funcionamento de uma data (exceções de feriado valem mais que o horário normal). */
export function horarioDe(dataISO: string): { abre: number; fecha: number } | null {
  const excecao = excecoesDeHorario.find((e) => e.data === dataISO);
  if (excecao) return excecao.abre && excecao.fecha ? { abre: emMinutos(excecao.abre), fecha: emMinutos(excecao.fecha) } : null;
  const h = horarioSemanal[chaves[diaDaSemana(dataISO)]];
  return h ? { abre: emMinutos(h.abre), fecha: emMinutos(h.fecha) } : null;
}

const formataHora = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
};

export function statusDaLoja(d = new Date()) {
  const { data, minutos } = agoraEmBrasilia(d);
  const hoje = horarioDe(data);
  if (hoje && minutos >= hoje.abre && minutos < hoje.fecha) return { aberto: true, texto: "Aberto agora" };

  for (let i = hoje && minutos < hoje.abre ? 0 : 1; i < 15; i++) {
    const alvo = somaDias(data, i);
    const h = horarioDe(alvo);
    if (h) {
      const quando = i === 0 ? "" : i === 1 ? "amanhã " : `${nomes[diaDaSemana(alvo)]} `;
      return { aberto: false, texto: `Fechado — abrimos ${quando}às ${formataHora(h.abre)}` };
    }
  }
  return { aberto: false, texto: "Fechado" };
}
