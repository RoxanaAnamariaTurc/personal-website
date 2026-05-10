import { browser } from "k6/browser";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:5173";

export const options = {
  scenarios: {
    browser_otel: {
      executor: "constant-vus",
      vus: Number(__ENV.VUS || 2),
      duration: __ENV.DURATION || "1m",
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
    const response = await page.goto(BASE_URL, { waitUntil: "networkidle" });

    check(response, {
      "page loaded": (res) => res && res.status() === 200,
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

    // Give the app time to emit click and Web Vital spans before closing.
    sleep(2);
  } finally {
    await page.close();
  }
}
