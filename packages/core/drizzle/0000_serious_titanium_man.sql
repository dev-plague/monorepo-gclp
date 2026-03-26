CREATE TYPE "public"."tax_regime" AS ENUM('simplificado', 'comun', 'gran_contribuyente');--> statement-breakpoint
CREATE TYPE "public"."contract_type" AS ENUM('obra', 'prestacion_servicios', 'fijo');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TABLE "companies" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "companies_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nit" varchar(20) NOT NULL,
	"name" varchar(255) NOT NULL,
	"taxRegime" "tax_regime" DEFAULT 'simplificado' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "companies_nit_unique" UNIQUE("nit")
);
--> statement-breakpoint
CREATE TABLE "provider_relationships" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "provider_relationships_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"clientId" integer NOT NULL,
	"providerId" integer NOT NULL,
	"contractType" "contract_type" NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "services_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"relationshipId" integer NOT NULL,
	"description" varchar(500) NOT NULL,
	"baseAmount" numeric(12, 2) NOT NULL,
	"serviceDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settlements" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "settlements_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"relationshipId" integer NOT NULL,
	"periodQuarter" integer NOT NULL,
	"year" integer NOT NULL,
	"totalAmount" numeric(12, 2) NOT NULL,
	"taxWithheld" numeric(12, 2) DEFAULT '0' NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar NOT NULL,
	"role" "roles" DEFAULT 'user' NOT NULL,
	"companyId" integer NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "provider_relationships" ADD CONSTRAINT "provider_relationships_clientId_companies_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_relationships" ADD CONSTRAINT "provider_relationships_providerId_companies_id_fk" FOREIGN KEY ("providerId") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_relationshipId_provider_relationships_id_fk" FOREIGN KEY ("relationshipId") REFERENCES "public"."provider_relationships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settlements" ADD CONSTRAINT "settlements_relationshipId_provider_relationships_id_fk" FOREIGN KEY ("relationshipId") REFERENCES "public"."provider_relationships"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;