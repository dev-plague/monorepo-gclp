interface Props {
  title: string;
  subtitle?: string;
}

export default function TitleComponent({ title, subtitle }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
