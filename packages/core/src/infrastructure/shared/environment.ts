import z from "zod";

const environmentSchema = z.object({
  DATABASE_URL: z.url().startsWith("postgresql://", {
    message: "DATABASE_URL debe usar el protocolo postgresql://",
  }),

  ADMIN_EMAIL: z.email(),

  ADMIN_PASSWORD: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export const ENV = environmentSchema.parse(process.env);
