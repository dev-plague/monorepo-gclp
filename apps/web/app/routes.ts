import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.ts"),
  route("login", "routes/auth/login-page.tsx"),
  route("logout", "routes/auth/logout.ts"),
  layout("./components/layout/dashboard-layout.tsx", [
    route("dashboard", "./routes/dashboard/home.tsx"),
    // route("companies", "./routes/companies/companies-page.tsx"),
  ]),
] satisfies RouteConfig;
