import type React from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mic,
  Send,
  VolumeIcon as VolumeUp,
  MessageSquare,
  BookOpen,
  Sparkles,
  Star,
  Trophy,
  Zap,
  CheckCircle,
} from "lucide-react"
// import XPProgress from "@/components/xp-progress"
import { Badge } from "@/components/ui/badge"

export default function PracticePage() {
  return (
    <div className="flex flex-col min-h-screen md:px-20">
      {/* <GameHeader currentPage="practice" /> */}

      <main className="flex-1 container py-8 text-white">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <div className="sticky top-24">
              <div className="mb-6 game-section" style={{ "--delay": 0 } as React.CSSProperties}>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-green-500" />
                  Current Language
                </h2>
                <div className="game-card-highlight">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🇪🇸</span>
                      <span className="text-lg font-medium">Spanish</span>
                    </div>
                    <Badge variant="outline" className="bg-game-primary/10 text-green-500 border-green-500">
                      B1
                    </Badge>
                  </div>
                  {/* <XPProgress level={3} currentXP={2625} requiredXP={3500} /> */}
                  <div className="mt-3 flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs hover:text-white border-neutral-800 bg-neutral-800/50 hover:bg-neutral-900 cursor-pointer"
                    >
                      View Stats
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs hover:text-white border-neutral-800 bg-neutral-800/50 hover:bg-neutral-900 cursor-pointer"
                    >
                      Change
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mb-6 game-section" style={{ "--delay": 1 } as React.CSSProperties}>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-green-500" />
                  Daily Goals
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center mr-3 glow-effect">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Practice conversation</span>
                        <span className="text-xs text-green-500">+20 XP</span>
                      </div>
                      <div className="game-progress mt-1">
                        <div className="game-progress-bar" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center mr-3 glow-effect">
                      <div className="w-2.5 h-2.5 rounded-full bg-game-primary"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Learn 10 new words</span>
                        <span className="text-xs text-green-500">+15 XP</span>
                      </div>
                      <div className="game-progress mt-1">
                        <div className="game-progress-bar" style={{ width: "70%" }}></div>
                      </div>
                      <div className="text-xs text-right mt-0.5 text-muted-foreground">7/10</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full border border-neutral-800 mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Complete 1 quiz</span>
                        <span className="text-xs text-green-500">+25 XP</span>
                      </div>
                      <div className="game-progress mt-1">
                        <div className="game-progress-bar" style={{ width: "0%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-neutral-800">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium">Daily Streak</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-yellow-600 mr-1">5</span>
                        <span className="text-xs text-muted-foreground">days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="game-section" style={{ "--delay": 2 } as React.CSSProperties}>hover:
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-green-500" />
                  Skill Progress
                </h2>
                <div className="game-card space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Vocabulary</span>
                      <span className="text-xs text-muted-foreground">230/500</span>
                    </div>
                    <div className="game-progress">
                      <div className="game-progress-bar" style={{ width: "46%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Grammar</span>
                      <span className="text-xs text-muted-foreground">68%</span>
                    </div>
                    <div className="game-progress">
                      <div className="game-progress-bar" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Listening</span>
                      <span className="text-xs text-muted-foreground">82%</span>
                    </div>
                    <div className="game-progress">
                      <div className="game-progress-bar" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Speaking</span>
                      <span className="text-xs text-muted-foreground">54%</span>
                    </div>
                    <div className="game-progress">
                      <div className="game-progress-bar" style={{ width: "54%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <Tabs defaultValue="conversation" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-neutral-800">
                <TabsTrigger
                  value="conversation"
                  className="text-neutral-500 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> Conversation
                </TabsTrigger>
                <TabsTrigger
                  value="lessons"
                  className="text-neutral-500 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  <BookOpen className="mr-2 h-4 w-4" /> Lessons
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="conversation"
                className="mt-0 game-section"
                style={{ "--delay": 3 } as React.CSSProperties}
              >
                <div className="border border-neutral-800 rounded-lg overflow-hidden bg-black">
                  <div className="bg-neutral-800 p-4 border-b border-neutral-800">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-300 flex items-center justify-center mr-3">
                        <MessageSquare className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Spanish Conversation</h3>
                        <p className="text-sm text-muted-foreground">Practice with Maria, your AI tutor</p>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className=" text-game-primary border-green-500"
                        >
                          <Zap className="h-3 w-3 mr-1 text-green-500" />
                          <span className="text-[10px] text-green-500">2X XP</span>
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:text-white border-neutral-800 bg-black hover:bg-neutral-800"
                        >
                          Change Topic
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center mr-3 flex-shrink-0">
                        <MessageSquare className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="bg-neutral-800 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm mb-1">¡Hola! ¿Cómo estás hoy?</p>
                        <p className="text-xs text-muted-foreground italic">Hello! How are you today?</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 mt-1 text-xs hover:bg-neutral-800 hover:text-white cursor-pointer"
                        >
                          <VolumeUp className="h-3 w-3 mr-1" /> Listen
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start justify-end">
                      <div className="bg-green-950 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Estoy bien, gracias. ¿Y tú?</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center ml-3 flex-shrink-0">
                        <span className="text-sm font-medium">JS</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-neutral-800">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        className="rounded-full h-10 w-10 p-0 mr-2 border-neutral-800 bg-neutral-800 hover:bg-neutral-900"
                      >
                        <Mic className="h-5 w-5 text-green-500" />
                      </Button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Type your response in Spanish..."
                          className="w-full rounded-full border border-neutral-800 py-2 px-4 pr-10 bg-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <Button className="absolute right-1 top-1 rounded-full h-8 w-8 p-0 bg-gradient-to-r from-cyan-500 to-green-500 cursor-pointer hover:shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="lessons"
                className="mt-0 game-section"
                style={{ "--delay": 3 } as React.CSSProperties}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Basic Greetings",
                      description: "Learn common greetings and introductions",
                      level: "Beginner",
                      progress: 100,
                      completed: true,
                      xp: 50,
                      badge: "Conversation Starter",
                    },
                    {
                      title: "Food & Dining",
                      description: "Vocabulary for restaurants and ordering food",
                      level: "Beginner",
                      progress: 80,
                      completed: false,
                      xp: 75,
                      badge: "Food Enthusiast",
                    },
                    {
                      title: "Past Tense",
                      description: "Learn to talk about past events",
                      level: "Intermediate",
                      progress: 60,
                      completed: false,
                      xp: 100,
                      badge: "Time Traveler",
                    },
                    {
                      title: "Travel Phrases",
                      description: "Essential phrases for traveling",
                      level: "Beginner",
                      progress: 0,
                      completed: false,
                      xp: 75,
                      badge: "Globe Trotter",
                    },
                  ].map((lesson, index) => (
                    <div key={index} className="game-card group hover:translate-y-[-5px]">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{lesson.title}</h3>
                        <Badge className={`game-badge-${lesson.completed ? "primary" : "secondary"} bg-green-500`}>
                          {lesson.level}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{lesson.description}</p>

                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{lesson.progress}%</span>
                          {lesson.completed && <CheckCircle className="h-3 w-3 text-game-primary" />}
                        </div>
                      </div>

                      <div className="game-progress mb-4">
                        <div className="game-progress-bar" style={{ width: `${lesson.progress}%` }}></div>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm text-yellow-600">+{lesson.xp} XP</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Badge: {lesson.badge}</div>
                      </div>

                      <Button className={`w-full ${lesson.completed ? "game-button-secondary" : "game-button"} bg-green-500 hover:bg-green-800 cursor-pointer`}>
                        {lesson.completed ? "Review" : "Continue"}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
