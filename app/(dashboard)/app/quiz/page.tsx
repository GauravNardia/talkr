import { auth } from "@/auth";
import Quiz from "@/components/dashboard/Quiz";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "@/lib/actions/user";
import { Sparkles, Star } from "lucide-react";
import { capitalizeName } from "@/lib/utils";
import type React from "react";
import { generateQuizQuestion } from "@/lib/actions/generateQuizQuestions";

export default async function QuizzesPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return null;
  }

  const user = await getUserById({ id: session.user.id });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <section className="w-full flex flex-col px-4 mt-12 md:px-20">
      <div
        className="mb-8 game-section"
        style={{ "--delay": 0 } as React.CSSProperties}
      >
        <h1 className="text-3xl font-bold mb-2">Quiz</h1>
        <p className="text-muted-foreground text-lg">
          Test your knowledge, earn XP, and unlock achievements
        </p>
      </div>

      <div className="bg-game-dark-accent mb-6 p-6 bg-neutral-900 rounded-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-green-500" />
              {capitalizeName(user.targetLanguage!)} Quiz Challenge
            </h2>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>15 questions</span>
              <span className="mx-2">•</span>
              <span>{user.level} level</span>
            </div>
          </div>
          <Badge className="bg-green-500 hover:bg-green-600 text-white text-lg">
            <Star className="h-5 w-5 mr-1" />
            <span className="text-[12px]">10 XP</span>
          </Badge>
        </div>
      </div>

      <Quiz user={user} />
    </section>
  );
}
