import * as opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { Resource } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions/incubating";

export default function instrumentation() {
  const resource = new Resource({
    [ATTR_SERVICE_NAME]: "sensors-api",
    [ATTR_SERVICE_VERSION]: "1.0.0",
  });

  const sdk = new opentelemetry.NodeSDK({
    resource,

    traceExporter: new OTLPTraceExporter({
      url: "http://localhost:4318/v1/traces",
      headers: {},
      concurrencyLimit: 1,
    }),

    metricReader: new PeriodicExportingMetricReader({
      exporter: new OTLPMetricExporter({
        url: "http://localhost:4318/v1/metrics",
        headers: {},
        concurrencyLimit: 1,
      }),
    }),

    instrumentations: [getNodeAutoInstrumentations()],
  });

  try {
    sdk.start();
    console.log(
      "Instrumentation started (if locally) at: http://localhost:16686"
    );
  } catch (error) {
    console.log(error);
  }
}
