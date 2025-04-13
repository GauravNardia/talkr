import { z } from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });
  
  export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

export const onboardingSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string(),
  nativeLanguage: z.string().min(1, "Native language is required"),
  targetLanguage: z.string().min(1, "Target language is required"),
});

