"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { generateQuizQuestion } from "@/lib/actions/generateQuizQuestions";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

const Quiz = ({user}: any) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log("users", user.targetLanguage)

  const fetchNewQuestion = async () => {
    setLoading(true);
    try {
      const newQuestion = await generateQuizQuestion(user.targetLanguage); 
      setCurrentQuestion(newQuestion);
      setSelectedOption(null);  
    } catch (err) {
      setError("Failed to load new question.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewQuestion(); 
  }, []);

  const handleOptionClick = (selected: string) => {
    if (selectedOption) return; 

    setSelectedOption(selected);

    if (selected === currentQuestion?.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const goToNext = () => {
    fetchNewQuestion(); 
  };

  if (loading) return <p>Loading question...</p>;
  if (error) return <p>{error}</p>;
  if (!currentQuestion) return <p>No quiz data found.</p>;

  return (
    <div className="p-6 text-white">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {currentQuestion.options.map((option, index) => (
          <Button
            key={option}
            variant="outline"
            className={`flex items-center justify-start p-4 h-auto border border-neutral-800 rounded-lg bg-neutral-900 cursor-pointer group transition-all ${
              selectedOption === option ? "border-green-500 bg-green-900 text-white" : ""
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={!!selectedOption}
          >
            <div
              className={`w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center mr-3 transition-colors ${
                selectedOption === option ? "bg-green-500" : "bg-black group-hover:bg-green-500"
              }`}
            >
              <span className="text-sm text-white">{String.fromCharCode(65 + index)}</span>
            </div>
            <span className="text-left text-sm md:text-base">{option}</span>
          </Button>
        ))}
      </div>

      {selectedOption && (
        <div className="mb-4 text-sm">
          {selectedOption === currentQuestion.correctAnswer ? (
            <p className="text-green-400">✅ Correct!</p>
          ) : (
            <p className="text-red-400">
              ❌ Wrong. Correct answer: <b>{currentQuestion.correctAnswer}</b>
            </p>
          )}
          <p className="text-muted-foreground mt-1">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">Score: {score}</p>
        <Button
          onClick={goToNext}
          disabled={!selectedOption}
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
