// Fileira horizontal de cards (Especialidades): setas no desktop, swipe nativo no celular.
// As setas desligam nas pontas; quem diz se está na ponta é um IntersectionObserver no primeiro e no
// último card (sem listener de scroll).
export function initRails(reduce: boolean) {
  document.querySelectorAll<HTMLElement>("[data-rail]").forEach((rail) => {
    const section = rail.closest("section");
    const prev = section?.querySelector<HTMLButtonElement>("[data-rail-prev]");
    const next = section?.querySelector<HTMLButtonElement>("[data-rail-next]");
    const cards = Array.from(rail.children) as HTMLElement[];
    if (!prev || !next || cards.length < 2) return;

    const step = () => {
      const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
      const w = cards[0].getBoundingClientRect().width + gap;
      // Anda o número de cards inteiros que cabem na tela (mínimo 1).
      return Math.max(1, Math.floor((rail.clientWidth - 80) / w)) * w;
    };
    const go = (dir: 1 | -1) => rail.scrollBy({ left: dir * step(), behavior: reduce ? "auto" : "smooth" });
    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));

    if (!("IntersectionObserver" in window)) return;
    const first = cards[0];
    const last = cards[cards.length - 1];
    prev.disabled = true;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const inteiro = e.intersectionRatio > 0.98;
          if (e.target === first) prev.disabled = inteiro;
          else next.disabled = inteiro;
        });
      },
      { root: rail, threshold: [0, 0.5, 0.98, 1] }
    );
    io.observe(first);
    io.observe(last);
  });
}
