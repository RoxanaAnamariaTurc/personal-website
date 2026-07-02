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

const navItems = [
  { label: "Experience", target: "experience" },
  { label: "Projects", target: "projects" },
  { label: "Observability", target: "observability" },
  { label: "Writing", target: "writing" },
  { label: "Talks", target: "talks" },
];

export const Links = () => {
  return (
    <div className={links}>
      <nav className={nav}>
        {navItems.map((item) => (
          <a
            className={link}
            href={`#${item.target}`}
            key={item.target}
            onClick={(e) => handleNavClick(e, item.target)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};
