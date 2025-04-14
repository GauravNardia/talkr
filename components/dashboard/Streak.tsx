import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { Flame, Star } from "lucide-react";
import { motion } from "framer-motion";


const Streak = ({streak, longestStreak}: Streak) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mx-auto"
    >
      <Card className="bg-neutral-900 text-white border border-neutral-900 shadow-2xl rounded-2xl">
        <CardHeader className="border-b border-zinc-800 p-6">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Flame className="text-orange-500" size={28} /> Daily Streak
          </CardTitle>
          <CardDescription className="text-zinc-400 mt-1">
            Stay consistent and build your language habit.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full p-6 flex justify-between gap-4 text-center">
          <div>
            <p className="text-md text-neutral-500 flex items-center justify-center gap-1">
              <Flame size={16} className="text-orange-400" /> Current
            </p>
            <p className="text-2xl font-semibold">
              {streak} days
            </p>
          </div>
          <div>
            <p className="text-md text-neutral-500 flex items-center justify-center gap-1">
              <Star size={16} className="text-yellow-500"/> Longest
            </p>
            <p className="text-2xl font-semibold">
              {longestStreak} days
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Streak