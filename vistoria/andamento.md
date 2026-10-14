Concluído em 2026-10-14

# Andamento — time — 2026-10-14
Tarefa: landing page da Dra. Carla Furtado (briefing em design/BRIEF.md)
Partes:
- [x] Planejamento, coleta de material (PDFs do Insta, perfil público, Google Maps, fotos do cliente) e briefing — dono: líder
- [x] Habblaud atualizado para 0.11.0 — dono: líder
- [x] A. Site completo (Astro 5 + Tailwind v4 + GSAP/Lenis) — dono: dev-frontend (Opus, esforço alto)
- [x] Material novo (vídeo cortado em 23s, 5 casos antes/depois únicos, horário e avaliações do Google) aplicado
- [x] assets-originais/ fora do git (repo público)
- [x] Revisão (vistoria + seguranca + revisor-codex): nada crítico; 14 ajustes consolidados
- [x] Ajustes da revisão: os 14 feitos (dev-frontend); foto de Ortodontia recortada acima da legenda queimada (líder)
- [x] Entrega ao usuário

Resultado final: build ok, astro check 0 erros, Lighthouse desktop 100/100/100/100, mobile 92 a 97/100/100/100.

Pendências:
- Logo vetorial (só veio PNG de ~240px; site usa wordmark tipográfico)
- Dra. confirmar procedimento dos casos 1, 2, 3 e 6, se quer mostrar o caso 1 e o uso de depoimentos do Google (CFO)
- git user.email do repo é o Gmail pessoal; trocar pelo noreply do GitHub antes do primeiro commit (repo público)
- SITE_URL com o domínio final na Vercel (canonical, OG, sitemap)
- Migrar para Astro 7 em branch separado (alerta do npm audit não afeta site estático)
- Still limpo do momento com o modelo de arcada, se quiserem mostrar o modelo na Ortodontia
