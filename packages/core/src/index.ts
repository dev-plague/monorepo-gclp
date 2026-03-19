import { drizzle } from "drizzle-orm/node-postgres";
import { ENV } from "./infrastructure/shared/environment";
const db = drizzle(ENV.DATABASE_URL!);
