import { aboutSection, aboutTitle } from "./About.css";

export const About = () => {
  return (
    <section id="about" className={aboutSection}>
      <h3 className={aboutTitle}>About</h3>
      <h4>
        I’m a frontend engineer who started my journey in tech in 2021. I’ve
        worked as an intern at Grafana Labs on the Design Systems team,
        contributing to scalable UI foundations used by thousands of developers.
        I’m currently a Graduate Software Engineer at BNY, building complex,
        high-performance interfaces for financial users. I care deeply about
        design systems, performance, and turning complex problems into clear,
        usable experiences.
      </h4>
    </section>
  );
};
