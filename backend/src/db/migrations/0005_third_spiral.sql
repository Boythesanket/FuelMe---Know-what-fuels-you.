ALTER TABLE "foods" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "foods" ALTER COLUMN "createdAt" SET NOT NULL;