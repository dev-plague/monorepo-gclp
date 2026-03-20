import type { UserToPresentation } from "@repo/core/infrastructure/mapper/user";
import { createCookieSessionStorage } from "react-router";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      secrets: [process.env.COOKIE_SECRET!],
    },
  });

export { getSession, commitSession, destroySession };

export async function getUserFromSession(
  request: Request,
): Promise<UserToPresentation | null> {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("user") ?? null;
}
