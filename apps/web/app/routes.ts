import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("login", "routes/auth/login-page.tsx"),
  route("logout", "routes/auth/logout.ts"),
  layout("./components/layout/dashboard-layout.tsx", [
    route("dashboard", "./routes/index/home.tsx"),
  ]),
] satisfies RouteConfig;
