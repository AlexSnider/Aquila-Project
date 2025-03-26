import { initApp } from "./app";
import initMetrics from "../src/monitoring/metrics/instrumentation";

initApp().then((app) => {
  const port = 3005;
  app.listen(port, () => console.log(`Server running in port: ${port}`));
  console.log("Documentation: http://localhost:3005/api-docs");
});

initMetrics();
