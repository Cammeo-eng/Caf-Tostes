# Como usar — site da TOSTES&CO

O site é **estático**: não tem painel de administração, login nem banco de dados. Tudo o que aparece nele está em arquivos neste repositório. Quando você quiser mudar alguma coisa, **peça ao Claude**: ele edita os arquivos, confere e publica. Em cerca de 2 minutos a mudança está no ar.

Endereço do site: https://cammeo-eng.github.io/Caf-Tostes/

## Onde fica cada coisa

| O que você quer mudar | Onde está | 
|---|---|
| Itens, preços, descrições, selos, "esgotado hoje", adicionais, sabores | `web/src/data/cardapio.ts` |
| WhatsApp, horário, **feriados**, endereço, texto da fidelidade, favoritos da página inicial | `web/src/data/config.ts` |
| Fixar os combos de uma data | `web/src/data/combos-fixos.ts` |
| Textos do "Enquanto você espera" | `web/src/data/conteudos/*.md` |
| Fotos | pasta `fotos-originais/` (um arquivo por item, com o nome do item: `cappuccino.jpg`) |
| O que o barista confere no balcão | página `/combos-de-hoje` (só leitura) |

Você não precisa abrir esses arquivos. Basta pedir.

## Exemplos de pedidos

**Preços e itens**
- "Mude o preço do cappuccino para R$ 13,00."
- "Tire o affogato do cardápio."
- "Coloque o croissant de ovos, bacon, queijo e requeijão como favorito da casa."
- "Crie um item novo em Gelados de Café: Mocha Gelado, 500 ml, R$ 17,00, com descrição e ficha."
- "Tire o selo NOVO do cortado."

**Esgotado e disponibilidade**
- "O croissant de doce de leite esgotou hoje." (aparece esmaecido com "Esgotado hoje" e não pode ser pedido)
- "O croissant de doce de leite voltou."

**Fotos**
- "Troque a foto do croissant de avelã." (mande a foto na conversa)
- "Coloque esta foto no hero da página inicial."
- "Use esta foto da equipe na seção Nossa casa."

**Horário e feriados**
- "No dia 24/12 abrimos só até 13h."
- "No dia 25/12 estamos fechados."
- "Mude o horário de sábado para 9h às 16h."

**Combos**
- "Na segunda, dia 2/11, os combos são: cappuccino com croissant na chapa e latte vanilla com creme de avelã."
- "Tire o chá do sorteio dos combos." / "Pode colocar o cold brew no sorteio."

**Textos e contato**
- "Troque o número do WhatsApp para (41) 9 xxxx-xxxx."
- "Mude o texto da fidelidade para: ..."
- "Escreva o texto 'Do pé à xícara' e deixe como rascunho."
- "Publique o texto 'Arábica x Robusta'."

## Como funciona por trás (para você saber o que esperar)

- **Publicação:** toda mudança vai para o GitHub e o GitHub Pages atualiza o site sozinho. Se algo der errado no build, o site antigo continua no ar.
- **Esgotado no mesmo dia:** exige me avisar e esperar uns 2 minutos. Não é um botão instantâneo.
- **Combos do dia:** são calculados no aparelho de cada cliente, pela data de Brasília. Todo mundo vê o mesmo combo no mesmo dia e ele troca à meia-noite. O sorteio nunca repete itens dos 3 dias anteriores e dá 10% de desconto exato.
- **Fotos:** você me manda qualquer foto. O site gera sozinho as versões leves (WebP/AVIF) nos recortes quadrado e 4:5. Fotos horizontais com a xícara no centro funcionam melhor. Se o recorte cortar o que importa, é só pedir para ajustar o ponto de foco.
- **O repositório é público.** Qualquer pessoa pode ver os arquivos, inclusive as fotos originais.

## Para quem for mexer nos arquivos (opcional)

```bash
cd web
npm install      # só na primeira vez
npm run dev      # abre o site em http://localhost:3000 para ver as mudanças
npm test         # testa o sorteio dos combos
npm run build    # gera o site estático em web/out
```
