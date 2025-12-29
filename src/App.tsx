import { Hero } from "./components/sections/hero/Hero";
import { PageShell } from "./components/layout/page-shell/PageShell";
import { Footer } from "./components/layout/footer/Footer";
import { Projects } from "./components/sections/projects/Projects";
import { Talks } from "./components/sections/talks/Talks";
import { About } from "./components/sections/about/About";
import { Contact } from "./components/sections/contact/Contact";

function App() {
  return (
    <PageShell>
      <Hero />
      <Projects />
      <Talks />
      <About />
      <Contact />
      <Footer />
    </PageShell>
  );
}

export default App;
