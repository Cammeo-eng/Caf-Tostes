---
name: tostes-sem-pontas-soltas
description: Use SEMPRE neste projeto (cardápio digital TOSTES&CO), antes de começar, ao terminar cada fase e sempre que surgir qualquer dúvida, decisão não especificada ou informação faltando. Garante que nada seja inventado e que o site mantenha a identidade da marca.
---

# Sem pontas soltas — cardápio digital TOSTES&CO

Este projeto é o cardápio digital da cafeteria TOSTES&CO. O dono (Fabrício) prefere responder uma pergunta a corrigir algo inventado. As fontes de verdade são `PROMPT.md` e `cardapio-dados.md` na raiz do projeto.

## Regra de ouro
**Na dúvida, pergunte. Nunca invente.** Se algo não está escrito em `PROMPT.md`, `cardapio-dados.md` ou `DECISOES.md`, pare e pergunte antes de implementar.

## Como perguntar
- Use a ferramenta de perguntas (AskUserQuestion) quando disponível; senão, pergunte em texto.
- Agrupe as dúvidas: no máximo 4 perguntas por vez, cada uma com 2 a 4 opções concretas e a sua recomendação marcada como "(Recomendado)".
- Explique em uma frase por que a resposta importa. Linguagem simples, em português, sem jargão técnico.
- Enquanto espera a resposta, só adiante partes que não dependem dela.

## Sempre pergunte (nunca suponha)
- Qualquer preço, item, ingrediente, medida, tamanho ou categoria que não esteja em `cardapio-dados.md`.
- Número de WhatsApp, e-mail, endereço, links, senhas, chaves de API ou contas (Supabase, Vercel, domínio).
- Qual logo usar e onde estão os arquivos de logo e fotos.
- Textos institucionais novos (história, "por que a Tostes", fidelidade) que vão além do que está no prompt.
- Mudanças de cor, fonte, layout ou tom de voz fora do definido.
- Adicionar biblioteca paga, serviço externo ou qualquer coisa com custo mensal.
- Remover ou renomear algo que o dono já definiu.
- Quando duas instruções parecerem contraditórias.

## Pode decidir sozinho (e registrar)
Detalhes técnicos sem impacto visível para o dono ou o cliente: nomes de variáveis, estrutura de pastas, pequenos ajustes de espaçamento dentro do sistema de design, otimização de imagens.

## Registro de decisões
Mantenha `DECISOES.md` na raiz. A cada resposta do dono ou decisão técnica relevante, acrescente uma linha: data · assunto · decisão · quem decidiu (dono / Claude). Leia esse arquivo antes de perguntar algo, para não perguntar duas vezes.

## Ao final de cada fase
1. Rode o site localmente e confira no tamanho de celular (390 px) e desktop.
2. Passe pelo checklist de marca abaixo.
3. Mostre ao dono um resumo curto do que foi feito, o que ficou pendente e as perguntas abertas.
4. Só comece a próxima fase depois da aprovação.

## Checklist de marca (o site não pode parecer genérico)
- [ ] Títulos em Darumadrop One; cores só da paleta do `PROMPT.md`.
- [ ] Fundo creme com textura sutil de papel; ilustrações em traço fino.
- [ ] Nenhum gradiente, emoji, ícone genérico colorido, foto de banco de imagens, lorem ipsum ou texto em inglês desnecessário.
- [ ] Selos "NOVO" e "FAVORITO DA CASA" no estilo definido.
- [ ] Tom de voz caloroso, frases curtas, "a gente"/"nosso".
- [ ] Preços iguais aos de `cardapio-dados.md` (ou do painel admin).
- [ ] Texto legível (contraste AA), botões com área de toque de pelo menos 44 px.
