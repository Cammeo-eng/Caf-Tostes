// Gera as imagens do site a partir de ../fotos-originais (roda sozinho antes do dev e do build).
//
// Para cada foto "nome.jpg" (nome = slug do item, ou um nome livre como "capa-latte-art"):
//   public/img/nome-1x1-640.webp / .avif   recorte quadrado (listas)
//   public/img/nome-4x5-640.webp / .avif   recorte 4:5 (página do item e combos)
//   public/img/nome-livre-1280.webp / .avif  foto inteira, sem recorte (hero e seções)
//   public/og/nome.jpg                     imagem de compartilhamento 1200x630, com o selo da logo
// e src/data/fotos-geradas.json, que o site consulta para saber quais fotos existem.
//
// Ponto de foco (para o recorte não cortar o que importa): fotos-originais/foco.json
//   { "capa-latte-art": [0.5, 0.47] }   // [x, y] de 0 a 1; padrão [0.5, 0.5]
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const originais = join(raiz, "..", "fotos-originais");
const saidaImg = join(raiz, "public", "img");
const saidaOg = join(raiz, "public", "og");
const manifestoPath = join(raiz, "src", "data", "fotos-geradas.json");
const larguras = [320, 640, 960, 1280];
const razoes = { "1x1": 1, "4x5": 4 / 5 };

mkdirSync(saidaImg, { recursive: true });
mkdirSync(saidaOg, { recursive: true });

const foco = existsSync(join(originais, "foco.json")) ? JSON.parse(readFileSync(join(originais, "foco.json"), "utf8")) : {};
const arquivos = existsSync(originais)
  ? readdirSync(originais).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
  : [];

const atual = (saida, origem) => existsSync(saida) && statSync(saida).mtimeMs >= statSync(origem).mtimeMs;

/** Maior recorte com a razão pedida, centrado no ponto de foco. */
function recorte(w, h, razao, [fx, fy]) {
  let cw = w, ch = Math.round(w / razao);
  if (ch > h) { ch = h; cw = Math.round(h * razao); }
  const left = Math.min(Math.max(Math.round(fx * w - cw / 2), 0), w - cw);
  const top = Math.min(Math.max(Math.round(fy * h - ch / 2), 0), h - ch);
  return { left, top, width: cw, height: ch };
}

async function grava(base, largura, webp, avif) {
  const img = (largura) => base.clone().resize({ width: largura, withoutEnlargement: true });
  await img(largura).webp({ quality: 80 }).toFile(webp);
  await img(largura).avif({ quality: 55, effort: 4 }).toFile(avif);
}

const manifesto = {};
let feitas = 0;

for (const arquivo of arquivos) {
  const nome = basename(arquivo, extname(arquivo));
  const origem = join(originais, arquivo);
  const { width: w, height: h } = await sharp(origem).rotate().metadata();
  const f = foco[nome] ?? [0.5, 0.5];
  manifesto[nome] = { largura: w, altura: h, foco: f };

  const variantes = [
    ...Object.entries(razoes).map(([rotulo, razao]) => ({ rotulo, area: recorte(w, h, razao, f) })),
    { rotulo: "livre", area: { left: 0, top: 0, width: w, height: h } },
  ];

  for (const { rotulo, area } of variantes) {
    // não amplia: só gera larguras que a foto original comporta (e sempre a maior possível)
    const teto = Math.min(area.width, larguras[larguras.length - 1]);
    const lista = [...larguras.filter((l) => l < teto), teto];
    manifesto[nome][rotulo] = { larguras: lista, altura: Math.round(area.height * (lista[lista.length - 1] / area.width)) };

    const base = sharp(origem).rotate().extract(area);
    for (const l of lista) {
      const webp = join(saidaImg, `${nome}-${rotulo}-${l}.webp`);
      const avif = join(saidaImg, `${nome}-${rotulo}-${l}.avif`);
      if (atual(webp, origem) && atual(avif, origem)) continue;
      await grava(base, l, webp, avif);
      feitas++;
    }
  }

  // imagem de compartilhamento: recorte 1200x630 com o selo da logo no canto
  const og = join(saidaOg, `${nome}.jpg`);
  if (!atual(og, origem)) {
    const L = 1200, A = 630, s = 150;
    const area = recorte(w, h, L / A, f);
    const circulo = Buffer.from(`<svg width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="#fff"/></svg>`);
    const selo = await sharp(join(raiz, "public", "logo.jpg")).resize(s, s).composite([{ input: circulo, blend: "dest-in" }]).png().toBuffer();
    const fundo = await sharp(origem).rotate().extract(area).resize(L, A).toBuffer();
    await sharp(fundo).composite([{ input: selo, left: 40, top: A - s - 40 }]).jpeg({ quality: 86 }).toFile(og);
    feitas++;
  }
}

writeFileSync(manifestoPath, JSON.stringify(manifesto, null, 2) + "\n");
console.log(`imagens: ${arquivos.length} foto(s), ${feitas} arquivo(s) gerado(s)`);
