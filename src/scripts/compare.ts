// Comparador antes/depois: arrastar (mouse, toque, caneta) e teclado (setas, Page Up/Down, Home/End).
// A posição visível persegue o alvo com uma inércia curta (lerp), sem biblioteca.
export function initCompare(reduce: boolean) {
  const root = document.querySelector<HTMLElement>("[data-casos]");
  const stage = root?.querySelector<HTMLElement>("[data-compare]");
  const knob = root?.querySelector<HTMLElement>("[data-knob]");
  if (!root || !stage || !knob) return;

  let target = 50;
  let current = 50;
  let raf = 0;
  let touched = false;

  const clamp = (v: number) => Math.min(100, Math.max(0, v));
  const apply = (v: number) => {
    stage.style.setProperty("--pos", `${v.toFixed(2)}%`);
    const r = Math.round(v);
    knob.setAttribute("aria-valuenow", String(r));
    knob.setAttribute("aria-valuetext", `${r}% da imagem mostra o antes`);
  };
  const tick = () => {
    current += (target - current) * 0.2;
    if (Math.abs(target - current) < 0.05) current = target;
    apply(current);
    raf = current !== target ? requestAnimationFrame(tick) : 0;
  };
  const setTarget = (v: number) => {
    target = clamp(v);
    if (reduce) {
      current = target;
      apply(current);
      return;
    }
    if (!raf) raf = requestAnimationFrame(tick);
  };

  // Ponteiro: um arraste por vez. Guarda o id do ponteiro que começou e ignora os outros
  // (segundo dedo, caneta junto com mouse etc.) até esse soltar.
  let activePointerId: number | null = null;
  let startX = 0;
  const fromEvent = (e: PointerEvent) => {
    const rect = stage.getBoundingClientRect();
    setTarget(((e.clientX - rect.left) / rect.width) * 100);
  };
  stage.addEventListener("pointerdown", (e) => {
    if (activePointerId !== null) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    activePointerId = e.pointerId;
    touched = true;
    startX = e.clientX;
    stage.setPointerCapture(e.pointerId);
    stage.classList.add("is-dragging");
    // No mouse, clicar já leva a linha até o ponto; no toque, só ao arrastar (para não brigar com o scroll).
    if (e.pointerType === "mouse") fromEvent(e);
  });
  stage.addEventListener("pointermove", (e) => {
    if (e.pointerId !== activePointerId) return;
    if (e.pointerType !== "mouse" && Math.abs(e.clientX - startX) < 3) return;
    fromEvent(e);
  });
  const end = (e: PointerEvent) => {
    if (e.pointerId !== activePointerId) return;
    activePointerId = null;
    stage.classList.remove("is-dragging");
  };
  stage.addEventListener("pointerup", end);
  stage.addEventListener("pointercancel", end);
  stage.addEventListener("lostpointercapture", end);

  // Teclado
  knob.addEventListener("keydown", (e) => {
    const step = e.shiftKey ? 10 : 5;
    let next: number | null = null;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next = target - step;
        break;
      case "ArrowRight":
      case "ArrowUp":
        next = target + step;
        break;
      case "PageDown":
        next = target - 20;
        break;
      case "PageUp":
        next = target + 20;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = 100;
        break;
    }
    if (next === null) return;
    e.preventDefault();
    touched = true;
    setTarget(next);
  });

  // Dica de que dá para arrastar: um vai-e-vem curto na primeira vez que o comparador aparece.
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((en) => en.isIntersecting)) return;
        io.disconnect();
        const seq = [36, 62, 50];
        seq.forEach((v, i) => setTimeout(() => !touched && setTarget(v), 350 + i * 520));
      },
      { threshold: 0.6 }
    );
    io.observe(stage);
  }

  // Seletor de casos
  const legenda = root.querySelector<HTMLElement>("[data-legenda]");
  const titulo = root.querySelector<HTMLElement>("[data-titulo]");
  const thumbs = Array.from(root.querySelectorAll<HTMLButtonElement>("button[data-caso]"));
  const layers = Array.from(stage.querySelectorAll<HTMLElement>("[data-layer]"));
  let active = layers.find((l) => l.hasAttribute("data-active")) ?? layers[0];

  thumbs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = layers.find((l) => l.dataset.layer === btn.dataset.caso);
      if (!next || next === active) return;
      thumbs.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      if (legenda && btn.dataset.legenda) legenda.textContent = btn.dataset.legenda;
      if (titulo && btn.dataset.titulo) titulo.textContent = btn.dataset.titulo;

      const prev = active;
      active = next;
      prev.removeAttribute("data-active");
      next.setAttribute("data-active", "");
      prev.style.zIndex = "0";
      next.style.zIndex = "1";
      next.hidden = false;
      if (reduce) {
        prev.hidden = true;
        return;
      }
      next.classList.add("is-entering");
      requestAnimationFrame(() => requestAnimationFrame(() => next.classList.remove("is-entering")));
      window.setTimeout(() => {
        if (active !== prev) prev.hidden = true;
      }, 520);
    });
  });
}
