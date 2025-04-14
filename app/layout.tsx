import type { Metadata } from "next";
import { Archivo, DM_Serif_Text, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const dm = DM_Serif_Text({
  weight: "400",
  variable: "--font-dm-serif-text",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talkr",
  description: "Learn to speak any language directly from your native language",
  icons: "/assets/icons/logo.svg"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
      <body className={`${archivo.variable} ${dm.variable}`}>
        {children}
        <Toaster />
      </body>
      </SessionProvider>
    </html>
  );
}
