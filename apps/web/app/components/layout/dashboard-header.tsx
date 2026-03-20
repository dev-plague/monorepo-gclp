"use client";

import { Bell, Search } from "lucide-react";
// import { usePathname } from "next/navigation"

import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const pageTitles: Record<string, string> = {
  "/dashboard": "Panel principal",
  "/dashboard/proveedores": "Proveedores",
  "/dashboard/contratos": "Contratos",
  "/dashboard/servicios": "Servicios",
  "/dashboard/liquidaciones": "Liquidaciones",
  "/dashboard/facturacion": "Facturación",
  "/dashboard/retenciones": "Retenciones",
  "/dashboard/reportes": "Reportes",
  "/dashboard/proyecciones": "Proyecciones",
  "/dashboard/configuracion": "Configuración",
};

export function DashboardHeader() {
  //   const pathname = usePathname()
  //   const currentPage = pageTitles[pathname] || "Dashboard"
  //   const isSubPage = pathname !== "/dashboard"

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-card px-4">
      <SidebarTrigger className="-ml-1" />

      <Separator orientation="vertical" className="h-full" />

      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground"
            >
              Inicio
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* {isSubPage && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentPage}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )} */}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Buscar</span>
        </Button>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
          <span className="sr-only">Notificaciones</span>
        </Button>
      </div>
    </header>
  );
}
