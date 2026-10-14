// Prepara as imagens do site a partir de assets-originais/ (que nunca é alterada).
// Recorta e grava em src/assets/img/ e public/. O Astro (astro:assets) gera AVIF/WebP e tamanhos no build.
// Fotos permitidas no site: só as fotos de verdade da Dra. (estúdio de jaleco azul, consultório de jaleco
// branco) e os antes/depois. Nenhum quadro de vídeo ou story entra como foto.
// Uso: npm run images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IG = path.join(root, "assets-originais", "instagram");
const CLI = path.join(root, "assets-originais", "cliente");
const OUT = path.join(root, "src", "assets", "img");
const PUB = path.join(root, "public");

await mkdir(OUT, { recursive: true });


const jpg = { quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" };

async function out(name, pipeline) {
  const file = path.join(OUT, name);
  await pipeline.jpeg(jpg).toFile(file);
  const m = await sharp(file).metadata();
  console.log(`${name.padEnd(28)} ${m.width}x${m.height}`);
}

// 1. Hero: estúdio, jaleco azul (3072x4096). Fica por baixo do vídeo no card do hero (é o que aparece até o
// vídeo tocar). Recorte 3:4 centrado no rosto, cor original (o fundo cinza do estúdio já conversa com a paleta).
await out(
  "hero-estudio.jpg",
  sharp(path.join(IG, "estudio-jaleco-azul.jpg")).extract({ left: 256, top: 300, width: 2560, height: 3413 }).resize(1200, 1600)
);

// 2. Quem é: consultório, jaleco branco (1440x1800). Só recorta (4:5).
await out(
  "sobre-consultorio.jpg",
  sharp(path.join(IG, "consultorio-jaleco-branco.jpg")).extract({ left: 140, top: 300, width: 1200, height: 1500 })
);

// 3. Antes/depois (1920x1920): metade de cima = antes, metade de baixo = depois.
// O "depois" foi fotografado mais perto (~1.15x), então o recorte dele é
// proporcionalmente maior para os dentes ficarem alinhados no comparador.
// Os dois recortes evitam a assinatura que fica no meio, à direita.
const AD = path.join(IG, "antes-depois-diastema.jpg");
const W = 1200, H = 800;
await out("caso-diastema-antes.jpg", sharp(AD).extract({ left: 406, top: 109, width: 1050, height: 700 }).resize(W, H));
await out("caso-diastema-depois.jpg", sharp(AD).extract({ left: 411, top: 1085, width: 1207, height: 805 }).resize(W, H));
// (antes-depois-4.jpg do cliente é o mesmo arquivo do diastema, byte a byte; não é repetido.)

// Demais casos: para cada um, um ponto de referência nos dentes (x do centro entre os incisivos,
// y de referência) em cada metade, e a escala do "depois" em relação ao "antes".
// O script acha o maior recorte 3:2 que mantém a referência na mesma posição relativa nas duas
// metades, sem pegar a emenda nem a assinatura (faixas proibidas definidas em `antesMax`/`depoisMin`).
const CASOS = [
  { id: "1", antes: [815, 380], depois: [910, 1340], s: 1.06, antesMax: 868, depoisMin: 1102 },
  { id: "2", antes: [925, 650], depois: [975, 1440], s: 1.07, antesMax: 866, depoisMin: 1056 },
  { id: "3", antes: [930, 475], depois: [990, 1450], s: 1.07, antesMax: 828, depoisMin: 1088 },
  { id: "6", antes: [1015, 405], depois: [980, 1470], s: 0.92, antesMax: 864, depoisMin: 1082 },
];
const A = 3 / 2;
for (const c of CASOS) {
  const [xb, yb] = c.antes;
  const [xa, ya] = c.depois;
  let best = { h: 0, f: 0.5 };
  for (let f = 0.15; f <= 0.85; f += 0.005) {
    const h = Math.min(
      yb / f,
      (c.antesMax - yb) / (1 - f),
      (ya - c.depoisMin) / (f * c.s),
      (1920 - ya) / ((1 - f) * c.s),
      (2 * Math.min(xb, 1920 - xb)) / A,
      (2 * Math.min(xa, 1920 - xa)) / (A * c.s)
    );
    if (h > best.h) best = { h, f };
  }
  const hb = Math.floor(best.h);
  const wb = Math.floor(hb * A);
  const ha = Math.floor(hb * c.s);
  const wa = Math.floor(wb * c.s);
  const src = path.join(CLI, `antes-depois-${c.id}.jpg`);
  await out(
    `caso-${c.id}-antes.jpg`,
    sharp(src).extract({ left: Math.round(xb - wb / 2), top: Math.round(yb - best.f * hb), width: wb, height: hb }).resize(W, H)
  );
  await out(
    `caso-${c.id}-depois.jpg`,
    sharp(src).extract({ left: Math.round(xa - wa / 2), top: Math.round(ya - best.f * ha), width: wa, height: ha }).resize(W, H)
  );
}

// 4. Open Graph 1200x630 (rosto + jaleco, fundo de estúdio).
await sharp(path.join(IG, "estudio-jaleco-azul.jpg")).extract({ left: 0, top: 380, width: 3072, height: 1613 })
  .resize(1200, 630)
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(PUB, "og.jpg"));
console.log("public/og.jpg");

// 5. Favicons: recorte do monograma do logo original (raster de 203px, provisório até o vetor).
const mono = sharp(path.join(CLI, "logo.png")).extract({ left: 52, top: 46, width: 100, height: 100 });
await mono.clone().resize(180, 180, { kernel: "lanczos3" }).png().toFile(path.join(PUB, "apple-touch-icon.png"));
await mono.clone().resize(48, 48).png().toFile(path.join(PUB, "favicon-48.png"));
console.log("public/apple-touch-icon.png, public/favicon-48.png");
