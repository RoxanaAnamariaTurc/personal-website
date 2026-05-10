import type { ProjectProps } from "../../../../data/projectsData";
import {
  projectCard,
  projectVisual,
  imgCard,
  projectImage,
  fallbackVisual,
  detailsCard,
  projectEyebrow,
  projectTitle,
  projectDescription,
  projectImpact,
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
    <article className={projectCard}>
      <div className={projectVisual}>
        {project.imgLink ? (
          <div className={imgCard}>
            <img
              src={project.imgLink}
              alt={project.name}
              className={projectImage}
            />
          </div>
        ) : (
          <div className={fallbackVisual}>{project.name}</div>
        )}
      </div>
      <div className={detailsCard}>
        {project.eyebrow && <p className={projectEyebrow}>{project.eyebrow}</p>}
        <h2 className={projectTitle}>{project.name}</h2>
        <p className={projectDescription}>
          {project.description ?? "No description available."}
        </p>
        {project.impact && <p className={projectImpact}>{project.impact}</p>}
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
          {project.html_url && !project.hideSourceLink && (
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
  );
};
