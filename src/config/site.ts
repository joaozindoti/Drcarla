// Dados reais da Dra. Carla Furtado (fonte: design/BRIEF.md, inclusive a atualização de 14/10).
// Não inventar nada além disso.

export const SITE = {
  nome: "Dra. Carla Furtado",
  marca: "Dra. Carla Furtado, Odontologia Especializada",
  profissao: "Cirurgiã-dentista",
  cro: "CRO-MA 5824",
  formacao: "Pós-graduada em Ortodontia",
  graduacao: "Universidade Federal do Maranhão (UFMA)",
  anosExperiencia: 9,
  endereco: {
    rua: "Av. Castelo Branco, 3191",
    bairro: "Centro",
    cidade: "Santa Inês",
    uf: "MA",
    cep: "65300-001",
    pais: "BR",
  },
  geo: { lat: -3.6650767, lng: -45.3805488 },
  // Horário do perfil no Google Maps.
  horario: [
    { dias: "Segunda a sexta", horas: "8h às 18h" },
    { dias: "Sábado", horas: "8h às 12h" },
  ],
  horarioComplemento: "Atendimento com hora marcada",
  telefoneExibicao: "(98) 98468-4577",
  telefoneE164: "+5598984684577",
  instagramUser: "@dra.carlafurtado",
  instagramUrl: "https://www.instagram.com/dra.carlafurtado/",
  google: {
    nota: "5,0",
    total: 25,
    perfilUrl:
      "https://www.google.com/maps/place/Dra+Carla+Furtado+Odontologia+Especializada/@-3.6650767,-45.3805488,17z/data=!4m6!3m5!1s0x92ca9df565d0575f:0x95ce740668d8894a!8m2!3d-3.6650767!4d-45.3805488",
  },
} as const;

export const ENDERECO_LINHA = `${SITE.endereco.rua}, ${SITE.endereco.bairro}, ${SITE.endereco.cidade}-${SITE.endereco.uf}`;

const MENSAGEM = "Olá, Dra. Carla! Vim pelo site e gostaria de agendar uma avaliação.";
export const WHATSAPP_URL = `https://wa.me/5598984684577?text=${encodeURIComponent(MENSAGEM)}`;

// Rótulo único de CTA na página inteira.
export const CTA_LABEL = "Agendar avaliação";

export const MAPA_EMBED =
  "https://maps.google.com/maps?q=Dra+Carla+Furtado+Odontologia+Especializada,+Santa+In%C3%AAs&ll=-3.6650767,-45.3805488&z=17&output=embed";
// "Como chegar" abre o perfil real no Google Maps (testado no briefing).
export const MAPA_ROTA = SITE.google.perfilUrl;
