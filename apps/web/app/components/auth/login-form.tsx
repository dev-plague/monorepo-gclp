import { useState } from "react";

import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Spinner } from "~/components/ui/spinner";
import { Form, useNavigation } from "react-router";

export function LoginForm({ error }: { error?: string }) {
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Bienvenido
        </h1>
        <p className="text-muted-foreground">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Form method="post" className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nombre@empresa.com"
              className="h-12 bg-card border-border focus:border-foreground focus:ring-foreground/20 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 bg-card border-border focus:border-foreground focus:ring-foreground/20 transition-colors pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-base font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner className="h-5 w-5" />
          ) : (
            <>
              Iniciar sesión
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-4 text-muted-foreground">
            ¿Necesitas ayuda?
          </span>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Contacta a soporte técnico para asistencia
        </p>
        <button
          type="button"
          className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors underline underline-offset-4"
        >
          soporte@liquidapro.com
        </button>
      </div>
    </div>
  );
}
