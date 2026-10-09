import type { FactKey } from "./facts";

// The proof. Rules in AGENTS.md §4: never name or link private repos, and
// Plantão links the repo, not the site, until real questions are published.

export type Project = {
  name: string;
  tagline: string;
  text: string;
  stats: FactKey[];
  details: string[];
  links: { label: string; href: string }[];
};

export const plantao: Project = {
  name: "Plantão",
  tagline: "De PDF bagunçado a banco de dados confiável.",
  text: "As provas de concursos policiais só existem em PDF, espalhadas nos sites das bancas, e muitas são escaneadas. Um robô encontra as provas, eu aprovo cada fonte, e o pipeline extrai as questões, faz OCR quando precisa, classifica por assunto e valida.",
  stats: ["plantaoQuestions", "plantaoExams", "plantaoHours"],
  details: [
    "Cada questão aponta pro documento e a página de onde saiu.",
    "Classificação feita por agente e validada contra uma taxonomia.",
    "Carga idempotente, sem duplicatas.",
  ],
  links: [
    { label: "Código no GitHub", href: "https://github.com/olavostauros/plantao" },
  ],
};

export const usher: Project = {
  name: "Usher",
  tagline: "Catálogo nacional de eventos, em produção.",
  text: "Junta eventos de cinco plataformas de ingresso, tira os repetidos, coloca cada um no mapa e guarda o histórico de cada anúncio. Uma API pública alimenta o site Evento Livre.",
  stats: ["usherEvents", "usherCities", "usherPlatforms"],
  details: [
    "API pública com OpenAPI, paginação e rate limit.",
    "Google Cloud em VM Spot, com reinício automático e teto de custo por dia.",
    "Painéis no Grafana e alerta quando os dados atrasam.",
    "Deploy e auditoria de segurança feitos por agentes, com aprovação humana.",
  ],
  links: [
    { label: "API ao vivo", href: "https://api.eventolivre.com/v1/cities" },
    { label: "Evento Livre", href: "https://eventolivre.com" },
  ],
};
