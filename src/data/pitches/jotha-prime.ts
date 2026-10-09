import type { FactKey } from "../facts";

// Content for /jotha-prime-pitch. A new pitch is a copy of this file plus a
// route. Copy is in Brazilian Portuguese; see AGENTS.md §4 before editing.

export type Pitch = {
  slug: string;
  company: string;
  person: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; quote: string; headline: string; lead: string };
  // null until the video is on YouTube (unlisted). `poster` is a local file
  // in public/, so nothing loads from YouTube before the tap.
  video: { youtubeId: string | null; poster: string | null; title: string };
  bridge: string;
  pilot: {
    title: string;
    intro: string;
    steps: { title: string; text: string }[];
    split: string;
  };
  ladder: { title: string; text: string; detail?: string }[];
  cta: { title: string; text: string; button: string; whatsappText: string };
  facts: FactKey[];
};

export const pitch: Pitch = {
  slug: "jotha-prime-pitch",
  company: "Jotha Prime",
  person: "Caúca",
  meta: {
    title: "Para a Jotha Prime · Olavo de Vilhena Lima",
    description:
      "IA com engenharia, rodando em produção: dois sistemas e uma ideia de piloto para a Jotha Prime.",
  },
  hero: {
    eyebrow: "Para o Caúca · Jotha Prime",
    quote: "IA sem engenharia é só apresentação.",
    headline: "Então aqui vai a engenharia.",
    lead:
      "Sou o Olavo, de Vila Velha. Construo sistemas de IA que rodam em produção, operados por um time de agentes especializados, e respondo pelo resultado. Fiz esta página pra te mostrar dois deles e uma ideia de piloto pra Jotha.",
  },
  video: {
    youtubeId: null,
    poster: null,
    title: "Dois sistemas em 2 minutos",
  },
  bridge:
    "O Plantão lê prova de concurso, mas o motor é o mesmo pra nota fiscal, contrato, documento de admissão e atestado: papel bagunçado virando dado validado, rastreável até a página de origem. É o trabalho que muito cliente Senior ainda faz na mão.",
  pilot: {
    title: "Uma ideia de piloto: o agente de entrada de documentos",
    intro:
      "O cliente manda o documento no WhatsApp, onde o JothaX já atende, e o dado chega validado no Senior.",
    steps: [
      {
        title: "Chega pelo WhatsApp",
        text: "Foto ou PDF de NF-e, contrato, documento de admissão ou atestado.",
      },
      {
        title: "O agente lê",
        text: "Extrai e classifica o documento, com OCR quando é escaneado.",
      },
      {
        title: "Valida, e a dúvida vai pra um humano",
        text: "Regras de negócio conferem cada campo. O que não fecha cai numa fila de revisão.",
      },
      {
        title: "Entra no Senior",
        text: "O dado validado é lançado no ERP, HCM ou WMS pela API, com link pra página de origem.",
      },
    ],
    split:
      "Vocês conhecem o Senior e os clientes. Eu construo e opero o agente e o pipeline.",
  },
  ladder: [
    {
      title: "Café de 20 minutos",
      detail: "em Serra ou Vitória, sem custo",
      text: "Te mostro tudo rodando e a gente escolhe um processo.",
    },
    {
      title: "Diagnóstico e protótipo",
      detail: "1–2 semanas, preço fechado",
      text: "Um processo, um agente funcionando com dados reais ou anonimizados.",
    },
    {
      title: "Piloto em produção",
      detail: "3–6 semanas, preço fechado",
      text: "Implantado, monitorado, documentado e entregue com runbook.",
    },
    {
      title: "Engenheiro dedicado ou parceiro white-label",
      text: "Engenharia contínua pro JothaX, o JothaZap e os próximos produtos.",
    },
  ],
  cta: {
    title: "Bora tomar um café?",
    text: "20 minutos aí em Serra ou Vitória, quando for bom pra você.",
    button: "Chamar no WhatsApp",
    whatsappText: "Fala, Olavo! Vi a página da Jotha. Bora marcar o café?",
  },
  facts: [
    "plantaoQuestions",
    "plantaoExams",
    "plantaoAgencies",
    "plantaoHours",
    "usherEvents",
    "usherCities",
    "usherPlatforms",
  ],
};
