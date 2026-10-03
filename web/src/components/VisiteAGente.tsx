import { config } from "@/data/config";

const q = encodeURIComponent(config.endereco);

export function VisiteAGente() {
  return (
    <section id="visite" className="secao miolo scroll-mt-4">
      <div className="mb-8">
        <p className="rotulo mb-2 text-vinho">Visite a gente</p>
        <h2 className="text-h2 md:text-h1">Tem um café esperando por você</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
        <div>
          <p className="rotulo text-verde-musgo">Onde fica</p>
          <p className="mt-2 text-body">{config.endereco}</p>

          <p className="rotulo mt-8 text-verde-musgo">Quando abrimos</p>
          <ul className="mt-2 max-w-xs space-y-1 text-body [font-variant-numeric:tabular-nums]">
            <li className="flex justify-between gap-4"><span>Segunda a sexta</span><span>9h às 19h30</span></li>
            <li className="flex justify-between gap-4"><span>Sábado</span><span>9h às 15h</span></li>
            <li className="flex justify-between gap-4"><span>Domingo</span><span>Fechado</span></li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} className="botao botao-vinho">
              Como chegar
            </a>
            <a href={config.avaliacaoGoogle} className="botao botao-contorno text-verde-musgo">
              Avalie a gente no Google
            </a>
          </div>
        </div>

        <div className="cartao aspect-[4/3] self-start overflow-hidden">
          <iframe
            title="Mapa: TOSTES&CO em Fazenda Rio Grande"
            src={`https://maps.google.com/maps?q=${q}&hl=pt-BR&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
