import { projects } from "../../../data/projectsData";
import { Project } from "./project/Project";
import { projectsSection, projectsWrapper, sectionTitle } from "./Projects.css";

export const Projects = () => {
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
