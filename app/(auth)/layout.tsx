import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session){
    redirect("/app/home")
  } else {
    redirect("/sign-in")
  };

  return (
    <main className="relative min-h-screen overflow-hidden ">
      <video
        className="absolute top-0 grayscale left-0 w-full h-full object-cover z-0"
        src="/assets/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/50 z-10" />

      <section className="relative z-20 flex items-center justify-center min-h-screen auth-form">
        <div className="auth-box bg-neutral-900 p-8 rounded-xl shadow-xl">
          <div>{children}</div>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
