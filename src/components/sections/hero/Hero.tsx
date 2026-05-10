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
  location,
  introGrid,
  introCard,
} from "./Hero.css";
import { Links } from "../../layout/call-to-action/Links";
import { heroHighlights, profile } from "../../../data/profileData";

export const Hero = () => {
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
            <a className={primaryLink} href="#experience">
              View experience
            </a>
            <a className={secondaryLink} href={`mailto:${profile.email}`}>
              Get in touch
            </a>
          </div>
        </header>
      </section>
      <Links />
    </>
  );
};
