// Every number shown on the site. Copy values from
// ~/Work/operation-get-a-job/video/jotha-prime/script.md, which is checked
// against the repos and the live API. Update `checked` whenever a value is
// re-checked. Sources name only public things (Plantão, Usher, the API,
// GitHub search), because this repo is public.

export type Fact = {
  value: string; // as shown, e.g. "5.152"
  label: string; // what it counts, e.g. "questões extraídas e validadas"
  source: string; // where it was checked
  checked: string; // ISO date of the last check
};

export const facts = {
  plantaoQuestions: {
    value: "5.152",
    label: "questões extraídas e validadas",
    source: "Plantão coverage report, generated 2026-10-08 19:54 UTC",
    checked: "2026-10-12",
  },
  plantaoExams: {
    value: "110",
    label: "provas do Cebraspe",
    source: "Plantão coverage report, table by board, agency and year",
    checked: "2026-10-12",
  },
  plantaoAgencies: {
    value: "25",
    label: "órgãos: PF, PRF, polícias civis, militares e bombeiros",
    source: "Plantão coverage report, table by board, agency and year",
    checked: "2026-10-12",
  },
  // Not "< 30 h": the current report is 7 minutes past it.
  plantaoHours: {
    value: "~30 h",
    label: "do primeiro commit ao relatório",
    source: "Plantão git log: first commit 2026-10-07 10:47 -03, report 2026-10-08 16:54 -03 (30 h 07 min)",
    checked: "2026-10-12",
  },
  usherEvents: {
    // "+12 mil" rather than the exact count, so it stays true as the
    // catalog moves; split so it fits the stat column at 375 px.
    value: "+12",
    label: "mil eventos futuros no catálogo",
    source: "api.eventolivre.com/v1/cities, sum of events_upcoming (12,827)",
    checked: "2026-10-12",
  },
  usherCities: {
    value: "32",
    label: "cidades",
    source: "api.eventolivre.com/v1/cities",
    checked: "2026-10-12",
  },
  // A 6th adapter is in the Usher repo but not deployed; say 6 only once
  // /healthz shows a SHA that includes it.
  usherPlatforms: {
    value: "5",
    label: "plataformas de ingresso",
    source: "Usher production SHA 046d062 at api.eventolivre.com/healthz",
    checked: "2026-10-12",
  },
  kklMergedPrs: {
    value: "44",
    label: "PRs meus aceitos pelos mantenedores",
    source: "gh search prs --owner KnickKnackLabs --author olavostauros --merged (2026-06-01..08-17)",
    checked: "2026-10-12",
  },
  kklRepos: {
    value: "8",
    label: "repositórios da Knick Knack Labs",
    source: "same search, unique repositories of the merged PRs",
    checked: "2026-10-12",
  },
  knackOpenPrs: {
    value: "17",
    label: "PRs abertos pelos meus agentes, em 9 repositórios",
    source: "gh search prs --owner KnickKnackLabs --author knack-oikos (17 in 9 repos, all open, none merged)",
    checked: "2026-10-12",
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
