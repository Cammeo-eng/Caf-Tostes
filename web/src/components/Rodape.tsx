import { Chapeu } from "./Ilustracoes";

export const WHATSAPP = "5541988883470";
export const INSTAGRAM = "https://www.instagram.com/tostes_co";
export const AVALIACAO_GOOGLE = "https://g.page/r/CXD8XVyDVQdyEBM/review";
export const ENDERECO = "R. Jequitibá - Eucaliptos, Fazenda Rio Grande - PR, 83823-004";

export function Rodape() {
  return (
    <footer className="mt-16 bg-verde-musgo text-creme md:mt-24">
      <div className="listras" aria-hidden="true" />
      <div className="miolo grid gap-8 py-16 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-4">
            <Chapeu className="w-14 text-creme" />
            <p className="titulo text-h1 !text-creme">TOSTES&amp;CO</p>
          </div>
          <p className="mt-4 max-w-xs text-small">Seu refúgio de café em Fazenda Rio Grande. Cafeteria artesanal, desde 2024.</p>
        </div>

        <div className="flex flex-col items-start gap-3 text-small md:items-end">
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá, Tostes!")}`}
            className="botao bg-creme text-verde-musgo"
          >
            Chamar no WhatsApp
          </a>
          <a href={INSTAGRAM} className="flex min-h-11 items-center underline underline-offset-4">
            @tostes_co no Instagram
          </a>
        </div>
      </div>
      <div className="listras" aria-hidden="true" />
    </footer>
  );
}
