import { pgTable } from "drizzle-orm/pg-core";
import { providerRelationshipsTable } from "./provider-relationships";

export const servicesTable = pgTable("services", (t) => ({
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  // Relación a la que pertenece este servicio
  relationshipId: t
    .integer()
    .references(() => providerRelationshipsTable.id)
    .notNull(),
  description: t.varchar({ length: 500 }).notNull(),
  baseAmount: t.numeric({ precision: 12, scale: 2 }).notNull(),
  serviceDate: t.timestamp().notNull(),
}));
