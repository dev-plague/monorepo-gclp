import type { ActionFunctionArgs } from "react-router";
import { CompanyRepositoryDrizzle } from "@repo/core/infrastructure/repositories/company";
import { createCompanyUseCase } from "@repo/core/application/companies/usecase/create-company";
import type { TaxRegime } from "@repo/core/domain/entities/company";

export async function companyAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const nit = formData.get("nit") as string;
  const name = formData.get("name") as string;
  const taxRegime = formData.get("regime") as TaxRegime;

  const input = {
    nit,
    name,
    taxRegime,
  };

  if (!nit || !name || !taxRegime) {
    return {
      success: false,
      error: "Todos los campos son obligatorios",
    };
  }

  const companyRepository = new CompanyRepositoryDrizzle();
  const result = await createCompanyUseCase(input, companyRepository);

  return result;
}
