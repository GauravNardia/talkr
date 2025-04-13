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