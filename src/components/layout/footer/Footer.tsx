import { footer } from "./Footer.css";

export const Footer = () => {
  return (
    <footer className={footer}>
      Made by Roxana using React in {new Date().getFullYear()}
    </footer>
  );
};
