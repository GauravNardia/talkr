CREATE TYPE "public"."plan" AS ENUM('FREE', 'PLUS', 'PRO');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ACTIVE', 'CANCELLED', 'EXPIRED');--> statement-breakpoint
CREATE TABLE "quizzes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"isCorrect" boolean NOT NULL,
	"options" text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "quizzes_id_unique" UNIQUE("id"),
	CONSTRAINT "quizzes_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"plan" "plan" DEFAULT 'FREE' NOT NULL,
	"status" "status" DEFAULT 'ACTIVE' NOT NULL,
	"startDate" timestamp DEFAULT now() NOT NULL,
	"endDate" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscription_id_unique" UNIQUE("id"),
	CONSTRAINT "subscription_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "user_quiz_progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"level_number" integer,
	"correct_answers" integer DEFAULT 0,
	"total_questions" integer DEFAULT 0,
	"completed" boolean DEFAULT false,
	"passed" boolean DEFAULT false,
	"last_attempt_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_quiz_progress_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"native_language" text,
	"target_language" text,
	"onboarded" boolean DEFAULT false,
	"total_xp" integer DEFAULT 0,
	"level" integer DEFAULT 1,
	"streak_count" integer DEFAULT 1,
	"longest_streak" integer DEFAULT 1,
	"last_activity_date" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_quiz_progress" ADD CONSTRAINT "user_quiz_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;