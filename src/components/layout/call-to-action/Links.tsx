import { links, nav, link } from "./Links.css";

const smoothScrollTo = (targetId: string, duration: number = 1200) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  targetId: string
) => {
  e.preventDefault();
  smoothScrollTo(targetId);
};

export const Links = () => {
  return (
    <div className={links}>
      <nav className={nav}>
        <a
          className={link}
          href="#projects"
          onClick={(e) => handleNavClick(e, "projects")}
        >
          Projects
        </a>
        <a
          className={link}
          href="#talks"
          onClick={(e) => handleNavClick(e, "talks")}
        >
          Talks
        </a>
        <a
          className={link}
          href="#about"
          onClick={(e) => handleNavClick(e, "about")}
        >
          About
        </a>
        <a
          className={link}
          href="#contact"
          onClick={(e) => handleNavClick(e, "contact")}
        >
          Contact
        </a>
      </nav>
    </div>
  );
};
