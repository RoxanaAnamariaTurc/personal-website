import { useState } from "react";
import { getObservabilityRoute } from "../../../observability";
import { getTelemetryConsent } from "../../../privacy/telemetryConsent";
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
  demoButton,
  demoCallout,
  demoStatus,
  observabilityCard,
  observabilityContent,
  observabilitySection,
  skillGroup,
  skillList,
  sectionHeading,
} from "./Observability.css";

export const Observability = () => {
  const observabilityRoute = getObservabilityRoute();
  const isFaroDemo = observabilityRoute === "faro-oss";
  const [demoMessage, setDemoMessage] = useState("");
  const triggerDemoError = async () => {
    if (getTelemetryConsent() !== "accepted") {
      setDemoMessage("Accept optional telemetry first, then try again.");
      return;
    }

    try {
      const { recordTalkDemoError } = await import("../../../faro");
      setDemoMessage(
        recordTalkDemoError()
          ? "Controlled error created. Check Alloy and Grafana Explore to confirm delivery."
          : "Faro is still starting. Please try again.",
      );
    } catch {
      setDemoMessage("The demo signal could not be created.");
    }
  };

  return (
    <section id="observability" className={observabilitySection}>
      <div className={observabilityContent}>
        <div>
          <h2 className={sectionHeading}>Observability</h2>
        </div>

        <div
          className={architecture}
          aria-label={isFaroDemo ? "Local Faro architecture" : observabilityRoute === "faro-cloud" ? "Grafana Cloud Faro architecture" : "OpenTelemetry architecture"}
        >
          {(isFaroDemo
            ? ["Browser Faro SDK", "Alloy receiver", "Loki", "Grafana Explore"]
            : observabilityRoute === "faro-cloud"
              ? ["Browser", "Grafana Faro", "Grafana Cloud", "Frontend Observability"]
              : ["Browser", "OpenTelemetry", "Netlify proxy", "Grafana Tempo"]
          ).map((step) => (
            <span className={architectureStep} key={step}>{step}</span>
          ))}
        </div>
      </div>

      {isFaroDemo && (
        <div className={demoCallout}>
          <p>Local talk demo: this button creates a controlled test error.</p>
          <button
            className={demoButton}
            type="button"
            data-faro-user-action-name="create-demo-error"
            onClick={() => void triggerDemoError()}
          >
            Create demo error
          </button>
          <p className={demoStatus} role="status">{demoMessage}</p>
        </div>
      )}

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
