import type { Company } from "../../../domain/entities/company";
import type {
  ICompanyRepository,
  CreateCompanyInput,
} from "../../../domain/repositories/company";

type CreateCompanyResult =
  | { success: true; company: Company }
  | { success: false; error: string };

export async function createCompanyUseCase(
  input: CreateCompanyInput,
  companyRepository: ICompanyRepository,
): Promise<CreateCompanyResult> {
  const existing = await companyRepository.findByNit(input.nit);
  if (existing) {
    return { success: false, error: "Ya existe una empresa con ese NIT" };
  }

  try {
    const company = await companyRepository.create(input);
    return { success: true, company };
  } catch (error) {
    return { success: false, error: "No fue posible crear la compañía" };
  }
}
