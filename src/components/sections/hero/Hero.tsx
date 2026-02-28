import {
  section,
  header,
  img,
  imageWrapper,
  imageOverlay,
  headingText,
  badgesWrapper,
  badge,
} from "./Hero.css";
import image from "../../../../public/assets/images/rox.jpeg";
import { Links } from "../../layout/call-to-action/Links";

export const Hero = () => {
  return (
    <>
      <section className={section}>
        <div className={imageWrapper}>
          <div className={imageOverlay} />
          <img className={img} src={image} alt="Image of Roxana" />
        </div>
        <header className={header}>
          <h1 className={headingText}>Frontend Engineer</h1>
          <p>Building UIs for everyone.</p>
          <div className={badgesWrapper}>
            <span className={badge}>Grafana Champion</span>
            <span className={badge}>React</span>
            <span className={badge}>Accessibility</span>
          </div>
        </header>
      </section>
      <Links />
    </>
  );
};
