import { TaxRegime, type Company } from "../entities/company";

export function mapToCompany(raw: {
  id: number;
  nit: string;
  name: string;
  taxRegime: string;
  createdAt: Date;
}): Company {
  return {
    id: raw.id,
    nit: raw.nit,
    name: raw.name,
    taxRegime: raw.taxRegime as TaxRegime,
    createdAt: raw.createdAt,
  };
}
