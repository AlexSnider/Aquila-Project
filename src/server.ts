import { initApp } from "./app";
import initMetrics from "../src/monitoring/metrics/instrumentation";
import "dotenv/config";

initMetrics();

initApp().then((app) => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server is running on port: ${port}.`));
  console.log(
    `Documentation started (if locally) at: http://localhost:${port}/docs`
  );
});
