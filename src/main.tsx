import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./ui/tokens/global.css.ts";
import { initTelemetry } from "./telemetry";
import { getTelemetryConsent } from "./privacy/telemetryConsent";
import App from "./App.tsx";

// Telemetry is optional and must not start until the visitor has opted in.
if (getTelemetryConsent() === "accepted") {
  initTelemetry();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
