import { browser } from "k6/browser";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "https://roxiswebsite.netlify.app";
const TELEMETRY_ENDPOINT = /\/\.netlify\/functions\/traces$/;

export const options = {
  scenarios: {
    browser_otel: {
      executor: "shared-iterations",
      vus: Number(__ENV.VUS || 1),
      iterations: Number(__ENV.ITERATIONS || 3),
      maxDuration: __ENV.MAX_DURATION || "2m",
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
  thresholds: {
    checks: ["rate>0.95"],
    browser_web_vital_lcp: ["p(95)<2500"],
    browser_web_vital_inp: ["p(95)<500"],
    browser_web_vital_cls: ["p(95)<0.1"],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    // Start listening before navigation. Returning VUs may already have consent
    // in localStorage, so telemetry can be exported as soon as the page loads.
    const telemetryResponsePromise = page.waitForResponse(TELEMETRY_ENDPOINT, {
      timeout: 15000,
    });
    const response = await page.goto(BASE_URL, {
      waitUntil: "domcontentloaded",
    });

    check(response, {
      "page loaded": (res) => res && res.status() === 200,
    });

    const acceptTelemetry = page.locator("button", {
      hasText: "Accept telemetry",
    });

    if (await acceptTelemetry.isVisible()) {
      await acceptTelemetry.click();
    }

    const telemetryResponse = await telemetryResponsePromise;

    check(telemetryResponse, {
      "telemetry reached the Netlify trace proxy": (res) =>
        res && [200, 204].includes(res.status()),
    });

    const projectsLink = page.locator('a[href="#projects"]');
    await projectsLink.click();

    const projectsSection = page.locator("#projects");
    await projectsSection.waitFor({ state: "visible" });

    check(await projectsSection.textContent(), {
      "projects section rendered": (text) => text.includes("Featured projects"),
    });

    await page.locator('a[href="#observability"]').click();
    await page.locator('a[href="#talks"]').click();

    // Give late click and Web Vital spans time to export before closing.
    sleep(2);
  } finally {
    await page.close();
  }
}
