'use server';
import { auth } from "@/auth";
import { quizPrompt } from "@/constants";
import { GoogleGenAI } from "@google/genai";
import { getUserById } from "./user";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateQuizQuestion(language: string) {
      const session = await auth();
      if (!session || !session.user?.id) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

    const user = await getUserById({ id: session?.user.id });
      
  
  try {
    const stream = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: quizPrompt(user?.nativeLanguage!, user?.targetLanguage!),
    });

    let result = '';

    for await (const chunk of stream) {
      const text = chunk.text;
      result += text;
    }

    if (result?.startsWith("```")) {
      result = result.replace(/```json|```/g, "").trim();
    }


    return JSON.parse(result);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return null;
  }
}
