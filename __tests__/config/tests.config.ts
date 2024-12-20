import { initApp, close } from "../../src/app";

beforeAll(async () => {
  await initApp();
}, 100000);

afterAll(async () => {
  await close();
}, 100000);
