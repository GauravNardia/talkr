CREATE TABLE "leaderboard" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"weekStart" date,
	"totalXp" integer,
	CONSTRAINT "leaderboard_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "quizzes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"options" text NOT NULL,
	"isCorrect" boolean,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "quizzes_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "xp" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"xp" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "xp_id_unique" UNIQUE("id"),
	CONSTRAINT "xp_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "total_xp" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "level" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "leaderboard" ADD CONSTRAINT "leaderboard_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "xp" ADD CONSTRAINT "xp_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;