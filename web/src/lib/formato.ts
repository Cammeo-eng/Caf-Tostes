export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Nome para mostrar fora da lista da categoria: "Tipo Bauru" vira "Waffle Mineiro Tipo Bauru". */
export const nomeCompleto = (item: { nome: string; grupo?: string }) => (item.grupo ? `${item.grupo} ${item.nome}` : item.nome);
