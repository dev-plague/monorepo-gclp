import { eq } from "drizzle-orm";
import type {
  ICompanyRepository,
  CreateCompanyInput,
  UpdateCompanyInput,
} from "../../domain/repositories/company";
import type { Company } from "../../domain/entities/company";
import { companiesTable } from "../db/schemas/company";
import { mapToCompany } from "../../domain/mapper/mapToCompany";
import { db } from "../..";

export class CompanyRepositoryDrizzle implements ICompanyRepository {
  async findById(id: number): Promise<Company | null> {
    const [company] = await db
      .select()
      .from(companiesTable)
      .where(eq(companiesTable.id, id))
      .limit(1);

    return company ? mapToCompany(company) : null;
  }

  async findByNit(nit: string): Promise<Company | null> {
    const [company] = await db
      .select()
      .from(companiesTable)
      .where(eq(companiesTable.nit, nit))
      .limit(1);

    return company ? mapToCompany(company) : null;
  }

  async create(data: CreateCompanyInput): Promise<Company> {
    const [company] = await db.insert(companiesTable).values(data).returning();

    if (!company) throw new Error("No fue posible crear la compañía");

    return mapToCompany(company);
  }

  async update(id: number, data: UpdateCompanyInput): Promise<Company> {
    const [company] = await db
      .update(companiesTable)
      .set(data)
      .where(eq(companiesTable.id, id))
      .returning();

    if (!company) throw new Error("No fue posible actualizar la compañía");

    return mapToCompany(company);
  }
}
