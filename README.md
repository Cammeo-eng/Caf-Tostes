# TOSTES café — cardápio digital

Site 100% estático (HTML, CSS e JavaScript puros, sem build), feito para celular. Abre direto pelo `index.html` ou em qualquer hospedagem estática.

## Como trocar preços e itens
Edite só `data/menu.js` (itens, preços, tamanhos, opções). O comentário no topo do arquivo explica cada campo. Se um item apontar para categoria ou opção inexistente, o console do navegador avisa.

## Fotos
Coloque em `assets/fotos/<id>.jpg`, onde `<id>` é o `id` do item em `data/menu.js`. Use fotos quadradas, 800×800, até 200 KB. Sem foto, o site mostra um desenho no lugar. Outras fotos: `assets/fotos/favorito.jpg` (pedido favorito) e `assets/fotos/chapeu-historia.jpg` (página do chapéu).

## WhatsApp, endereço e horários
Em `data/config.js`: `WHATSAPP` (55 + DDD + número, só dígitos), `endereco`, `horarios`, `mesas`, texto da fidelidade, promoção do dia e o pedido favorito.

## Fotos das aulas
Foto vertical 4:5 (ex.: 720×900) em `assets/aulas/<id-da-aula>.jpg` e o campo `imagem` na aula em `data/aulas.js`. Aparece na bolinha e no topo do primeiro slide; aulas sem `imagem` ficam com o ícone.

## Outros arquivos de dados
- `data/aulas.js`: trilhas (`AULAS_TRILHAS` com `descricao`) e aulas em formato stories (`leitura`, `slides` com `destaque` opcional, `item`, `link`).
- `data/quiz.js`: perguntas e regras do quiz "Descubra seu café".

## Marca, tamanho e fontes
- Nome: **TOSTES café**.
- `CONFIG.tamanhoRecomendado` define o tamanho recomendado (M).
- Fonte Parisienne só nos títulos "O pedido favorito" e "Promoção do dia".
- `CONFIG.mapa` (botão "Como chegar") e `CONFIG.instagramConvite` (bloco antes do rodapé).

## Pedido
- Opções: **Levar pra viagem** (padrão) e **Comer na mesa**. O nome é obrigatório; observações são opcionais.
- A mensagem do WhatsApp começa com `*Para viagem*` ou `*Mesa N*` e sempre traz a linha `Nome:`.
- O quiz (`data/quiz.js`) tem 12 perguntas; no console, `testeQuiz()` roda 1.000 combinações aleatórias.

## Mesas
O QR code de cada mesa abre `.../index.html?mesa=3` (de 1 a 6). O pedido já vem com "Comer na mesa → Mesa 3".

## Conferir no console
`previaCombos(7)` lista os combos dos próximos 7 dias.

## Publicar no GitHub Pages
1. No repositório, vá em Settings → Pages.
2. Em "Build and deployment", escolha "Deploy from a branch", a branch principal e a pasta `/ (root)`.
3. O site fica em `https://<usuario>.github.io/<repositorio>/`. Todos os caminhos são relativos.

Obs.: o workflow `.github/workflows/pages.yml` publica este site a cada push na main (em Settings → Pages, a fonte deve ser "GitHub Actions"). A pasta `web/` guarda a versão anterior (Next.js), só como histórico.
