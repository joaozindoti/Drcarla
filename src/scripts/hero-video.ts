// Vídeo do hero.
// - Só existe no HTML se public/video/hero.mp4 existir no build (src/config/video.ts).
// - Não toca sozinho com reduced-motion. Com economia de dados também não, mas só onde o navegador informa:
//   navigator.connection.saveData existe no Chrome/Android; no Safari/iOS não existe e não dá para saber.
// - Desktop: carrega o src depois do load. Celular (inclusive iOS): só no primeiro gesto da pessoa, o que já
//   evita gastar dados de quem só abriu a página e saiu.
// - Toca mudo em loop por cima da foto (que segue como "poster").
// - "Ouvir a Dra. Carla": reinicia do começo com som. Ao parar (ou ao terminar), volta ao mudo.
// - O primeiro toque/clique/tecla na página, com o vídeo visível, já liga o som (ver autoSom).
export function initHeroVideo(reduce: boolean) {
  const video = document.querySelector<HTMLVideoElement>("[data-hero-video]");
  if (!video) return;
  const btn = document.querySelector<HTMLButtonElement>("[data-hero-audio]");
  const label = document.querySelector<HTMLElement>("[data-hero-audio-label]");

  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const autoplay = !reduce && !conn?.saveData;

  let loaded = false;
  let listening = false;

  const load = () => {
    if (loaded) return;
    loaded = true;
    video.querySelectorAll<HTMLSourceElement>("source[data-src]").forEach((s) => {
      s.src = s.dataset.src!;
    });
    video.preload = "auto";
    video.load();
  };
  const show = (on: boolean) => {
    if (on) video.dataset.on = "";
    else delete video.dataset.on;
  };
  const setListening = (on: boolean) => {
    listening = on;
    btn?.setAttribute("aria-pressed", String(on));
    if (label) label.textContent = on ? "Silenciar" : "Ouvir a Dra. Carla";
  };

  video.addEventListener("playing", () => show(true));

  const backToMuted = () => {
    video.muted = true;
    video.loop = true;
    setListening(false);
    if (autoplay) {
      video.play().catch(() => {});
    } else {
      video.pause();
      show(false);
    }
  };

  video.addEventListener("ended", () => {
    video.currentTime = 0;
    backToMuted();
  });

  const playWithSound = () => {
    load();
    video.loop = false;
    video.muted = false;
    try {
      video.currentTime = 0;
    } catch {
      /* metadados ainda não chegaram; começa do zero de qualquer jeito */
    }
    setListening(true);
    video.play().catch(() => {
      // Navegador recusou tocar com som: volta ao estado anterior sem quebrar nada.
      backToMuted();
    });
  };

  let soundUsed = false;
  btn?.addEventListener("click", () => {
    soundUsed = true;
    if (listening) {
      video.pause();
      backToMuted();
      return;
    }
    playWithSound();
  });

  // Fora da tela, o loop mudo pausa (economiza bateria); com som, deixa a pessoa ouvir.
  let inView = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!loaded || listening || !autoplay) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 }
    ).observe(video);
  }

  if (!autoplay) return;

  // Áudio "já ligado" (pedido do dono): navegador nenhum deixa vídeo tocar com som sem um gesto da pessoa,
  // e rolar a página não conta como gesto. Então, no primeiro toque, clique ou tecla em qualquer lugar,
  // com o vídeo na tela, ele recomeça do início com a voz dela. Uma vez só; depois quem manda é o botão.
  const ativacao = ["pointerup", "keydown"] as const;
  const autoSom = (e: Event) => {
    if (soundUsed || listening) return;
    if (btn && e.target instanceof Node && btn.contains(e.target)) return; // o próprio botão já trata
    if (!inView) return; // fora da tela não assusta ninguém; espera o próximo gesto
    ativacao.forEach((t) => window.removeEventListener(t, autoSom));
    soundUsed = true;
    playWithSound();
  };
  ativacao.forEach((t) => window.addEventListener(t, autoSom, { passive: true }));

  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    load();
    video.play().catch(() => {});
  };

  // Desktop: começa quando a página fica ociosa depois do load.
  // Celular: só no primeiro gesto (toque, rolagem com o dedo, tecla). Assim o vídeo de 3 MB não
  // disputa rede e CPU com o carregamento inicial num aparelho mais simples; até lá a foto de estúdio
  // ocupa o card normalmente.
  const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
  if (desktop) {
    const later = () =>
      "requestIdleCallback" in window ? window.requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 600);
    if (document.readyState === "complete") later();
    else window.addEventListener("load", later, { once: true });
  } else {
    const gesto = () => {
      ["touchstart", "pointerdown", "keydown", "wheel"].forEach((t) => window.removeEventListener(t, gesto));
      start();
    };
    ["touchstart", "pointerdown", "keydown", "wheel"].forEach((t) =>
      window.addEventListener(t, gesto, { passive: true, once: true })
    );
  }
}
