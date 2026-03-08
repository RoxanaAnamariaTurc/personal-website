import React from "react";
import {
  type ProjectProps,
  projectOverrides,
} from "../../../data/projectsData";
import { Project } from "./project/Project";
import { ProjectsLoading } from "./loading/ProjectsLoading";
import {
  projectsSection,
  projectsWrapper,
  sectionTitle,
  searchInput,
} from "./Projects.css";
import { getAppTracer } from "../../../telemetry";
import { SpanStatusCode } from "@opentelemetry/api";

export const Projects = () => {
  const [projects, setProjects] = React.useState<ProjectProps[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [inputValue, setInputValue] = React.useState("");

  const filteredProjects = React.useMemo(
    () =>
      projects.filter((project) =>
        project.topics.some((topic) =>
          topic.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      ),
    [projects, inputValue],
  );

  const tracer = getAppTracer();

  const fetchProjects = async () => {
    const span = tracer.startSpan("load_projects", {
      attributes: {
        "projects.source": "github",
        "projects.user": "roxanaanamariaturc",
      },
    });

    try {
      const response = await fetch(
        "https://api.github.com/users/roxanaanamariaturc/repos",
      );

      span.setAttribute("github.http_status", response.status);

      if (!response.ok) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: `GitHub request failed with status ${response.status}`,
        });
        throw new Error(`GitHub request failed: ${response.status}`);
      }

      const data = await response.json();

      const mapped = data
        .filter(
          (repo: any) =>
            repo.name !== "grafana" && repo.name !== "personal-website",
        )
        .map((repo: any) => {
          const overrides = projectOverrides[repo.name] ?? {};
          return {
            id: repo.id,
            name: repo.name
              .replace(/[-_]/g, " ")
              .replace(/([a-z])([A-Z])/g, "$1 $2")
              .replace(/\b\w/g, (c: string) => c.toUpperCase()),
            description: repo.description,
            topics: repo.topics ?? [],
            html_url: repo.html_url,
            updated_at: repo.updated_at,
            ...overrides,
          };
        })
        .sort(
          (a: ProjectProps, b: ProjectProps) =>
            new Date(b.updated_at ?? 0).getTime() -
            new Date(a.updated_at ?? 0).getTime(),
        );

      span.setAttribute("projects.count", mapped.length);

      setProjects(mapped);
      setLoading(false);
      span.setStatus({ code: SpanStatusCode.OK });
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : "Unknown error",
      });
      setLoading(false);
    } finally {
      span.end();
    }
  };
  React.useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <ProjectsLoading />;

  return (
    <section id="projects" className={projectsWrapper}>
      <h2 className={sectionTitle}>Projects</h2>
      <input
        className={searchInput}
        type="text"
        aria-label="Search for a project by technology used"
        placeholder="Search for a project by technology used"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className={projectsSection}>
        {filteredProjects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};
