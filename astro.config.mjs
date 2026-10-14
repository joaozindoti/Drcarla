// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// URL pública do site (canonical, Open Graph, JSON-LD, sitemap).
// 1) SITE_URL, se definida (ex.: domínio próprio quando existir);
// 2) senão, o domínio de produção que a Vercel injeta no build;
// 3) senão, localhost (build local). Nesse caso não gera sitemap.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const publicUrl = process.env.SITE_URL || (vercel ? `https://${vercel}` : "");
const site = publicUrl || "http://localhost:4321";

export default defineConfig({
  site,
  output: "static",
  compressHTML: true,
  integrations: publicUrl ? [sitemap()] : [],
  build: {
    // Todo o CSS vai inline no <head> (~10 kB): nenhuma requisição bloqueando o primeiro paint.
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Scripts sempre como arquivo externo: a CSP permite só script-src 'self'.
      assetsInlineLimit: 0,
    },
  },
});
