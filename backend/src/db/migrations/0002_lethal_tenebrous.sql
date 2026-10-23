CREATE TABLE "foods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"calories_per_100g" numeric(8, 2) NOT NULL,
	"carbs_per_100g" numeric(8, 2) NOT NULL,
	"fat_per_100g" numeric(8, 2) NOT NULL,
	"source" text NOT NULL,
	"external_id" uuid,
	"createdAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "food_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"food_id" uuid NOT NULL,
	"quantity_grams" numeric(8, 2) NOT NULL,
	"calories" numeric(10, 2) NOT NULL,
	"protein" numeric(8, 2) NOT NULL,
	"carbs" numeric(8, 2) NOT NULL,
	"fat" numeric(8, 2) NOT NULL,
	"logged_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "food_logs" ADD CONSTRAINT "food_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food_logs" ADD CONSTRAINT "food_logs_food_id_foods_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."foods"("id") ON DELETE restrict ON UPDATE no action;