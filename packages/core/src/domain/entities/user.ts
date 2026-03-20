export type Role = "admin" | "user";

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  companyId: number;
  password: string;
}
