import dotenv from "dotenv";
import { lambdaHandler } from "./handlers/createDummy";


// Load .env only in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
  console.log("Environment variables loaded for development");
}

(async () => {
  const response = await lambdaHandler();
  console.log("Response:", response);
})();
