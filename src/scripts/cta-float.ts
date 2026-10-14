// Botão flutuante (celular). Aparece entre o fim do hero e a chamada final, e fica escondido enquanto o
// comparador de antes/depois está na tela (para não cobrir o arraste). Só IntersectionObserver.
export function initCtaFloat() {
  const float = document.querySelector<HTMLElement>("[data-cta-float]");
  const hero = document.getElementById("topo");
  if (!float || !hero || !("IntersectionObserver" in window)) return;

  const bloqueios = [hero, document.querySelector("[data-casos]"), document.getElementById("contato"), document.querySelector("footer")].filter(
    (el): el is Element => !!el
  );
  const link = float.querySelector("a");
  const emTela = new Map<Element, boolean>();

  const update = () => {
    const visible = !bloqueios.some((el) => emTela.get(el));
    if (visible) float.setAttribute("data-visible", "");
    else float.removeAttribute("data-visible");
    float.setAttribute("aria-hidden", String(!visible));
    link?.setAttribute("tabindex", visible ? "0" : "-1");
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => emTela.set(e.target, e.isIntersecting));
      update();
    },
    { threshold: 0, rootMargin: "0px 0px -12% 0px" }
  );
  bloqueios.forEach((el) => io.observe(el));
}
