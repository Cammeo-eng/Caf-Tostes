Siga a skill tostes-sem-pontas-soltas e consulte PROMPT.md, cardapio-dados.md e DECISOES.md antes de decidir qualquer coisa.

## Regras do projeto (site TOSTES café, versão estática)
- **Stack:** HTML, CSS e JavaScript puros. Sem framework, sem build, sem banco, sem painel admin. Caminhos sempre relativos (GitHub Pages em subpasta). Dados carregados com `<script src>` na ordem `data/config.js`, `data/menu.js`, `data/aulas.js`, `data/quiz.js`, depois `js/*`. Sem `fetch` nem módulos ES.
- **Paleta (variáveis CSS em `css/style.css`):** creme `#F4EBDD`, vinho `#6E1E23`, verde musgo `#3F4A2B` (claro `#DCDDC8`), marrom terra `#4A3222`. Não usar laranja nem outras cores.
- **Nome da marca:** **TOSTES café**. O nome antigo, com o sufixo da outra unidade, não pode aparecer em nenhum lugar do site.
- **Fontes:** Darumadrop One só em títulos; DM Sans em textos, preços (números tabulares) e botões. **Parisienne** (cursiva) **só** nos títulos "O pedido favorito" e "Promoção do dia", com o mesmo estilo (`.titulo-script`, `clamp(34px, 9vw, 44px)`).
- **Dados:** `data/menu.js` e `data/config.js` são a fonte de verdade. Não inventar itens, preços, volumes, ingredientes, preparo nem ficha técnica. `precoAConfirmar` é anotação interna e nunca aparece no site.
- **Tamanho recomendado:** `CONFIG.tamanhoRecomendado` ("M"). Em itens com mais de um tamanho, o M vem selecionado, a lista mostra "M · R$ X", e combos, favorito e quiz usam o M (quiz usa "Gelado" quando a pessoa escolhe gelado e o item tem esse tamanho). Sem M, usa o primeiro tamanho.
- **Aulas:** `data/aulas.js` tem `AULAS_TRILHAS` (`id`, `nome`, `descricao`) e `AULAS` (`trilha`, `titulo`, `icone`, `leitura`, `slides` com `titulo`, `texto`, `destaque?`, além de `item?` e `link?`). Usar os textos exatamente como estão. Na página são bolinhas por trilha; aulas vistas ficam em `localStorage` (`tostes.aulasVistas`). O story é tela cheia em creme, não avança sozinho, o texto rola dentro do slide e, na última aula da trilha, mostra "Você terminou a trilha" e "Próxima trilha".
- **Fidelidade:** `CONFIG.fidelidade` é um objeto (`gancho`, `titulo`, `texto`, `rodape`); o primeiro carimbo vem marcado só como exemplo.
- **Quiz:** 12 perguntas em `data/quiz.js` (`QUIZ_PERGUNTAS`, `HARMONIZACAO`, `QUIZ_TEXTOS`); o comentário do topo do arquivo descreve as regras (filtros nunca removidos, pesos por resposta, desempate, explicação, tamanho, leite, acompanhamento). O motor está em `T.quiz` (`js/layers.js`); `testeQuiz()` no console roda 1.000 combinações. Não manter perguntas antigas em lugar nenhum.
- **Pedido:** as opções são "Levar pra viagem" (padrão) e "Comer na mesa" (mesas de 1 a 6; `?mesa=N` já seleciona). O **nome é obrigatório** (botão de enviar fica desabilitado, com a frase "Preencha seu nome para enviar o pedido."). Na mensagem do WhatsApp o tipo é `*Para viagem*` ou `*Mesa N*`.
- **Menu:** navegação por menu fecha a tela primeiro e só depois rola (`T.L.fechaTudo`); `history.scrollRestoration = "manual"` evita que o navegador desfaça a rolagem.
- **Combos do dia:** sorteio determinístico com a data de America/Sao_Paulo como semente. Nunca usar `Math.random()` para isso.
- **Estrutura:** `css/`, `js/`, `data/`, `assets/{fotos,ilustracoes,logo}`. A pasta `web/` é a versão antiga (Next.js), mantida só como histórico.
- **Não fazer:** imagem quebrada (usar placeholder), `fetch`, `Math.random()` no sorteio, texto exagerado, botões menores que 44 px, animações sem respeitar `prefers-reduced-motion`.
- Registrar decisões em `DECISOES.md`.
- **Sempre que terminar qualquer alteração, abrir a visualização do site em tamanho de celular para o Fabrício conferir.**
