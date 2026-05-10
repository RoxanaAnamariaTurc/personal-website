import { featuredProjects } from "../../../data/projectsData";
import { Project } from "./project/Project";
import {
  projectsIntro,
  projectsSection,
  projectsWrapper,
  sectionTitle,
} from "./Projects.css";

export const Projects = () => {
  return (
    <section id="projects" className={projectsWrapper}>
      <div className={projectsIntro}>
        <h2 className={sectionTitle}>Featured projects</h2>
      </div>
      <div className={projectsSection}>
        {featuredProjects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};
