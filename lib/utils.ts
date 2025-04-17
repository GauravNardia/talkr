import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

    export const capitalizeFirstLetter = (str: string) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
}    

export const capitalizeName = (str: string): string => {
      return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

export const percentOfUsers = (rank: number, total: number) => {
  return Math.ceil((rank / total) * 100);
};


export interface LanguageChunk {
  foreign: string;
  native: string;
}

export const formatMultilingualContent = (content: string): LanguageChunk[] => {
  const clean = content
    .replace(/^"+|"+$/g, '') // remove outer quotes
    .replace(/\\n/g, '\n') // fix newlines
    .trim();

  const match = clean.match(/^(.*?)\s*\n*\(\s*([\s\S]*?)\s*\)$/);

  if (match) {
    const [, foreignRaw, nativeRaw] = match;

    return [
      {
        foreign: foreignRaw.trim(),
        native: nativeRaw.trim(),
      },
    ];
  }

  // fallback: show just foreign text
  return [
    {
      foreign: clean,
      native: '',
    },
  ];
};

    
    
    
    