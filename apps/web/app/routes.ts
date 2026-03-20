import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/auth/login-page.tsx"),
  layout("./components/layout/layout.tsx", [
    route("dashboard", "./routes/index/home.tsx"),
  ]),
] satisfies RouteConfig;
