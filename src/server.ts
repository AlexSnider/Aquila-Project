import { initApp } from "./app";
import initMetrics from "../src/monitoring/metrics/instrumentation";
import "dotenv/config";

initApp().then((app) => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running in port: ${port}`));
  console.log(`Documentation: http://localhost:${port}/api-docs`);
});

initMetrics();
