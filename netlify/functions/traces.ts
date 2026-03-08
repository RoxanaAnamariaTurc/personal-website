export const handler = async (event: any) => {
  const endpoint = process.env.GRAFANA_OTLP_ENDPOINT;
  const auth = process.env.GRAFANA_OTLP_AUTH;

  if (!endpoint || !auth) {
    return {
      statusCode: 500,
      body: "Missing Grafana OTLP configuration",
    };
  }

  try {
    const response = await fetch(`${endpoint}/v1/traces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: event.body,
    });

    return {
      statusCode: response.status,
      body: await response.text(),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Trace forwarding failed",
    };
  }
};
