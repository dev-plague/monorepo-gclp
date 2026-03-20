import { useActionData } from "react-router";
import { loginAction } from "~/.server/auth/controller/login/action";
import { LoginForm } from "~/components/auth/login-form";

export const action = loginAction;

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const currentYear = new Date().getFullYear();
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16 bg-background relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-muted/30 rounded-bl-[200px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-muted/20 rounded-tr-[150px]" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              LiquidaPro
            </span>
          </div>

          {/* Login Form */}
          <LoginForm error={actionData?.error} />

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              © {currentYear} LiquidaPro. Sistema de gestión de proveedores y
              facturación.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-80 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="absolute top-12 right-8 w-24 h-24 border border-primary-foreground/10 rounded-2xl rotate-12" />
          <div className="absolute top-32 right-16 w-16 h-16 bg-primary-foreground/5 rounded-xl -rotate-6" />
          <div className="absolute top-1/3 left-8 w-20 h-20 border border-primary-foreground/10 rounded-full" />
          <div className="absolute top-1/2 right-12 w-12 h-12 bg-primary-foreground/5 rounded-lg rotate-45" />

          <div className="relative z-10 text-primary-foreground/80">
            <div className="w-10 h-1 bg-primary-foreground/30 rounded mb-4" />
            <p className="text-sm leading-relaxed">
              Gestión inteligente de proveedores y liquidación automatizada para
              tu empresa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
