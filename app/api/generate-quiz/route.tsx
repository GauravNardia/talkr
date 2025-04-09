// pages/api/generate-quiz.ts
import { generateQuizQuestion } from '@/lib/actions/generateQuizQuestion';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const question = await generateQuizQuestion('Spanish');
  return NextResponse.json(question);
}
