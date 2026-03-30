import type { Company } from "../../../domain/entities/company";
import type {
  ICompanyRepository,
  UpdateCompanyInput,
} from "../../../domain/repositories/company";

type UpdateCompanyResult =
  | { success: true; company: Company }
  | { success: false; error: string };

export async function updateCompanyUseCase(
  id: number,
  input: UpdateCompanyInput,
  companyRepository: ICompanyRepository,
): Promise<UpdateCompanyResult> {
  const existing = await companyRepository.findById(id);
  if (!existing) {
    return { success: false, error: "Empresa no encontrada" };
  }

  try {
    const company = await companyRepository.update(id, input);
    return { success: true, company };
  } catch (error) {
    return { success: false, error: "No fue posible actualizar la compañía" };
  }
}
