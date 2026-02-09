import React from "react";
import {
  type ProjectProps,
  projectOverrides,
} from "../../../data/projectsData";
import { Project } from "./project/Project";
import { projectsSection, projectsWrapper, sectionTitle } from "./Projects.css";

export const Projects = () => {
  const [projects, setProjects] = React.useState<ProjectProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchProjects = async () => {
    const response = await fetch(
      "https://api.github.com/users/roxanaanamariaturc/repos",
    );
    const data = await response.json();
    const mapped: ProjectProps[] = data
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
          // language: repo.language,
          topics: repo.topics ?? [],
          html_url: repo.html_url,
          ...overrides,
        };
      });
    setProjects(mapped);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <div>Loading projects...</div>;

  return (
    <section id="projects" className={projectsWrapper}>
      <h2 className={sectionTitle}>Projects</h2>

      <div className={projectsSection}>
        {projects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};
