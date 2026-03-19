import { pgTable } from "drizzle-orm/pg-core";
import { companyTable } from "./company";

export const usersTable = pgTable("users", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 255 }).notNull(),
  lastName: t.varchar({ length: 255 }).notNull(),
  companyId: t.integer().references(() => companyTable.id),
  email: t.varchar({ length: 255 }).notNull().unique(),
  password: t.varchar().notNull(),
}));
