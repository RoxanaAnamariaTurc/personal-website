import { useState } from "react";
import { Hero } from "./components/sections/hero/Hero";
import { PageShell } from "./components/layout/page-shell/PageShell";
import { Footer } from "./components/layout/footer/Footer";
import { Projects } from "./components/sections/projects/Projects";
import { Talks } from "./components/sections/talks/Talks";
import { Experience } from "./components/sections/experience/Experience";
import { Observability } from "./components/sections/observability/Observability";
import { Writing } from "./components/sections/writing/Writing";
import { TelemetryConsent } from "./components/privacy/TelemetryConsent";
import {
  getTelemetryConsent,
  type TelemetryConsent as TelemetryPreference,
} from "./privacy/telemetryConsent";

function App() {
  const [telemetryPreference, setTelemetryPreference] =
    useState<TelemetryPreference>(getTelemetryConsent);
  const [privacySettingsOpen, setPrivacySettingsOpen] = useState(
    telemetryPreference === null,
  );

  return (
    <PageShell>
      <Hero />
      <Experience />
      <Projects />
      <Observability />
      <Writing />
      <Talks />
      <Footer onOpenPrivacySettings={() => setPrivacySettingsOpen(true)} />
      <TelemetryConsent
        preference={telemetryPreference}
        isOpen={privacySettingsOpen}
        onPreferenceChange={setTelemetryPreference}
        onClose={() => setPrivacySettingsOpen(false)}
      />
    </PageShell>
  );
}

export default App;
