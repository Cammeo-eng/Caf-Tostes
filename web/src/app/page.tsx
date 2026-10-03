import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FavoritosCarrossel } from "@/components/FavoritosCarrossel";
import { FotoAqui } from "@/components/FotoAqui";
import { Header } from "@/components/Header";
import {
  Caneca, Chapeu, Copo, Croissant, Graos, Prato, Sanduiche, Waffle, XicaraLatte,
} from "@/components/Ilustracoes";
import { Rodape } from "@/components/Rodape";
import { VisiteAGente } from "@/components/VisiteAGente";
import { categorias } from "@/data/categorias";
import { brl } from "@/data/itens";

// ---- Amostra: combos fixos só para mostrar o layout. O sorteio real é a Fase 3. ----
const centavos = (v: number) => Math.round(v * 100);
const combos = [
  { bebida: "Cappuccino", comida: "Croissant de doce de leite", precoBebida: 12, precoComida: 15 },
  { bebida: "Latte Vanilla", comida: "Croissant de creme de avelã", precoBebida: 14, precoComida: 16 },
].map((c) => {
  const cheio = centavos(c.precoBebida) + centavos(c.precoComida);
  const final = (cheio * 90) / 100; // 10% off, sem arredondar
  return { ...c, cheio: cheio / 100, final: final / 100, economiza: (cheio - final) / 100 };
});

const icones: Record<string, ReactNode> = {
  "espresso-bar": <XicaraLatte className="w-12" />,
  coados: <XicaraLatte className="w-12" />,
  "cafes-docinhos": <XicaraLatte className="w-12" />,
  "chocolate-quente": <Caneca className="w-10" />,
  "gelados-de-cafe": <Copo className="h-12" />,
  "matchas-e-chai": <Caneca className="w-10" />,
  drinks: <Copo className="h-12" />,
  croissants: <Croissant className="w-14" />,
  sanduiches: <Sanduiche className="w-12" />,
  gratinados: <Sanduiche className="w-12" />,
  "brunches-e-rabanadas": <Prato className="w-14" />,
  waffles: <Waffle className="w-10" />,
};

const porQue = [
  { icone: <Graos className="w-12" />, titulo: "Café selecionado", texto: "Grãos especiais escolhidos a dedo." },
  { icone: <XicaraLatte className="w-12" />, titulo: "Extração regulada", texto: "Cada xícara feita com precisão, milimetricamente." },
  { icone: <Croissant className="w-14" />, titulo: "Feito todo dia", texto: "Nosso croissant sai do forno toda manhã, e os ingredientes são sempre frescos." },
  { icone: <Sanduiche className="w-12" />, titulo: "O que mais elogiam", texto: "O café, o croissant e o sanduíche gratinado." },
];

const espera = [
  { titulo: "Arábica x Robusta", texto: "Duas plantas, dois sabores. A gente explica a diferença em 2 minutos.", desenho: <Graos className="w-14" /> },
  { titulo: "Guia das bebidas com leite", texto: "Cortado, flat white, cappuccino e latte: quanto tem de café, leite e espuma em cada um.", desenho: <XicaraLatte className="w-14" /> },
  { titulo: "Do pé à xícara", texto: "Plantio, colheita, torra e extração. O caminho de cada grão até você.", desenho: <Chapeu className="w-14" /> },
];

function Titulo({ etiqueta, children, claro }: { etiqueta?: string; children: ReactNode; claro?: boolean }) {
  return (
    <div className="mb-8">
      {etiqueta && <p className={`rotulo mb-2 ${claro ? "text-salvia" : "text-vinho"}`}>{etiqueta}</p>}
      <h2 className={`text-h2 md:text-h1 ${claro ? "!text-creme" : ""}`}>{children}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="listras" aria-hidden="true" />

      {/* 1. Destaque inicial: foto real da latte art. Celular: foto em 65% da tela + bloco creme. Desktop: texto à esquerda, foto à direita. */}
      <section className="relative md:flex md:min-h-[calc(100svh-14px)] md:flex-col">
        <Header claro />
        <div className="md:grid md:flex-1 md:grid-cols-2">
          <div className="relative h-[65svh] md:order-2 md:h-auto">
            <Image
              src="/fotos/capa.webp"
              alt="Latte art em forma de folha, vista de cima, cercada por copos de papel com o chapéu da TOSTES&CO"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[50%_47%]"
            />
          </div>
          <div className="px-5 py-12 md:order-1 md:flex md:flex-col md:justify-center md:py-16 md:pr-16 md:pl-[max(24px,calc((100vw-72rem)/2+24px))]">
            <h1 className="max-w-xl text-h1 md:text-hero">
              Bem-vindo à sua <span className="text-[0.6em] text-vinho">(futura)</span> cafeteria favorita.
            </h1>
            <p className="mt-4 max-w-md text-body">Seu refúgio de café em Fazenda Rio Grande</p>
            <Link href="/cardapio/espresso-bar" className="botao botao-vinho mt-8 self-start">
              Ver cardápio
            </Link>
          </div>
        </div>
      </section>

      <main>
        {/* 2. Combos do dia */}
        <section id="promocao" className="secao scroll-mt-4 bg-verde-musgo text-creme">
          <div className="miolo">
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
              <Titulo etiqueta="Promoção do dia" claro>Dois combos novos, todo dia</Titulo>
              <p className="mb-8 max-w-sm text-small">Todo dia, dois combos novos com 10% off. Volte amanhã para ver os próximos.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {combos.map((c) => (
                <article key={c.bebida} className="cartao p-4 text-marrom-escuro">
                  <div className="grid grid-cols-2 gap-2">
                    <FotoAqui rotulo={c.bebida} desenho={<XicaraLatte className="w-2/5" />} proporcao="4:5" fundo="bg-salvia/60" cor="text-verde-musgo" />
                    <FotoAqui rotulo={c.comida} desenho={<Croissant className="w-1/2" />} proporcao="4:5" fundo="bg-vinho-claro" cor="text-vinho" />
                  </div>
                  <h3 className="mt-4 text-h3">{c.bebida} + {c.comida}</h3>
                  <p className="mt-2 text-small">
                    de <s className="[font-variant-numeric:tabular-nums]">{brl(c.cheio)}</s> por{" "}
                    <span className="preco text-h2">{brl(c.final)}</span>
                  </p>
                  <p className="text-small font-semibold text-verde-musgo">Você economiza {brl(c.economiza)}</p>
                  <button type="button" className="botao botao-vinho mt-4 w-full">Quero esse combo</button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Categorias */}
        <section className="secao miolo">
          <Titulo etiqueta="Cardápio">Escolha sua parada</Titulo>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {categorias.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={`/cardapio/${c.slug}`}
                  className={`flex h-full min-h-40 flex-col items-center justify-between gap-3 rounded-lg px-3 py-6 text-center text-marrom-terra ${
                    i % 3 === 0 ? "bg-creme-escuro" : i % 3 === 1 ? "bg-salvia/60" : "bg-vinho-claro"
                  }`}
                >
                  <span className="grid h-12 place-items-center">{icones[c.slug]}</span>
                  <span className="text-body font-bold text-marrom-escuro">{c.nome}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Favoritos da casa */}
        <section className="pb-16 md:pb-24">
          <div className="miolo">
            <Titulo etiqueta="Favoritos da casa">O que a gente faz com mais carinho</Titulo>
            <FavoritosCarrossel />
          </div>
        </section>

        {/* 5. Grão da semana */}
        <section className="secao bg-marrom-escuro text-creme">
          <div className="miolo grid items-center gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <FotoAqui rotulo="grãos de café ou o pacote do grão da semana" desenho={<Graos className="w-1/3" />} proporcao="4:3" fundo="bg-creme/10" cor="text-creme" />
            <div>
              <Titulo etiqueta="Grão da semana" claro>Toda semana, uma surpresa</Titulo>
              <p className="max-w-lg text-body">
                A gente tem uma brincadeira: toda semana o grão é diferente, de algum lugar do Brasil. Então você sempre tem uma surpresa quando vem aqui.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Por que a Tostes */}
        <section id="por-que" className="secao miolo scroll-mt-4">
          <Titulo etiqueta="Por que a Tostes">Café de verdade, feito com calma</Titulo>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {porQue.map((p) => (
              <li key={p.titulo} className="border-t border-marrom-terra/40 pt-6">
                <span className="grid h-14 place-items-start text-marrom-terra">{p.icone}</span>
                <h3 className="mt-4 text-h3">{p.titulo}</h3>
                <p className="mt-2 text-small">{p.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Nossa casa */}
        <section className="bg-creme-escuro">
          <div className="secao miolo">
            <Titulo etiqueta="Nossa casa">Um cantinho de 12 lugares</Titulo>
            <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16">
              <div className="grid grid-cols-2 gap-2">
                <div className="relative aspect-[4/5] animate-aparece overflow-hidden rounded-lg">
                  <Image src="/fotos/espaco-salao.webp" alt="Salão da TOSTES&CO, com mesas altas de madeira e banquetas pretas" fill sizes="(min-width: 768px) 25vw, 45vw" className="object-cover object-bottom" />
                </div>
                <div className="relative aspect-[4/5] animate-aparece overflow-hidden rounded-lg">
                  <Image src="/fotos/espaco-balcao.webp" alt="Balcão da TOSTES&CO, com a máquina de espresso, a chaleira e os métodos de coado" fill sizes="(min-width: 768px) 25vw, 45vw" className="object-cover" />
                </div>
                <FotoAqui rotulo="a equipe" desenho={<Chapeu className="w-14" />} proporcao="livre" fundo="bg-vinho-claro" cor="text-vinho" className="col-span-2 aspect-[16/7]" />
              </div>
              <div className="self-center">
                <p className="max-w-md text-body">
                  O chapéu da nossa marca é uma homenagem ao avô do dono e a todos os trabalhadores e trabalhadoras que passam o dia no sol produzindo o café.
                </p>
                <p className="mt-4 max-w-md text-body">
                  Aqui são 12 lugares, café feito com calma e um croissant que sai do forno toda manhã.
                </p>
                <div className="mt-8 grid size-24 place-items-center rounded-full border border-marrom-terra/50 text-marrom-terra">
                  <Chapeu className="w-12" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Fidelidade */}
        <section className="secao miolo">
          <div className="grid items-center gap-6 rounded-lg bg-vinho p-8 text-creme md:grid-cols-[1.4fr_1fr] md:p-16">
            <div>
              <p className="rotulo mb-2 text-vinho-claro">Programa de fidelidade</p>
              <h2 className="text-h2 !text-creme md:text-h1">A cada 10 pedidos, um mimo por nossa conta.</h2>
              <p className="mt-4 max-w-xl text-body">
                Escolha qualquer café quente do cardápio ou uma fatia da torta do dia. É só informar seu telefone no caixa: a gente marca tudo pra você.
              </p>
            </div>
            <div className="hidden justify-center text-vinho-claro md:flex">
              <Caneca className="w-32" />
            </div>
          </div>
        </section>

        {/* 9. Enquanto você espera */}
        <section id="espera" className="secao scroll-mt-4 bg-creme-escuro">
          <div className="miolo">
            <Titulo etiqueta="Enquanto você espera">Leituras rápidas sobre café</Titulo>
            <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
              {espera.map((e) => (
                <li key={e.titulo}>
                  <Link href="/aprenda" className="cartao block h-full p-4">
                    <span className="grid h-24 place-items-center rounded-lg bg-salvia/50 text-verde-musgo">{e.desenho}</span>
                    <p className="rotulo mt-4 text-vinho">1 a 2 minutos · rascunho</p>
                    <h3 className="mt-1 text-h3">{e.titulo}</h3>
                    <p className="mt-2 text-small">{e.texto}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 10. Visite a gente */}
        <VisiteAGente />
      </main>

      <Rodape />
    </>
  );
}
