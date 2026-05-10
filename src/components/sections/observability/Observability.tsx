import {
  communityHighlights,
  skillGroups,
} from "../../../data/profileData";
import { observabilityWork } from "../../../data/experienceData";
import {
  architecture,
  architectureStep,
  communityGrid,
  communityList,
  observabilityCard,
  observabilityContent,
  observabilitySection,
  skillGroup,
  skillList,
  sectionHeading,
} from "./Observability.css";

export const Observability = () => {
  return (
    <section id="observability" className={observabilitySection}>
      <div className={observabilityContent}>
        <div>
          <h2 className={sectionHeading}>Observability</h2>
        </div>

        <div className={architecture} aria-label="OpenTelemetry architecture">
          <span className={architectureStep}>Browser</span>
          <span className={architectureStep}>OpenTelemetry</span>
          <span className={architectureStep}>Netlify proxy</span>
          <span className={architectureStep}>Grafana Tempo</span>
        </div>
      </div>

      <div className={communityGrid}>
        <article className={observabilityCard}>
          <h3>Observability projects</h3>
          <ul className={communityList}>
            {observabilityWork.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={observabilityCard}>
          <h3>Community and open source</h3>
          <ul className={communityList}>
            {communityHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className={communityGrid}>
        {skillGroups.map((group) => (
          <article className={skillGroup} key={group.title}>
            <h3>{group.title}</h3>
            <ul className={skillList}>
              {group.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
