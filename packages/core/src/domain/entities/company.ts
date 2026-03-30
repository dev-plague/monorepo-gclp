export enum TaxRegime {
  SIMPLIFICADO = "simplificado",
  COMUN = "comun",
  GRAN_CONTRIBUYENTE = "gran_contribuyente",
}

export interface Company {
  id: number;
  nit: string;
  name: string;
  taxRegime: TaxRegime;
  createdAt: Date;
}
