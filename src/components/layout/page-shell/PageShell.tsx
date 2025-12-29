import { shell } from "./PageSell.css";

export const PageShell = ({ children }: { children: React.ReactNode }) => {
  return <div className={shell}>{children}</div>;
};
