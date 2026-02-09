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
  const technologies = [
    ...(project.language ? [project.language] : []),
    ...project.topics,
  ];

  return (
    <a
      href={project.html_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article className={projectCard}>
        {project.imgLink && (
          <div className={imgCard}>
            <img
              src={project.imgLink}
              alt={project.name}
              className={projectImage}
            />
          </div>
        )}
        <div className={detailsCard}>
          <h2 className={projectTitle}>{project.name}</h2>
          <p className={projectDescription}>
            {project.description ?? "No description available."}
          </p>
          {technologies.length > 0 && (
            <ul className={techList}>
              {technologies.map((tech: string) => (
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
            {project.html_url && (
              <a
                href={project.html_url}
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
    </a>
  );
};
