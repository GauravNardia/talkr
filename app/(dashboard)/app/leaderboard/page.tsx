import type React from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Users, Search, Globe, Sparkles, Star, Zap, MessageSquare, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col min-h-screen md:px-20 text-white">
      {/* <GameHeader currentPage="leaderboard" /> */}

      <main className="flex-1 container py-8">
        <div className="mb-8 game-section">
          <h1 className="text-3xl font-bold mb-2">Global Arena</h1>
          <p className="text-muted-foreground">Compete with language learners worldwide and climb the ranks</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <div
              className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 game-section"
            >
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-neutral-800 rounded-lg w-full md:w-64 bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-4 w-full text-white md:w-auto">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                  <select className="border border-neutral-800 rounded-lg px-2 py-2">
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Italian</option>
                    <option>Japanese</option>
                  </select>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border border-neutral-800 bg-neutral-900 hover:bg-neutral-900 hover:text-white"
                >
                  Filter
                </Button>
              </div>
            </div>

            <Tabs defaultValue="global" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-neutral-800 text-neutral-600">
                <TabsTrigger
                  value="global"
                  className=" text-neutral-500 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  <Globe className="mr-2 h-4 w-4" /> Global
                </TabsTrigger>
                <TabsTrigger
                  value="friends"
                  className=" text-neutral-500 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  <Users className="mr-2 h-4 w-4" /> Friends
                </TabsTrigger>
                <TabsTrigger
                  value="weekly"
                  className=" text-neutral-500 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                  <Medal className="mr-2 h-4 w-4" /> Weekly Challenge
                </TabsTrigger>
              </TabsList>

              <TabsContent value="global" className="mt-0 game-section">
                <div className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-neutral-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Rank
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Level
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            XP
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Streak
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-game-dark-accent">
                        {[
                          {
                            rank: 1,
                            name: "Maria Rodriguez",
                            username: "maria_r",
                            avatar: "/placeholder.svg?height=40&width=40",
                            level: 15,
                            xp: "15,240",
                            streak: 45,
                            isCurrentUser: false,
                            badge: "pro",
                          },
                          {
                            rank: 2,
                            name: "Alex Chen",
                            username: "alex_c",
                            avatar: "/placeholder.svg?height=40&width=40",
                            level: 14,
                            xp: "14,850",
                            streak: 30,
                            isCurrentUser: false,
                            badge: "pro",
                          },
                          {
                            rank: 3,
                            name: "Sophie Martin",
                            username: "sophie_m",
                            avatar: "/placeholder.svg?height=40&width=40",
                            level: 13,
                            xp: "13,720",
                            streak: 60,
                            isCurrentUser: false,
                            badge: null,
                          },
                          {
                            rank: 4,
                            name: "David Kim",
                            username: "david_k",
                            avatar: "/placeholder.svg?height=40&width=40",
                            level: 12,
                            xp: "12,450",
                            streak: 15,
                            isCurrentUser: false,
                            badge: null,
                          },
                          {
                            rank: 5,
                            name: "Emma Wilson",
                            username: "emma_w",
                            avatar: "/placeholder.svg?height=40&width=40",
                            level: 11,
                            xp: "11,890",
                            streak: 22,
                            isCurrentUser: false,
                            badge: "pro",
                          },
                          {
                            rank: 24,
                            name: "John Smith",
                            username: "john_s",
                            avatar: "/placeholder.svg?height=40&width=40",
                            level: 3,
                            xp: "3,450",
                            streak: 5,
                            isCurrentUser: true,
                            badge: "pro",
                          },
                        ].map((user) => (
                          <tr key={user.rank} className={`${user.isCurrentUser ? "bg-neutral-800" : ""} border-b border-neutral-800 `}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {user.rank <= 3 ? (
                                  <div className="mr-2">
                                    {user.rank === 1 && (
                                      <Trophy className="h-5 w-5 text-yellow-500 animate-pulse-glow" />
                                    )}
                                    {user.rank === 2 && <Medal className="h-5 w-5 text-gray-400" />}
                                    {user.rank === 3 && <Medal className="h-5 w-5 text-amber-700" />}
                                  </div>
                                ) : (
                                  <span className="font-medium">{user.rank}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-3 border border-neutral-800 bg-neutral-800">
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback className="bg-game-dark-accent">{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium flex items-center gap-1">
                                    {user.name}
                                    {user.badge === "pro" && (
                                      <Badge
                                        variant="outline"
                                        className="h-4 ml-1  text-green-500 border-green-500"
                                      >
                                        <span className="text-[10px]">PRO</span>
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">@{user.username}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">
                                <div className="font-medium flex items-center">
                                  <span>{user.level}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-600" />
                                {user.xp}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">
                                <div className="flex items-center">
                                  <Zap className="h-4 w-4 text-yellow-600" />
                                  <span className="font-medium mr-1">{user.streak}</span>
                                  <span className="text-xs text-muted-foreground">days</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="friends"
                className="mt-0 game-section"
                style={{ "--delay": 2 } as React.CSSProperties}
              >
                <div className="game-card p-8 text-center">
                  <Users className="h-12 w-12 mx-auto text-neutral-800 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Connect with Friends</h3>
                  <p className="text-muted-foreground mb-6">
                    Add friends to see how you rank against them and compete together
                  </p>
                  <Button className="bg-green-500 hover:bg-green-600 cursor-pointer">Find Friends</Button>
                </div>
              </TabsContent>

              <TabsContent value="weekly" className="mt-0 game-section" style={{ "--delay": 2 } as React.CSSProperties}>
                <div className="game-card-highlight overflow-hidden">
                  <div className="bg-neutral-800  -m-6 mb-6 p-10 border-b border-neutral-800 rounded-2xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-green-500" />
                          Weekly Challenge: Conversation Master
                        </h2>
                        <p className="text-muted-foreground">
                          Complete 10 conversation sessions this week to earn 500 bonus XP
                        </p>
                      </div>
                      <Badge className="bg-green-500">
                        <Trophy className="h-3 w-3 mr-1" />
                        <span className="text-[10px]">SPECIAL</span>
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Your progress</span>
                        <span className="text-sm text-muted-foreground">4/10 completed</span>
                      </div>
                      <div className="game-progress">
                        <div className="game-progress-bar" style={{ width: "40%" }}></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Challenge ends in 3 days</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-neutral-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Rank
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Progress
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-game-dark-accent">
                        {[
                          {
                            rank: 1,
                            name: "Emma Wilson",
                            username: "emma_w",
                            avatar: "/placeholder.svg?height=40&width=40",
                            progress: 8,
                            isCurrentUser: false,
                          },
                          {
                            rank: 2,
                            name: "David Kim",
                            username: "david_k",
                            avatar: "/placeholder.svg?height=40&width=40",
                            progress: 7,
                            isCurrentUser: false,
                          },
                          {
                            rank: 3,
                            name: "Sophie Martin",
                            username: "sophie_m",
                            avatar: "/placeholder.svg?height=40&width=40",
                            progress: 6,
                            isCurrentUser: false,
                          },
                          {
                            rank: 4,
                            name: "John Smith",
                            username: "john_s",
                            avatar: "/placeholder.svg?height=40&width=40",
                            progress: 4,
                            isCurrentUser: true,
                          },
                        ].map((user) => (
                          <tr key={user.rank} className={`${user.isCurrentUser ? "bg-neutral-800" : ""} border-b border-neutral-800`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-medium">{user.rank}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-3 border border-game-dark-accent">
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback className="bg-game-dark-accent">{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-sm text-muted-foreground">@{user.username}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">{user.progress}/10</span>
                                </div>
                                <div className="game-progress">
                                  <div className="game-progress-bar" style={{ width: `${user.progress * 10}%` }}></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full md:w-1/4">
            <div className="game-card mb-8 game-section" style={{ "--delay": 3 } as React.CSSProperties}>
              <h2 className="text-xl font-semibold mb-4">Your Ranking</h2>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-4 relative">
                  <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                      24
                    </span>
                  </div>
                </div>
                <p className="text-lg font-medium mb-1">Your Global Rank</p>
                <p className="text-sm text-muted-foreground mb-4">Top 5% of all users</p>
                <div className="w-full game-progress mb-2">
                  <div className="game-progress-bar" style={{ width: "75%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground">450 XP until rank 23</p>
              </div>
            </div>

            <div className="game-card mb-8 game-section" style={{ "--delay": 4 } as React.CSSProperties}>
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
            </div>

            <div className="game-card game-section" style={{ "--delay": 5 } as React.CSSProperties}>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
