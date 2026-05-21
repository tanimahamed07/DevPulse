import app from "./app";
import { config } from "./config/env";
import { initDB } from "./db";

const main = async () => {
  await initDB();
  app.listen(config.port, () => {
    console.log(`server run on ${config.port}`);
  });
};

main();
