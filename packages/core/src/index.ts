import { drizzle } from "drizzle-orm/node-postgres";
import { ENV } from "./infrastructure/shared/environment";
export const db = drizzle(ENV.DATABASE_URL!);
