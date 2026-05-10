import { Hero } from "./components/sections/hero/Hero";
import { PageShell } from "./components/layout/page-shell/PageShell";
import { Footer } from "./components/layout/footer/Footer";
import { Projects } from "./components/sections/projects/Projects";
import { Talks } from "./components/sections/talks/Talks";
import { Experience } from "./components/sections/experience/Experience";
import { Observability } from "./components/sections/observability/Observability";

function App() {
  return (
    <PageShell>
      <Hero />
      <Experience />
      <Projects />
      <Observability />
      <Talks />
      <Footer />
    </PageShell>
  );
}

export default App;
