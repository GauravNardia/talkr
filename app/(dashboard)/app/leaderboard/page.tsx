import type React from "react"
import ArenaDashboard from "@/components/dashboard/ArenaDashboard"
import ArenaRanking from "@/components/dashboard/ArenaRanking"
import { auth } from "@/auth";
import { getAllUsers } from "@/lib/actions/user";

export default async function LeaderboardPage() {
  const currentUser = await auth();
    const user = await getAllUsers();
    
    if (!user) {
      return <div>User not found</div>;
    }

  return (
    <div className="flex flex-col min-h-screen md:px-20 text-white px-4 sm:px-6 mt-10">
      <main className="flex-1 container py-8">
        <div className="mb-8 game-section">
          <h1 className="text-3xl font-bold mb-2">Global Arena</h1>
          <p className="text-muted-foreground">Compete with language learners worldwide and climb the ranks</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <ArenaDashboard user={user} currentUser={currentUser} />
          </div>

         <ArenaRanking user={user} />
        </div>
      </main>
    </div>
  )
}
