import { defineConfig } from "drizzle-kit";
import { ENV } from "./src/infrastructure/shared/environment";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/infrastructure/db/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: ENV.DATABASE_URL!,
  },
});
