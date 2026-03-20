import { Outlet, useActionData, useLoaderData } from "react-router";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { TooltipProvider } from "../ui/tooltip";
import { dashboardLoader } from "~/.server/dashboard/controller/loader";

export const loader = dashboardLoader;

export default function DashboardLayout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          <DashboardHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
