"use client"

import { eq } from 'drizzle-orm'
import { isToday, isYesterday } from 'date-fns'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'

export async function updateStreak(userId: string) {
  const [user] = await db.select().from(users).where(eq(users.id, userId))

  if (!user) return

  const last = new Date(user.lastActivityDate!)
  const now = new Date()

  if (isToday(last)) return 

  let newStreak = 1
  if (isYesterday(last)) {
    newStreak = (user.streakCount || 0) + 1
  }

  const newLongestStreak = Math.max(newStreak, user.longestStreak!)

  await db
    .update(users)
    .set({
      streakCount: newStreak,
      longestStreak: newLongestStreak, 
      lastActivityDate: now.toISOString(),
    })
    .where(eq(users.id, userId))
}
