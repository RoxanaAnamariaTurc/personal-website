export type TelemetryConsent = "accepted" | "declined" | null;

const TELEMETRY_CONSENT_KEY = "telemetry-consent";

export function getTelemetryConsent(): TelemetryConsent {
  const preference = window.localStorage.getItem(TELEMETRY_CONSENT_KEY);

  return preference === "accepted" || preference === "declined"
    ? preference
    : null;
}

export function setTelemetryConsent(preference: Exclude<TelemetryConsent, null>) {
  window.localStorage.setItem(TELEMETRY_CONSENT_KEY, preference);
}
