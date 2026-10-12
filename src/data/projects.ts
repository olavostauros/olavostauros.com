import type { FactKey } from "./facts";

// The proof. Rules in AGENTS.md §4: never name or link private repos.

export type Project = {
  name: string;
  tagline: string;
  text: string;
  stats: FactKey[];
  details: string[];
  links: { label: string; href: string }[];
};

export const usher: Project = {
  name: "Usher",
  tagline: "Catálogo nacional de eventos, em produção.",
  text: "Junta eventos de cinco plataformas de ingresso, tira os repetidos, coloca cada um no mapa e guarda o histórico de cada anúncio. Uma API pública alimenta o site Evento Livre.",
  stats: ["usherEvents", "usherCities", "usherPlatforms"],
  details: [
    "API pública com OpenAPI, paginação e rate limit.",
    "Google Cloud em VM Spot: quando o Google desliga a máquina, ela volta sozinha em minutos.",
    "Corte automático de gasto quando bate o orçamento.",
    "Painéis no Grafana e alerta quando os dados atrasam.",
    "Deploy e auditoria de segurança feitos por agentes, com aprovação humana.",
  ],
  links: [
    { label: "Usher", href: "https://eventolivre.com/usher/" },
    { label: "Evento Livre", href: "https://eventolivre.com" },
  ],
};

// Contributions to KnickKnackLabs. Agent PRs are "abertos", not "aceitos",
// until a maintainer merges them.
export const oikos: Project = {
  name: "oikos",
  tagline: "Uma casa de agentes que contribui com código aberto.",
  text: "Contribuo com as ferramentas de linha de comando da Knick Knack Labs (Bash, Git e TypeScript). Hoje o trabalho passa por dois agentes meus: um faz a triagem das issues e ordena o que vale a pena, o outro reproduz o bug, corrige e abre o PR. Nenhum dos dois faz merge: isso fica com os mantenedores.",
  stats: ["kklMergedPrs", "kklRepos", "knackOpenPrs"],
  details: [
    "Cada agente tem conta própria no GitHub e assina os próprios commits.",
    "Regras escritas do que cada agente pode fazer sem pedir.",
    "Erro de agente vira nota corrigida, pra não se repetir.",
    "Daí saiu o lab, um framework aberto: um comando monta as regras, a fila, as permissões e as verificações de um time de agentes, e o lab doctor confere tudo.",
  ],
  links: [
    {
      label: "Meus PRs aceitos",
      href: "https://github.com/pulls?q=is%3Apr+org%3AKnickKnackLabs+author%3Aolavostauros+is%3Amerged",
    },
    { label: "oikos no GitHub", href: "https://github.com/olavostauros/oikos" },
    { label: "lab no GitHub", href: "https://github.com/olavostauros/lab" },
  ],
};
