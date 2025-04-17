import { percentOfUsers } from '@/lib/utils'
import { BookOpen, MessageSquare, Trophy } from 'lucide-react'
import React from 'react'



const ArenaRanking = ({ user }:any) => {
  return (
    <div className="w-full md:w-1/4">
      {/* RANK CARD */}
      <div className="game-card mb-8 game-section" style={{ "--delay": 3 } as React.CSSProperties}>
        <h2 className="text-xl font-semibold mb-4">Your Ranking</h2>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-4 relative">
            <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                {user.map((r:any) => r.rank) }
              </span>
            </div>
          </div>
          <p className="text-lg font-medium mb-1">Your Global Rank</p>
          {/* <p className="text-sm text-muted-foreground mb-4">
            Top % of all users
          </p> */}
          <div className="w-full game-progress mb-2">
            <div className="game-progress-bar" style={{ width: "75%" }}></div>
          </div>
          {/* <p className="text-sm text-muted-foreground">450 XP until rank 23</p> */}
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      {/* <div className="game-card mb-8 game-section" style={{ "--delay": 4 } as React.CSSProperties}>
        <h2 className="text-xl font-semibold mb-4">Achievements</h2>
        <div className="space-y-4">
          {[
            {
              icon: <MessageSquare className="h-8 w-8 text-green-500" />,
              title: "Conversation Master",
              description: "Complete 50 conversation sessions",
              progress: 80,
            },
            {
              icon: <BookOpen className="h-8 w-8 text-cyan-500" />,
              title: "Quiz Champion",
              description: "Score 90% or higher on 10 quizzes",
              progress: 60,
            },
            {
              icon: <Trophy className="h-8 w-8 text-purple-500" />,
              title: "Dedicated Learner",
              description: "Maintain a 30-day streak",
              progress: 16,
            },
          ].map((achievement, index) => (
            <div
              key={index}
              className="flex items-start p-2 rounded-lg hover:bg-game-dark-accent/30 transition-colors"
            >
              <div className="mr-3 mt-1 p-2 rounded-lg bg-game-dark-accent/50">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                <div className="game-progress mb-1">
                  <div className="game-progress-bar" style={{ width: `${achievement.progress}%` }}></div>
                </div>
                <p className="text-xs text-muted-foreground">{achievement.progress}% complete</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* LANGUAGE STATS */}
      {/* <div className="game-card game-section" style={{ "--delay": 5 } as React.CSSProperties}>
        <h2 className="text-xl font-semibold mb-4">Language Stats</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇪🇸</span>
                <span className="text-sm font-medium">Spanish</span>
              </div>
              <span className="text-sm text-muted-foreground">Level 3</span>
            </div>
            <div className="game-progress mb-1">
              <div className="game-progress-bar" style={{ width: "75%" }}></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">3,450 XP</span>
              <span className="text-green-500">+10% XP Bonus</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇫🇷</span>
                <span className="text-sm font-medium">French</span>
              </div>
              <span className="text-sm text-muted-foreground">Level 1</span>
            </div>
            <div className="game-progress mb-1">
              <div className="game-progress-bar" style={{ width: "30%" }}></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">450 XP</span>
              <span className="text-green-500">+5% XP Bonus</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default ArenaRanking
