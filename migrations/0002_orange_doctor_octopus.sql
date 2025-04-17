ALTER TABLE "quizzes" DROP CONSTRAINT "quizzes_userId_unique";--> statement-breakpoint
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_id_unique" UNIQUE("id");