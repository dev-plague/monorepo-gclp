import {
  Building2,
  FileText,
  LayoutDashboard,
  Receipt,
  Settings,
  TrendingUp,
  Users,
  Calculator,
  CalendarClock,
  ChevronDown,
  LogOut,
  UserCircle,
  Bell,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Form, Link, useSubmit } from "react-router";
import type { UserToPresentation } from "@repo/core/infrastructure/mapper/user";

const mainNavItems = [
  {
    title: "Panel principal",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Proveedores",
    url: "/dashboard/proveedores",
    icon: Users,
  },
  {
    title: "Contratos",
    url: "/dashboard/contratos",
    icon: FileText,
  },
  {
    title: "Servicios",
    url: "/dashboard/servicios",
    icon: Building2,
  },
];

const financeNavItems = [
  {
    title: "Liquidaciones",
    url: "/dashboard/liquidaciones",
    icon: Calculator,
  },
  {
    title: "Facturación",
    url: "/dashboard/facturacion",
    icon: Receipt,
  },
  {
    title: "Retenciones",
    url: "/dashboard/retenciones",
    icon: TrendingUp,
  },
];

const reportNavItems = [
  {
    title: "Reportes",
    url: "/dashboard/reportes",
    icon: TrendingUp,
  },
  {
    title: "Proyecciones",
    url: "/dashboard/proyecciones",
    icon: CalendarClock,
  },
];

interface Props {
  user: UserToPresentation;
}

export function AppSidebar({ user }: Props) {
  const submit = useSubmit();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader>
        <Link to={"/dashboard"} className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground">
            <span className="text-sm font-bold text-background">LP</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight">
              LiquidaPro
            </span>
            <span className="text-xs text-muted-foreground">
              Gestión empresarial
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* <SidebarSeparator className="w-full" /> */}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    // isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            Finanzas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financeNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    // isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
            Análisis
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reportNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    // isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* <SidebarSeparator /> */}

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-muted text-xs">
                      AS
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col text-left text-xs group-data-[collapsible=icon]:hidden">
                    <span className="font-medium">{`${user?.name} ${user?.lastName}`}</span>
                    <span className="text-muted-foreground">{user?.role}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <UserCircle className="mr-2 h-4 w-4" />
                  Mi perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notificaciones
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Preferencias
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() =>
                    submit(null, { method: "post", action: "/logout" })
                  }
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
