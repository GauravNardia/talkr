"use server"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { desc, eq, ilike, or } from "drizzle-orm"


export const getUserById = async ({ id }: { id: string }): Promise<User | null> => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))

    return user.length > 0 ? { ...user[0], level: user[0].level ?? 0 } : null
    
  } catch (error) {
    console.error(error)
    return null;
  }
}

export const getAllUsers = async() => {
  try {

    const allUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.totalXp), desc(users.longestStreak) )

    return allUsers;
    
  } catch (error) {
    console.log("error while getting all users", error);
    return;
  }
}

export async function searchUsers(query: string) {
  if (!query) return [];

  const matchedUsers = await db
    .select()
    .from(users)
    .where(ilike(users.fullName, `%${query}%`)) // case-insensitive partial match
    .orderBy(users.totalXp); // optional: you can order by XP or streak

  return matchedUsers;
}