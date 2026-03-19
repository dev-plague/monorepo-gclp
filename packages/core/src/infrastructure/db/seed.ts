import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./schemas/user";
import { companyTable } from "./schemas/company";
import { ENV } from "../shared/environment";

const db = drizzle(ENV.DATABASE_URL!);

async function main() {
  const companyValues: typeof companyTable.$inferInsert = {
    nit: "000000000",
    name: "Default Company",
  };

  const userValues: typeof usersTable.$inferInsert = {
    name: "Admin",
    lastName: "System",
    email: ENV.ADMIN_EMAIL,
    password: await Bun.password.hash(ENV.ADMIN_PASSWORD, {
      algorithm: "bcrypt",
    }),
  };

  const result = await db.transaction(async (tx) => {
    const [company] = await tx
      .insert(companyTable)
      .values(companyValues)
      .onConflictDoUpdate({ target: companyTable.nit, set: companyValues })
      .returning();

    const [user] = await tx
      .insert(usersTable)
      .values({
        ...userValues,
        companyId: company?.id,
      })
      .onConflictDoUpdate({
        target: usersTable.email,
        set: {
          ...userValues,
          companyId: company?.id,
        },
      })
      .returning();

    return { company, user };
  });

  console.log(
    `✅ Usuario semilla creado: ${JSON.stringify(result.user, null, 4)}`,
  );
  console.log(`🔒 Contraseña para el usuario admin: ${ENV.ADMIN_PASSWORD}`);
  console.log(
    `✅ Empresa semilla creada: ${JSON.stringify(result.company, null, 4)}`,
  );
}

await main();
