# Cardápio digital TOSTES&CO — briefing para o Claude Code

Antes de qualquer coisa:
1. Leia este arquivo inteiro, `cardapio-dados.md` e a skill `.claude/skills/tostes-sem-pontas-soltas/SKILL.md`. Siga a skill durante todo o projeto: **na dúvida, pergunte; nunca invente.**
2. Crie `DECISOES.md` e um `CLAUDE.md` curto que diga: "Siga a skill tostes-sem-pontas-soltas e consulte PROMPT.md, cardapio-dados.md e DECISOES.md antes de decidir qualquer coisa."
3. Faça as **perguntas iniciais** (seção 13) antes de escrever código.

---

## 1. Sobre a cafeteria

- **Nome:** TOSTES&CO — Cafeteria · Est. 2024
- **Cidade:** Fazenda Rio Grande (PR)
- **Frase da marca:** "Seu refúgio de café em Fazenda Rio Grande" · "Cafeteria artesanal"
- **Porte:** pequena, 12 lugares, atendimento no local e to go.
- **Horário:** seg a sex das 9h às 19h30 · sábado das 9h às 15h · domingo fechado.
- **Instagram:** @tostes_co
- **Avaliações no Google:** https://g.page/r/CXD8XVyDVQdyEBM/review
- **Logo:** um chapéu, em homenagem ao avô do dono e a todos os trabalhadores e trabalhadoras que passam o dia no sol produzindo o café.
- **Público:** jovens adultos de 20 a 35 anos.

## 2. Objetivo do site

Um cardápio digital mobile-first que o cliente abre pelo QR code da mesa ou pelo Instagram. Nele o cliente pode:
- ver todo o cardápio com fotos, preços e detalhes de cada item;
- aproveitar a promoção do dia;
- fazer um pedido para retirada que chega pelo WhatsApp;
- conhecer o programa de fidelidade;
- ler conteúdos curtos sobre café enquanto espera.

**O site precisa ter a cara da TOSTES&CO, não de um template genérico** (ver seção 3).

## 3. Identidade visual

**Cores** (use só estas; crie tokens/variáveis CSS):

| Token | Hex | Uso |
|---|---|---|
| creme | #F3EBDD | fundo principal |
| creme-escuro | #E9DDC9 | cartões e caixas de destaque claras |
| marrom-escuro | #3B2A1E | texto principal |
| marrom-terra | #6B4226 | títulos e detalhes |
| verde-musgo | #2F3B26 | destaques, selo "Favorito da casa", botões secundários |
| vinho | #6E1F2A | botão principal, selo "Novo", promoções, preços em destaque |

Confira o contraste: texto sobre creme em marrom-escuro; texto sobre verde ou vinho sempre em creme.

**Fontes (Google Fonts)**
- **Títulos e nome da marca:** Darumadrop One.
- **Textos, preços e botões:** Figtree (400, 500, 600, 700). Preços com números tabulares.

**Linguagem visual**, a mesma do cardápio impresso em livreto:
- Fundo creme com textura sutil de papel.
- Ilustrações em traço fino, estilo desenho à mão, em SVG: chapéu, xícara com latte art, croissant, waffle, grão de café, prensa, V60. Use como detalhes decorativos e em estados vazios.
- Listras verticais vinho e creme, vindas da capa do livreto, como motivo em faixas, no topo da página de combos e no rodapé.
- Divisórias em linha fina; nome do item em negrito, descrição curta embaixo e preço destacado.
- Selos pequenos e arredondados: **NOVO** (fundo vinho, texto creme) e **FAVORITO DA CASA** (fundo verde, texto creme).
- Cantos arredondados suaves e sombras quase imperceptíveis.

**Proibido:** gradientes, emojis, Inter/Roboto/Arial, ícones coloridos genéricos, fotos de banco de imagens, lorem ipsum, visual de "template SaaS", texto em inglês desnecessário.

**Tom de voz:** caloroso, próximo e artesanal, com frases curtas, "a gente" e "nosso". Exemplo: "Nosso croissant sai do forno todo dia de manhã."

## 4. Stack e custos

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**.
- **Supabase** (plano grátis): banco de dados, login do admin e armazenamento das fotos.
- **Deploy na Vercel** (plano grátis). O domínio será definido depois; por enquanto, usar o endereço da Vercel.
- **Sem nenhum serviço pago e sem IA.** O pedido pelo WhatsApp usa link `wa.me`, sem API paga.
- Imagens otimizadas (`next/image`, WebP), site rápido no 4G.
- SEO local: título, descrição, Open Graph e schema.org `CafeOrCoffeeShop` com o horário.

## 5. Estrutura de páginas

**Início (`/`)**
1. Cabeçalho com a logo, um indicador "Aberto agora" / "Fechado — abrimos às 9h" calculado pelo horário de Brasília, e o botão da sacola com a quantidade de itens.
2. Faixa de boas-vindas curta: "Seu refúgio de café em Fazenda Rio Grande".
3. **Promoção do dia** (seção 6), em destaque.
4. **Categorias:** grade de botões grandes com ilustração, na ordem da seção 7.
5. **Por que a Tostes** (seção 9).
6. **Programa de fidelidade** (seção 10).
7. Chamada para **Enquanto você espera** (seção 8).
8. Botão **"Avalie a gente no Google"**, que abre o link de avaliação.
9. Rodapé com horário, Instagram, botão de WhatsApp e endereço (perguntar).

**Categoria (`/cardapio/[categoria]`)**
- A navegação é por **seções isoladas, sem rolagem infinita**. O cliente toca numa categoria e vê só os itens dela. Para trocar de categoria, ele precisa tocar em outra manualmente, por uma barra de categorias fixa no topo com rolagem horizontal. No fim da lista aparece o botão "Próxima categoria: [nome] →".
- Cada item mostra a foto à esquerda, nome, tamanho, descrição curta, preço embaixo e os selos. Tocar na foto ou no nome abre a página do item. Há também um botão "+" para adicionar direto à sacola.
- Itens marcados como indisponíveis aparecem esmaecidos, com a etiqueta "Esgotado hoje", e não podem ser adicionados.

**Página do item (`/item/[slug]`)**
- Foto grande, nome, selos, tamanho e preço.
- **O que vai:** ingredientes com medidas.
- **Como é feito:** o preparo em 2 ou 3 frases.
- **Sabor:** perfil em poucas palavras.
- **Personalize:** adicionais selecionáveis com preço; o total se atualiza.
- **Contém:** aviso de alérgenos.
- Campo de observação, seletor de quantidade e botão "Adicionar ao pedido".
- "Combina com:" até 2 sugestões da categoria oposta (bebida ↔ comida).
- Cada item tem um link próprio e compartilhável, com imagem de Open Graph.

**Enquanto você espera (`/aprenda` e `/aprenda/[slug]`)**, ver seção 8.

**Sacola e pedido (`/pedido`)**, ver seção 11.

**Admin (`/admin`)**, ver seção 12.

## 6. Promoção do dia: 2 combos sorteados (requisito inegociável)

- Todo dia, um sorteio automático escolhe **4 itens** e forma **2 combos**, cada um com **1 bebida + 1 comida**.
- **Todos os clientes veem o mesmo combo durante o dia inteiro:** o sorteio usa a data (fuso America/Sao_Paulo) como semente determinística. A troca acontece à meia-noite.
- **Regras do sorteio:**
  - só entram itens disponíveis e marcados como "pode entrar no combo" (padrão: sim);
  - os dois combos não repetem itens entre si;
  - evitar itens que apareceram nos combos dos 3 dias anteriores;
  - adicionais nunca entram no sorteio.
- **Preço:** soma dos preços originais com **10% de desconto, sem arredondamento**, com duas casas decimais. Exemplo: R$ 28,00 vira R$ 25,20. Mostrar "de ~~R$ 28,00~~ por **R$ 25,20**" e "Você economiza R$ 2,80".
- **Cartão do combo:** fotos dos 2 itens, nomes, preço riscado, preço final e o botão "Quero esse combo", que adiciona o combo à sacola como uma unidade, com o desconto aplicado.
- **No admin:** a tela "Combos de hoje" mostra os combos e os preços de forma clara para o barista registrar no Loyverse. O dono pode **trocar** um combo (sortear de novo ou escolher os itens) e **travar** o combo do dia. Se um item do combo for marcado como esgotado, o sistema oferece ressortear aquele combo.
- Texto de apoio: "Todo dia, dois combos novos com 10% off. Volte amanhã para ver os próximos."

## 7. Categorias, nesta ordem

Os dados completos estão em `cardapio-dados.md`.

1. Espresso Bar
2. Coados
3. Cafés Docinhos
4. Chocolate Quente
5. Gelados de Café
6. Matchas e Chai
7. Drinks
8. Croissants
9. Sanduíches
10. Gratinados
11. Brunches e Rabanadas
12. Waffles

Os **adicionais** não são uma categoria: aparecem como opções em "Personalize" nos itens em que se aplicam, conforme `cardapio-dados.md`.

## 8. Enquanto você espera: conteúdos curtos sobre café

Uma seção com cartões ilustrados e textos de 1 a 2 minutos de leitura, escritos no tom da marca. **Escreva os textos a partir dos tópicos abaixo, com informação correta**, e marque cada um como "rascunho — revisar" até o dono aprovar. Tudo pode ser editado no admin.

1. **Arábica x Robusta:** origem, sabor, acidez, cafeína (o robusta tem cerca de o dobro), por que o café especial costuma ser arábica, e o conilon/robusta amazônico brasileiro.
2. **O que é café especial:** a pontuação de 80+ pontos na escala da SCA, a colheita seletiva, a rastreabilidade e a torra fresca.
3. **Do pé à xícara:** plantio, colheita, secagem, torra, moagem e extração. Termina com a homenagem do chapéu aos trabalhadores do campo.
4. **Tipos de torra:** clara, média e escura, e o que cada uma muda no sabor.
5. **Nossos métodos:** espresso (pressão de 9 bar, cerca de 25 a 30 s), V60 (filtragem manual, bebida limpa e aromática), prensa francesa (infusão, corpo) e coado do dia.
6. **Guia das bebidas com leite:** ristretto, espresso, macchiato, cortado, flat white, cappuccino e latte. Um **desenho de xícara em SVG** mostra a proporção de café, leite e espuma de cada uma, com as medidas da casa.
7. **Por que regulamos o espresso todos os dias:** moagem, temperatura e tempo de extração; o que acontece com um café sub-extraído ou sobre-extraído.
8. **Curiosidades:** a lenda de Kaldi e as cabras; o Brasil como maior produtor e exportador de café do mundo; o que é a crema; um espresso tem menos cafeína que uma xícara grande de coado; a origem do nome cappuccino.
9. **Workshop de barista:** convite para o encontro sobre como tirar um espresso, regulagem, vaporização de leite e escolha de grãos, com o botão "Quero participar" que abre o WhatsApp com a mensagem pronta.

## 9. Por que a Tostes

Um bloco de 4 a 5 pontos, cada um com uma ilustração em traço fino:
- **Café selecionado:** grãos especiais escolhidos a dedo.
- **Extração regulada milimetricamente:** cada xícara feita com precisão.
- **Feito todo dia:** o croissant sai do forno toda manhã e os ingredientes são sempre frescos.
- **O que nossos clientes mais elogiam:** o café, o croissant e o sanduíche gratinado.
- **Nossa história:** o chapéu da marca, em homenagem ao avô e aos trabalhadores do café.

Textos curtos, calorosos, sem exagero e sem números inventados.

## 10. Programa de fidelidade (só informativo)

O site **não** controla pontos nem guarda dados de clientes. Mostrar um bloco com o texto:

> **A cada 10 pedidos, um mimo por nossa conta.**
> Escolha qualquer café quente do cardápio ou uma fatia da torta do dia. É só informar seu telefone no caixa: a gente marca tudo pra você.

A torta do dia muda diariamente e **não** entra como categoria no site.

## 11. Pedido para retirada pelo WhatsApp (opcional para o cliente)

- A sacola fica guardada no navegador (localStorage) e mostra itens, adicionais, combos, observações e o total.
- No checkout o cliente informa: **nome** (obrigatório), **horário de retirada** (intervalos de 15 min dentro do horário de funcionamento de hoje, a partir de agora + 15 min) e observações.
- Fora do horário, ou a menos de 15 min do fechamento, o pedido fica bloqueado com a mensagem: "Estamos fechados agora — abrimos [dia] às 9h."
- O botão "Enviar pedido pelo WhatsApp" abre `https://wa.me/55[NÚMERO]?text=` com a mensagem codificada:

```
Olá, Tostes! Novo pedido para retirada.
Nome: Fabrício
Retirada: hoje às 15h30

1x Cappuccino — R$ 12,00
   + Leite de aveia (R$ 5,00)
1x Combo do dia: Croissant de avelã + Latte Vanilla — R$ 27,00
Obs.: sem canela

Total: R$ 44,00
Pagamento na retirada.
```

- Depois do envio, mostrar uma tela de confirmação e limpar a sacola.
- O número do WhatsApp fica nas configurações do admin.

## 12. Painel admin (`/admin`)

- Login com e-mail e senha pelo Supabase Auth, com um único usuário, o dono.
- **Itens:** criar, editar, excluir e reordenar. Campos: todos os de `cardapio-dados.md` mais foto (upload), disponível (sim/não), selo (nenhum / Novo / Favorito da casa) e "pode entrar no combo".
- **Categorias:** renomear e reordenar.
- **Combos de hoje:** ver, sortear de novo, escolher manualmente e travar.
- **Enquanto você espera:** criar e editar textos, com status rascunho ou publicado.
- **Configurações:** número do WhatsApp, horário de funcionamento, texto da fidelidade e endereço.
- Interface simples, grande e em português. O dono vai usar pelo celular, então precisa ser rápida.
- Todas as permissões configuradas com RLS no Supabase: o público só lê; só o admin escreve.

## 13. Perguntas iniciais (faça antes de começar)

1. Onde estão os arquivos da **logo**? Qual versão usar: o chapéu atual ou a nova logo com chapéu e sanfona? O nome continua **TOSTES&CO**?
2. Onde estão as **fotos** dos itens, e com qual nome de arquivo? Proponha o padrão `slug-do-item.jpg`.
3. **Número do WhatsApp** que recebe os pedidos.
4. **Endereço** da cafeteria, para o rodapé e o Google.
5. **Conta Supabase e conta Vercel:** o dono já tem ou precisa de um passo a passo para criar?
6. Os **preços sugeridos** marcados em `cardapio-dados.md` estão confirmados?
7. Qual **grão** a casa usa hoje, se o dono quiser citar no site?

## 14. Fases (pare e mostre ao dono ao fim de cada uma)

1. **Base:** projeto, tokens de cor e fonte, textura, ilustrações SVG, cabeçalho e rodapé.
2. **Cardápio:** dados no Supabase a partir de `cardapio-dados.md` (script de importação), páginas de categoria e de item.
3. **Promoção do dia:** algoritmo de sorteio com testes (mesma data gera o mesmo resultado; sem repetição; desconto correto).
4. **Sacola e pedido pelo WhatsApp.**
5. **Início completo:** Por que a Tostes, fidelidade, avaliação no Google.
6. **Enquanto você espera.**
7. **Painel admin.**
8. **Revisão final:** acessibilidade, velocidade, teste no celular, SEO, deploy na Vercel e um guia curto em português (`COMO-USAR.md`) de como editar o cardápio pelo admin.
