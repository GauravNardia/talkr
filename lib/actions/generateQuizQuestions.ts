'use server';
import { quizPrompt } from "@/constants";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateQuizQuestion(language: string) {
  try {
    const stream = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: quizPrompt,
    });

    let result = '';

    for await (const chunk of stream) {
      const text = chunk.text;
      result += text;
    }

    // Optional: clean up markdown-style response
    if (result?.startsWith("```")) {
      result = result.replace(/```json|```/g, "").trim();
    }

    console.log("Gemini Response (Cleaned):", result);

    return JSON.parse(result);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return null;
  }
}
