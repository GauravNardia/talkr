interface AuthCredentials {
    fullName: string;
    email: string;
    password: string;
}

interface OnboardingData {
  fullName: string;
  email: string;
  nativeLanguage: string;
  targetLanguage: string;
}

interface AuthUser {
  id: string;
  email: string;
}

interface User {
  id: string
  fullName: string
  email: string
  password: string
  nativeLanguage: string | null
  targetLanguage: string | null
  onboarded: boolean | null
  level: number
  rank: number | null;
  totalXp: number | null;
  level: number | null;
  streakCount: number | null;
  longestStreak: number | null;
  lastActivityDate: string | null
  createdAt: Date | null

}

interface Streak {
  streak: number;
  longestStreak: number
}