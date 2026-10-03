// Esqueleto mostrado durante a troca de páginas.
export default function Loading() {
  return (
    <div className="miolo animate-pulse space-y-4 pt-24" aria-busy="true" aria-label="Carregando">
      <div className="h-8 w-2/3 rounded-lg bg-creme-escuro" />
      <div className="h-4 w-1/2 rounded-lg bg-creme-escuro" />
      <div className="grid grid-cols-2 gap-2 pt-4">
        <div className="aspect-[4/5] rounded-lg bg-creme-escuro" />
        <div className="aspect-[4/5] rounded-lg bg-creme-escuro" />
      </div>
    </div>
  );
}
