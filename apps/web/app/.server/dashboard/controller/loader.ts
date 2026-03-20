import { redirect, type LoaderFunctionArgs } from "react-router";
import { getUserFromSession } from "~/.server/session";

export async function dashboardLoader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromSession(request);
  if (!user) throw redirect("/login");
  return { user };
}
