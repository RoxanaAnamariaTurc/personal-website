import {
  contactMeta,
  dot,
  contactParagraphs,
  contactTitle,
} from "./Contact.css";

export const Contact = () => {
  return (
    <section id="contact">
      <h3 className={contactTitle}>Contact</h3>
      <div className={contactMeta}>
        <span className={contactParagraphs}>roxana.turc25@gmail.com</span>
        <span className={dot}>•</span>
        <span className={contactParagraphs}>
          <a
            className={contactParagraphs}
            href="https://www.linkedin.com/in/roxana-anamaria-turc-78a547127/"
          >
            LinkedIn
          </a>
        </span>
        <span className={dot}>•</span>
        <span className={contactParagraphs}>
          {" "}
          <a
            className={contactParagraphs}
            href="https://github.com/RoxanaAnamariaTurc"
          >
            GitHub
          </a>
        </span>
      </div>
    </section>
  );
};
