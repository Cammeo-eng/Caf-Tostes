Siga a skill tostes-sem-pontas-soltas e consulte PROMPT.md, cardapio-dados.md e DECISOES.md antes de decidir qualquer coisa.

## Regras do projeto (site TOSTES to go, versão estática)
- **Stack:** HTML, CSS e JavaScript puros. Sem framework, sem build, sem banco, sem painel admin. Caminhos sempre relativos (GitHub Pages em subpasta). Dados carregados com `<script src>` na ordem `data/config.js`, `data/menu.js`, `data/aulas.js`, `data/quiz.js`, depois `js/*`. Sem `fetch` nem módulos ES.
- **Paleta (variáveis CSS em `css/style.css`):** creme `#F4EBDD`, vinho `#6E1E23`, verde musgo `#3F4A2B` (claro `#DCDDC8`), marrom terra `#4A3222`. Não usar laranja nem outras cores.
- **Fontes:** Darumadrop One só em títulos; DM Sans em textos, preços (números tabulares) e botões.
- **Dados:** `data/menu.js` e `data/config.js` são a fonte de verdade. Não inventar itens, preços, volumes, ingredientes, preparo nem ficha técnica. `precoAConfirmar` é anotação interna e nunca aparece no site.
- **Combos do dia:** sorteio determinístico com a data de America/Sao_Paulo como semente. Nunca usar `Math.random()` para isso.
- **Estrutura:** `css/`, `js/`, `data/`, `assets/{fotos,ilustracoes,logo}`. A pasta `web/` é a versão antiga (Next.js), mantida só como histórico.
- **Não fazer:** imagem quebrada (usar placeholder), `fetch`, `Math.random()` no sorteio, texto exagerado, botões menores que 44 px, animações sem respeitar `prefers-reduced-motion`.
- Registrar decisões em `DECISOES.md`.
