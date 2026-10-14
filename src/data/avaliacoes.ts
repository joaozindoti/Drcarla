// Avaliações reais do perfil da Dra. Carla no Google (fonte: design/BRIEF.md, 14/10).
// Nome como aparece no Google. Não acrescentar avaliações que não existam lá.
// `texto` é o original; `curto` é a versão encurtada sem mudar o sentido, usada nos cards (máx. 3 linhas).
export interface Avaliacao {
  /** Nome como aparece no Google. Vazio nos trechos que o próprio Google destaca sem autor. */
  nome: string;
  texto: string;
  curto?: string;
}

export const AVALIACOES: Avaliacao[] = [
  {
    nome: "Hirlana Souza",
    texto:
      "Profissional dedicada, cuidadosa e muito competente. Além de uma ótima profissional, é muito atenciosa e acolhedora. Me senti confortável e segura durante todo o atendimento.",
    curto: "Profissional dedicada, cuidadosa e muito competente. Me senti confortável e segura durante todo o atendimento.",
  },
  {
    nome: "Laura Rayanne",
    texto:
      "Sou muito bem atendida e gosto muito do trabalho dela. Nunca tive uma dentista como ela: super cuidadosa e delicada.",
    // Sem a comparação com outros dentistas (o CFO veda comparação com colegas na publicidade).
    curto: "Sou muito bem atendida e gosto muito do trabalho dela: super cuidadosa e delicada.",
  },
  {
    nome: "Samyra",
    texto: "Gosto muito da experiência, todos são muito educados. Fico feliz por ser bem recebida sempre.",
  },
  {
    nome: "",
    texto: "O ambiente da clínica é impecável e muito acolhedor, o que faz toda a diferença.",
  },
  {
    nome: "",
    texto: "Ótimo atendimento e profissionais competentes.",
  },
];
