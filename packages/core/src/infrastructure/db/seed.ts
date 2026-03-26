import { rolesEnum, usersTable } from "./schemas/user";
import { companiesTable } from "./schemas/company";
import { ENV } from "../shared/environment";
import { db } from "../..";

async function main() {
  const companyValues = {
    nit: "900123456-1",
    name: "LiquidaPro S.A.S",
    taxRegime: "comun" as const,
  };

  const result = await db.transaction(async (tx) => {
    // 1. Crear o actualizar la empresa principal
    const [company] = await tx
      .insert(companiesTable)
      .values(companyValues)
      .onConflictDoUpdate({ target: companiesTable.nit, set: companyValues })
      .returning();

    if (!company) {
      throw new Error("Failed to create or retrieve company");
    }

    // 2. Crear el usuario asociado a esa empresa
    const userValues = {
      name: "Admin",
      lastName: "System",
      email: ENV.ADMIN_EMAIL,
      role: rolesEnum.enumValues[0], // "admin"
      password: await Bun.password.hash(ENV.ADMIN_PASSWORD, {
        algorithm: "bcrypt",
      }),
      companyId: company.id,
    };

    const [user] = await tx
      .insert(usersTable)
      .values(userValues)
      .onConflictDoUpdate({
        target: usersTable.email,
        set: userValues,
      })
      .returning();

    return { company, user };
  });

  console.log(
    `✅ Infraestructura lista para la empresa: ${result.company.name}`,
  );
  console.log(`🔒 Contraseña para el usuario admin: ${ENV.ADMIN_PASSWORD}`);
}

await main();
