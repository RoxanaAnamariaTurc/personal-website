# k6 Testing For Frontend OpenTelemetry

This repo includes two k6 scripts:

| Script | Command | What it tests |
| --- | --- | --- |
| `k6/http-smoke.js` | `npm run k6:http` | Protocol-level HTTP checks. This does not run the React app JavaScript. |
| `k6/browser-otel.js` | `npm run k6:browser` | Browser-level checks. This opens Chromium, runs the React app, and exercises the frontend OTel path. |

Use the browser script when you want to validate telemetry in Grafana. Plain HTTP k6 traffic will hit the site, but it will not execute `src/telemetry.ts`.

## Install k6

On macOS:

```bash
brew install k6
```

The browser script also needs a Chromium-based browser installed locally, such as Google Chrome.

## Run Against Local Vite

Start the website:

```bash
npm run dev
```

In another terminal, run the HTTP smoke test:

```bash
npm run k6:http
```

For a very quick local check:

```bash
VUS=1 DURATION=5s npm run k6:http
```

Run the browser telemetry test:

```bash
BASE_URL=http://localhost:5173 npm run k6:browser
```

Local Vite does not serve the Netlify Function, so this command is useful for
UI checks but the telemetry-proxy assertion will fail unless the app is run
through Netlify Dev.

## Run Against The Deployed Site

The browser telemetry test defaults to the deployed Netlify site:

```bash
npm run k6:browser
```

This produces three synthetic visits with one browser VU. Override the target
or traffic size when needed:

```bash
BASE_URL=https://another-site.example VUS=2 ITERATIONS=6 npm run k6:browser
```

Start gently. Browser tests are heavier than HTTP tests, and each opted-in visit
can create multiple spans:

- document-load spans
- `app.startup`
- `page_view`
- `user_click`
- `web-vital.*`

## Expected OTel Flow

```mermaid
flowchart LR
  K6["k6 browser VU"] --> Browser["Chromium page"]
  Browser --> App["React website"]
  App --> Telemetry["src/telemetry.ts"]
  Telemetry --> Proxy["/.netlify/functions/traces"]
  Proxy --> Grafana["Grafana Cloud Tempo"]
```

## What The Browser Script Does

The browser script:

1. Opens the site.
2. Accepts optional telemetry when the consent dialog is present.
3. Verifies that `POST /.netlify/functions/traces` receives a `200` or `204` response.
4. Clicks the `Projects` navigation link.
5. Checks that the projects section rendered.
6. Clicks the `Observability` and `Talks` navigation links.
7. Waits briefly so click and Web Vital spans have time to export.

That should exercise the important spans from the current implementation:

| Span | Why it should appear |
| --- | --- |
| `app.startup` | Created during `initTelemetry()`. |
| `page_view` | Created during `initTelemetry()`. |
| document-load spans | Created by `DocumentLoadInstrumentation`. |
| `user_click` | Created by the document click listener. |
| `web-vital.*` | Created from `web-vitals` callbacks. |

## Useful Grafana TraceQL Checks

After running `npm run k6:browser`, wait a minute or two, then check Tempo:

```traceql
{resource.service.name="personal-website"}
```

Synthetic click traffic:

```traceql
{resource.service.name="personal-website" && name="user_click"}
```

Web Vitals:

```traceql
{resource.service.name="personal-website" && name=~"web-vital.*"}
```

## Notes

- Local Vite runs without the Netlify Function unless you use Netlify Dev. For full trace forwarding locally, use a deployed site or run the app through Netlify Dev with `GRAFANA_OTLP_ENDPOINT` and `GRAFANA_OTLP_AUTH` configured.
- The deployed site is the best target when validating the complete OTel export path.
- Keep synthetic load small at first so you do not create noisy or expensive telemetry volume.
