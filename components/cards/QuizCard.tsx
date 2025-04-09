'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

export default function QuizPage() {
  const [question, setQuestion] = useState<any>();
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const fetchQuestion = async () => {
    const res = await fetch('/api/generate-quiz');
    const data = await res.json();
    setQuestion(data);
    setSelected(null);
    setShowFeedback(false);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswer = (option: string) => {
    setSelected(option);
    const isCorrect = option === question.correctAnswer;
    setCorrect(isCorrect);
    setShowFeedback(true);
  };

  const handleNext = async () => {
    setCompletedCount((prev) => prev + 1);
    await fetchQuestion();
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  if (!question) return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-neutral-50 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-2 text-center">
              🧠 AI Language Quiz
            </h1>
            <Progress value={completedCount * 10} className="w-full h-2 bg-neutral-200 rounded-full" />
          </div>

          <div className="mb-6">
            <p className="text-lg sm:text-xl font-medium text-neutral-900">{question.question}</p>
          </div>

          <div className="space-y-4">
            {question.options.map((option: string) => (
              <motion.div
                key={option}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2"
              >
                <Button
                  variant={
                    selected === option
                      ? correct
                        ? 'default'
                        : 'destructive'
                      : 'outline'
                  }
                  className="w-full justify-start px-5 py-3 rounded-xl text-base transition-all"
                  onClick={() => handleAnswer(option)}
                  disabled={!!selected}
                >
                  {option}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => speakText(option)}
                  disabled={!!selected}
                >
                  <Volume2 className="w-5 h-5 text-gray-600 hover:text-black transition" />
                </Button>
              </motion.div>
            ))}
          </div>

          {showFeedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center"
            >
              <p className={`font-semibold text-lg ${correct ? 'text-green-600' : 'text-red-500'}`}>
                {correct ? '✅ Correct!' : '❌ Incorrect'}
              </p>
              <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
              <Button
                className="mt-5 px-6 py-2 rounded-xl text-base"
                onClick={handleNext}
              >
                Next Question →
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
