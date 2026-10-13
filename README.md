# TOSTES to go — cardápio digital

Site 100% estático (HTML, CSS e JavaScript puros, sem build), feito para celular. Abre direto pelo `index.html` ou em qualquer hospedagem estática.

## Como trocar preços e itens
Edite só `data/menu.js` (itens, preços, tamanhos, opções). O comentário no topo do arquivo explica cada campo. Se um item apontar para categoria ou opção inexistente, o console do navegador avisa.

## Fotos
Coloque em `assets/fotos/<id>.jpg`, onde `<id>` é o `id` do item em `data/menu.js`. Use fotos quadradas, 800×800, até 200 KB. Sem foto, o site mostra um desenho no lugar. Outras fotos: `assets/fotos/favorito.jpg` (pedido favorito) e `assets/fotos/chapeu-historia.jpg` (página do chapéu).

## WhatsApp, endereço e horários
Em `data/config.js`: `WHATSAPP` (55 + DDD + número, só dígitos), `endereco`, `horarios`, `mesas`, texto da fidelidade, promoção do dia e o pedido favorito.

## Outros arquivos de dados
- `data/aulas.js`: aulas "Enquanto seu café fica pronto" (textos provisórios).
- `data/quiz.js`: perguntas e regras do quiz "Descubra seu café".

## Mesas
O QR code de cada mesa abre `.../index.html?mesa=3` (de 1 a 6). O pedido já vem com "Comer na mesa → Mesa 3".

## Conferir no console
`previaCombos(7)` lista os combos dos próximos 7 dias.

## Publicar no GitHub Pages
1. No repositório, vá em Settings → Pages.
2. Em "Build and deployment", escolha "Deploy from a branch", a branch principal e a pasta `/ (root)`.
3. O site fica em `https://<usuario>.github.io/<repositorio>/`. Todos os caminhos são relativos.

Obs.: o workflow `.github/workflows/pages.yml` publica este site a cada push na main (em Settings → Pages, a fonte deve ser "GitHub Actions"). A pasta `web/` guarda a versão anterior (Next.js), só como histórico.
