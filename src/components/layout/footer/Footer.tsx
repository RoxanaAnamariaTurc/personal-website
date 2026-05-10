import { profile } from "../../../data/profileData";
import {
  footer,
  footerActions,
  footerCopy,
  footerLink,
  footerMeta,
  footerTitle,
} from "./Footer.css";

export const Footer = () => {
  return (
    <footer className={footer}>
      <div>
        <h2 className={footerTitle}>Let&apos;s build clear, observable UI.</h2>
        <p className={footerCopy}>
          Open to conversations about frontend engineering, accessibility,
          observability, design systems, and data-heavy product experiences.
        </p>
      </div>
      <div className={footerActions}>
        <a className={footerLink} href={`mailto:${profile.email}`}>
          Email
        </a>
        <a className={footerLink} href={profile.linkedIn}>
          LinkedIn
        </a>
        <a className={footerLink} href={profile.github}>
          GitHub
        </a>
      </div>
      <p className={footerMeta}>
        Made by Roxana using React in {new Date().getFullYear()}
      </p>
    </footer>
  );
};
