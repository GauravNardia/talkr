import { Brain, Crown, Home, MessageCircle, Mic, Sparkles, Trophy } from "lucide-react";

export const navItems = [
  { label: "Home", icon: Home, path: "/app/home" },
  { label: "Practice", icon: Mic, path: "/app/practice" },
  { label: "Quiz", icon: Sparkles, path: "/app/quiz" },
  { label: "Leaderboard", icon: Crown, path: "/app/leaderboard" },
];


export const featuredUsers = [
    { name: "Sarah Chen", xp: 15000, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop" },
    { name: "Alex Kim", xp: 14200, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=96&h=96&fit=crop" },
    { name: "Maria Garcia", xp: 13800, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop" },
  ];
  
export const dailyGoals = [
    { label: "Complete 3 speaking exercises", progress: 2, total: 3 },
    { label: "Learn 10 new words", progress: 8, total: 10 },
    { label: "Complete 1 quiz", progress: 1, total: 1 },
  ];

export const icons = [
    { icon: MessageCircle, text: "Completed Spanish conversation practice", time: "2 hours ago" },
    { icon: Trophy, text: "Earned 'Quick Learner' achievement", time: "5 hours ago" },
    { icon: Brain, text: "Scored 95% on Basic Phrases quiz", time: "Yesterday" },
  ]  
  
  export const quizPrompt = `You are a language learning assistant that helps users learn a **target language** from their **native language** through short, beginner-friendly quiz questions.

  Return only one quiz question in this **exact JSON format**, and nothing else:
  
  {
    "question": "Your question here (written in the native language)",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"], 
    "correctAnswer": "The correct answer exactly matching one of the options",
    "explanation": "A short explanation in the native language explaining why this is the correct answer"
  }
  
  🧠 Goal:
  Help the user understand how to say something in the **target language** using their **native language**.
  
  🔤 Instructions:
  - Write the question in the user's **native language** (e.g. Hindi)
  - All options must be in the **target language** (e.g. French)
  - The correctAnswer must exactly match one of the options
  - The explanation must be in the **native language**, explaining the meaning of the correct answer
  - Keep vocabulary and sentence structure simple (Beginner level)
  - Focus on useful everyday topics like greetings, food, common phrases, numbers, etc.
  - Generate diffeerent questions and topics according to the level(first -> beginner then -> intermidiate -> advanced) start with simple then increase levels as user go on.
  - If user seen the question once dont repeat that question.
  -structure better questions.
  
  🌍 Example Inputs:
  Target language: French  
  Native language: Hindi  
  
  🌟 Output format must be valid JSON only, with no extra text or markdown.
  `  