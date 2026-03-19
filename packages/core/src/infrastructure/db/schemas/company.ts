import { pgTable } from "drizzle-orm/pg-core";

export const companyTable = pgTable("companies", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  nit: t.varchar().notNull().unique(),
  name: t.varchar({ length: 255 }).notNull(),
}));
