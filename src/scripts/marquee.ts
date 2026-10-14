// Botão "Pausar/Retomar" da fileira de avaliações (o loop é CSS). Para quem usa teclado ou toque e não
// tem hover, e para cumprir a regra de conteúdo que se move sozinho por mais de 5 segundos.
// Com reduzir movimento a fileira já fica parada e o botão nem aparece (CSS).
export function initMarquee() {
  const btn = document.querySelector<HTMLButtonElement>("[data-marquee-toggle]");
  const marquee = document.querySelector<HTMLElement>("[data-marquee]");
  if (!btn || !marquee) return;
  const label = btn.querySelector<HTMLElement>("[data-marquee-label]");
  const icoPause = btn.querySelector(".mq-ico-pause");
  const icoPlay = btn.querySelector(".mq-ico-play");

  btn.addEventListener("click", () => {
    const paused = !marquee.hasAttribute("data-paused");
    marquee.toggleAttribute("data-paused", paused);
    btn.setAttribute("aria-pressed", String(paused));
    if (label) label.textContent = paused ? "Retomar" : "Pausar";
    icoPause?.classList.toggle("hidden", paused);
    icoPlay?.classList.toggle("hidden", !paused);
  });
}
