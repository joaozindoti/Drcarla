// Vídeo do hero.
// Basta colocar o arquivo em public/video/hero.mp4 (e, opcional, public/video/hero.webm)
// e rodar o build de novo. A checagem abaixo roda só no build (Node), então enquanto o
// arquivo não existir o site nem cria a tag <video> e não há requisição 404.
// Para desligar o vídeo mesmo com o arquivo presente, troque HERO_VIDEO_LIGADO para false.
import { existsSync } from "node:fs";
import { join } from "node:path";

export const HERO_VIDEO_LIGADO = true;

const pasta = join(process.cwd(), "public", "video");

export const heroVideo = {
  mp4: HERO_VIDEO_LIGADO && existsSync(join(pasta, "hero.mp4")) ? "/video/hero.mp4" : null,
  webm: HERO_VIDEO_LIGADO && existsSync(join(pasta, "hero.webm")) ? "/video/hero.webm" : null,
};

export const temHeroVideo = Boolean(heroVideo.mp4 || heroVideo.webm);
