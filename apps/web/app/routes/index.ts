import { redirect, type LoaderFunctionArgs } from "react-router";
import { getSession } from "~/.server/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session) return redirect("/login");

  return redirect("/dashboard");
}
