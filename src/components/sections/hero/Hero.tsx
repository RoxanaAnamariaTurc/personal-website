import { useState, type MouseEvent } from "react";
import {
  section,
  header,
  img,
  imagePicture,
  imageWrapper,
  imageOverlay,
  headingText,
  badgesWrapper,
  badge,
  intro,
  role,
  heroActions,
  primaryLink,
  secondaryLink,
  resetDemoButton,
  location,
  introGrid,
  introCard,
} from "./Hero.css";
import { Links } from "../../layout/call-to-action/Links";
import { heroHighlights, profile } from "../../../data/profileData";
import { recordFaroNavigation } from "../../../observability";
import { getTelemetryConsent } from "../../../privacy/telemetryConsent";

export const Hero = () => {
  const simulateNavigationFailure = import.meta.env.DEV &&
    import.meta.env.VITE_FARO_OSS_DEMO === "true" &&
    new URLSearchParams(window.location.search).get("demo") === "navigation-failure";
  const [navigationStuck, setNavigationStuck] = useState(false);
  const [demoMessage, setDemoMessage] = useState("");

  const viewExperience = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (!simulateNavigationFailure) {
      void recordFaroNavigation("experience", "hero");
      return;
    }

    event.preventDefault();
    if (navigationStuck) return;
    if (getTelemetryConsent() !== "accepted") {
      setDemoMessage("Accept telemetry in Privacy settings before recording the demo.");
      return;
    }

    setNavigationStuck(true);
    setDemoMessage("");
    await recordFaroNavigation("experience", "hero");
    // Controlled local failure on a real interaction, not a discovered app bug.
    // Faro captures console.error; preventDefault leaves the visitor on this section.
    console.error(new Error("Talk demo: navigation to #experience failed"));
  };

  return (
    <>
      <section className={section}>
        <div className={imageWrapper}>
          <div className={imageOverlay} />
          <picture className={imagePicture}>
            <source
              type="image/webp"
              srcSet="/assets/images/hero-palms-720.webp 720w, /assets/images/hero-palms-1080.webp 1080w, /assets/images/hero-palms-1440.webp 1440w"
              sizes="(max-width: 768px) calc(100vw - 32px), calc((100vw - 32px) / 2)"
            />
            <img
              className={img}
              src="/assets/images/hero-palms-1080.jpeg"
              alt="Image of Roxana"
              width="1080"
              height="1440"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>
        <header className={header}>
          <p className={role}>{profile.role}</p>
          <h1 className={headingText}>{profile.name}</h1>
          <p className={intro}>{profile.positioning}</p>
          <div className={introGrid}>
            <article className={introCard}>
              <h2>Clarity</h2>
              <p>Turn complex workflows and system data into focused UI.</p>
            </article>
            <article className={introCard}>
              <h2>Performance</h2>
              <p>Keep interfaces responsive when the data gets dense.</p>
            </article>
            <article className={introCard}>
              <h2>Access</h2>
              <p>Build experiences that are usable under real pressure.</p>
            </article>
          </div>
          <p className={location}>{profile.location}</p>
          <div className={badgesWrapper}>
            {heroHighlights.map((highlight) => (
              <span className={badge} key={highlight}>
                {highlight}
              </span>
            ))}
          </div>
          <div className={heroActions}>
            <a
              className={primaryLink}
              href="#experience"
              data-faro-user-action-name="view-experience"
              aria-disabled={navigationStuck || undefined}
              aria-busy={navigationStuck || undefined}
              onClick={(event) => void viewExperience(event)}
            >
              {navigationStuck ? "Opening experience…" : "View experience"}
            </a>
            <a className={secondaryLink} href={`mailto:${profile.email}`}>
              Get in touch
            </a>
          </div>
          {simulateNavigationFailure && (
            <div>
              <p>Presentation simulation: View experience will get stuck.</p>
              <button
                className={resetDemoButton}
                type="button"
                onClick={() => {
                  setNavigationStuck(false);
                  setDemoMessage("");
                }}
              >
                Reset navigation demo
              </button>
              <p role="status">{demoMessage}</p>
            </div>
          )}
        </header>
      </section>
      <Links />
    </>
  );
};
