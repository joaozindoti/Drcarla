# Dra. Carla Furtado, Odontologia Especializada

Landing page da Dra. Carla Furtado (cirurgiã-dentista, CRO-MA 5824, Santa Inês-MA).
Objetivo único: levar a pessoa ao WhatsApp com a mensagem de agendamento pronta.

Stack: Astro 5 (site estático) + Tailwind CSS v4 + TypeScript + ícones Phosphor. Sem biblioteca de animação:
o visual v2 (estilo "livro de adesivos", ver `design/DIRECAO-V2.md`) é quase estático; o que se move é CSS.
Fontes self-host: Bricolage Grotesque condensada 800 (display, instância estática de 20 kB gerada por
`npm run fonts`, que usa Python com fonttools e brotli) e Onest (texto, via @fontsource).

## Rodar

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # gera dist/
npm run preview   # serve o dist/ localmente
```

## Deploy (Vercel)

1. Importar o repositório na Vercel (framework detectado: Astro). Build `npm run build`, saída `dist/`.
2. `vercel.json` já traz os cabeçalhos de segurança (CSP com o iframe do Google Maps liberado,
   `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS) e cache longo em `/_astro/`.
3. Domínio próprio: defina a variável `SITE_URL` (ex.: `https://www.seudominio.com.br`) para canonical,
   Open Graph e JSON-LD. Sem ela, o build usa o domínio de produção da Vercel.

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Dados (CRO, endereço, horário, WhatsApp, Instagram, Google) | `src/config/site.ts` |
| Casos de antes/depois | `src/data/casos.ts` (+ recortes em `scripts/prepare-images.mjs`) |
| Avaliações do Google | `src/data/avaliacoes.ts` |
| Cores, fontes, botões, adesivos, sistema de raio | `src/styles/global.css` (comentário no topo) |
| Seções | `src/components/*.astro`, montadas em `src/pages/index.astro` |
| Comportamento (comparador, vídeo, fileiras, marquee, botão flutuante) | `src/scripts/*.ts` |

As imagens otimizadas saem de `assets-originais/` (que nunca é alterada) com `npm run images`.
O Astro gera AVIF/WebP em vários tamanhos no build.

## Vídeo do hero

O vídeo fica em `public/video/hero.mp4`. Quem faz o papel de poster é a foto de estúdio otimizada, que fica por
baixo do vídeo no card e é o que aparece até ele tocar (nenhum quadro de vídeo é usado como foto).
`src/config/video.ts` verifica no build se o arquivo existe: sem arquivo, o hero fica só com a foto, sem tag
`<video>`, sem botão de áudio e sem 404. Para trocar o vídeo, substitua o arquivo (mesmo nome) e rode o build
de novo. Opcional: `public/video/hero.webm` é usado automaticamente se existir. Para desligar o vídeo sem
apagar o arquivo, mude `HERO_VIDEO_LIGADO` para `false` em `src/config/video.ts`.

Comportamento:
- Desktop: o vídeo começa a baixar quando a página termina de carregar e toca mudo em loop no card.
- Celular: só começa a baixar no primeiro toque ou rolagem (economiza dados e não pesa no carregamento).
- Não toca sozinho com "reduzir movimento" ou economia de dados; fora da tela, o loop mudo pausa.
- "Ouvir a Dra. Carla" reinicia do começo com som (funciona em qualquer caso, porque é a pessoa que pediu);
  "Silenciar" ou o fim do vídeo voltam ao loop mudo.
- A fala dela está transcrita para leitor de tela (`aria-describedby` no vídeo).

## Pendências

- Logo vetorial (SVG) oficial. Hoje o site usa um wordmark tipográfico fiel e o favicon é recorte do PNG de 203px.
- Confirmar com a Dra. o procedimento dos casos 1, 2, 3 e 6 (hoje com legenda neutra). Só o diastema está
  confirmado como facetas em resina composta. O `antes-depois-4.jpg` recebido é o mesmo arquivo do diastema.
- Domínio final (variável `SITE_URL` na Vercel). Com ela (ou no deploy da Vercel) o build gera `sitemap-index.xml` e o `robots.txt` aponta para ele; no build local não há sitemap.
- Avaliações: o texto da Laura Rayanne aparece encurtado, sem "Nunca tive uma dentista como ela" (comparação
  com colegas, vetada pelo CFO). O original está em `src/data/avaliacoes.ts`.
- Astro 5 tem avisos de segurança no `npm audit` que só são corrigidos no Astro 7. O site é estático e não
  usa os recursos afetados (server islands, renderização de dados do usuário); avaliar a migração depois.
