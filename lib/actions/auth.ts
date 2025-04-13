"use server"

import { auth, signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const signInWithCredentials = async (
    params: Pick<AuthCredentials, "email" | "password">,
  ) => {
    const { email, password } = params;
  
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
  
      if (result?.error) {
        return { success: false, error: result.error };
      }
  
      return { success: true };
    } catch (error) {
      console.log(error, "Signin error");
      return { success: false, error: "Signin error" };
    }
};

export const signUp = async (params: AuthCredentials) => {
    const { fullName, email, password } = params;
  
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
  
    if (existingUser.length > 0) {
      return { success: false, error: "User already exists" };
    }
  
    const hashedPassword = await hash(password, 10);
  
    try {
      await db.insert(users).values({
        fullName,
        email,
        password: hashedPassword,
 
      });
  
      await signInWithCredentials({ email, password });
  
      return { success: true };
    } catch (error) {
      console.log(error, "Signup error");
      return { success: false, error: "Signup error" };
    }
};

export const onboardingUser = async(data: OnboardingData) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db
      .update(users)
      .set({
        fullName: data.fullName,
        email: data.email,
        nativeLanguage: data.nativeLanguage,
        targetLanguage: data.targetLanguage,
        onboarded: true
      })
      .where(eq(users.id, session.user.id));

    return { success: true };
  } catch (error) {
    console.log("Onboarding error:", error);
    return { success: false, error: "Failed to complete onboarding." };
  }

}