# OpenTelemetry + Grafana Cloud Setup Guide

A step-by-step guide for adding browser telemetry to a Vite + React app and visualising it in Grafana Cloud, deployed on Netlify.

---

## Table of Contents

1. [Why Tempo and not Prometheus?](#why-tempo-and-not-prometheus)
2. [Install OpenTelemetry packages](#1-install-opentelemetry-packages)
3. [Create the telemetry module](#2-create-the-telemetry-module)
4. [Wire telemetry into the app](#3-wire-telemetry-into-the-app)
5. [Set up environment variables locally](#4-set-up-environment-variables-locally)
6. [Get your Grafana Cloud credentials](#5-get-your-grafana-cloud-credentials)
7. [Set up environment variables in Netlify](#6-set-up-environment-variables-in-netlify)
8. [Deploy and verify](#7-deploy-and-verify)
9. [Create a Grafana dashboard](#8-create-a-grafana-dashboard)

---

## Why Tempo and not Prometheus?

This is the most important conceptual question before setting anything up.

### Traces vs Metrics — two different types of data

|                      | **Traces (Tempo)**                                                                     | **Metrics (Prometheus)**                                                              |
| -------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **What it stores**   | Individual events/spans — "this user loaded a page and it took 1.2s"                   | Aggregated numeric time series — "average page load was 1.1s over the last 5 minutes" |
| **Data source**      | Tempo                                                                                  | Prometheus / Mimir                                                                    |
| **Best for**         | Debugging specific requests, understanding user journeys, seeing individual page loads | Monitoring aggregated trends, alerting on thresholds, long-term numeric trends        |
| **How data arrives** | OTLP trace exporter sends spans                                                        | A metrics collector scrapes or receives numeric values at regular intervals           |

### Why we use Tempo for this project

Our OpenTelemetry setup sends **spans** (traces) — individual records of events like:

- "A user loaded the page and it took 843ms"
- "The LCP web vital was 1.2s and rated 'good'"
- "A user clicked a button"

These are **traces**, so they go to **Tempo**, which is Grafana's trace storage backend.

**Prometheus** would be the right choice if we were sending numeric counters/gauges from a backend server — e.g. "number of HTTP 500 errors per minute" or "current memory usage". Our browser app doesn't produce that kind of data.

### Can I use both?

Yes! If you later add a backend API, you could send **metrics** to Prometheus/Mimir and **traces** to Tempo, and correlate them in the same Grafana dashboard. Grafana Cloud's **TraceQL metrics** feature also lets you derive metric-like aggregations (rate, count, percentiles) directly from trace data stored in Tempo, giving you some metrics-like visualisations without needing Prometheus.

---

## 1. Install OpenTelemetry packages

From the project root, install the required dependencies:

```bash
npm install \
  @opentelemetry/api \
  @opentelemetry/sdk-trace-web \
  @opentelemetry/resources \
  @opentelemetry/semantic-conventions \
  @opentelemetry/exporter-trace-otlp-http \
  @opentelemetry/instrumentation \
  @opentelemetry/instrumentation-document-load \
  @opentelemetry/instrumentation-fetch \
  @opentelemetry/instrumentation-xml-http-request \
  @opentelemetry/instrumentation-user-interaction \
  @opentelemetry/context-zone \
  web-vitals
```

### What each package does

| Package                                           | Purpose                                              |
| ------------------------------------------------- | ---------------------------------------------------- |
| `@opentelemetry/api`                              | Core OTel API (trace, context)                       |
| `@opentelemetry/sdk-trace-web`                    | Browser-specific trace SDK                           |
| `@opentelemetry/resources`                        | Attach metadata (service name, version) to all spans |
| `@opentelemetry/semantic-conventions`             | Standard attribute names                             |
| `@opentelemetry/exporter-trace-otlp-http`         | Sends spans to Grafana Cloud via OTLP/HTTP           |
| `@opentelemetry/instrumentation`                  | Base instrumentation registration                    |
| `@opentelemetry/instrumentation-document-load`    | Auto-traces page load timing                         |
| `@opentelemetry/instrumentation-fetch`            | Auto-traces `fetch()` calls                          |
| `@opentelemetry/instrumentation-xml-http-request` | Auto-traces `XMLHttpRequest` calls                   |
| `@opentelemetry/instrumentation-user-interaction` | Auto-traces user clicks                              |
| `@opentelemetry/context-zone`                     | Zone.js-based context propagation for the browser    |
| `web-vitals`                                      | Google's Web Vitals library (LCP, CLS, INP, etc.)    |

---

## 2. Create the telemetry module

Create `src/telemetry.ts`:

```typescript
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

export function initTelemetry() {
  const otlpEndpoint = import.meta.env.VITE_OTEL_EXPORTER_OTLP_ENDPOINT;
  const otlpAuth = import.meta.env.VITE_OTEL_EXPORTER_OTLP_AUTH;

  if (!otlpEndpoint) {
    console.warn(
      "[telemetry] VITE_OTEL_EXPORTER_OTLP_ENDPOINT is not set – telemetry disabled.",
    );
    return;
  }

  // Resource — metadata attached to every span
  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: "personal-website",
    [ATTR_SERVICE_VERSION]: import.meta.env.VITE_APP_VERSION ?? "0.0.0",
    "deployment.environment": import.meta.env.MODE,
  });

  // Exporter — sends spans to Grafana Cloud
  const headers: Record<string, string> = {};
  if (otlpAuth) {
    headers["Authorization"] = `Basic ${otlpAuth}`;
  }

  const traceExporter = new OTLPTraceExporter({
    url: `${otlpEndpoint}/v1/traces`,
    headers,
  });

  // Provider — manages span creation and processing
  // Use SimpleSpanProcessor in all environments to prevent span loss
  // on page close (BatchSpanProcessor buffers and loses unflushed spans).
  const provider = new WebTracerProvider({
    resource,
    spanProcessors: [new SimpleSpanProcessor(traceExporter)],
  });

  provider.register({
    contextManager: new ZoneContextManager(),
  });

  // Auto-instrumentations — these create spans automatically
  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls: [/localhost/, /github\.com/],
        clearTimingResources: true,
      }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: [/localhost/, /github\.com/],
      }),
      new UserInteractionInstrumentation({
        eventNames: ["click"],
        // By default only emits spans when a click triggers fetch/XHR.
        // Override to always emit click spans.
        shouldPreventSpanCreation: () => false,
      }),
    ],
  });

  // Flush spans before the page is closed
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      provider.forceFlush().catch(() => {});
    }
  });

  // Explicit page-view span — guarantees at least one trace per visit
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

  // Web Vitals — reported as custom spans
  reportWebVitals();

  console.info("[telemetry] OpenTelemetry initialised → Grafana Cloud");
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
    span.end();
  }

  onCLS(sendVitalAsSpan);
  onFCP(sendVitalAsSpan);
  onLCP(sendVitalAsSpan);
  onTTFB(sendVitalAsSpan);
  onINP(sendVitalAsSpan);
}
```

### Key concepts

- **SimpleSpanProcessor** is used in all environments so spans are sent immediately. `BatchSpanProcessor` buffers spans and loses them when the user closes the tab before the next flush — a very common cause of missing data in browser telemetry.
- **Page-unload flush**: a `visibilitychange` listener calls `provider.forceFlush()` when the page goes hidden, catching any late spans (e.g. CLS, INP).
- **Explicit `page_view` span**: guarantees at least one trace per visit, independent of auto-instrumentations.
- **`shouldPreventSpanCreation: () => false`**: forces the `UserInteractionInstrumentation` to emit click spans even when the click doesn't trigger a network request.
- **Web Vitals as spans**: each Core Web Vital measurement becomes a span with attributes like `web_vital.rating` ("good" / "needs-improvement" / "poor").

---

## 3. Wire telemetry into the app

In `src/main.tsx`, import and call `initTelemetry()` **before** React renders so that the page-load instrumentation captures the full lifecycle:

```typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./ui/tokens/global.css.ts";
import { initTelemetry } from "./telemetry";
import App from "./App.tsx";

// Initialise before rendering so page-load spans are captured
initTelemetry();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## 4. Set up environment variables locally

Create a `.env` file in the project root (this file is gitignored):

```dotenv
VITE_OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp-gateway-prod-eu-west-2.grafana.net/otlp
VITE_OTEL_EXPORTER_OTLP_AUTH=<your-base64-auth-string>
VITE_APP_VERSION=0.0.0
```

> **Why the `VITE_` prefix?** Vite only exposes environment variables to client code if they start with `VITE_`. These values are baked into the bundle at build time.

---

## 5. Get your Grafana Cloud credentials

1. Log in to **Grafana Cloud**
2. Go to **your stack → Connections → OpenTelemetry (OTLP)**
3. Click **Configure** or **Generate now**
4. Grafana will show you something like:

   ```bash
   export OTEL_EXPORTER_OTLP_ENDPOINT="https://otlp-gateway-prod-eu-west-2.grafana.net/otlp"
   export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Basic MTA1Nzc4Mzpn..."
   ```

5. The **endpoint** goes into `VITE_OTEL_EXPORTER_OTLP_ENDPOINT`
6. The **Base64 string after `Basic `** goes into `VITE_OTEL_EXPORTER_OTLP_AUTH` (just the encoded part, not the word "Basic" — the code adds that prefix automatically)

---

## 6. Set up environment variables in Netlify

1. Go to **Netlify → your site → Site configuration → Environment variables**
2. Add these three variables:

   | Key                                | Value                                                  |
   | ---------------------------------- | ------------------------------------------------------ |
   | `VITE_OTEL_EXPORTER_OTLP_ENDPOINT` | `https://otlp-gateway-prod-eu-west-2.grafana.net/otlp` |
   | `VITE_OTEL_EXPORTER_OTLP_AUTH`     | Your Base64 auth string                                |
   | `VITE_APP_VERSION`                 | `1.0.0` (or your current version)                      |

3. Trigger a **redeploy**: go to **Deploys → Trigger deploy → Deploy site**

   > Netlify does not automatically rebuild when you add/change environment variables. You must trigger a new deploy for the values to be baked into the bundle.

---

## 7. Deploy and verify

1. Push your code to the branch Netlify is watching (usually `main`)
2. Wait for the Netlify build to complete
3. Visit your deployed site in a browser
4. Open the browser console — you should see:
   ```
   [telemetry] OpenTelemetry initialised → Grafana Cloud
   ```
5. Wait 1–2 minutes for spans to propagate

---

## 8. Create a Grafana dashboard

### Verify traces are arriving

1. Go to **Grafana Cloud → Explore**
2. Select your **Tempo** data source (named something like `grafanacloud-<yourname>-traces`)
3. Switch to the **TraceQL** tab
4. Query:
   ```
   {resource.service.name="personal-website"}
   ```
   > Use quotes around `personal-website` — the hyphen would otherwise be parsed as a minus operator.
5. Click **Run query** — you should see spans

### Build the dashboard

1. Go to **Dashboards → New → New dashboard**
2. Click **Add visualization** and select the Tempo data source
3. For each panel, switch to the **TraceQL** tab and use one of the queries below

### Recommended panels

**Web Vitals table**

```
{resource.service.name="personal-website" && name=~"web-vital.*"}
```

- Visualization: **Table**
- Make sure to select the **Traces** frame (not "Streaming Progress") from the dropdown below the panel

**Page loads**

```
{resource.service.name="personal-website" && name="documentLoad"}
```

- Visualization: **Table**
- The `documentLoad` span is the root span from the document-load instrumentation.
  Child spans named `resourceFetch` show individual resource timings (scripts, stylesheets, images).

**User clicks**

```
{resource.service.name="personal-website" && name="user_click"}
```

- Visualization: **Table**
- Attributes include `click.tag`, `click.text`, `click.aria_label`, `click.href`, and `click.page_path`.

**Page views**

```
{resource.service.name="personal-website" && name="page_view"}
```

- Visualization: **Table**
- Shows every visit with path, referrer, browser language, and screen size.

**Poor web vitals**

```
{resource.service.name="personal-website" && name=~"web-vital.*" && span.web_vital.rating="poor"}
```

- Visualization: **Stat**

### Time series panels (using TraceQL metrics)

These queries aggregate trace data into time series, suitable for line charts:

**Request rate over time**

```
{resource.service.name="personal-website"} | rate()
```

- Visualization: **Time series**

**Web Vitals count by type**

```
{resource.service.name="personal-website" && name=~"web-vital.*"} | count_over_time() by (name)
```

- Visualization: **Time series** or **Bar chart**

**P95 page load duration**

```
{resource.service.name="personal-website" && name="documentLoad"} | quantile_over_time(duration, 0.95)
```

- Visualization: **Time series**

**Vitals health distribution**

```
{resource.service.name="personal-website" && name=~"web-vital.*"} | count_over_time() by (span.web_vital.rating)
```

- Visualization: **Pie chart**

### Important: select the right data frame

When a panel shows "Streaming Progress" data instead of traces, click the **dropdown below the panel** and switch from **Streaming Progress** to **Traces**.

### Save

Click the **save icon** (💾), name the dashboard (e.g. "Personal Website Monitoring"), and save.

---

## Security note

Since this is a frontend-only app, the `VITE_OTEL_EXPORTER_OTLP_AUTH` token is embedded in the JavaScript bundle and visible to anyone who inspects the page source. This is acceptable as long as:

- The Grafana Cloud API token is scoped to **write-only** (e.g. `MetricsPublisher` / `TracesPublisher`)
- You **never** use an admin-scoped token

If you want to hide the credentials entirely, you can later add a small proxy (e.g. a Netlify Edge Function or serverless function) that forwards spans to Grafana Cloud with the auth header attached server-side.

---

## Troubleshooting

### Only some panels show data

**TraceQL metrics must be enabled separately.**  
The time-series queries (`rate()`, `count_over_time()`, `quantile_over_time()`) use _TraceQL metrics_, which is a separate Grafana Cloud feature. If it's not enabled for your stack:

1. Go to **Grafana Cloud → your stack → Tempo → Features**
2. Enable **TraceQL metrics** (may require a paid plan)
3. Without it, the basic trace-search panels (tables, stats) will still work, but the aggregate time-series panels will show no data.

### "Streaming Progress" instead of trace data

When a panel shows a single "Streaming Progress" row, click the **data-frame dropdown below the panel** and switch to **Traces**.

### Verify spans are arriving

The simplest query to check all traces from the site:

```
{resource.service.name="personal-website"}
```

If this returns nothing, double-check:

1. **Environment variables are set** — visit the deployed site and check the browser console for `[telemetry] OpenTelemetry initialised → Grafana Cloud`. If you see the "telemetry disabled" warning, the env vars aren't reaching the build.
2. **Network tab** — look for POST requests to your OTLP endpoint (`/v1/traces`). Check the response status:
   - `200` / `204` = spans accepted
   - `401` / `403` = auth token is wrong or expired
   - `CORS error` = the OTLP gateway is rejecting the browser origin
3. **Redeploy after changing env vars** — Netlify does not auto-rebuild when you add/change env variables. You must trigger a new deploy.

### Click spans not appearing

The `UserInteractionInstrumentation` only emits spans when a click triggers an async task tracked by Zone.js (fetch, XHR, timer). The manual `trackClicks()` listener in `telemetry.ts` works around this by creating a `user_click` span for every click, regardless of what the handler does.

### CLS and INP appear late (or not at all)

- **CLS** is only reported when the page becomes hidden (tab switch or close).
- **INP** is only reported on page unload.

The `visibilitychange` flush handler ensures these late spans are exported before the page closes.
