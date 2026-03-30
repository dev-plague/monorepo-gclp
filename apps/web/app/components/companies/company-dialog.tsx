import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FieldGroup, Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { useState } from "react";
import { Form } from "react-router";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CompanyDialog({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        <Form method="post" className="space-y-4">
          <DialogHeader>
            <DialogTitle>Nuevo proveedor</DialogTitle>
            <DialogDescription>
              Ingresa los datos del proveedor para registrarlo en el sistema.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="create-nit">NIT</FieldLabel>
              <Input id="create-nit" name="nit" placeholder="Ej: 900123456-1" />
            </Field>
            <Field>
              <FieldLabel htmlFor="create-name">Razón social</FieldLabel>
              <Input
                id="create-name"
                name="name"
                placeholder="Ej: Empresa ABC S.A.S"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="create-regime">
                Régimen tributario
              </FieldLabel>
              <Select name="regime">
                <SelectTrigger id="create-regime" className="w-full">
                  <SelectValue placeholder="Selecciona un régimen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simplificado">Simplificado</SelectItem>
                  <SelectItem value="comun">Común</SelectItem>
                  <SelectItem value="gran_contribuyente">
                    Gran Contribuyente
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button className="cursor-pointer" type="submit">
              Crear proveedor
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function CompanyDialogTrigger() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)} className="cursor-pointer">
        <Plus className="mr-2 h-4 w-4" />
        Nuevo proveedor
      </Button>
      <CompanyDialog open={open} setOpen={setOpen} />
    </>
  );
}
