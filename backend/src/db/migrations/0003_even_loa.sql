ALTER TABLE "foods" ALTER COLUMN "external_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "foods" ADD CONSTRAINT "foods_source_external_id_unique" UNIQUE("source","external_id");