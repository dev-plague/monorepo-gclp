import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { companiesTable } from "./company";
export const contractTypeEnum = pgEnum("contract_type", [
  "obra",
  "prestacion_servicios",
  "fijo",
]);

export const providerRelationshipsTable = pgTable(
  "provider_relationships",
  (t) => ({
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    // Quién paga (La empresa del usuario)
    clientId: t
      .integer()
      .references(() => companiesTable.id)
      .notNull(),
    // Quién presta el servicio (El proveedor, que también es una empresa)
    providerId: t
      .integer()
      .references(() => companiesTable.id)
      .notNull(),

    contractType: contractTypeEnum().notNull(),
    isActive: t.boolean().default(true).notNull(),
    createdAt: t.timestamp().defaultNow().notNull(),
  }),
);
