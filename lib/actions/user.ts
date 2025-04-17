"use server"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"


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
