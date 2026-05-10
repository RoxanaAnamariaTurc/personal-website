import { experienceData } from "../../../data/experienceData";
import {
  experienceCard,
  experienceGrid,
  experienceHeader,
  experienceMeta,
  experienceSection,
  experienceStack,
  experienceStackItem,
  eyebrow,
  highlightList,
  impactLabel,
  roleSummary,
  sectionHeading,
} from "./Experience.css";

export const Experience = () => {
  return (
    <section id="experience" className={experienceSection}>
      <div className={experienceHeader}>
        <h2 className={sectionHeading}>Experience</h2>
      </div>

      <div className={experienceGrid}>
        {experienceData.map((item) => (
          <article
            className={experienceCard}
            key={`${item.company}-${item.focus}`}
          >
            <div>
              <p className={eyebrow}>{item.focus}</p>
              <h3>{item.company}</h3>
              <p>{item.role}</p>
              <p className={experienceMeta}>
                {item.location} / {item.period}
              </p>
              <p className={roleSummary}>{item.summary}</p>
            </div>

            <ul className={experienceStack}>
              {item.stack.map((skill) => (
                <li className={experienceStackItem} key={skill}>
                  {skill}
                </li>
              ))}
            </ul>

            <div>
              <p className={impactLabel}>Impact</p>
              <ul className={highlightList}>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
