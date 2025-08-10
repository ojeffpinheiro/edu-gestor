import { Alternative, DifficultyLevelType, Question } from "./types/Question";

// utils/questionUtils.ts
export const calculateAverageDifficulty = (questions: Question[]): DifficultyLevelType => {
  const difficultyValues = questions.map(q => 
    q.difficultyLevel === 'easy' ? 1 :
    q.difficultyLevel === 'medium' ? 2 : 3
  );
  const avg = difficultyValues.reduce((a, b) => a + b, 0) / difficultyValues.length;
  return avg < 1.5 ? 'easy' : avg < 2.5 ? 'medium' : 'hard';
};

export const getMostCommonValue = <T,>(items: T[]): T | string => {
  const counts = items.reduce((acc, item) => {
    acc[String(item)] = (acc[String(item)] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
};

export const shuffleAlternatives = (alternatives: Alternative[]): Alternative[] => {
  return [...alternatives].sort(() => Math.random() - 0.5);
};