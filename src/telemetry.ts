import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-web";
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
  // Use SimpleSpanProcessor in ALL environments so spans are sent
  // immediately. BatchSpanProcessor buffers spans and loses them when the
  // user closes the tab before the next flush.
  const provider = new WebTracerProvider({
    resource,
    spanProcessors: [new SimpleSpanProcessor(traceExporter)],
  });

  provider.register({
    contextManager: new ZoneContextManager(),
  });

  // ── Auto-instrumentations ─────────────────────────────────────────────
  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new FetchInstrumentation({
        // Only propagate trace headers to origins that accept them.
        // Do NOT include third-party APIs (e.g. github.com) – they
        // reject the extra `traceparent` header during CORS preflight.
        propagateTraceHeaderCorsUrls: [/localhost/],
        clearTimingResources: true,
      }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: [/localhost/],
      }),
      new UserInteractionInstrumentation({
        eventNames: ["click"],
        // By default UserInteractionInstrumentation only emits spans
        // when a click triggers a fetch/XHR. Override to always emit.
        shouldPreventSpanCreation: () => false,
      }),
    ],
  });

  // ── Flush spans before the page is closed ─────────────────────────────
  // This catches any spans that haven't been sent yet (e.g. late web vitals).
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      provider.forceFlush().catch(() => {
        // best-effort – page is closing, nothing more we can do
      });
    }
  });

  // ── Page view span ────────────────────────────────────────────────────
  // Explicit page-view span so there is always at least one trace per visit,
  // independent of auto-instrumentations.
  const tracer = trace.getTracer("personal-website");
  const pageViewSpan = tracer.startSpan("page_view", {
    attributes: {
      "page.url": window.location.href,
      "page.path": window.location.pathname,
      "page.referrer": document.referrer || "direct",
      "browser.user_agent": navigator.userAgent,
      "browser.language": navigator.language,
      "screen.width": window.screen.width,
      "screen.height": window.screen.height,
    },
  });
  pageViewSpan.end();

  // ── Click tracking ─────────────────────────────────────────────────────
  // UserInteractionInstrumentation only emits spans when a click triggers
  // async work (fetch/XHR/timer). Add a manual listener so every click
  // produces a span, regardless of what the handler does.
  trackClicks(tracer);

  // ── Web Vitals ────────────────────────────────────────────────────────
  reportWebVitals();

  console.info("[telemetry] OpenTelemetry initialised → Grafana Cloud");
}

// ---------------------------------------------------------------------------
// Manual click tracking → custom OTel spans
// ---------------------------------------------------------------------------
function trackClicks(tracer: ReturnType<typeof trace.getTracer>) {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Walk up to find the nearest interactive element (button, link, etc.)
      const interactiveEl =
        target.closest("a, button, [role='button'], input, select, textarea") ??
        target;

      const tagName = interactiveEl.tagName.toLowerCase();
      const text = (interactiveEl.textContent ?? "").trim().slice(0, 100);
      const ariaLabel = interactiveEl.getAttribute("aria-label") ?? "";
      const href =
        interactiveEl instanceof HTMLAnchorElement
          ? interactiveEl.href
          : undefined;

      const span = tracer.startSpan("user_click", {
        attributes: {
          "click.tag": tagName,
          "click.text": text,
          "click.aria_label": ariaLabel,
          "click.page_path": window.location.pathname,
          ...(href ? { "click.href": href } : {}),
        },
      });
      span.end();
    },
    { capture: true },
  );
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
