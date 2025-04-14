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
import Chat from "@/components/dashboard/Chat"
import { auth } from "@/auth"
import { getUserById } from "@/lib/actions/user"

export default async function PracticePage() {
    const session = await auth();
  
    if (!session || !session.user?.id) {
      return null;
    }
    
    const user = await getUserById({ id: session?.user.id });
  
  
    if (!user) {
      return <div>Loading...</div>;
    }

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

          <Chat user={user} />
        </div>
      </main>
    </div>
  )
}
