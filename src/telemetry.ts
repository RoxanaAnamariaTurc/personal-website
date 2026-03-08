import { trace, SpanStatusCode } from "@opentelemetry/api";
import {
  WebTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-web";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { XMLHttpRequestInstrumentation } from "@opentelemetry/instrumentation-xml-http-request";
import type { Metric } from "web-vitals";

const SERVICE_NAME = "personal-website";

export function getAppTracer() {
  return trace.getTracer(SERVICE_NAME);
}

export function initTelemetry() {
  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: SERVICE_NAME,
    [ATTR_SERVICE_VERSION]: import.meta.env.VITE_APP_VERSION ?? "0.0.0",
    "deployment.environment": import.meta.env.MODE,
  });

  const exporter = new OTLPTraceExporter({
    url: "/.netlify/functions/traces",
  });

  const provider = new WebTracerProvider({
    resource,
    spanProcessors: [new SimpleSpanProcessor(exporter)],
  });

  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new FetchInstrumentation({
        // Do not propagate trace headers to GitHub from the browser.
        // GitHub API calls can fail CORS preflight if extra tracing headers are sent.
        propagateTraceHeaderCorsUrls: [/localhost/],
        clearTimingResources: true,
        applyCustomAttributesOnSpan: (span, request, response) => {
          const url =
            typeof request === "string"
              ? request
              : request instanceof Request
                ? request.url
                : String(request);

          span.setAttribute("app.request.url", url);

          if (url.includes("api.github.com")) {
            span.setAttribute("app.request.kind", "github_api");
          }

          if (response && response instanceof Response) {
            span.setAttribute("app.response.ok", response.ok);
            if (response.status !== undefined) {
              span.setAttribute("app.response.status", response.status);
            }
          }
        },
      }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: [/localhost/],
      }),
    ],
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      provider.forceFlush().catch(() => {
        // best effort only
      });
    }
  });

  const tracer = getAppTracer();

  const startupSpan = tracer.startSpan("app.startup", {
    attributes: {
      "page.url": window.location.href,
      "page.path": window.location.pathname,
      "page.referrer": document.referrer || "direct",
      "browser.language": navigator.language,
      "screen.width": window.screen.width,
      "screen.height": window.screen.height,
    },
  });
  startupSpan.end();

  const pageViewSpan = tracer.startSpan("page_view", {
    attributes: {
      "page.url": window.location.href,
      "page.path": window.location.pathname,
      "page.title": document.title,
    },
  });
  pageViewSpan.end();

  trackClicks(tracer);
  reportWebVitals();

  console.info("[telemetry] OpenTelemetry initialised");
}

function trackClicks(tracer: ReturnType<typeof trace.getTracer>) {
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl =
        target.closest("a, button, [role='button'], input, select, textarea") ??
        target;

      const text = (interactiveEl.textContent ?? "").trim().slice(0, 120);
      const tagName = interactiveEl.tagName.toLowerCase();
      const ariaLabel = interactiveEl.getAttribute("aria-label") ?? "";
      const id = interactiveEl.id ?? "";
      const className =
        typeof interactiveEl.className === "string"
          ? interactiveEl.className.slice(0, 120)
          : "";
      const href =
        interactiveEl instanceof HTMLAnchorElement ? interactiveEl.href : "";

      const span = tracer.startSpan("user_click", {
        attributes: {
          "click.tag": tagName,
          "click.text": text,
          "click.aria_label": ariaLabel,
          "click.id": id,
          "click.class": className,
          "click.href": href,
          "click.page_path": window.location.pathname,
        },
      });

      span.end();
    },
    { capture: true },
  );
}

async function reportWebVitals() {
  const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import("web-vitals");
  const tracer = trace.getTracer("web-vitals");

  function sendVitalAsSpan(metric: Metric) {
    const span = tracer.startSpan(`web-vital.${metric.name}`, {
      attributes: {
        "web_vital.name": metric.name,
        "web_vital.id": metric.id,
        "web_vital.value": metric.value,
        "web_vital.rating": metric.rating,
        "web_vital.navigation_type": metric.navigationType,
      },
    });

    span.setStatus({ code: SpanStatusCode.OK });
    span.end();
  }

  onCLS(sendVitalAsSpan);
  onFCP(sendVitalAsSpan);
  onLCP(sendVitalAsSpan);
  onTTFB(sendVitalAsSpan);
  onINP(sendVitalAsSpan);
}
