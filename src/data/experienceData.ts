export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  period: string;
  focus: string;
  summary: string;
  stack: string[];
  highlights: string[];
};

export const experienceData: ExperienceItem[] = [
  {
    company: "BNY",
    role: "Frontend Engineer - Graduate Scheme",
    location: "London",
    period: "Aug 2024 - Present",
    focus: "Analytics Platform and Trading UI",
    summary:
      "Building data-heavy financial interfaces where clarity, rendering performance, and fast decision-making matter.",
    stack: ["Angular", "React", "TypeScript", "Highcharts", "AG Grid"],
    highlights: [
      "Designed clearer dashboards and data visualisations for complex system metrics.",
      "Improved large-dataset rendering with virtualisation and efficient component architecture.",
      "Applied accessibility and UX patterns to dense analytics and trading workflows.",
    ],
  },
  {
    company: "Grafana Labs",
    role: "Frontend Engineering Intern - Design Systems",
    location: "Remote",
    period: "2023",
    focus: "Saga Design System",
    summary:
      "Contributed to Grafana's open-source design system, building reusable frontend foundations for a large product ecosystem.",
    stack: ["React", "TypeScript", "Design systems", "Accessibility", "i18n"],
    highlights: [
      "Built reusable, accessible, and internationalised React components.",
      "Delivered 20+ merged pull requests across Grafana repositories.",
      "Worked in a fully remote, asynchronous engineering environment.",
    ],
  },
];

export const observabilityWork = [
  "Built a personal career dashboard in Grafana to visualise projects, talks, goals, and growth signals.",
  "Used Grafana's Infinity plugin to bring external career and community data into one dashboard.",
  "Extended this portfolio with OpenTelemetry tracing, Web Vitals spans, and a Netlify trace proxy to explore frontend observability in practice.",
  "Added k6 browser checks to generate realistic synthetic visits and validate that frontend telemetry reaches Grafana Cloud.",
];
