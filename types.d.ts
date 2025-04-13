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
  lastActivityDate: string | null
  createdAt: Date | null
}