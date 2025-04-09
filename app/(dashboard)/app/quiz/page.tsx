import type React from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, ArrowRight, Clock, Star, Trophy, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function QuizzesPage() {
  return (
    <div className="flex flex-col min-h-screen text-white md:px-20">
      {/* <GameHeader currentPage="quizzes" /> */}

      <main className="flex-1 px-8 py-8">
        <div className="mb-8 game-section" style={{ "--delay": 0 } as React.CSSProperties}>
          <h1 className="text-3xl font-bold mb-2">Quiz</h1>
          <p className="text-muted-foreground">Test your knowledge, earn XP, and unlock achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="game-card-highlight mb-8 game-section" style={{ "--delay": 1 } as React.CSSProperties}>
              <div className="bg-game-dark-accent -m-6 mb-6 p-6 bg-neutral-800">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-green-500" />
                      Spanish Vocabulary Challenge
                    </h2>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" /> 10 minutes
                      <span className="mx-2">•</span>
                      <span>15 questions</span>
                      <span className="mx-2">•</span>
                      <span>Beginner level</span>
                    </div>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    <span className="text-[10px]">2X XP</span>
                  </Badge>
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Question 5 of 15</span>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">Score:</span>
                      <span className="font-medium text-green-500">8/10</span>
                    </div>
                  </div>
                  <div className="game-progress">
                    <div className="game-progress-bar" style={{ width: "33%" }}></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">What is the Spanish word for "book"?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { option: "A", text: "Libro", correct: true },
                      { option: "B", text: "Pluma", correct: false },
                      { option: "C", text: "Papel", correct: false },
                      { option: "D", text: "Lápiz", correct: false },
                    ].map((answer, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start p-4 h-auto border-neutral-800 hover:text-white bg-neutral-900 cursor-pointer hover:bg-neutral-900 hover:border-green-500 group transition-all"
                      >
                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mr-3 group-hover:bg-green-500 transition-colors">
                          <span className="text-sm">{answer.option}</span>
                        </div>
                        {answer.text}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-neutral-800 bg-neutral-900 hover:bg-neutral-800 hover:text-white cursor-pointer"
                  >
                    Previous
                  </Button>
                  <Button className="bg-green-500 hover:bg-green-600 text-white cursor-pointer">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="game-card game-section" style={{ "--delay": 2 } as React.CSSProperties}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Quest Results</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-neutral-800 bg-neutral-900 cursor-pointer text-white hover:bg-neutral-900 hover:text-white"
                >
                  View All
                </Button>
              </div>
              <div>
                {[
                  {
                    title: "Spanish Verb Conjugation",
                    date: "Yesterday",
                    score: "85%",
                    status: "passed",
                    xp: 120,
                  },
                  {
                    title: "Basic Vocabulary",
                    date: "3 days ago",
                    score: "92%",
                    status: "passed",
                    xp: 150,
                  },
                  {
                    title: "Past Tense Practice",
                    date: "1 week ago",
                    score: "70%",
                    status: "passed",
                    xp: 85,
                  },
                  {
                    title: "Advanced Grammar",
                    date: "2 weeks ago",
                    score: "65%",
                    status: "failed",
                    xp: 40,
                  },
                ].map((result, index) => (
                  <div key={index} className="flex items-center justify-between py-4 border-b border-neutral-800">
                    <div>
                      <h3 className="font-medium">{result.title}</h3>
                      <p className="text-sm text-muted-foreground">{result.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm text-yellow-600">+{result.xp} XP</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{result.score}</span>
                        {result.status === "passed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="game-card mb-8 game-section" style={{ "--delay": 3 } as React.CSSProperties}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Available Quests</h2>
                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                  <Trophy className="h-3 w-3 mr-1" />
                  <span className="text-[10px]">NEW</span>
                </Badge>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Beginner Vocabulary",
                    questions: 20,
                    time: "15 min",
                    level: "Beginner",
                    xp: 100,
                    new: false,
                  },
                  {
                    title: "Present Tense Verbs",
                    questions: 15,
                    time: "10 min",
                    level: "Beginner",
                    xp: 75,
                    new: false,
                  },
                  {
                    title: "Food & Dining",
                    questions: 25,
                    time: "20 min",
                    level: "Beginner",
                    xp: 125,
                    new: true,
                  },
                  {
                    title: "Past Tense Practice",
                    questions: 20,
                    time: "15 min",
                    level: "Intermediate",
                    xp: 150,
                    new: false,
                  },
                  {
                    title: "Subjunctive Mood",
                    questions: 15,
                    time: "15 min",
                    level: "Advanced",
                    xp: 200,
                    new: true,
                  },
                ].map((quiz, index) => (
                  <div
                    key={index}
                    className="border border-neutral-800 rounded-lg p-4 hover:border-game-primary/30 hover:bg-game-dark-accent/20 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{quiz.title}</h3>
                      {quiz.new && (
                        <Badge className="bg-green-500">
                          <span className="text-[10px]">NEW</span>
                        </Badge>
                      )}
                    </div>
                    <div className="flex text-sm text-muted-foreground mb-3">
                      <span>{quiz.questions} questions</span>
                      <span className="mx-2">•</span>
                      <span>{quiz.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm text-yellow-600">+{quiz.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`bg-green-500`}
                        >
                          {quiz.level}
                        </Badge>
                        <Button size="sm" className="bg-green-500 text-white hover:bg-green-600 text-xs cursor-pointer">
                          Start
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="game-card game-section" style={{ "--delay": 4 } as React.CSSProperties}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Quest Stats</h2>
                <Trophy className="h-5 w-5 text-green-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-neutral-800 rounded-lg p-4 text-center bg-neutral-900 ">
                  <p className="text-3xl font-bold text-green-500">24</p>
                  <p className="text-sm text-muted-foreground">Quests Completed</p>
                </div>
                <div className="border border-neutral-800 rounded-lg p-4 text-center bg-neutral-900">
                  <p className="text-3xl font-bold text-green-500">82%</p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
                <div className="border border-neutral-800 rounded-lg p-4 text-center bg-neutral-900">
                  <p className="text-3xl font-bold text-yellow-600">5</p>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                </div>
                <div className="border border-neutral-800 rounded-lg p-4 text-center bg-neutral-900">
                  <p className="text-3xl font-bold text-yellow-600">12</p>
                  <p className="text-sm text-muted-foreground">Best Streak</p>
                </div>
              </div>
              <div className="mt-4 p-4 border border-neutral-800 rounded-lg bg-neutral-900">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Weekly Goal</span>
                  <span className="text-sm text-muted-foreground">5/10 quests</span>
                </div>
                <div className="game-progress">
                  <div className="game-progress-bar" style={{ width: "50%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-right">5 more to earn 500 bonus XP</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
