import {
  Badge,
  Calendar,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import type { DropdownMenu } from "radix-ui";
import { useEffect } from "react";
import { useActionData } from "react-router";
import { toast } from "sonner";
import { companyAction } from "~/.server/companies/controller/action";
import CompantCard from "~/components/companies/company-card";
import CompanyDialogTrigger from "~/components/companies/company-dialog";
import TitleComponent from "~/components/shared/title-component";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";

export const action = companyAction;

export default function CompaniesPage() {
  const actionData = useActionData<typeof action>();

  console.log(actionData);

  useEffect(() => {
    if (!actionData) return;

    if (!actionData.success) {
      toast.error(actionData.error);
    } else {
      toast.success("Empresa creada correctamente");
    }
  }, [actionData]);

  const stats = [
    { label: "Total Proveedores", value: 0 },
    { label: "Simplificado", type: "simplificado", value: 0 },
    { label: "Régimen Común", type: "comun", value: 0 },
    { label: "Gran Contribuyente", type: "contribuyente", value: 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <TitleComponent
        title="Proveedores"
        subtitle="Directorio de proveedores registrados en el sistema"
      />
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((item, index) => (
          <CompantCard
            key={index}
            label={item.label}
            type={item.type}
            value={item.value}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Listado de proveedores</CardTitle>
              {/* <CardDescription>
                {filteredCompanies.length} proveedor
                {filteredCompanies.length !== 1 ? "es" : ""} encontrado
                {filteredCompanies.length !== 1 ? "s" : ""}
              </CardDescription> */}
            </div>
            <CompanyDialogTrigger />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>NIT</TableHead>
                  <TableHead>Razón social</TableHead>
                  <TableHead>Régimen tributario</TableHead>
                  <TableHead>Fecha registro</TableHead>
                  <TableHead className="w-15 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
