import LeftSidebar from "@/components/shared/LeftSidebar";
import "../globals.css";
import BottomBar from "@/components/shared/BottomBar";
import TopBar from "@/components/shared/TopBar";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await auth();
    if(!session) return null;

  return (
    <div className="w-full min-h-screen flex bg-neutral-950 text-white">
      <LeftSidebar />
      <div className="flex-1 flex flex-col overflow-auto md:px-20">
        <TopBar session={session} />
        <div className="w-full flex flex-col justify-center items-center mt-10 mb-28 md:mb-10"> 
          {children}
        </div>
      <BottomBar/>
      </div>
    </div>
  );
}
