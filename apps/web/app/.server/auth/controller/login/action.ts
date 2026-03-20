import {
  createCookieSessionStorage,
  redirect,
  type ActionFunctionArgs,
} from "react-router";
import { UserRepositoryDrizzle } from "@repo/core/infrastructure/repositories/user";
import { loginUseCase } from "@repo/core/application/auth/usecase/login";

const { getSession, commitSession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    secure: false, // HTTPS
    sameSite: "lax",
    secrets: [process.env.COOKIE_SECRET!],
  },
});

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Todos los campos son obligatorios" };
  }

  const userRepository = new UserRepositoryDrizzle();
  const result = await loginUseCase({ email, password }, userRepository);

  if (!result.success) return { error: result.error };

  const session = await getSession();
  session.set("user", result.user);

  return redirect("/dashboard", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
