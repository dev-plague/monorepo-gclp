import type { Company, TaxRegime } from "../entities/company";

export interface ICompanyRepository {
  findById(id: number): Promise<Company | null>;
  findByNit(nit: string): Promise<Company | null>;
  create(data: CreateCompanyInput): Promise<Company>;
  update(id: number, data: UpdateCompanyInput): Promise<Company>;
}

export type CreateCompanyInput = {
  nit: string;
  name: string;
  taxRegime?: TaxRegime;
};

export type UpdateCompanyInput = Partial<Omit<CreateCompanyInput, "nit">>;
