import { redirect, type ActionFunctionArgs } from "react-router";
import { destroySession, getSession } from "~/.server/session";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
