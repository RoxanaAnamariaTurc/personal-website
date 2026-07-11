import { useEffect, useRef } from "react";
import { initTelemetry } from "../../telemetry";
import {
  setTelemetryConsent,
  type TelemetryConsent as TelemetryPreference,
} from "../../privacy/telemetryConsent";
import {
  acceptButton,
  actions,
  backdrop,
  closeButton,
  copy,
  declineButton,
  panel,
  title,
  titleRow,
} from "./TelemetryConsent.css";

type TelemetryConsentProps = {
  preference: TelemetryPreference;
  isOpen: boolean;
  onPreferenceChange: (preference: Exclude<TelemetryPreference, null>) => void;
  onClose: () => void;
};

export function TelemetryConsent({
  preference,
  isOpen,
  onPreferenceChange,
  onClose,
}: TelemetryConsentProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isOpen) titleRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const accept = () => {
    setTelemetryConsent("accepted");
    onPreferenceChange("accepted");
    initTelemetry();
    onClose();
  };

  const decline = () => {
    const wasAccepted = preference === "accepted";
    setTelemetryConsent("declined");
    onPreferenceChange("declined");

    if (wasAccepted) {
      window.location.reload();
      return;
    }

    onClose();
  };

  return (
    <div className={backdrop} data-telemetry-ignore="true">
      <section
        className={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="telemetry-consent-title"
        aria-describedby="telemetry-consent-description"
      >
        <div className={titleRow}>
          <h2
            className={title}
            id="telemetry-consent-title"
            ref={titleRef}
            tabIndex={-1}
          >
            Optional performance telemetry
          </h2>
          {preference !== null && (
            <button
              className={closeButton}
              type="button"
              aria-label="Close privacy settings"
              onClick={onClose}
            >
              ×
            </button>
          )}
        </div>
        <p className={copy} id="telemetry-consent-description">
          I use OpenTelemetry to understand how this website loads and how
          visitors interact with it. If you accept, page performance,
          navigation and click information is sent to Grafana Cloud. It is not
          used for advertising, and declining will not affect the website.
        </p>
        <div className={actions}>
          <button className={acceptButton} type="button" onClick={accept}>
            Accept telemetry
          </button>
          <button className={declineButton} type="button" onClick={decline}>
            Decline
          </button>
        </div>
      </section>
    </div>
  );
}
