"use server"

import { db } from "@/database/drizzle";
import { quizzes } from "@/database/schema";

interface Data {
    userId: string;
    question: string;
    answer: string;
    isCorrect: boolean;
    options: string[]

}

export const insertQuizDataIntoDb =  async({userId, question, answer, isCorrect, options}: Data) => {
    try {
        const quizData = {
          userId,
          question,
          answer,
          isCorrect,
          options
        };
    
       const quize = await db.insert(quizzes).values(quizData)
    
        console.log('Quiz data inserted successfully', quize );
      } catch (error) {
        console.error('Error inserting quiz data:', error);
      }
}