# 🚀 LiquidaPro - Monorepo GCLP

Sistema integral para la **automatización de liquidaciones trimestrales**, facturación y gestión de proveedores. Este proyecto utiliza una **Arquitectura por Capas** sobre un **Monorepo** para garantizar escalabilidad, seguridad y una separación clara de las reglas de negocio.

---

## 🏗️ ¿Qué es este Monorepo?

Este proyecto utiliza **Bun Workspaces** para gestionar múltiples paquetes y aplicaciones en un solo repositorio. Esto permite compartir lógica de negocio y configuraciones de forma eficiente.

### Estructura del Proyecto:

- **`apps/web`**: Aplicación de frontend construida con **React Router 7 (Framework Mode)**. Es nuestra **Capa de Presentación**.
- **`packages/core`**: El motor del sistema. Contiene la lógica de negocio, entidades y acceso a datos con **Drizzle ORM** (**Capas de Dominio, Aplicación e Infraestructura**).
- **`docker-compose.yml`**: Configuración de infraestructura local (PostgreSQL 17).

---

## 🛠️ Requerimientos del Sistema

El sistema resuelve la necesidad de empresas que trabajan con múltiples proveedores:

- **Gestión de Proveedores**: Registro con tipos de contrato (Obra, Prestación de Servicios, Fijo) y régimen tributario.
- **Liquidación Automática**: Procesamiento trimestral de servicios prestados.
- **Cálculos Legales**: Cálculo automático de retenciones e impuestos (ReteIca, ReteFuente, IVA) según el régimen.
- **Histórico y Reportes**: Trazabilidad completa de pagos y métricas financieras.

---

## ⚙️ Guía de Inicio Rápido

### 1. Variables de Entorno

Copia el archivo de ejemplo en la raíz del monorepo y configura tus credenciales:

```bash
cp .env.example .env
```

Asegúrate de que tu `.env` tenga los siguientes valores para desarrollo local:

```env
DATABASE_URL="postgresql://dev:devpass@localhost:5432/gclp_db?schema=public"
ADMIN_EMAIL="admin@gclp.com"
ADMIN_PASSWORD="admin123"
COOKIE_SECRET="un_secreto_aleatorio_largo"
```

### 2. Instalación

Instala todas las dependencias del monorepo desde la raíz:

```bash
bun install
```

### 3. Infraestructura y Base de Datos

Sigue este orden para preparar el entorno de datos:

```bash
# 1. Levantar PostgreSQL y pgAdmin en Docker
bun db:up

# 2. Generar los archivos de migración (Drizzle-kit)
bun db:generate

# 3. Aplicar las migraciones a la base de datos real
bun db:migrate

# 4. Crear el usuario administrador semilla
bun run --filter @repo/core seed
```

### 4. Ejecutar Aplicación Web

Inicia el servidor de desarrollo del frontend:

```bash
bun run --filter @repo/web dev
```

La aplicación estará disponible en http://localhost:5173.

---

## 📜 Scripts Disponibles

### Gestión Global (Desde la Raíz)

| Script          | Comando           | Descripción                                         |
| --------------- | ----------------- | --------------------------------------------------- |
| Levantar DB     | `bun db:up`       | Inicia contenedores de Docker (Postgres + pgAdmin). |
| Bajar DB        | `bun db:down`     | Detiene los contenedores de la base de datos.       |
| Limpiar DB      | `bun db:clear`    | Borra contenedores y VOLÚMENES (limpieza total).    |
| Generar Esquema | `bun db:generate` | Crea archivos de migración en `packages/core`.      |
| Migrar DB       | `bun db:migrate`  | Impacta los cambios en la base de datos Postgres.   |
| Studio          | `bun db:studio`   | Interfaz web para explorar las tablas de la DB.     |

### Aplicación Web (`apps/web`)

| Script     | Comando         | Descripción                                        |
| ---------- | --------------- | -------------------------------------------------- |
| Desarrollo | `bun dev`       | Inicia React Router 7 con HMR y carga de `.env`.   |
| Build      | `bun build`     | Compila la aplicación para producción.             |
| Typecheck  | `bun typecheck` | Valida tipos de TS y genera rutas de React Router. |

### Núcleo de Lógica (`packages/core`)

| Script | Comando    | Descripción                                |
| ------ | ---------- | ------------------------------------------ |
| Seed   | `bun seed` | Popula la DB con el usuario admin inicial. |

---

## 📂 Arquitectura Detallada

El proyecto implementa una **Arquitectura por Capas** para separar responsabilidades:

- **Presentación** (`apps/web`): Interfaz de usuario, captura de solicitudes y validación de formularios.
- **Aplicación** (`core/application`): Orquestación de casos de uso (ej. `loginUseCase`, `runQuarterlySettlement`).
- **Dominio** (`core/domain`): Reglas puras de negocio (entidades, cálculos de impuestos, validaciones de dominio).
- **Infraestructura** (`core/infrastructure`): Comunicación con sistemas externos (Drizzle ORM, Bcrypt, Postgres).

---

© 2024 LiquidaPro - Gestión de Contratos y Liquidaciones.
