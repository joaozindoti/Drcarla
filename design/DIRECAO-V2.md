# Direção v2 (14/10): redesign completo do visual

O dono reprovou a v1. Esqueça o layout atual inteiro (arcos, serifa, rosé, espaçamento). O conteúdo e os dados de
`design/BRIEF.md` continuam valendo (dados reais, regras do CFO, CTA WhatsApp, vídeo do hero), MENOS a parte de
"Direção visual" e "Estrutura", que esta página substitui. Estilo base: `design/ESTILO-SLUSH.md` + cards no estilo
Apple (apple.com: cards bem arredondados, compactos, em fileira horizontal com rolagem, título curto e forte).

## O que ele reclamou (proibido repetir)
1. **Prints de vídeo/stories como foto.** NÃO usar nenhum quadro de vídeo ou story (story-*.jpg, bastidores-*,
   ortodontia-modelo do story-11, hero-poster). O único vídeo do site é o do hero que ele mandou. Fotos = só as
   fotos de verdade dela: `estudio-jaleco-azul.jpg` (e -2), `consultorio-jaleco-branco.jpg`, e os antes/depois.
   Remover a seção Bastidores inteira.
2. **"Fontes de IA":** serifa grande (Cormorant) com sans pequena embaixo, itálico de ênfase em outra cor, rótulos
   minúsculos em caixa alta espaçada sob números grandes. Tudo isso sai. Nada de serifa, nada de itálico de ênfase.
3. **Fotos dela "como se fosse uma janela"** (molduras em arco). Sai. Fotos em card arredondado (30 a 40px) com
   contorno preto 1px, ou recortadas como adesivo, nunca janela/arco.
4. **Muito espaço** na página. Seções compactas: gap de seção 48 a 80px, nada de vazios de 200px.
5. **Muito rosa** e **cards quadrados que pegam a tela toda.** Paleta Slush (azul-céu, branco, cinza, adesivos
   coloridos). Rosa/lavanda só como um dos adesivos. Cards no tamanho de card Apple, não blocos de largura total.
6. **Avaliações do Google grandes demais.** Vão mais para baixo na página e viram uma fileira de cards pequenos
   rolando sozinha para o lado, em loop infinito, sem o usuário precisar rolar (marquee CSS; pausa no hover e
   respeita reduced-motion parando a animação). Nota 5,0 / 25 avaliações num selo-adesivo ao lado.
7. **Tirar "Dúvidas comuns"** (o FAQ inteiro).
8. **"O ícone das fotos"** (seletor de casos do antes/depois em miniaturinhas): refazer bem melhor. Sugestão: os casos
   viram cards Apple numa fileira horizontal (foto "depois" grande no card, rótulo curto), clicar abre/troca o caso no
   comparador; ou pílulas grandes contornadas. Nada de miniatura minúscula.

## Tipografia nova
- Display: grotesca pesada e condensada, peso 800, line-height 0,78 a 0,85, caixa alta ou caixa mista, em tamanho
  grande de verdade (no desktop 120 a 200px no hero; seções 64 a 110px; no celular escala para caber sem quebrar
  palavra). Substitutos livres da Lateral: Anton, Bowlby One, Antonio, Big Shoulders Display ou Bricolage Grotesque
  com eixo de largura condensado. Escolha a que ficar mais bonita com acentos do português (Ç, Ã, Ê) e teste.
- UI/corpo: uma sans contemporânea neutra (Geist, Satoshi via arquivo local, Onest ou Instrument Sans). Pesos 500/700.
  Proibido: Inter, Cormorant, Hanken, Playfair, Manrope, Fraunces.
- Hierarquia por peso e tamanho na MESMA lógica, sem par "serifa grande + sans miúda".

## Estrutura nova (ordem)
1. Nav estilo Slush: selo "CF" circular contornado (tipográfico, não redesenhar o monograma), links em pílula, CTA
   preto "Agendar avaliação".
2. Hero (fundo `#dceeff`): display enorme (ex.: "SEU SORRISO, DO SEU JEITO." ou "SORRIR SEM PENSAR DUAS VEZES" -
   escolha o que fica melhor como bloco tipográfico), subtítulo curto, CTA preto + secundário contornado. O vídeo
   dela num card arredondado com contorno preto (não arco), tocando mudo em loop com o botão "Ouvir a Dra. Carla".
   Adesivos em volta (dente, brilho, estrela 5,0, coração) com ícones Phosphor dentro de formas coloridas contornadas,
   rotacionadas. Opcional: uma "fita inflável" azul `#4da2ff` passando atrás do display, só se ficar realmente bonita
   (traço grosso SVG com realce, sem gradiente); se ficar barata, não use.
3. Quem é a Dra. Carla: bento de cards Apple. Foto real (consultório, jaleco branco) num card; cards menores coloridos
   de adesivo com CRO-MA 5824, 9 anos, pós em Ortodontia, UFMA, atende adultos e crianças. Texto curto dela.
4. Transformações: comparador antes/depois num card grande arredondado + seletor de casos novo (item 8 acima).
5. Especialidades: fileira horizontal de cards Apple (rolagem lateral com setas no desktop, swipe no celular). Cada
   card com cor de adesivo diferente, ícone-adesivo, nome e uma linha de benefício: Ortodontia, Facetas em resina,
   Pré-natal odontológico, Clareamento, Tratamento de canal, Implante, Prótese, Limpeza e raspagem, Restauração,
   Extração, Clínico geral. Sem foto de story.
6. Primeira consulta: 3 cards pequenos lado a lado (conversa e avaliação, plano explicado, tratamento no seu ritmo).
7. Avaliações no Google: marquee automático (item 6).
8. Contato: card do mapa (embed atual pelo nome da clínica) + card de endereço/horário + CTA grande preto.
9. Rodapé enxuto.
Botão flutuante de WhatsApp no celular continua (pílula preta).

## Regras que continuam
CTA único "Agendar avaliação" (wa.me com mensagem pronta). CFO (sem preço, garantia, superlativo; CRO visível).
Zero travessão. Reduced-motion. Lighthouse mobile ≥ 90. Self-host de fontes. Acessibilidade AA (cuidado: texto
preto em adesivos claros ok; branco só em `#000`/`#5c4ade`/`#fb4903` se passar contraste).
