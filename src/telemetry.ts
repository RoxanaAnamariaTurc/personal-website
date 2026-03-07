import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import {
  SimpleSpanProcessor,
  BatchSpanProcessor,
} from "@opentelemetry/sdk-trace-web";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { XMLHttpRequestInstrumentation } from "@opentelemetry/instrumentation-xml-http-request";
import { UserInteractionInstrumentation } from "@opentelemetry/instrumentation-user-interaction";
import { trace } from "@opentelemetry/api";
import type { Metric } from "web-vitals";

/**
 * Initialise OpenTelemetry for the browser and export to Grafana Cloud.
 *
 * Required env variables (prefixed with VITE_ so Vite exposes them):
 *   VITE_OTEL_EXPORTER_OTLP_ENDPOINT  – e.g. https://otlp-gateway-prod-eu-west-2.grafana.net/otlp
 *   VITE_OTEL_EXPORTER_OTLP_AUTH      – Base64-encoded "<instanceId>:<token>"
 */
export function initTelemetry() {
  const otlpEndpoint = import.meta.env.VITE_OTEL_EXPORTER_OTLP_ENDPOINT;
  const otlpAuth = import.meta.env.VITE_OTEL_EXPORTER_OTLP_AUTH;

  if (!otlpEndpoint) {
    console.warn(
      "[telemetry] VITE_OTEL_EXPORTER_OTLP_ENDPOINT is not set – telemetry disabled.",
    );
    return;
  }

  // ── Resource ──────────────────────────────────────────────────────────
  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "personal-website",
    [ATTR_SERVICE_VERSION]: import.meta.env.VITE_APP_VERSION ?? "0.0.0",
    "deployment.environment": import.meta.env.MODE, // "development" | "production"
  });

  // ── Exporter ──────────────────────────────────────────────────────────
  const headers: Record<string, string> = {};
  if (otlpAuth) {
    headers["Authorization"] = `Basic ${otlpAuth}`;
  }

  const traceExporter = new OTLPTraceExporter({
    url: `${otlpEndpoint}/v1/traces`,
    headers,
  });

  // ── Provider ──────────────────────────────────────────────────────────
  const provider = new WebTracerProvider({
    resource,
    spanProcessors: [
      import.meta.env.DEV
        ? new SimpleSpanProcessor(traceExporter) // flush immediately during dev
        : new BatchSpanProcessor(traceExporter),
    ],
  });

  provider.register({
    contextManager: new ZoneContextManager(),
  });

  // ── Auto-instrumentations ─────────────────────────────────────────────
  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new FetchInstrumentation({
        // Only trace fetch calls to your own origin or known APIs
        propagateTraceHeaderCorsUrls: [/localhost/, /github\.com/],
        clearTimingResources: true,
      }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: [/localhost/, /github\.com/],
      }),
      new UserInteractionInstrumentation({
        eventNames: ["click"],
      }),
    ],
  });

  // ── Web Vitals ────────────────────────────────────────────────────────
  reportWebVitals();

  console.info("[telemetry] OpenTelemetry initialised → Grafana Cloud");
}

// ---------------------------------------------------------------------------
// Web Vitals → custom OTel spans
// ---------------------------------------------------------------------------
async function reportWebVitals() {
  const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import("web-vitals");

  const tracer = trace.getTracer("web-vitals");

  function sendVitalAsSpan(metric: Metric) {
    const span = tracer.startSpan(`web-vital.${metric.name}`, {
      attributes: {
        "web_vital.name": metric.name,
        "web_vital.id": metric.id,
        "web_vital.value": metric.value,
        "web_vital.rating": metric.rating, // "good" | "needs-improvement" | "poor"
        "web_vital.navigation_type": metric.navigationType,
      },
    });
    span.end();
  }

  onCLS(sendVitalAsSpan);
  onFCP(sendVitalAsSpan);
  onLCP(sendVitalAsSpan);
  onTTFB(sendVitalAsSpan);
  onINP(sendVitalAsSpan);
}
