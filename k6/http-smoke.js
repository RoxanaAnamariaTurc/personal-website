import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:5173";
const VUS = Number(__ENV.VUS || 5);
const DURATION = __ENV.DURATION || "1m";

export const options = {
  scenarios: {
    homepage_http: {
      executor: "constant-vus",
      vus: VUS,
      duration: DURATION,
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1000"],
    checks: ["rate>0.99"],
  },
};

export default function () {
  const response = http.get(BASE_URL);

  check(response, {
    "homepage returned 200": (res) => res.status === 200,
    "homepage contains root element": (res) =>
      typeof res.body === "string" && res.body.includes('id="root"'),
  });

  sleep(1);
}
