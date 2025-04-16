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
  

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    nativeLanguage: text("native_language"),
    targetLanguage: text("target_language"),
    onboarded: boolean("onboarded").default(false),
    totalXp: integer("total_xp").default(0),
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
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId").notNull().unique().references(() => users.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  options: text("options").notNull(),
  isCorrect: boolean("isCorrect"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});


export const xps = pgTable('xp', {
   id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
   userId: uuid("userId").notNull().unique().references(() => users.id),
   xp: integer("xp").default(0),
   createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
   updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const leaderboards = pgTable("leaderboard", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId").notNull().unique().references(() => users.id),
  weekStart: date("weekStart"),
  totalXp: integer("totalXp"),
});


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