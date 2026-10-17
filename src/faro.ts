import {
  faro,
  getWebInstrumentations,
  initializeFaro,
  ReactIntegration,
} from "@grafana/faro-react";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

// The Cloud collector address is part of the browser SDK configuration.
// It is separate from the server-side source-map upload API key.
const cloudCollectorUrl =
  "https://faro-collector-prod-eu-west-2.grafana.net/collect/c7e0111251efda31462f595f20264f49";

let faroInitialised = false;

export function initFaro() {
  if (faroInitialised) return;

  const isLocalDemo = import.meta.env.VITE_FARO_OSS_DEMO === "true";
  const url = isLocalDemo ? import.meta.env.VITE_FARO_COLLECTOR_URL : cloudCollectorUrl;
  if (!url) throw new Error("The local Faro collector URL is missing");

  initializeFaro({
    url,
    // Include images, scripts and styles as well as fetch/XHR resource timings.
    trackResources: true,
    app: {
      name: "personal-website",
      version: import.meta.env.VITE_APP_VERSION ?? "1.0.0",
      environment: isLocalDemo ? "local-demo" : "production",
    },
    // The local stack has no trace destination. Cloud receives browser traces.
    ...(isLocalDemo
      ? {}
      : {
          instrumentations: [
            ...getWebInstrumentations(),
            new TracingInstrumentation(),
            // This site has no React Router, so there is no router configuration.
            new ReactIntegration(),
          ],
        }),
  });
  faroInitialised = true;
}

export function recordTalkDemoError(): boolean {
  if (!faro.api) return false;

  // A controlled, clearly labelled test signal; no visitor data is included.
  faro.api.pushEvent("talk_demo_error_triggered");
  faro.api.pushError(new Error("Talk demo: observability preview failed"));
  return true;
}

export function recordTalkNavigation(target: string, source: "hero" | "section-nav") {
  faro.api?.pushEvent(
    "talk_site_navigation",
    { target, source },
    "talk-demo",
    { skipDedupe: true },
  );
}
