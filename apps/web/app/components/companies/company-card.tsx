import { Building2, Crown, Landmark, UserCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface Props {
  label: string;
  type?: string;
  value?: number;
}

function resolveIcon(type?: string) {
  switch (type) {
    case "simplificado":
      return UserCheck;
    case "comun":
      return Landmark;
    case "contribuyente":
      return Crown;
    default:
      return Building2;
  }
}

export default function CompantCard({ label, type, value }: Props) {
  const Icon = resolveIcon(type);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div>{value ?? 0}</div>
      </CardContent>
    </Card>
  );
}
