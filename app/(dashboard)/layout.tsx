import LeftSidebar from "@/components/shared/LeftSidebar";
import "../globals.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full">
      <div className="antialiased bg-white">
        <div className="flex min-h-screen">
           <LeftSidebar/>
          <main className="flex-1 p-6">{children}</main> 
        </div>
      </div>
    </section>
  );
}
