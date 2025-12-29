import {
  section,
  header,
  img,
  imageWrapper,
  imageOverlay,
  headingText,
} from "./Hero.css";
import image from "../../../assets/images/rox.jpeg";
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
        </header>
      </section>
      <Links />
    </>
  );
};
