type TraceProxyEvent = {
  body?: string | null;
  headers?: Record<string, string | undefined>;
  isBase64Encoded?: boolean;
};

export const handler = async (event: TraceProxyEvent) => {
  const endpoint = process.env.GRAFANA_OTLP_ENDPOINT;
  const auth = process.env.GRAFANA_OTLP_AUTH;

  if (!endpoint || !auth) {
    return {
      statusCode: 500,
      body: "Missing Grafana OTLP configuration",
    };
  }

  try {
    const incomingContentType =
      event.headers?.["content-type"] ||
      event.headers?.["Content-Type"] ||
      "application/x-protobuf";

    const body = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64")
      : event.body || "";

    const response = await fetch(`${endpoint}/v1/traces`, {
      method: "POST",
      headers: {
        "Content-Type": incomingContentType,
        Authorization: `Basic ${auth}`,
      },
      body,
    });

    const text = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        status: response.ok ? "ok" : "error",
        upstreamStatus: response.status,
        upstreamBody: text,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "error",
        message: err instanceof Error ? err.message : "Trace forwarding failed",
      }),
    };
  }
};
