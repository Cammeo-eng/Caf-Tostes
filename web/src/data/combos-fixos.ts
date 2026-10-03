// COMBOS FIXOS — opcional. Para fixar os combos de uma data, acrescente uma linha.
// Se não houver linha para o dia, vale o sorteio automático.
// Cada combo é [slug da bebida, slug da comida] (slugs de cardapio.ts). Máximo de 2 combos por dia.
//
// Exemplo (apague o "//" para usar):
//   "2026-11-02": [["cappuccino", "croissant-na-chapa-com-manteiga"], ["latte-vanilla", "creme-de-avela"]],

export const combosFixos: Record<string, [string, string][]> = {};
