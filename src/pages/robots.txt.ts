// robots.txt gerado no build. Só aponta o sitemap quando há URL pública (SITE_URL ou domínio da Vercel),
// que é quando o @astrojs/sitemap roda (ver astro.config.mjs).
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const publico = site && !["localhost", "127.0.0.1"].includes(site.hostname);
  const linhas = ["User-agent: *", "Allow: /"];
  if (publico) linhas.push("", `Sitemap: ${new URL("sitemap-index.xml", site).href}`);
  return new Response(linhas.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
