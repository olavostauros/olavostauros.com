// Every number shown on the site. Copy values from
// ~/Work/operation-get-a-job/video/script.md, which is checked against the
// repos and the live API. Update `checked` whenever a value is re-checked.

export type Fact = {
  value: string; // as shown, e.g. "5.063"
  label: string; // what it counts, e.g. "questões extraídas e validadas"
  source: string; // where it was checked
  checked: string; // ISO date of the last check
};

export const facts = {
  plantaoQuestions: {
    value: "5.063",
    label: "questões extraídas e validadas",
    source: "Plantão coverage report (2026-10-08 18:43 UTC), via video/script.md",
    checked: "2026-10-09",
  },
  plantaoExams: {
    value: "109",
    label: "provas do Cebraspe",
    source: "coverage report, table by board, agency and year",
    checked: "2026-10-09",
  },
  plantaoAgencies: {
    value: "25",
    label: "órgãos: PF, PRF, polícias civis, militares e bombeiros",
    source: "coverage report, table by board, agency and year",
    checked: "2026-10-09",
  },
  plantaoHours: {
    value: "< 30 h",
    label: "do primeiro commit ao relatório",
    source: "first commit 2026-10-07 10:47 -03, report 2026-10-08 15:43 -03 (28 h 56 min)",
    checked: "2026-10-09",
  },
  usherEvents: {
    value: "13.880",
    label: "eventos futuros no catálogo",
    source: "api.eventolivre.com/v1/cities, sum of events_upcoming (13,880)",
    checked: "2026-10-09",
  },
  usherCities: {
    value: "32",
    label: "cidades",
    source: "api.eventolivre.com/v1/cities",
    checked: "2026-10-09",
  },
  usherPlatforms: {
    value: "5",
    label: "plataformas de ingresso",
    source: "usher src/evcrawl/sources/",
    checked: "2026-10-09",
  },
  kklMergedPrs: {
    value: "44",
    label: "PRs aceitos pelos mantenedores",
    source: "gh search prs --owner KnickKnackLabs --author olavostauros --merged (2026-05-25..07-02)",
    checked: "2026-10-09",
  },
  kklRepos: {
    value: "8",
    label: "repositórios da Knick Knack Labs",
    source: "same search, unique repositories of the merged PRs",
    checked: "2026-10-09",
  },
  knackOpenPrs: {
    value: "17",
    label: "PRs abertos pelos agentes, em revisão",
    source: "gh search prs --owner KnickKnackLabs --author knack-oikos (all open, none merged)",
    checked: "2026-10-09",
  },
} satisfies Record<string, Fact>;

export type FactKey = keyof typeof facts;

const MAX_AGE_DAYS = 7;

/** The newest `checked` date among the given facts, for the footer. */
export function lastChecked(keys: FactKey[]): string {
  return keys.map((k) => facts[k].checked).sort().at(-1)!;
}

/**
 * Fails the production build if any of the given facts is older than
 * MAX_AGE_DAYS, so stale numbers can't be deployed by accident. In dev it
 * only warns.
 */
export function assertFresh(keys: FactKey[], now = new Date()): void {
  const stale = keys.filter((k) => {
    const age = (now.getTime() - Date.parse(facts[k].checked)) / 86_400_000;
    return age > MAX_AGE_DAYS;
  });
  if (stale.length === 0) return;
  const msg = `Stale facts (checked more than ${MAX_AGE_DAYS} days ago): ${stale.join(", ")}. Re-check them and update src/data/facts.ts.`;
  if (import.meta.env.PROD) throw new Error(msg);
  console.warn(msg);
}
