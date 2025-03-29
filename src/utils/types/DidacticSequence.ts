// src/utils/types/DidacticSequence.ts

export type DisciplineType = 'Português' | 'Matemática' | 'História' | 'Geografia' | 'Ciências' | 'Artes' | 'Educação Física';

export type EducationLevel = 'Infantil' | 'Fundamental I' | 'Fundamental II' | 'Médio' | 'Superior';

export type SequenceStatus = 'draft' | 'active' | 'completed';

export interface DidacticSequence {
  id: string;
  // Informações Básicas
  title: string;
  discipline: DisciplineType;
  author: string;
  thematicAxis: string;
  sequence: string;
  educationLevel: EducationLevel;
  workload: number; // em horas
  overview: string;
  
  // Habilidades
  skills: string[];
  bnccCodes: string[];
  lessonsCount: number;
  
  // Objetivos
  objectives: string[];
  
  // Metadados
  createdAt: string;
  updatedAt: string;
  status: SequenceStatus;
}

export interface LessonPlan {
  id: string;
  sequenceId: string;
  title: string;
  description: string;
  duration: number; // em minutos
  discipline: DisciplineType;
  applicationWeek: string;
  status: 'Em planejamento' | 'Planejada' | 'Em aplicação' | 'Aplicada' | 'Lançada';
  classGroup: string;
  type: 'Avaliação' | 'Aula';
  objectives: string[];
  skills: string[];
  bnccCodes: string[];
  developedSkills: string[];
  learningObjectives: string[];
  methodologies: string[];
  knowledgeObjects: {
    title: string;
    subtitles?: string[];
  }[];
  necessaryResources: string[];
  contentExplanation: string;
  solvedExercises: {
    statement: string;
    solution: string;
  }[];
  evaluation: {
    type: string;
    criteria: string[];
    weight: number;
    registrationText: string;
    exercises?: string[];
  };
  createdAt: string;
  updatedAt: string;
}