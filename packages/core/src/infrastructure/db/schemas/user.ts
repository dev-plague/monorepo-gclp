import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { companiesTable } from "./company";

export const rolesEnum = pgEnum("roles", ["admin", "user"]);

export const usersTable = pgTable("users", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 255 }).notNull(),
  lastName: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).notNull().unique(),
  password: t.varchar().notNull(),
  role: rolesEnum().default("user").notNull(),
  companyId: t
    .integer()
    .references(() => companiesTable.id)
    .notNull(),
}));
