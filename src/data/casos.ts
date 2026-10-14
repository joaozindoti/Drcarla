// Casos de antes/depois. Só imagens que a própria Dra. Carla já publicou.
// Recortes gerados por scripts/prepare-images.mjs a partir de assets-originais/ (metade de cima = antes,
// metade de baixo = depois). Só o caso do diastema está confirmado como facetas em resina composta;
// os outros ficam com legenda neutra até a Dra. confirmar o procedimento.
import type { ImageMetadata } from "astro";
import diastemaAntes from "../assets/img/caso-diastema-antes.jpg";
import diastemaDepois from "../assets/img/caso-diastema-depois.jpg";
import c3Antes from "../assets/img/caso-3-antes.jpg";
import c3Depois from "../assets/img/caso-3-depois.jpg";
import c2Antes from "../assets/img/caso-2-antes.jpg";
import c2Depois from "../assets/img/caso-2-depois.jpg";
import c6Antes from "../assets/img/caso-6-antes.jpg";
import c6Depois from "../assets/img/caso-6-depois.jpg";
import c1Antes from "../assets/img/caso-1-antes.jpg";
import c1Depois from "../assets/img/caso-1-depois.jpg";

export interface Caso {
  id: string;
  /** Rótulo curto do card no seletor de casos. */
  rotulo: string;
  legenda: string;
  antes: ImageMetadata;
  depois: ImageMetadata;
  altAntes: string;
  altDepois: string;
}

const NEUTRA = "Caso clínico da Dra. Carla.";

export const CASOS: Caso[] = [
  {
    id: "diastema",
    rotulo: "Facetas em resina",
    legenda: "Facetas em resina composta. Caso publicado com autorização.",
    antes: diastemaAntes,
    depois: diastemaDepois,
    altAntes: "Antes: espaço entre os dois dentes da frente e dentes de cor amarelada",
    altDepois: "Depois: dentes da frente com facetas em resina, sem o espaço entre eles e com cor mais clara",
  },
  {
    id: "caso-3",
    rotulo: "Caso 2",
    legenda: NEUTRA,
    antes: c3Antes,
    depois: c3Depois,
    altAntes: "Antes: sorriso com dentes da frente de formatos e tons diferentes e pequenos espaços entre eles",
    altDepois: "Depois: dentes da frente com formato e cor uniformes, sem espaços",
  },
  {
    id: "caso-2",
    rotulo: "Caso 3",
    legenda: NEUTRA,
    antes: c2Antes,
    depois: c2Depois,
    altAntes: "Antes: dentes superiores curtos, desgastados e com cor irregular",
    altDepois: "Depois: dentes superiores mais longos, alinhados e com cor clara e uniforme",
  },
  {
    id: "caso-6",
    rotulo: "Caso 4",
    legenda: NEUTRA,
    antes: c6Antes,
    depois: c6Depois,
    altAntes: "Antes: dentes superiores amarelados, com bordas irregulares",
    altDepois: "Depois: dentes superiores claros e com bordas regulares",
  },
  {
    id: "caso-1",
    rotulo: "Caso 5",
    legenda: NEUTRA,
    antes: c1Antes,
    depois: c1Depois,
    altAntes: "Antes: boca entreaberta sem dentes superiores aparentes",
    altDepois: "Depois: sorriso com dentes superiores claros e aparentes",
  },
];
