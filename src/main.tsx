import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./ui/tokens/global.css.ts";
import { initTelemetry } from "./telemetry";
import App from "./App.tsx";

// Initialise OpenTelemetry before rendering so page-load spans are captured.
initTelemetry();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
