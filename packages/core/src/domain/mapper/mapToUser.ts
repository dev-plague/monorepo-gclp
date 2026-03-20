import type { User } from "../entities/user";

export function mapToUser(user: any): User {
  return {
    ...user,
    companyId: user.companyId ?? 1,
  };
}
