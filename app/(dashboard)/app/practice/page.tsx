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
import { Badge } from "@/components/ui/badge"
import Chat from "@/components/dashboard/Chat"
import { auth } from "@/auth"
import { getUserById } from "@/lib/actions/user"

export default async function PracticePage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return null;
  }

  const user = await getUserById({ id: session.user.id });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen md:px-20">
      <main className="flex-1 container py-8 text-white">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="w-full md:w-1/4 hidden md:block">
             
          </aside>

          {/* Main Chat Area */}
          <section className="w-full  justify-center items-center p-3">
            <Chat user={user} />
          </section>
        </div>
      </main>
    </div>
  );
}
