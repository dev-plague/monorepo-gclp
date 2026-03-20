import type { Role, User } from "../../domain/entities/user";

export interface UserToPresentation {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: Role;
}

export function mapUserToPresentation(user: User): UserToPresentation {
  return {
    id: user.id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
}
