import type { IUserRepository } from "../../../domain/repositories/user";
import {
  mapUserToPresentation,
  type UserToPresentation,
} from "../../../infrastructure/mapper/user";

type LoginInput = {
  email: string;
  password: string;
};

type LoginResult =
  | { success: true; user: UserToPresentation }
  | { success: false; error: string };

export async function loginUseCase(
  input: LoginInput,
  userRepository: IUserRepository,
): Promise<LoginResult> {
  const user = await userRepository.findByEmail(input.email);
  if (!user) {
    return { success: false, error: "Credenciales inválidas" };
  }

  const isValid = await Bun.password.verify(input.password, user.password);
  if (!isValid) {
    return { success: false, error: "Credenciales inválidas" };
  }

  return {
    success: true,
    user: mapUserToPresentation(user),
  };
}
