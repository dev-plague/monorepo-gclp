import { pgEnum, pgTable } from "drizzle-orm/pg-core";

export const taxRegimeEnum = pgEnum("tax_regime", [
  "simplificado",
  "comun",
  "gran_contribuyente",
]);

export const companiesTable = pgTable("companies", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  nit: t.varchar({ length: 20 }).notNull().unique(),
  name: t.varchar({ length: 255 }).notNull(),
  taxRegime: taxRegimeEnum().default("simplificado").notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
}));
