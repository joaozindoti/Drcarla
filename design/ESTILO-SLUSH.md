# Referência de estilo: Slush ("inflatable sticker universe on pastel paper")

Mandada pelo dono do projeto em 14/10 como base visual da v2. Resumo fiel dos pontos que importam
(o texto completo veio no chat; aqui ficam os tokens e regras).

## Lógica
Livro de adesivos: fundo de papel pastel, adesivos coloridos vivos espalhados como confete, tipografia de display
enorme e "esmagada" (peso 800, line-height 0,75 a 0,80) que vira objeto, componentes bem arredondados e contornados
de preto 1px (efeito recortado à mão). Colagem presa numa parede clara, não landing de fintech.

## Cores
- Carbon `#000000`: texto, contorno de cards/botões, CTA preenchido
- Paper White `#ffffff`: canvas, cards, botão outline
- Sky Wash `#dceeff`: fundo do hero / seção principal
- Concrete Gray `#cccccc`: seção neutra de respiro
- Soft Mist `#e9e9e9`: tons sutis
- Electric Blue `#4da2ff`: cor-assinatura decorativa (fitas 3D, washes). NUNCA em CTA ou link.
- Mint Pop `#55db9c`, Lavender `#e9ccff`, Ember `#fb4903`, Sunburst `#ffd731`, Voltage Violet `#5c4ade`:
  paleta de adesivos, usadas juntas (várias por tela), nunca uma só como "o" acento.

## Tipografia
- Display: Lateral 800 (substitutos: Druk, Bowlby One, Antonio). 70 a 640px, line-height 0,75 a 0,80, só títulos.
- UI/corpo: Aeonik Pro 500/700 (substitutos: Satoshi, General Sans). Corpo 14 a 16px tracking -0,01em; nav/botões
  700 com tracking 0,03em; subtítulos 24 a 30px 700; passo de 64px 700.

## Forma e espaço
- Base 4px, densidade confortável, gap entre seções 48px, padding de card 24px, max-width 1440px.
- Raios: nav/botões/tags pílula total; cards 20px; cards elevados 40px; corpo 30px. Nada abaixo de 16px em card.
- Sem sombra. Elevação = faixas de cor + contorno preto. Sem gradiente em lugar nenhum.

## Componentes
- Nav: logo em selo circular contornado à esquerda, links em pílula contornada no centro, CTA preto à direita.
- CTA principal: preto, texto branco, pílula. Secundário: pílula branca contornada de preto.
- Adesivos decorativos: formas chapadas com contorno preto 1px, raio 16 a 20px, levemente rotacionadas, em volta do
  display, nunca alinhadas em grid.
- Faixas de seção alternando `#dceeff`, `#ffffff`, `#cccccc`, sem divisória nem sombra.
- Movimento: quase estático (colagem impressa). Só marquee e hover leve nos botões.
