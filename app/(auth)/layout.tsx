import { ReactNode } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  // const session = await auth();

  // if (session) redirect("/app/home");

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">

          <div>{children}</div>
        </div>
      </section>
    </main>
  );
};

export default Layout;