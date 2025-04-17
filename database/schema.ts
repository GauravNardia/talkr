import { relations } from "drizzle-orm";
import {
    varchar,
    uuid,
    integer,
    text,
    pgTable,
    date,
    pgEnum,
    timestamp,
    boolean
  } from "drizzle-orm/pg-core";

  export const planType = pgEnum("plan", ["FREE", "PLUS", "PRO"]);
  export const subscriptionStatus = pgEnum("status", ["ACTIVE", "CANCELLED", "EXPIRED"]);
  // export const cefrLevel = pgEnum("cefr", ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"]);


export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    nativeLanguage: text("native_language"),
    targetLanguage: text("target_language"),
    onboarded: boolean("onboarded").default(false),
    rank: integer("rank").default(1),
    totalXp: integer("total_xp").default(1),
    level: integer("level").default(1),
    streakCount: integer("streak_count").default(1),
    longestStreak: integer("longest_streak").default(1),
    lastActivityDate: date("last_activity_date").defaultNow(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow(),
});

export const subscriptions = pgTable("subscription", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("userId").notNull().unique().references(() => users.id),
    plan: planType("plan").default("FREE").notNull(),
    status: subscriptionStatus("status").default("ACTIVE").notNull(),
    startDate: timestamp("startDate", { mode: "date" }).defaultNow().notNull(),
    endDate: timestamp("endDate", { mode: "date" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("userId").notNull().references(() => users.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  options: text("options").array().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const userQuizProgress = pgTable("user_quiz_progress", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id").references(() => users.id),
  levelNumber: integer("level_number"),
  correctAnswers: integer("correct_answers").default(0),
  totalQuestions: integer("total_questions").default(0),
  completed: boolean("completed").default(false),
  passed: boolean("passed").default(false),
  lastAttemptAt: timestamp("last_attempt_at", { withTimezone: true }).defaultNow(),
});

// export const quizLevels = pgTable("quiz_levels", {
//   id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
//   levelNumber: integer("level_number").unique().default(1),
//   cefr: cefrLevel("cefr"), // A1, B1, etc.
// });



// export const xps = pgTable('xp', {
//    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
//    userId: uuid("userId").notNull().unique().references(() => users.id),
//    xp: integer("xp").default(0),
//    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
//    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
// });

// export const leaderboards = pgTable("leaderboard", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   userId: uuid("userId").notNull().unique().references(() => users.id),
//   weekStart: date("weekStart"),
//   totalXp: integer("totalXp"),
// });


export const userRelations = relations(users, ({ one }) => ({
    subscription: one(subscriptions, {
      fields: [users.id],
      references: [subscriptions.userId],
    }),
}));  

export const subscriptionRelations = relations(subscriptions, ({ one }) => ({
    user: one(users, {
      fields: [subscriptions.userId],
      references: [users.id],
    }),
}));