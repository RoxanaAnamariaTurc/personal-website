import type { ProjectProps } from "../../../../data/projectsData";
import {
  projectCard,
  imgCard,
  projectImage,
  detailsCard,
  projectTitle,
  projectDescription,
  techList,
  techTag,
  cardActions,
  actionButton,
  primaryButton,
} from "./Project.css";

export const Project = (project: ProjectProps) => {
  return (
    <article className={projectCard}>
      <div className={imgCard}>
        <img
          src={project.imgLink}
          alt={project.title}
          className={projectImage}
        />
      </div>
      <div className={detailsCard}>
        <h2 className={projectTitle}>{project.title}</h2>
        <p className={projectDescription}>{project.description}</p>
        {project.technologies.length > 0 && (
          <ul className={techList}>
            {project.technologies.map((tech: string) => (
              <li key={tech} className={techTag}>
                {tech}
              </li>
            ))}
          </ul>
        )}
        <div className={cardActions}>
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${actionButton} ${primaryButton}`}
            >
              Live Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={actionButton}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
