import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Users, Search, Globe, Sparkles, Star, Zap, MessageSquare, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from '../ui/button'

const ArenaDashboard = ({user, currentUser}: any) => {
  return (
    <Tabs defaultValue="global" className="w-full">
    <TabsList className="grid w-full grid-cols-2 mb-8 bg-neutral-800 text-neutral-600">
      <TabsTrigger
        value="global"
        className=" text-neutral-500 data-[state=active]:bg-green-500 data-[state=active]:text-white cursor-pointer"
      >
        <Globe className="mr-2 h-4 w-4" /> Global
      </TabsTrigger>
      <TabsTrigger
        value="friends"
        className=" text-neutral-500 data-[state=active]:bg-green-500 data-[state=active]:text-white cursor-pointer"
      >
        <Users className="mr-2 h-4 w-4" /> Friends
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
              {user.map((user:any) => (
                <tr key={user.id} className={`${currentUser ? "bg-neutral-800" : ""} border-b border-neutral-800 `}>
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
                        <AvatarImage src={user.avatar} alt={user.fullName} />
                        <AvatarFallback className="bg-neutral-500">{user.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className='text-md font-semibold'>{user.fullName}</p>
                      <div>
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
                      {user.totalXp}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium mr-1">{user.longestStreak}</span>
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
    </Tabs>
  )
}

export default ArenaDashboard