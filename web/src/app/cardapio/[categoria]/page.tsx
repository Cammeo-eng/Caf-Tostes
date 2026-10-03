import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryBar } from "@/components/CategoryBar";
import { Header } from "@/components/Header";
import { Chapeu, Graos } from "@/components/Ilustracoes";
import { ItemRow } from "@/components/ItemRow";
import { avisoAlergenos, categorias, itens } from "@/data/cardapio";

export const dynamicParams = false;

export function generateStaticParams() {
  return categorias.map((c) => ({ categoria: c.slug }));
}

export default async function Categoria({ params }: PageProps<"/cardapio/[categoria]">) {
  const { categoria: slug } = await params;
  const indice = categorias.findIndex((c) => c.slug === slug);
  if (indice < 0) notFound();

  const categoria = categorias[indice];
  const proxima = categorias[indice + 1];
  const lista = itens.filter((i) => i.categoria === slug);

  return (
    <div className="mx-auto max-w-xl pb-40">
      <div className="listras" aria-hidden="true" />
      <Header />
      <CategoryBar atual={slug} />

      <main className="px-4">
        <div className="pt-6 pb-2">
          <h1 className="text-4xl leading-none">{categoria.nome}</h1>
          {categoria.subtitulo && <p className="mt-2 text-base">{categoria.subtitulo}</p>}
        </div>

        {lista.length > 0 ? (
          <ul className="divide-y divide-marrom-terra/20">
            {lista.map((item) => (
              <ItemRow key={item.slug} item={item} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-3 py-16 text-center text-marrom-terra">
            <Graos className="w-16" />
            <p className="text-base text-marrom-escuro">Esta seção ainda está no forno. Chega na próxima etapa.</p>
          </div>
        )}

        {proxima && (
          <Link
            href={`/cardapio/${proxima.slug}`}
            className="mt-6 flex min-h-14 items-center justify-between rounded-full bg-verde-musgo px-6 font-semibold text-creme"
          >
            <span>Próxima categoria: {proxima.nome}</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </main>

      <footer className="mt-12">
        <div className="flex justify-center text-marrom-terra">
          <Chapeu className="w-12" />
        </div>
        <p className="mt-2 px-4 text-center text-sm">
          {avisoAlergenos}
        </p>
        <div className="listras mt-6" aria-hidden="true" />
      </footer>

    </div>
  );
}
