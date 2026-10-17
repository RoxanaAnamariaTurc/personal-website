import { getTelemetryConsent } from "./privacy/telemetryConsent";

export type ObservabilityRoute = "faro-oss" | "faro-cloud" | "otel";

export function getObservabilityRoute(): ObservabilityRoute {
  if (import.meta.env.VITE_FARO_OSS_DEMO === "true") return "faro-oss";
  if (import.meta.env.PROD || import.meta.env.VITE_FARO_CLOUD_DEMO === "true") return "faro-cloud";
  return "otel";
}

let startPromise: Promise<void> | undefined;

export function initObservability(): Promise<void> {
  if (startPromise) return startPromise;

  startPromise = (async () => {
    if (getObservabilityRoute() !== "otel") {
      const { initFaro } = await import("./faro");
      initFaro();
    } else {
      const { initTelemetry } = await import("./telemetry");
      initTelemetry();
    }
  })();

  return startPromise;
}

export async function recordFaroNavigation(
  target: string,
  source: "hero" | "section-nav",
): Promise<void> {
  if (getObservabilityRoute() === "otel" || getTelemetryConsent() !== "accepted") return;

  try {
    await initObservability();
    const { recordTalkNavigation } = await import("./faro");
    recordTalkNavigation(target, source);
  } catch (error) {
    // A telemetry failure must not interrupt the visitor's navigation.
    console.warn("Could not record Faro navigation", error);
  }
}
