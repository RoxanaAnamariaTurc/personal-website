export type WritingPost = {
  id: string;
  title: string;
  eyebrow: string;
  date: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  tags: string[];
};

export const writingPosts: WritingPost[] = [
  {
    id: "jsnation-react-summit-amsterdam-2026",
    title: "What I Learned from My First Big Frontend Conferences",
    eyebrow: "Conference reflection",
    date: "June 2026",
    summary:
      "Reflections from JSNation and React Summit in Amsterdam: what I learned about frontend tooling, platform engineering, React fundamentals, AI workflows, and meeting the people behind the tools we use.",
    heroImage: "/assets/images/jsnation-react-summit-2026-collage.jpg",
    heroAlt:
      "Collage of JSNation and React Summit Amsterdam 2026 photos, including conference stages, stickers, and a React Summit mug.",
    tags: ["Frontend", "React", "Conferences", "Learning"],
  },
  {
    id: "grafana-friends-london-grafanacon-2026-recap",
    title: "My Favorite Takeaways from the GrafanaCON Recap",
    eyebrow: "Meetup recap",
    date: "June 2026",
    summary:
      "Three things I found great from the Grafana & Friends London meetup: dynamic dashboards, Git Sync, and how interactive learning plus Grafana Assistant make Grafana easier for teams and new users.",
    heroImage: "https://grafana.com/static/img/grot-chat.svg",
    heroAlt:
      "Grot, the Grafana AI helper, from the official Grafana website.",
    tags: ["Grafana", "Meetups", "Grafana 13", "Observability"],
  },
  {
    id: "traitors-dashboard-grafana-sql",
    title: "Building a Traitors Dashboard with Grafana and SQL",
    eyebrow: "Workshop reflection",
    date: "May 2026",
    summary:
      "A hands-on Grafana workshop about turning spreadsheet data into SQL-powered dashboards, and what I learned from helping others in the room.",
    heroImage: "/assets/images/traitors-grafana-workshop.png",
    heroAlt:
      "Illustration of a Grafana workshop about a Traitors dashboard with SQL queries and dashboard panels.",
    tags: ["Grafana", "SQL", "Workshops", "Community"],
  },
];
