import { pgTable } from "drizzle-orm/pg-core";
import { providerRelationshipsTable } from "./provider-relationships";

export const settlementsTable = pgTable("settlements", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  relationshipId: t
    .integer()
    .references(() => providerRelationshipsTable.id)
    .notNull(),
  periodQuarter: t.integer().notNull(), // 1, 2, 3 o 4
  year: t.integer().notNull(),
  totalAmount: t.numeric({ precision: 12, scale: 2 }).notNull(),
  taxWithheld: t.numeric({ precision: 12, scale: 2 }).default("0").notNull(),
  status: t.varchar({ length: 50 }).default("pending").notNull(), // pending, paid
}));
