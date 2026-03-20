import { eq } from "drizzle-orm";
import type { IUserRepository } from "../../domain/repositories/user";
import type { User } from "../../domain/entities/user";
import { usersTable } from "../db/schemas/user";

import { mapToUser } from "../../domain/mapper/mapToUser";
import { db } from "../..";

export class UserRepositoryDrizzle implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user) return null;

    return mapToUser(user);
  }
}
