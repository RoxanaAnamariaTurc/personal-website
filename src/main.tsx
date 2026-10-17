import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./ui/tokens/global.css.ts";
import { initObservability } from "./observability";
import { getTelemetryConsent } from "./privacy/telemetryConsent";
import App from "./App.tsx";

// Telemetry is optional and must not start until the visitor has opted in.
if (getTelemetryConsent() === "accepted") {
  void initObservability().catch((error: unknown) => console.error("Observability failed to start", error));
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
