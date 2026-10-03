import assert from "node:assert/strict";
import { test } from "node:test";
import { categorias, itens } from "../data/cardapio.ts";
import { combosDoDia, montarCombo, DIAS_SEM_REPETIR, INICIO_DO_SORTEIO } from "./combos.ts";

const tipo = Object.fromEntries(categorias.map((c) => [c.slug, c.tipo]));
const slugs = (data: string, fixos = {}) =>
  combosDoDia(data, itens, tipo, fixos).flatMap((c) => [c.bebida.slug, c.comida.slug]);

function datas(inicio: string, n: number) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(`${inicio}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

test("a mesma data sempre dá o mesmo resultado", () => {
  assert.deepEqual(slugs("2026-10-15"), slugs("2026-10-15"));
});

test("dias diferentes dão combos diferentes", () => {
  const vistos = new Set(datas("2026-10-01", 20).map((d) => slugs(d).join()));
  assert.ok(vistos.size > 15);
});

test("2 combos por dia, cada um com 1 bebida e 1 comida, sem repetir item entre os dois", () => {
  for (const d of datas("2026-10-01", 60)) {
    const combos = combosDoDia(d, itens, tipo);
    assert.equal(combos.length, 2);
    for (const c of combos) {
      assert.equal(tipo[c.bebida.categoria], "bebida");
      assert.equal(tipo[c.comida.categoria], "comida");
    }
    const todos = combos.flatMap((c) => [c.bebida.slug, c.comida.slug]);
    assert.equal(new Set(todos).size, 4, `repetiu item em ${d}`);
  }
});

test("não repete itens dos 3 dias anteriores", () => {
  const dias = datas("2026-09-01", 120);
  const usados = dias.map((d) => slugs(d));
  for (let i = DIAS_SEM_REPETIR; i < dias.length; i++) {
    const anteriores = new Set(usados.slice(i - DIAS_SEM_REPETIR, i).flat());
    for (const s of usados[i]) assert.ok(!anteriores.has(s), `${s} repetiu em ${dias[i]}`);
  }
});

test("só entram itens disponíveis e marcados para combo", () => {
  const permitidos = new Set(itens.filter((i) => i.combo && i.disponivel).map((i) => i.slug));
  for (const d of datas("2026-10-01", 60)) for (const s of slugs(d)) assert.ok(permitidos.has(s), s);
  for (const proibido of ["cha", "pao-na-chapa-com-requeijao", "metodo-v60", "prensa-francesa"]) {
    for (const d of datas("2026-10-01", 120)) assert.ok(!slugs(d).includes(proibido));
  }
});

test("item esgotado não entra no sorteio", () => {
  const sem = itens.map((i) => (i.slug === "cappuccino" ? { ...i, disponivel: false } : i));
  for (const d of datas("2026-10-01", 120)) {
    const s = combosDoDia(d, sem, tipo).flatMap((c) => [c.bebida.slug, c.comida.slug]);
    assert.ok(!s.includes("cappuccino"));
  }
});

test("10% de desconto exato, sem arredondar: R$ 28,00 vira R$ 25,20", () => {
  const base = itens[0];
  const c = montarCombo({ ...base, preco: 12 }, { ...base, preco: 16 });
  assert.equal(c.cheio, 28);
  assert.equal(c.final, 25.2);
  assert.equal(c.economiza, 2.8);
});

test("desconto exato também com centavos (R$ 14,90 + R$ 12,00)", () => {
  const base = itens[0];
  const c = montarCombo({ ...base, preco: 14.9 }, { ...base, preco: 12 });
  assert.equal(c.cheio, 26.9);
  assert.equal(c.final, 24.21);
  assert.equal(c.economiza, 2.69);
});

test("combo fixo vale para a data e o sorteio volta no dia seguinte", () => {
  const fixos = { "2026-11-02": [["cappuccino", "croissant-na-chapa-com-manteiga"], ["latte-vanilla", "creme-de-avela"]] as [string, string][] };
  assert.deepEqual(slugs("2026-11-02", fixos), ["cappuccino", "croissant-na-chapa-com-manteiga", "latte-vanilla", "creme-de-avela"]);
  assert.equal(slugs("2026-11-03", fixos).length, 4);
});

test("combo fixo conta como \"já apareceu\" nos dias seguintes", () => {
  const fixos = { "2026-11-02": [["cappuccino", "croissant-na-chapa-com-manteiga"], ["latte-vanilla", "creme-de-avela"]] as [string, string][] };
  for (const d of ["2026-11-03", "2026-11-04", "2026-11-05"]) {
    const s = slugs(d, fixos);
    for (const x of ["cappuccino", "croissant-na-chapa-com-manteiga", "latte-vanilla", "creme-de-avela"]) assert.ok(!s.includes(x), `${x} em ${d}`);
  }
});

test("data antes do início do sorteio não quebra", () => {
  assert.deepEqual(combosDoDia("2025-12-31", itens, tipo), []);
  assert.equal(combosDoDia(INICIO_DO_SORTEIO, itens, tipo).length, 2);
});

test("adicionais nunca entram: todo item do sorteio existe em cardapio.ts como item", () => {
  const slugsDeItens = new Set(itens.map((i) => i.slug));
  for (const s of slugs("2026-10-10")) assert.ok(slugsDeItens.has(s));
});
