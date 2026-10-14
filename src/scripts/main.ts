// Entrada única de JS da página. Sem biblioteca de animação: o estilo é quase estático (colagem impressa);
// o que se move é CSS (entrada do hero, marquee, hover) e tudo respeita prefers-reduced-motion.
import { initCompare } from "./compare";
import { initHeroVideo } from "./hero-video";
import { initCtaFloat } from "./cta-float";
import { initRails } from "./rail";
import { initMarquee } from "./marquee";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Ano corrente no rodapé (o HTML já sai com o ano do build; isto só garante o ano atual).
document.querySelectorAll<HTMLElement>("[data-ano]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

initCompare(reduce);
initHeroVideo(reduce);
initCtaFloat();
initRails(reduce);
initMarquee();
